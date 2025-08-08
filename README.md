# Đơn vị hành chính Việt Nam - Vietnam Administrative Units (updated 7/2025)

#### Generated: 2025-08-08T09:17:52.378085Z

> 🤖 **Developer Note**: This dataset was generated with AI assistance. While we've made every effort to ensure accuracy, please validate the data against official sources before using in production applications. Community contributions and error reports are highly appreciated!

**🇻🇳 [Tiếng Việt](#tiếng-việt) | 🇬🇧 [English](#english)**

---

## Tiếng Việt

> 🤖 **Lưu ý cho Developer**: Bộ dữ liệu này được tạo ra với sự hỗ trợ của AI. Mặc dù mình đã cố gắng đảm bảo độ chính xác, vui lòng kiểm tra dữ liệu với nguồn chính thức trước khi sử dụng trong ứng dụng thực tế. Rất hoan nghênh các đóng góp và báo lỗi!

Bộ dữ liệu **đơn vị hành chính Việt Nam sau sắp xếp 2025**, chuẩn hoá để dùng đa nền tảng (Web/Mobile), kèm ví dụ tích hợp.

### Đặc điểm
- **Cấu trúc 3 tầng**: Tỉnh/Thành → Huyện/Quận/Thị xã/TP trực thuộc → Xã/Phường/Thị trấn.
- **ID ổn định**:
  - Tỉnh: `VN.province.<code2>` (ví dụ: `VN.province.01`)
  - Huyện (ID **synthetic**): `VN.district.<prov_code>.<slug>` (ví dụ: `VN.district.01.hoan-kiem`)
  - Xã: `VN.commune.<code5>` (ví dụ: `VN.commune.00004`)
- **Search-friendly**: có `tokens` (không dấu + slug), phù hợp cho Elasticsearch/Meilisearch.
- **Định dạng JSON** với 2 phiên bản **“all-in-one”**, và **chia nhỏ theo tỉnh**.

### Nguồn dữ liệu
- Văn bản gốc: **19/2025/QĐ-TTg** – Bảng danh mục và mã số các đơn vị hành chính Việt Nam (hiệu lực 01/07/2025).  
  **URL**: https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/19ttg.signed.pdf

> Lưu ý: quyết định trên **ban hành mã cấp tỉnh (Phụ lục I) và cấp xã (Phụ lục II)**. Mã cấp **huyện** chưa có bảng mã tập trung; trong dataset này, ID huyện dùng dạng **synthetic ổn định** như trên. Khi cơ quan có thẩm quyền công bố mã huyện chính thức, có thể bổ sung vào trường `official_code` (không phá vỡ ID).
> Do file văn bản là hình ảnh, dữ liệu được đọc thủ công bằng mã và **CÓ THỂ BỊ SAI SÓT**.

### Trạng thái dữ liệu
- `name_vi` **Không gồm prefix** (ví dụ: “Thành phố Hà Nội” → “Hà Nội”, “Quận Hoàn Kiếm” → “Hoàn Kiếm”, “Phường Tràng Tiền” → “Tràng Tiền”).
- `postal_codes`: để trống, chờ cập nhật sau sắp xếp.
- Một số heading cấp huyện trong PDF có thể bị vỡ text → có thể còn `parent_district_id: null` ở vài xã. Sẽ cập nhật khi có nguồn text sạch hơn.

### Thư mục
```
.
├─ data/
│  ├─ vn_admin_2025.all.json
│  ├─ provinces.json
│  ├─ districts_by_province/
│  └─ communes_by_province/
├─ examples/
│  ├─ web-vanilla/ (index.html)
│  ├─ node/ (index.mjs)
│  ├─ python/ (example.py)
│  ├─ android-kotlin/ (Example.kt)
│  ├─ ios-swift/ (Example.swift)
│  └─ flutter/ (main.dart)
├─ scripts/
│  └─ parse_annex_pdf_to_json.py
├─ schema.json
└─ .gitignore
```

### Cài đặt & sử dụng

#### Cách 1: Dùng “all-in-one”
- Ưu tiên khi muốn **nhúng 1 biến** (SSR/CSR, mobile offline).
- File: `data/vn_admin_2025.all.json`

**Node.js (ESM):**
```bash
node examples/node/index.mjs
```

**Python:**
```bash
python examples/python/example.py
```

**Web (vanilla):**
Trong thư mục repo, chạy:
```bash
npx serve .

```
mở http://localhost:3000/examples/web-vanilla/
#### Cách 2: Dùng bản chia nhỏ (lazy-load)
- Đọc `data/provinces.json` cho dropdown tỉnh.
- Khi chọn 1 tỉnh `code`, tải:
  - `data/districts_by_province/<code>.json`
  - `data/communes_by_province/<code>.json`

### Schema rút gọn
- **Province**: `id, level, code, name_vi, slug, postal_codes[], tokens[], meta.source`
- **District (synthetic)**: `id, level, official_code|null, name_vi, slug, type|null, parent_province_id, postal_codes[], tokens[], meta.source`
- **Commune**: `id, level, code, name_vi, slug, parent_province_id, parent_district_id|null, postal_codes[], tokens[], meta.source`

### Tìm kiếm không dấu
- Dùng `tokens` (đã chuẩn hoá không dấu). Ví dụ (JS): `p.tokens.some(t => t.includes(q))` với `q` đã bỏ dấu/lowercase.

### Update dữ liệu
- `scripts/parse_annex_pdf_to_json.py`: bóc Phụ lục II từ PDF cập nhật `communes_by_province/*.json` và gộp lại `all.json`.
- Nếu có file dữ liệu chính thức cho huyện/xã, có thể viết script bổ sung để map `parent_district_id` chuẩn xác.

### Đóng góp
- PR welcome: bổ sung huyện còn thiếu, bổ sung `official_code` khi có.
- Vui lòng dẫn nguồn khi sử dụng lại dataset.

---

## English

**Vietnamese Administrative Units Dataset (Post-2025 Reorganization)** - Standardized for cross-platform use (Web/Mobile) with integration examples.

### Features
- **3-tier structure**: Province/City → District/County/Town/City under Province → Ward/Commune/Town.
- **Stable IDs**:
  - Province: `VN.province.<code2>` (e.g., `VN.province.01`)
  - District (**synthetic** ID): `VN.district.<prov_code>.<slug>` (e.g., `VN.district.01.hoan-kiem`)
  - Commune: `VN.commune.<code5>` (e.g., `VN.commune.00004`)
- **Search-friendly**: includes `tokens` (diacritics-free + slug), suitable for Elasticsearch/Meilisearch.
- **JSON format** with 2 versions: **"all-in-one"** and **split by province**.

### Data Source
- Original document: **Decision 19/2025/QĐ-TTg** – List and codes of Vietnamese administrative units (effective July 1, 2025).  
  **Official URL**: https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/19ttg.signed.pdf

> Note: The above decision **publishes codes for province level (Annex I) and commune level (Annex II)**. **District** level codes don't have a centralized code table yet; in this dataset, district IDs use **stable synthetic** format as above. When authorities publish official district codes, they can be added to the `official_code` field (without breaking existing IDs).
> Since the document file is in image format, data was manually scanned using scripts and **may contain errors**.

### Data Status
- `name_vi` **Excludes prefixes** (e.g., "Thành phố Hà Nội" → "Hà Nội", "Quận Hoàn Kiếm" → "Hoàn Kiếm", "Phường Tràng Tiền" → "Tràng Tiền").
- `postal_codes`: left empty, awaiting updates after reorganization.
- Some district-level headings in the PDF may have broken text → some communes may still have `parent_district_id: null`. Will be updated when cleaner text sources are available.

### Directory Structure
```
.
├─ data/
│  ├─ vn_admin_2025.all.json
│  ├─ provinces.json
│  ├─ districts_by_province/
│  └─ communes_by_province/
├─ examples/
│  ├─ web-vanilla/ (index.html)
│  ├─ node/ (index.mjs)
│  ├─ python/ (example.py)
│  ├─ android-kotlin/ (Example.kt)
│  ├─ ios-swift/ (Example.swift)
│  └─ flutter/ (main.dart)
├─ scripts/
│  └─ parse_annex_pdf_to_json.py
├─ schema.json
└─ .gitignore
```

### Installation & Usage

#### Method 1: Using "all-in-one"
- Preferred when you want to **embed as single variable** (SSR/CSR, mobile offline).
- File: `data/vn_admin_2025.all.json`

**Node.js (ESM):**
```bash
node examples/node/index.mjs
```

**Python:**
```bash
python examples/python/example.py
```

**Web (vanilla):**
```bash
# in repo directory:
npx serve .   # or python -m http.server
# open http://localhost:3000/examples/web-vanilla/
```

#### Method 2: Using split files (lazy-load)
- Read `data/provinces.json` for province dropdown.
- When selecting a province `code`, load:
  - `data/districts_by_province/<code>.json`
  - `data/communes_by_province/<code>.json`

### Simplified Schema
- **Province**: `id, level, code, name_vi, slug, postal_codes[], tokens[], meta.source`
- **District (synthetic)**: `id, level, official_code|null, name_vi, slug, type|null, parent_province_id, postal_codes[], tokens[], meta.source`
- **Commune**: `id, level, code, name_vi, slug, parent_province_id, parent_district_id|null, postal_codes[], tokens[], meta.source`

### Diacritics-free Search
- Use `tokens` (normalized without diacritics). Example (JS): `p.tokens.some(t => t.includes(q))` where `q` is already diacritics-free/lowercase.

### Data Updates
- `scripts/parse_annex_pdf_to_json.py`: extracts Annex II from PDF to regenerate `communes_by_province/*.json` and merge into `all.json`.
- If official Excel files for districts/communes become available, additional scripts can be written to accurately map `parent_district_id`.

### Contributing
- PRs welcome: add missing districts, add `official_code` when available.
- Please cite the source when reusing this dataset.

---
