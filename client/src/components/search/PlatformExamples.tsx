import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PlatformExamples() {
  return (
    <Tabs defaultValue="android" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
        <TabsTrigger value="android">Android</TabsTrigger>
        <TabsTrigger value="ios">iOS</TabsTrigger>
        <TabsTrigger value="web" className="hidden lg:inline-flex">Web</TabsTrigger>
      </TabsList>

      <TabsContent value="android">
        <Card className="p-6">
          <pre className="overflow-x-auto text-sm">
            {`// SearchView.kt
class SearchView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : ConstraintLayout(context, attrs) {
    
    private val binding: ViewSearchBinding = ViewSearchBinding.inflate(
        LayoutInflater.from(context), this, true
    )
    
    private var searchText: String = ""
    private var isLoading: Boolean = false
    
    init {
        setupView()
        setupAnimations()
    }
    
    private fun setupView() {
        binding.searchInput.addTextChangedListener { text ->
            searchText = text?.toString() ?: ""
            updateClearButton()
        }
        
        binding.clearButton.setOnClickListener {
            binding.searchInput.text?.clear()
        }
    }
    
    private fun setupAnimations() {
        binding.searchInput.setOnFocusChangeListener { _, hasFocus ->
            val color = if (hasFocus) 
                context.getColor(R.color.primary)
            else 
                context.getColor(R.color.surface)
                
            ObjectAnimator.ofArgb(
                binding.searchContainer,
                "backgroundColor",
                color
            ).start()
        }
    }
    
    private fun updateClearButton() {
        binding.clearButton.isVisible = searchText.isNotEmpty()
    }
    
    fun setLoading(loading: Boolean) {
        isLoading = loading
        binding.progressBar.isVisible = loading
        binding.clearButton.isVisible = !loading && searchText.isNotEmpty()
    }
}`}
          </pre>
        </Card>
      </TabsContent>

      <TabsContent value="ios">
        <Card className="p-6">
          <pre className="overflow-x-auto text-sm">
            {`// SearchField.swift
class SearchField: UIView {
    private lazy var searchBar: UISearchBar = {
        let bar = UISearchBar()
        bar.placeholder = "Search..."
        bar.delegate = self
        return bar
    }()
    
    private lazy var activityIndicator: UIActivityIndicatorView = {
        let indicator = UIActivityIndicatorView(style: .medium)
        indicator.hidesWhenStopped = true
        return indicator
    }()
    
    var onSearchTextChanged: ((String) -> Void)?
    var onSearchSubmitted: ((String) -> Void)?
    
    private var isLoading: Bool = false {
        didSet {
            updateLoadingState()
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    private func setupView() {
        addSubview(searchBar)
        searchBar.searchTextField.rightView?.addSubview(activityIndicator)
        
        // Add animations for focus state
        searchBar.searchTextField.addTarget(
            self,
            action: #selector(textFieldDidBeginEditing),
            for: .editingDidBegin
        )
    }
    
    @objc private func textFieldDidBeginEditing() {
        UIView.animate(withDuration: 0.3) {
            self.searchBar.searchTextField.backgroundColor = .systemBackground
        }
    }
    
    private func updateLoadingState() {
        if isLoading {
            activityIndicator.startAnimating()
        } else {
            activityIndicator.stopAnimating()
        }
    }
}

extension SearchField: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        onSearchTextChanged?(searchText)
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        onSearchSubmitted?(searchBar.text ?? "")
    }
}`}
          </pre>
        </Card>
      </TabsContent>

      <TabsContent value="web">
        <Card className="p-6">
          <pre className="overflow-x-auto text-sm">
            {`// React Web Implementation
import { SearchField } from './SearchField';

function SearchDemo() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async (value: string) => {
    setIsLoading(true);
    try {
      // Perform search
      await searchAPI(value);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchField
      value={query}
      onChange={setQuery}
      onSubmit={handleSearch}
      isLoading={isLoading}
      placeholder="Search items..."
    />
  );
}`}
          </pre>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
