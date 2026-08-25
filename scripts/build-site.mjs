#!/usr/bin/env node
// Minimal static-site generator for the SDLC catalog.
//
// Reads every catalog/<category>/<slug>.md, parses its frontmatter and body,
// and writes a plain HTML site to OUT_DIR: a category matrix at / and one
// page per entry at /p/<slug>/. No framework, no dependencies. This is a
// stopgap for a live preview; docs/designs/sdlc-process-catalog.md specifies
// the eventual Astro + Starlight architecture (categories.yaml, content
// collections, build-catalog/build-index) which supersedes this script.

import {
  readdirSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const CATALOG_DIR = join(ROOT, "catalog");
const OUT_DIR = join(ROOT, process.argv[2] || "dist-site");
const PHASES = [
  "plan",
  "design",
  "build",
  "verify",
  "release",
  "operate",
  "govern",
];

function findEntryFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith("_")) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...findEntryFiles(full));
    else if (name.endsWith(".md")) out.push(full);
  }
  return out;
}

// Frontmatter is a flat YAML subset: strings, bracketed inline arrays, and a
// `sources:` block list. That's the whole vocabulary process.schema.json
// commits to, so a hand-rolled parser stays honest about what it supports.
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("missing frontmatter block");
  const [, fmText, body] = match;
  const fm = {};
  const lines = fmText.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rest] = kv;
    if (rest === "" && lines[i + 1] && /^\s+-/.test(lines[i + 1])) {
      // block list (only `sources` uses this); skip its lines, unused by the site
      i++;
      while (i < lines.length && /^\s/.test(lines[i]) && lines[i].trim() !== "")
        i++;
      i--;
      continue;
    }
    if (rest.startsWith("[") && rest.endsWith("]")) {
      fm[key] = rest
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      fm[key] = rest.replace(/^"(.*)"$/, "$1");
    }
  }
  return { fm, body: body.trim() };
}

// Small markdown -> HTML converter covering what entries actually use:
// headings, paragraphs, bullet/numbered lists, bold/italic, inline code,
// links, blockquotes, fenced code blocks, hr.
function renderMarkdown(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  let listType = null;

  function closeList() {
    if (listType) {
      out.push(listType === "ul" ? "</ul>" : "</ol>");
      listType = null;
    }
  }

  function inline(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
      closeList();
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      out.push(
        `<pre><code>${code.join("\n").replace(/&/g, "&amp;").replace(/</g, "&lt;")}</code></pre>`,
      );
      i++;
      continue;
    }

    if (/^#{1,4}\s/.test(line)) {
      closeList();
      const level = line.match(/^#+/)[0].length;
      out.push(`<h${level}>${inline(line.replace(/^#+\s*/, ""))}</h${level}>`);
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>${inline(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
      i++;
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      if (listType !== "ol") {
        closeList();
        out.push("<ol>");
        listType = "ol";
      }
      out.push(`<li>${inline(line.replace(/^\s*\d+\.\s+/, ""))}</li>`);
      i++;
      continue;
    }

    if (
      /^\|.*\|\s*$/.test(line) &&
      lines[i + 1] &&
      /^\|[\s:|-]+\|\s*$/.test(lines[i + 1])
    ) {
      closeList();
      const splitRow = (l) =>
        l
          .trim()
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((c) => c.trim());
      const header = splitRow(line);
      i += 2;
      const bodyRows = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        bodyRows.push(splitRow(lines[i]));
        i++;
      }
      const thead = `<tr>${header.map((c) => `<th>${inline(c)}</th>`).join("")}</tr>`;
      const tbody = bodyRows
        .map(
          (r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`,
        )
        .join("");
      out.push(
        `<div class="table-scroll"><table><thead>${thead}</thead><tbody>${tbody}</tbody></table></div>`,
      );
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeList();
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(inline(lines[i].replace(/^>\s?/, "")));
        i++;
      }
      out.push(`<blockquote><p>${quote.join("<br>")}</p></blockquote>`);
      continue;
    }

    if (/^\s*---\s*$/.test(line)) {
      closeList();
      out.push("<hr>");
      i++;
      continue;
    }

    if (line.trim() === "") {
      closeList();
      i++;
      continue;
    }

    closeList();
    const para = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,4}\s|^\s*[-*]\s+|^\s*\d+\.\s+|^>\s?|^```|^\s*---\s*$|^\|.*\|\s*$/.test(
        lines[i],
      )
    ) {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  closeList();
  return out.join("\n");
}

function titleCase(slug) {
  const fixed = { ux: "UX" };
  return slug
    .split("-")
    .map((w) => fixed[w] || w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const BASE_CSS = `
:root{
  --paper:#F5F7F4;--surface:#FFFFFF;--surface-2:#EDF1EC;
  --ink:#131A17;--ink-2:#3D4A45;--muted:#6C7A74;
  --rule:#DCE3DD;--rule-strong:#C3CEC6;
  --accent:#0F6B5C;--accent-soft:#0F6B5C1F;--accent-ink:#0B4F44;
  --l1:#BFD7CF;--l2:#8CBCAF;--l3:#4C9384;--l4:#0F6B5C;
  --on-accent:#FFFFFF;
  --shadow:0 1px 2px rgba(19,26,23,.05),0 8px 24px -16px rgba(19,26,23,.35);
}
@media(prefers-color-scheme:dark){:root{
  --paper:#0D1412;--surface:#141D1A;--surface-2:#1A2521;
  --ink:#E7EEEA;--ink-2:#B7C4BE;--muted:#8B9A94;
  --rule:#25322D;--rule-strong:#33443D;
  --accent:#48B49A;--accent-soft:#48B49A24;--accent-ink:#7FD3BE;
  --l1:#2C4740;--l2:#3B6F61;--l3:#3F9A84;--l4:#5CC7AB;
  --on-accent:#0A100E;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 10px 28px -18px rgba(0,0,0,.9);
}}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
  font-size:1rem;line-height:1.55;-webkit-font-smoothing:antialiased}
.wrap{max-width:1120px;margin:0 auto;padding:2.5rem 1.25rem 4rem;display:flex;flex-direction:column;gap:2.5rem}
h1,h2,h3{font-weight:650;text-wrap:balance;margin:0;line-height:1.2}
h1{font-size:2.1rem;letter-spacing:-.02em}
h2{font-size:1.4rem}
p{margin:0}
a{color:var(--accent-ink)}
.eyebrow{font-family:ui-monospace,"SF Mono",Menlo,monospace;font-size:.78rem;
  text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}
.lede{max-width:64ch;color:var(--ink-2);font-size:1.1rem;line-height:1.6}
.stats{display:flex;flex-wrap:wrap;border:1px solid var(--rule);border-radius:6px;
  background:var(--surface);box-shadow:var(--shadow);overflow:hidden}
.stat{flex:1 1 130px;padding:.85rem 1rem;border-right:1px solid var(--rule)}
.stat:last-child{border-right:0}
.stat b{display:block;font-family:ui-monospace,monospace;font-size:1.4rem;font-variant-numeric:tabular-nums}
.stat span{font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.07em}
.scroll{overflow-x:auto;border:1px solid var(--rule);border-radius:6px;background:var(--surface);box-shadow:var(--shadow)}
table{border-collapse:collapse;width:100%;min-width:900px}
th,td{text-align:left;padding:.55rem .7rem;border-bottom:1px solid var(--rule);vertical-align:middle}
thead th{font-family:ui-monospace,monospace;font-size:.72rem;font-weight:500;color:var(--muted);
  text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid var(--rule-strong);white-space:nowrap}
th.ph,td.ph{text-align:center;width:56px}
tbody tr:hover{background:var(--surface-2)}
td.cat a{font-weight:600;color:var(--ink);text-decoration:none}
td.cat a:hover{color:var(--accent-ink)}
td.cat small{display:block;font-family:ui-monospace,monospace;font-size:.66rem;color:var(--muted);text-transform:uppercase}
td.entry a{color:var(--ink);font-weight:500;text-decoration:none}
td.entry a:hover{color:var(--accent-ink)}
td.entry em{display:block;font-style:normal;font-weight:400;font-size:.8rem;color:var(--muted);margin-top:.1rem}
.mark{display:inline-block;width:10px;height:10px;border-radius:2px;background:var(--accent)}
.mark.off{background:transparent;border:1px solid var(--rule-strong);opacity:.5}
.badge{display:inline-block;font-family:ui-monospace,monospace;font-size:.72rem;padding:.15rem .5rem;
  border-radius:999px;background:var(--accent-soft);color:var(--accent-ink)}
footer{border-top:1px solid var(--rule-strong);padding-top:1rem;color:var(--muted);font-size:.82rem}
.entry-head{display:flex;flex-direction:column;gap:.6rem}
.entry-meta{display:flex;flex-wrap:wrap;gap:.4rem}
.back{font-size:.85rem}
.prose h2{margin-top:1.2rem;padding-bottom:.3rem;border-bottom:1px solid var(--rule)}
.prose ul,.prose ol{padding-left:1.3rem}
.prose li{margin:.25rem 0}
.prose code{font-family:ui-monospace,monospace;background:var(--surface-2);padding:.1rem .3rem;border-radius:3px;font-size:.9em}
.prose pre{background:var(--surface-2);padding:.8rem 1rem;border-radius:6px;overflow-x:auto}
.prose blockquote{margin:0;padding-left:1rem;border-left:3px solid var(--rule-strong);color:var(--ink-2)}
.prose .table-scroll{overflow-x:auto;border:1px solid var(--rule);border-radius:6px;margin:.75rem 0}
.prose table{border-collapse:collapse;width:100%;min-width:520px}
.prose th,.prose td{text-align:left;padding:.5rem .7rem;border-bottom:1px solid var(--rule);font-size:.92rem}
.prose thead th{background:var(--surface-2);font-weight:600}
`;

function layout({ title, description, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<style>${BASE_CSS}</style>
</head>
<body>${body}</body>
</html>`;
}

function main() {
  const files = findEntryFiles(CATALOG_DIR).sort();
  const entries = files.map((f) => {
    const { fm, body } = parseFrontmatter(readFileSync(f, "utf8"));
    const category = relative(CATALOG_DIR, f).split("/")[0];
    return { ...fm, category, body };
  });

  const byCategory = new Map();
  for (const e of entries) {
    if (!byCategory.has(e.category)) byCategory.set(e.category, []);
    byCategory.get(e.category).push(e);
  }
  const categories = [...byCategory.keys()].sort();

  mkdirSync(OUT_DIR, { recursive: true });

  // Index: category matrix
  const rows = entries
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category))
    .map((e) => {
      const phases = e.lifecycle_phase || [];
      const cells = PHASES.map(
        (p) =>
          `<td class="ph"><span class="mark${phases.includes(p) ? "" : " off"}" title="${p}"></span></td>`,
      ).join("");
      return `<tr>
        <td class="cat"><a href="./#${esc(e.category)}">${esc(titleCase(e.category))}</a><small>${esc(e.category)}</small></td>
        <td class="entry"><a href="p/${esc(e.slug)}/">${esc(e.title)}</a><em>${esc(e.summary || "")}</em></td>
        ${cells}
        <td><span class="badge">L${esc(e.adoption_level)}</span></td>
      </tr>`;
    })
    .join("\n");

  const phaseHeads = PHASES.map(
    (p) => `<th class="ph">${p.slice(0, 4)}</th>`,
  ).join("");

  const indexBody = `<div class="wrap">
  <header style="display:flex;flex-direction:column;gap:.9rem">
    <p class="eyebrow">sdlc-checklist &middot; catalog</p>
    <h1>SDLC Process Catalog</h1>
    <div class="stats">
      <div class="stat"><b>${categories.length}</b><span>categories</span></div>
      <div class="stat"><b>${entries.length}</b><span>entries</span></div>
      <div class="stat"><b>${entries.filter((e) => e.status === "published").length}</b><span>published</span></div>
    </div>
  </header>
  <section class="scroll">
    <table>
      <thead><tr><th>Category</th><th>Process</th>${phaseHeads}<th>Level</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>
  <footer>Built ${new Date().toISOString().slice(0, 10)} by <code>scripts/build-site.mjs</code> from the catalog on this branch.</footer>
</div>`;

  writeFileSync(
    join(OUT_DIR, "index.html"),
    layout({
      title: "SDLC Process Catalog",
      description: `${categories.length} categories, ${entries.length} SDLC processes.`,
      body: indexBody,
    }),
  );

  // Entry pages
  for (const e of entries) {
    const dir = join(OUT_DIR, "p", e.slug);
    mkdirSync(dir, { recursive: true });
    const meta = [
      `<span class="badge">${esc(e.category)}</span>`,
      `<span class="badge">adoption L${esc(e.adoption_level)}</span>`,
      `<span class="badge">effort: ${esc(e.effort)}</span>`,
      `<span class="badge">automatable: ${esc(e.automatable)}</span>`,
      ...(e.lifecycle_phase || []).map(
        (p) => `<span class="badge">${esc(p)}</span>`,
      ),
    ].join("\n");
    const body = `<div class="wrap">
      <div class="back"><a href="../../">&larr; all categories</a></div>
      <div class="entry-head">
        <p class="eyebrow">${esc(e.id)} &middot; ${esc(titleCase(e.category))}</p>
        <h1>${esc(e.title)}</h1>
        <p class="lede">${esc(e.summary || "")}</p>
        <div class="entry-meta">${meta}</div>
      </div>
      <article class="prose">${renderMarkdown(e.body)}</article>
      <footer>Status: ${esc(e.status)}</footer>
    </div>`;
    writeFileSync(
      join(dir, "index.html"),
      layout({
        title: `${e.title} — SDLC Process Catalog`,
        description: e.summary || "",
        body,
      }),
    );
  }

  writeFileSync(join(OUT_DIR, ".nojekyll"), "");
  console.log(
    `built ${entries.length} entries across ${categories.length} categories -> ${relative(ROOT, OUT_DIR)}/`,
  );
}

main();
