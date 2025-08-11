import { normalizeNameVi, slugify } from "./normalize.js";
import { buildTokens } from "./tokens.js";

/**
 * Build in-memory objects from records (rows) parsed from CSV.
 * @param {Array<Object>} records - rows with schema described in README
 * @returns {{provinces:Array, districtsByProv:Object, communesByProv:Object, payload:Object}}
 */
export function generateFromRecords(records = []) {
  const provinces = [];
  const districtsByProv = {};
  const communesByProv = {};

  const ensureProvShard = (code) => {
    if (!districtsByProv[code]) districtsByProv[code] = [];
    if (!communesByProv[code]) communesByProv[code] = [];
  };

  for (const r of records) {
    const level = (r.admin_level || "").trim().toLowerCase();
    const adminType = (r.admin_type || "").trim().toLowerCase();
    const code = (r.code || "").trim();
    const parentProv = (r.parent_province_code || "").trim();
    const parentDistId = (r.parent_district_id || "").trim();
    const src = r.source || "";
    const nameVi = normalizeNameVi(r.name_vi || "");

    if (level === "province") {
      const prov = {
        id: `VN.province.${code}`,
        level: "province",
        admin_type: adminType || (nameVi.toLowerCase().startsWith("thành phố") ? "thanh_pho" : "tinh"),
        code,
        name_vi: nameVi,
        slug: slugify(nameVi),
        postal_codes: (r.postal_codes || "").split(";").filter(Boolean),
        tokens: buildTokens(nameVi),
        meta: { source: src }
      };
      provinces.push(prov);
      ensureProvShard(code);
    } else if (level === "district") {
      ensureProvShard(parentProv);
      const d = {
        id: r.id || `VN.district.${parentProv}.${slugify(nameVi)}`,
        level: "district",
        admin_type: adminType || "",
        official_code: r.official_code || "",
        name_vi: nameVi,
        slug: slugify(nameVi),
        type: adminType || "",
        parent_province_id: parentProv ? `VN.province.${parentProv}` : null,
        postal_codes: (r.postal_codes || "").split(";").filter(Boolean),
        tokens: buildTokens(nameVi),
        meta: { source: src }
      };
      districtsByProv[parentProv].push(d);
    } else if (level === "commune") {
      ensureProvShard(parentProv);
      const c = {
        id: r.id || `VN.commune.${code}`,
        level: "commune",
        admin_type: adminType || "",
        code,
        name_vi: nameVi,
        slug: slugify(nameVi),
        parent_province_id: parentProv ? `VN.province.${parentProv}` : null,
        parent_district_id: parentDistId || null,
        postal_codes: (r.postal_codes || "").split(";").filter(Boolean),
        tokens: buildTokens(nameVi),
        meta: { source: src }
      };
      communesByProv[parentProv].push(c);
    }
  }

  provinces.sort((a,b) => a.code.localeCompare(b.code));
  for (const k of Object.keys(communesByProv)) {
    communesByProv[k].sort((a,b) => (a.code||"").localeCompare(b.code||""));
  }

  const payload = {
    version: {
      label: "VN_ADMIN_2025",
      source: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/19ttg.signed.pdf",
      generated_at_utc: new Date().toISOString(),
      notes: "Generated from CSV via modular Node.js script."
    },
    provinces,
    districts_by_province: districtsByProv,
    communes_by_province: communesByProv
  };

  return { provinces, districtsByProv, communesByProv, payload };
}
