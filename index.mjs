// Usage: node index.mjs <input_csv> <output_dir>
import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { writeJsonPretty, writeShards } from "./modules/io.js";
import { generateFromRecords } from "./modules/generator.js";

const [,, INPUT, OUTDIR] = process.argv;
if (!INPUT || !OUTDIR) {
  console.error("Usage: node index.mjs <input_csv> <output_dir>");
  process.exit(1);
}

const csvText = await fs.readFile(INPUT, "utf8");
const records = parse(csvText, { columns: true, skip_empty_lines: true });

const { provinces, districtsByProv, communesByProv, payload } = generateFromRecords(records);

await fs.mkdir(OUTDIR, { recursive: true });
await writeJsonPretty(path.join(OUTDIR, "provinces.json"), provinces);
await writeShards(OUTDIR, districtsByProv, communesByProv);
await writeJsonPretty(path.join(OUTDIR, "vn_admin_2025.all.json"), payload);

console.log("Done. Wrote JSON to:", OUTDIR);
