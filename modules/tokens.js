import { deaccent, slugify } from "./normalize.js";

const STOP_PREFIXES = new Set(["tinh","thanh pho","tp","tx","huyen","quan","thi xa","xa","phuong","thi tran","dac khu"]);

function initials(str) {
  const words = deaccent(str).split(/\s+/).filter(Boolean);
  const filt = words.filter(w => !STOP_PREFIXES.has(w));
  const pick = (filt.length ? filt : words);
  return pick.map(w => w[0]).join("");
}

export function buildTokens(nameVi, extras = []) {
  const base = deaccent(nameVi);
  const spacedSlug = slugify(nameVi).replace(/\-/g, " ");
  const abbr = initials(nameVi);
  const set = new Set([base, spacedSlug, abbr]);
  for (const e of extras) {
    const ee = String(e || "");
    set.add(deaccent(ee));
    set.add(slugify(ee).replace(/\-/g, " "));
  }
  // remove empties
  return Array.from(set).filter(Boolean);
}
