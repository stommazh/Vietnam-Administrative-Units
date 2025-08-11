// Node.js example
import { readFile } from 'node:fs/promises';

const provinces = JSON.parse(await readFile(new URL('../../data/generated/provinces.json', import.meta.url)));
console.log('Provinces:', provinces.length);

const all = JSON.parse(await readFile(new URL('../../data/generated/vn_admin_2025.all.json', import.meta.url)));
console.log('Keys:', Object.keys(all));
