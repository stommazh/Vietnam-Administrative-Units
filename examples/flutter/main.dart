// Flutter snippet (pubspec.yaml -> assets: - assets/vn_admin_2025.all.json)
import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;

Future<Map<String, dynamic>> loadAllJson() async {
  final text = await rootBundle.loadString('assets/vn_admin_2025.all.json');
  return jsonDecode(text) as Map<String, dynamic>;
}

// Usage in app:
// final data = await loadAllJson();
// final provinces = data['provinces'] as List;
// print('Provinces: ${provinces.length}');
