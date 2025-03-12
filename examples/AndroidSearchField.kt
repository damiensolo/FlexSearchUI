```kotlin
// Android Native Implementation Example
import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.EditText
import android.widget.FrameLayout
import android.widget.ImageView
import androidx.core.widget.doAfterTextChanged
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class SearchField @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    private var searchJob: Job? = null
    private val searchDebounceMs = 300L
    private lateinit var searchIcon: ImageView
    private lateinit var clearIcon: ImageView
    private lateinit var searchInput: EditText

    var onSearch: ((String) -> Unit)? = null

    init {
        initializeView()
        setupListeners()
    }

    private fun initializeView() {
        // Inflate layout
        LayoutInflater.from(context).inflate(R.layout.search_field, this, true)
        
        // Initialize views
        searchIcon = findViewById(R.id.searchIcon)
        clearIcon = findViewById(R.id.clearIcon)
        searchInput = findViewById(R.id.searchInput)

        // Initial state
        clearIcon.visibility = View.GONE
    }

    private fun setupListeners() {
        searchInput.doAfterTextChanged { text ->
            // Show/hide clear button
            clearIcon.visibility = if (text?.isNotEmpty() == true) View.VISIBLE else View.GONE

            // Debounce search
            searchJob?.cancel()
            searchJob = MainScope().launch {
                delay(searchDebounceMs)
                onSearch?.invoke(text?.toString() ?: "")
            }
        }

        clearIcon.setOnClickListener {
            searchInput.setText("")
            onSearch?.invoke("")
        }

        searchInput.setOnFocusChangeListener { _, hasFocus ->
            if (hasFocus) {
                searchIcon.setColorFilter(context.getColor(R.color.blue_500))
                animate().scaleX(1.05f).scaleY(1.05f)
                    .setDuration(200)
                    .start()
            } else {
                searchIcon.setColorFilter(context.getColor(R.color.gray_400))
                animate().scaleX(1f).scaleY(1f)
                    .setDuration(200)
                    .start()
            }
        }
    }
}
```
