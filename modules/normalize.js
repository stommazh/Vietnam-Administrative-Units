// Normalize Vietnamese names: remove special chars (keep letters with diacritics, digits, spaces), collapse spaces
export function normalizeNameVi(raw = "") {
  const s = (raw || "").normalize("NFC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s;
}
export function deaccent(str = "") {
  // remove Vietnamese diacritics but keep base letters + digits + spaces
  return str
    .normalize("NFD")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
export function slugify(str = "") {
  const no = deaccent(str);
  return no
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");
}
