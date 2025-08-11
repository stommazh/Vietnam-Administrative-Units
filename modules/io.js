import fs from "node:fs/promises";
import path from "node:path";

export async function writeJsonPretty(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function writeShards(outDir, districtsByProv, communesByProv) {
  const distDir = path.join(outDir, "districts_by_province");
  const commDir = path.join(outDir, "communes_by_province");
  await fs.mkdir(distDir, { recursive: true });
  await fs.mkdir(commDir, { recursive: true });
  for (const [prov, arr] of Object.entries(districtsByProv)) {
    await writeJsonPretty(path.join(distDir, `${prov}.json`), arr);
  }
  for (const [prov, arr] of Object.entries(communesByProv)) {
    await writeJsonPretty(path.join(commDir, `${prov}.json`), arr);
  }
}
