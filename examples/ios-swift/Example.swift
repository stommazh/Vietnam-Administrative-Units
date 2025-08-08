// iOS Swift snippet (add vn_admin_2025.all.json to Bundle resources)
import Foundation

func loadAllJson() -> [String: Any]? {
    if let url = Bundle.main.url(forResource: "vn_admin_2025.all", withExtension: "json"),
       let data = try? Data(contentsOf: url) {
        return (try? JSONSerialization.jsonObject(with: data)) as? [String: Any]
    }
    return nil
}

// Usage:
// if let data = loadAllJson() {
//   if let provinces = data["provinces"] as? [[String: Any]] {
//     print("Provinces:", provinces.count)
//   }
// }
