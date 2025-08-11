# Python example
import json, pathlib

base = pathlib.Path(__file__).resolve().parents[1] / 'data/generated'
with open(base / 'vn_admin_2025.all.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('Provinces:', len(data['provinces']))
print('Commune shards:', len(data['communes_by_province']))
print('District shards:', len(data['districts_by_province']))

# Simple lookup (no-accent search) for a province by name_vi
def deaccent(s:str)->str:
    import unicodedata
    return ''.join(c for c in unicodedata.normalize('NFD', s.lower().replace('đ','d')) if unicodedata.category(c) != 'Mn')

q = 'ha noi'
hits = [p for p in data['provinces'] if any(q in t for t in p.get('tokens',[]))]
print('Search hits:', [h['name_vi'] for h in hits])
