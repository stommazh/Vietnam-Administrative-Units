// Android Kotlin snippet (place data JSON under app/src/main/assets/)
import android.content.Context
import org.json.JSONObject
import java.nio.charset.Charset

fun loadAllJson(context: Context): JSONObject {
    val input = context.assets.open("vn_admin_2025.all.json")
    val text = input.readBytes().toString(Charset.forName("UTF-8"))
    return JSONObject(text)
}

// Usage in Activity/Fragment:
// val data = loadAllJson(requireContext())
// val provinces = data.getJSONArray("provinces")
// println("Provinces: ${provinces.length()}")
