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
    <line class="bar" x1="${x0}" x2="${x0 + 360}" y1="252" y2="252" stroke="url(#grad)" stroke-width="3" stroke-linecap="round" stroke-dasharray="120 40"/>
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

for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(join(OUT, `hero-${name}.svg`), hero(t));
  writeFileSync(join(OUT, `impact-${name}.svg`), impact(t));
}
console.log("assets written to", OUT);
