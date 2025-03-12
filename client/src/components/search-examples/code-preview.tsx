import { motion } from "framer-motion";

interface CodePreviewProps {
  platform: "web" | "ios" | "android";
}

export function CodePreview({ platform }: CodePreviewProps) {
  const getCode = () => {
    switch (platform) {
      case "web":
        return `// React Component
const SearchField = ({
  onSearch,
  placeholder = 'Search...',
}) => {
  const [value, setValue] = useState('');
  const debounceTimer = useRef();

  const handleSearch = useCallback((searchValue) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onSearch?.(searchValue);
    }, 300);
  }, [onSearch]);

  return (
    <motion.div
      className="flex items-center rounded-lg border"
      animate={{ width: isFocused ? '100%' : '240px' }}
    >
      <Search className="ml-3 h-5 w-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 px-3 py-2 outline-none"
      />
    </motion.div>
  );
};`;
      case "ios":
        return `// SwiftUI Component
struct SearchField: View {
    @Binding var text: String
    @State private var isFocused: Bool = false
    var onSearch: ((String) -> Void)?
    
    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(isFocused ? .blue : .gray)
            
            TextField("Search...", text: $text)
                .textFieldStyle(PlainTextFieldStyle())
                .onChange(of: text) { newValue in
                    debounceSearch(text: newValue)
                }
        }
        .frame(height: 44)
        .background(Color(.systemBackground))
        .cornerRadius(8)
    }
}`;
      case "android":
        return `// Kotlin Android Component
class SearchField @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : FrameLayout(context, attrs) {
    private var searchJob: Job? = null
    
    init {
        initializeView()
        setupListeners()
    }
    
    private fun setupListeners() {
        searchInput.doAfterTextChanged { text ->
            searchJob?.cancel()
            searchJob = MainScope().launch {
                delay(300)
                onSearch?.invoke(text?.toString() ?: "")
            }
        }
    }
}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-hidden rounded-lg bg-gray-900 p-4" // code preview container
    >
      <pre className="overflow-x-auto">
        <code className="text-sm text-gray-100">{getCode()}</code>
      </pre>
    </motion.div>
  );
}
