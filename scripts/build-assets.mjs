#!/usr/bin/env node
// Generates the animated SVGs used in README.md (light + dark variants).
// Run: node scripts/build-assets.mjs   — no dependencies, writes to ./assets
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
mkdirSync(OUT, { recursive: true });

const THEMES = {
  dark: {
    bg: "#0d1117", panel: "#161b22", border: "#30363d", grid: "#21262d",
    text: "#e6edf3", muted: "#8b949e", a1: "#22d3ee", a2: "#a78bfa", a3: "#f472b6",
  },
  light: {
    bg: "#ffffff", panel: "#f6f8fa", border: "#d0d7de", grid: "#eaeef2",
    text: "#1f2328", muted: "#57606a", a1: "#0891b2", a2: "#7c3aed", a3: "#db2777",
  },
};

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pct = (n) => `${+n.toFixed(2)}%`;

/* ------------------------------------------------------------------ hero */
const ROLES = [
  "Software Engineer · frontend-focused",
  "React · Next.js · TypeScript",
  "Frontend architecture & performance",
  "Micro frontends at enterprise scale",
];

function hero(t) {
  const W = 1200, H = 300, slot = 4, T = ROLES.length * slot; // seconds
  const fs = 26, cw = fs * 0.6, x0 = 64, y0 = 212;

  const css = [];
  const lines = ROLES.map((role, i) => {
    const w = Math.ceil(role.length * cw) + 4;
    const s = (i * slot) / T * 100, e = ((i + 1) * slot) / T * 100;
    const typed = s + (1.6 / T) * 100, del = e - (0.5 / T) * 100;
    const kf = (prop, a, b) => `
      @keyframes ${prop}${i}{0%,${pct(s)}{${a}}${pct(typed)},${pct(del)}{${b}}${pct(e)},100%{${a}}}`;
    css.push(kf("w", "width:0px", `width:${w}px`));
    css.push(kf("c", "transform:translateX(0px)", `transform:translateX(${w}px)`));
    css.push(`#r${i}{animation:w${i} ${T}s steps(${role.length}) infinite}`);
    css.push(`#k${i}{animation:c${i} ${T}s steps(${role.length}) infinite}`);
    css.push(`@keyframes v${i}{0%,${pct(s)}{opacity:0}${pct(s + 0.01)},${pct(e - 0.01)}{opacity:1}${pct(e)},100%{opacity:0}}`);
    css.push(`#g${i}{opacity:0;animation:v${i} ${T}s linear infinite}`);
    return `
    <g id="g${i}">
      <clipPath id="cp${i}"><rect id="r${i}" x="${x0}" y="${y0 - fs}" height="${fs + 10}" width="0"/></clipPath>
      <text x="${x0}" y="${y0}" font-family="${MONO}" font-size="${fs}" fill="${t.text}" clip-path="url(#cp${i})">${esc(role)}</text>
      <g id="k${i}"><rect class="caret" x="${x0 + 2}" y="${y0 - fs + 2}" width="3" height="${fs + 4}" fill="${t.a1}"/></g>
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">
  <title id="title">Hemant Patil — Software Engineer</title>
  <desc id="desc">${esc(ROLES.join(". "))}</desc>
  <defs>
    <linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${t.a1}"/><stop offset=".55" stop-color="${t.a2}"/><stop offset="1" stop-color="${t.a3}"/>
    </linearGradient>
    <linearGradient id="gradL" gradientUnits="userSpaceOnUse" x1="${x0}" x2="${x0 + 360}"><stop offset="0" stop-color="${t.a1}"/><stop offset="1" stop-color="${t.a2}"/></linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="${t.grid}" stroke-width="1"/>
    </pattern>
    <radialGradient id="orbA"><stop offset="0" stop-color="${t.a1}" stop-opacity=".35"/><stop offset="1" stop-color="${t.a1}" stop-opacity="0"/></radialGradient>
    <radialGradient id="orbB"><stop offset="0" stop-color="${t.a2}" stop-opacity=".35"/><stop offset="1" stop-color="${t.a2}" stop-opacity="0"/></radialGradient>
    <clipPath id="frame"><rect width="${W}" height="${H}" rx="18"/></clipPath>
  </defs>
  <style>
    .caret{animation:blink 1s steps(1) infinite}
    @keyframes blink{50%{opacity:0}}
    .orb-a{animation:driftA 14s ease-in-out infinite alternate}
    .orb-b{animation:driftB 18s ease-in-out infinite alternate}
    @keyframes driftA{to{transform:translate(-160px,60px)}}
    @keyframes driftB{to{transform:translate(140px,-50px)}}
    .rise{opacity:0;animation:rise .9s cubic-bezier(.2,.7,.2,1) forwards}
    .d1{animation-delay:.1s}.d2{animation-delay:.35s}.d3{animation-delay:.6s}
    @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
    .bar{animation:shine 6s linear infinite}
    @keyframes shine{from{stroke-dashoffset:0}to{stroke-dashoffset:-400}}
    ${css.join("\n    ")}
    @media (prefers-reduced-motion: reduce){*{animation:none!important}#g0{opacity:1!important}#r0{width:${Math.ceil(ROLES[0].length * cw) + 4}px}}
  </style>
  <g clip-path="url(#frame)">
    <rect width="${W}" height="${H}" fill="${t.bg}"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <circle class="orb-a" cx="980" cy="70" r="240" fill="url(#orbA)"/>
    <circle class="orb-b" cx="760" cy="300" r="260" fill="url(#orbB)"/>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="18" fill="none" stroke="${t.border}"/>

  <g class="rise d1">
    <text x="${x0}" y="78" font-family="${MONO}" font-size="18" fill="${t.muted}">// hi, I'm</text>
  </g>
  <g class="rise d2">
    <text x="${x0 - 3}" y="150" font-family="${SANS}" font-size="72" font-weight="800" fill="url(#grad)" letter-spacing="-1.5">Hemant Patil</text>
  </g>
  <g class="rise d3">
    <text x="${x0 - 22}" y="${y0}" font-family="${MONO}" font-size="${fs}" fill="${t.a1}">›</text>
    ${lines.join("")}
    <line class="bar" x1="${x0}" x2="${x0 + 360}" y1="252" y2="252" stroke="url(#gradL)" stroke-width="3" stroke-linecap="round" stroke-dasharray="120 40"/>
    <text x="${W - 64}" y="252" text-anchor="end" font-family="${SANS}" font-size="17" fill="${t.muted}">📍 Pune, India  ·  ~5 yrs  ·  open to work</text>
  </g>

  <g class="rise d3"><g transform="translate(${W - 300},64)" font-family="${MONO}" font-size="15">
    <rect width="236" height="112" rx="10" fill="${t.panel}" stroke="${t.border}"/>
    <circle cx="18" cy="18" r="5" fill="#ff5f57"/><circle cx="36" cy="18" r="5" fill="#febc2e"/><circle cx="54" cy="18" r="5" fill="#28c840"/>
    <text x="18" y="52" fill="${t.a2}">const</text><text x="70" y="52" fill="${t.text}">focus = [</text>
    <text x="36" y="74" fill="${t.a1}">"perf", "arch",</text>
    <text x="36" y="96" fill="${t.a1}">"DX"</text><text x="80" y="96" fill="${t.text}">];</text>
  </g></g>
</svg>
`;
}

/* ---------------------------------------------------------------- impact */
const IMPACT = [
  { big: "~40%", label: "faster Student Portal", sub: "lazy routes · fewer re-renders · smaller bundle", bar: 40 },
  { big: "250K+", label: "students served", sub: "across 550+ universities, 7 user roles", bar: 100 },
  { big: "~55%", label: "fewer redundant API calls", sub: "debounced search, sorting & pagination", bar: 55 },
  { big: "~45%", label: "faster search & filter", sub: "across 4 role-based Interstride portals", bar: 45 },
  { big: "100%", label: "Jest coverage", sub: "on every American Express feature I owned", bar: 100 },
  { big: "6", label: "developers led", sub: "promoted to Team Leader at Koli Infotech", bar: 60 },
];

function impact(t) {
  const W = 1200, cols = 3, tw = 389, th = 150, gap = 16, pad = 0.5;
  const rows = Math.ceil(IMPACT.length / cols);
  const H = 1 + rows * th + (rows - 1) * gap;
  const tiles = IMPACT.map((m, i) => {
    const x = pad + (i % cols) * (tw + gap), y = pad + Math.floor(i / cols) * (th + gap);
    const d = (0.12 * i).toFixed(2), bw = tw - 56;
    return `
  <g class="tile" style="animation-delay:${d}s" transform="translate(${x},${y})">
    <rect width="${tw}" height="${th}" rx="14" fill="${t.panel}" stroke="${t.border}"/>
    <text x="28" y="62" font-family="${SANS}" font-size="44" font-weight="800" fill="url(#ig)" letter-spacing="-1">${esc(m.big)}</text>
    <text x="28" y="92" font-family="${SANS}" font-size="18" font-weight="600" fill="${t.text}">${esc(m.label)}</text>
    <text x="28" y="116" font-family="${SANS}" font-size="13.5" fill="${t.muted}">${esc(m.sub)}</text>
    <rect x="28" y="130" width="${bw}" height="5" rx="2.5" fill="${t.grid}"/>
    <rect class="fill" style="animation-delay:${(0.12 * i + 0.3).toFixed(2)}s" x="28" y="130" width="${Math.round((bw * m.bar) / 100)}" height="5" rx="2.5" fill="url(#ig)"/>
  </g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">Impact highlights</title>
  <desc id="d">${esc(IMPACT.map((m) => `${m.big} ${m.label}`).join("; "))}</desc>
  <defs>
    <linearGradient id="ig" x1="0" x2="1"><stop offset="0" stop-color="${t.a1}"/><stop offset="1" stop-color="${t.a2}"/></linearGradient>
  </defs>
  <style>
    .tile{opacity:0;animation:up .7s cubic-bezier(.2,.7,.2,1) forwards}
    @keyframes up{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
    .fill{transform-box:fill-box;transform-origin:left;transform:scaleX(0);animation:grow 1.2s cubic-bezier(.2,.7,.2,1) forwards}
    @keyframes grow{to{transform:scaleX(1)}}
    @media (prefers-reduced-motion: reduce){.tile,.fill{animation:none;opacity:1;transform:none}}
  </style>
  ${tiles.join("")}
</svg>
`;
}


/* ------------------------------------------------------------- helpers */
function wrap(text, max) {
  const out = []; let line = "";
  for (const w of text.split(" ")) {
    if ((line + " " + w).trim().length > max) { out.push(line.trim()); line = w; }
    else line += " " + w;
  }
  if (line.trim()) out.push(line.trim());
  return out;
}
const lineGrad = (t, W, id = "gl") => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" x2="${W}" y1="0" y2="0"><stop offset="0" stop-color="${t.a1}"/><stop offset=".6" stop-color="${t.a2}"/><stop offset="1" stop-color="${t.a3}"/></linearGradient>`;
const defsGrad = (t, id = "g") => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${t.a1}"/><stop offset=".6" stop-color="${t.a2}"/><stop offset="1" stop-color="${t.a3}"/></linearGradient>`;
const RM = `@media (prefers-reduced-motion: reduce){*{animation:none!important;opacity:1!important;transform:none!important;stroke-dashoffset:0!important}}`;

/* ------------------------------------------------------------- divider */
function divider(t) {
  const W = 1200, H = 24;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="presentation">
  <defs>${lineGrad(t, W)}<linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="0" x2="${W}"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask></defs>
  <style>.flow{stroke-dasharray:6 10;animation:flow 3s linear infinite}@keyframes flow{to{stroke-dashoffset:-160}}
  .dot{animation:run 6s ease-in-out infinite alternate}@keyframes run{from{transform:translateX(-420px)}to{transform:translateX(420px)}}${RM}</style>
  <g mask="url(#m)"><line class="flow" x1="0" x2="${W}" y1="12" y2="12" stroke="url(#gl)" stroke-width="2" stroke-linecap="round"/></g>
  <g class="dot"><circle cx="${W / 2}" cy="12" r="4" fill="${t.a1}"/><circle cx="${W / 2}" cy="12" r="9" fill="${t.a1}" opacity=".2"/></g>
</svg>
`;
}

/* ------------------------------------------------------------ timeline */
const JOBS = [
  { co: "Koli Infotech", role: "React.js Developer → Team Leader", when: "Nov 2021 – Feb 2025", hi: ["American Express · Pearson · Axis Bank", "Led 6 developers"] },
  { co: "iauro Systems", role: "Software Engineer", when: "Feb – May 2025", hi: ["YES Securities micro frontends", "MUI library in Storybook"] },
  { co: "Interstride", role: "Frontend Developer", when: "Jun 2025 – Sep 2026", hi: ["4 role-based portals, 550+ universities", "~40% faster for 250K+ students"] },
];
function timeline(t) {
  const W = 1200, H = 270, y = 70, xs = [200, 600, 1000];
  const nodes = JOBS.map((j, i) => {
    const x = xs[i], d = (0.5 + i * 0.6).toFixed(1), last = i === JOBS.length - 1;
    return `
  <g class="pop" style="animation-delay:${d}s">
    ${last ? `<circle class="pulse" cx="${x}" cy="${y}" r="14" fill="none" stroke="${t.a1}" stroke-width="2"/>` : ""}
    <circle cx="${x}" cy="${y}" r="11" fill="${t.bg}" stroke="url(#g)" stroke-width="3"/>
    <circle cx="${x}" cy="${y}" r="4.5" fill="${last ? t.a1 : t.a2}"/>
    <text x="${x}" y="${y - 28}" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${t.muted}">${esc(j.when)}</text>
  </g>
  <g class="card" style="animation-delay:${(+d + 0.2).toFixed(1)}s">
    <rect x="${x - 180}" y="${y + 34}" width="360" height="150" rx="14" fill="${t.panel}" stroke="${t.border}"/>
    <path d="M${x - 8} ${y + 34.5} L${x} ${y + 25} L${x + 8} ${y + 34.5}" fill="${t.panel}" stroke="${t.border}"/>
    <rect x="${x - 7}" y="${y + 33}" width="14" height="3" fill="${t.panel}"/>
    <text x="${x - 156}" y="${y + 72}" font-family="${SANS}" font-size="22" font-weight="800" fill="${t.text}">${esc(j.co)}</text>
    ${last ? `<rect x="${x + 86}" y="${y + 55}" width="72" height="22" rx="11" fill="${t.a1}" opacity=".15"/><text x="${x + 122}" y="${y + 70}" text-anchor="middle" font-family="${SANS}" font-size="12" font-weight="700" fill="${t.a1}">LATEST</text>` : ""}
    <text x="${x - 156}" y="${y + 98}" font-family="${SANS}" font-size="15" font-weight="600" fill="url(#g)">${esc(j.role)}</text>
    ${j.hi.map((h, k) => `<text x="${x - 156}" y="${y + 128 + k * 24}" font-family="${SANS}" font-size="14" fill="${t.muted}"><tspan fill="${t.a1}">▸</tspan> ${esc(h)}</text>`).join("")}
  </g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">Career timeline</title><desc id="d">${esc(JOBS.map((j) => `${j.co}, ${j.role}, ${j.when}`).join("; "))}</desc>
  <defs>${defsGrad(t)}${lineGrad(t, W)}</defs>
  <style>
    .track{stroke-dasharray:1100;stroke-dashoffset:1100;animation:draw 2.2s cubic-bezier(.6,0,.2,1) .2s forwards}
    @keyframes draw{to{stroke-dashoffset:0}}
    .pop{opacity:0;animation:fade .5s ease-out forwards}
    .card{opacity:0;animation:up .7s cubic-bezier(.2,.7,.2,1) forwards}
    @keyframes fade{to{opacity:1}}
    @keyframes up{from{opacity:0;translate:0 14px}to{opacity:1;translate:0 0}}
    .pulse{transform-box:fill-box;transform-origin:center;animation:ping 2s ease-out infinite}
    @keyframes ping{from{transform:scale(.8);opacity:.9}to{transform:scale(2.2);opacity:0}}
    ${RM}
  </style>
  <line x1="60" x2="${W - 60}" y1="${y}" y2="${y}" stroke="${t.grid}" stroke-width="3" stroke-linecap="round"/>
  <line class="track" x1="60" x2="${W - 60}" y1="${y}" y2="${y}" stroke="url(#gl)" stroke-width="3" stroke-linecap="round"/>
  ${nodes.join("")}
</svg>
`;
}

/* --------------------------------------------------------------- stack */
const STACK = [
  { title: "Frontend", icon: "◆", items: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Redux Saga", "Micro frontends", "Context API"] },
  { title: "UI & design systems", icon: "◇", items: ["Material UI", "Tailwind CSS", "Storybook", "React Hook Form", "Yup", "Chart.js"] },
  { title: "Performance", icon: "⚡", items: ["Code splitting", "Lazy loading", "Render optimization", "Bundle size", "Lighthouse", "Core Web Vitals"] },
  { title: "Quality & delivery", icon: "✓", items: ["Jest", "Code review", "GitHub Actions", "Jenkins", "GitLab CI", "Bitbucket"] },
  { title: "Backend & data", icon: "⬡", items: ["Node.js", "REST APIs", "MySQL", "MongoDB", "MSW"] },
];
function stack(t) {
  const W = 1200, colW = 231, gap = 10, pillH = 30, top = 70;
  const maxItems = Math.max(...STACK.map((c) => c.items.length));
  const H = top + maxItems * (pillH + 10) + 20;
  const cols = STACK.map((c, i) => {
    const x = 0.5 + i * (colW + gap);
    const pills = c.items.map((it, k) => {
      const d = (0.15 * i + 0.07 * k + 0.3).toFixed(2);
      return `<g class="pill" style="animation-delay:${d}s"><rect x="${x + 16}" y="${top + k * (pillH + 10)}" width="${colW - 32}" height="${pillH}" rx="${pillH / 2}" fill="${t.bg}" stroke="${t.border}"/><circle cx="${x + 34}" cy="${top + k * (pillH + 10) + pillH / 2}" r="4" fill="${k % 2 ? t.a2 : t.a1}"/><text x="${x + 48}" y="${top + k * (pillH + 10) + 20}" font-family="${SANS}" font-size="14" fill="${t.text}">${esc(it)}</text></g>`;
    }).join("");
    return `<g class="col" style="animation-delay:${(0.15 * i).toFixed(2)}s">
    <rect x="${x}" y=".5" width="${colW}" height="${H - 1}" rx="14" fill="${t.panel}" stroke="${t.border}"/>
    <rect x="${x + 16}" y="18" width="30" height="30" rx="8" fill="url(#g)" opacity=".18"/>
    <text x="${x + 31}" y="39" text-anchor="middle" font-family="${SANS}" font-size="16" fill="${t.a1}">${c.icon}</text>
    <text x="${x + 56}" y="39" font-family="${SANS}" font-size="16" font-weight="700" fill="${t.text}">${esc(c.title)}</text>
    ${pills}</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">Tech stack</title><desc id="d">${esc(STACK.map((c) => `${c.title}: ${c.items.join(", ")}`).join(". "))}</desc>
  <defs>${defsGrad(t)}</defs>
  <style>
    .col{opacity:0;animation:up .6s cubic-bezier(.2,.7,.2,1) forwards}
    .pill{opacity:0;animation:pop .45s cubic-bezier(.3,1.4,.5,1) forwards}
    @keyframes up{from{opacity:0;translate:0 14px}to{opacity:1;translate:0 0}}
    @keyframes pop{from{opacity:0;translate:-10px 0}to{opacity:1;translate:0 0}}
    ${RM}
  </style>
  ${cols.join("")}
</svg>
`;
}

/* ------------------------------------------------------------ projects */
const PROJECTS = [
  { slug: "portfolio", name: "hemant-portfolio", live: true, emoji: "🌐",
    desc: "My portfolio: dynamic Open Graph image, JSON-LD, sitemap, a validated contact API route and lazy-loaded 3D scenes that respect prefers-reduced-motion.",
    tags: ["Next.js 15", "React 19", "TypeScript"] },
  { slug: "multi-step-form", name: "multi-step-form", emoji: "🧩",
    desc: "A three-step form with per-field validation, a mock API built on MSW and routing with React Router.",
    tags: ["Vite", "Tailwind", "MSW", "React Router"] },
  { slug: "student-management", name: "student-management-app", emoji: "🎓",
    desc: "A CRUD app on Material UI and MUI X DataGrid, with forms on React Hook Form and Yup and a set of reusable form controls.",
    tags: ["MUI", "DataGrid", "React Hook Form", "Yup"] },
  { slug: "big-calendar", name: "react-big-calendar", emoji: "📅",
    desc: "A machine-coding exercise: React Big Calendar with Chart.js drill-down dialogs.",
    tags: ["React", "Big Calendar", "Chart.js"] },
];
function project(t, p) {
  const W = 590, H = 230;
  const lines = wrap(p.desc, 62).slice(0, 3);
  let tx = 28;
  const tags = p.tags.map((tag) => {
    const w = Math.round(tag.length * 7.4 + 24), x = tx; tx += w + 8;
    return `<rect x="${x}" y="176" width="${w}" height="26" rx="13" fill="url(#g)" opacity=".14"/><text x="${x + w / 2}" y="193.5" text-anchor="middle" font-family="${MONO}" font-size="12.5" fill="${t.text}">${esc(tag)}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">${esc(p.name)}</title><desc id="d">${esc(p.desc)}</desc>
  <defs>${defsGrad(t)}
    <linearGradient id="sheen" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity="${t.bg === "#ffffff" ? ".5" : ".06"}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="c"><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16"/></clipPath>
  </defs>
  <style>
    .in{opacity:0;animation:up .7s cubic-bezier(.2,.7,.2,1) forwards}
    @keyframes up{from{opacity:0;translate:0 12px}to{opacity:1;translate:0 0}}
    .sheen{animation:sweep 5s ease-in-out 1s infinite}
    @keyframes sweep{0%{transform:translateX(-300px)}40%,100%{transform:translateX(${W + 300}px)}}
    .edge{stroke-dasharray:60 ${2 * (W + H)};animation:trace 6s linear infinite}
    @keyframes trace{to{stroke-dashoffset:-${2 * (W + H) + 60}}}
    .live{transform-box:fill-box;transform-origin:center;animation:ping 1.6s ease-out infinite}
    @keyframes ping{from{transform:scale(1);opacity:.8}to{transform:scale(2.6);opacity:0}}
    ${RM}
  </style>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="${t.panel}" stroke="${t.border}"/>
  <g clip-path="url(#c)"><rect class="sheen" x="0" y="0" width="160" height="${H}" fill="url(#sheen)" transform="skewX(-20)"/></g>
  <rect class="edge" x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="none" stroke="url(#g)" stroke-width="2"/>
  <g class="in">
    <rect x="28" y="26" width="44" height="44" rx="12" fill="url(#g)" opacity=".16"/>
    <text x="50" y="57" text-anchor="middle" font-size="22">${p.emoji}</text>
    <text x="88" y="56" font-family="${SANS}" font-size="22" font-weight="800" fill="${t.text}">${esc(p.name)}</text>
    ${p.live ? `<g><circle class="live" cx="${W - 92}" cy="48" r="5" fill="#22c55e"/><circle cx="${W - 92}" cy="48" r="5" fill="#22c55e"/><text x="${W - 80}" y="53" font-family="${SANS}" font-size="14" font-weight="700" fill="#22c55e">LIVE</text></g>`
              : `<text x="${W - 28}" y="53" text-anchor="end" font-family="${SANS}" font-size="20" fill="${t.muted}">↗</text>`}
    ${lines.map((l, k) => `<text x="28" y="${104 + k * 22}" font-family="${SANS}" font-size="15" fill="${t.muted}">${esc(l)}</text>`).join("")}
    ${tags}
  </g>
</svg>
`;
}

/* -------------------------------------------------------------- footer */
function footer(t) {
  const W = 1200, H = 220;
  const wave = (amp, ph) => {
    let d = `M0 ${H}`;
    for (let x = 0; x <= W * 2; x += 20) d += ` L${x} ${(196 + amp * Math.sin((x / W) * 4 * Math.PI + ph)).toFixed(1)}`;
    return d + ` L${W * 2} ${H} Z`;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
  <title id="t">Let's build something fast together — hemantpatil.vercel.app</title>
  <defs>${defsGrad(t)}<clipPath id="c"><rect width="${W}" height="${H}" rx="18"/></clipPath></defs>
  <style>
    .w1{animation:slide 9s linear infinite}.w2{animation:slide 14s linear infinite reverse}
    @keyframes slide{to{transform:translateX(-${W}px)}}
    .in{opacity:0;animation:up .8s cubic-bezier(.2,.7,.2,1) .2s forwards}
    @keyframes up{from{opacity:0;translate:0 12px}to{opacity:1;translate:0 0}}
    .wave-hand{transform-box:fill-box;transform-origin:70% 80%;animation:hand 2.4s ease-in-out infinite}
    @keyframes hand{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(14deg)}20%,40%{transform:rotate(-8deg)}}
    ${RM}
  </style>
  <g clip-path="url(#c)">
    <rect width="${W}" height="${H}" fill="${t.panel}"/>
    <path class="w2" d="${wave(10, 1)}" fill="${t.a2}" opacity=".12"/>
    <path class="w1" d="${wave(8, 0)}" fill="${t.a1}" opacity=".14"/>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="18" fill="none" stroke="${t.border}"/>
  <g class="in" text-anchor="middle">
    <text x="${W / 2}" y="78" font-family="${SANS}" font-size="38" font-weight="800" fill="url(#g)">Let's build something fast.</text>
    <text x="${W / 2}" y="114" font-family="${SANS}" font-size="17" fill="${t.muted}">Hiring for frontend, or need a React / Next.js performance pass? Let's talk.</text>
    <text class="wave-hand" x="${W / 2 - 290}" y="82" font-size="34">👋</text>
    <text x="${W / 2}" y="152" font-family="${MONO}" font-size="15" fill="${t.text}">hemantpatil.vercel.app  ·  linkedin.com/in/hemantpatil135</text>
  </g>
</svg>
`;
}

for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(join(OUT, `divider-${name}.svg`), divider(t));
  writeFileSync(join(OUT, `timeline-${name}.svg`), timeline(t));
  writeFileSync(join(OUT, `stack-${name}.svg`), stack(t));
  writeFileSync(join(OUT, `footer-${name}.svg`), footer(t));
  for (const p of PROJECTS) writeFileSync(join(OUT, `project-${p.slug}-${name}.svg`), project(t, p));
}

for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(join(OUT, `hero-${name}.svg`), hero(t));
  writeFileSync(join(OUT, `impact-${name}.svg`), impact(t));
}
console.log("assets written to", OUT);
