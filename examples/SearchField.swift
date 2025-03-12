```swift
// iOS Swift Implementation Example
import SwiftUI
import Combine

struct SearchField: View {
    @Binding var text: String
    @State private var isFocused: Bool = false
    var placeholder: String = "Search..."
    var onSearch: ((String) -> Void)?
    
    @State private var searchTask: DispatchWorkItem?
    private let debounceTime: TimeInterval = 0.3
    
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "magnifyingglass")
                .foregroundColor(isFocused ? .blue : .gray)
                .padding(.leading, 8)
            
            TextField(placeholder, text: $text)
                .textFieldStyle(PlainTextFieldStyle())
                .onChange(of: text) { newValue in
                    debounceSearch(text: newValue)
                }
                .onTapGesture {
                    withAnimation(.spring()) {
                        isFocused = true
                    }
                }
            
            if !text.isEmpty {
                Button(action: {
                    text = ""
                    onSearch?("")
                }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.gray)
                        .transition(.scale)
                }
                .padding(.trailing, 8)
            }
        }
        .frame(height: 44)
        .background(Color(.systemBackground))
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(isFocused ? Color.blue : Color.gray.opacity(0.3), lineWidth: isFocused ? 2 : 1)
        )
        .shadow(color: Color.black.opacity(0.05), radius: 2, x: 0, y: 1)
        .animation(.easeInOut(duration: 0.2), value: isFocused)
    }
    
    private func debounceSearch(text: String) {
        searchTask?.cancel()
        
        let task = DispatchWorkItem {
            onSearch?(text)
        }
        searchTask = task
        
        DispatchQueue.main.asyncAfter(deadline: .now() + debounceTime, execute: task)
    }
}

// Preview
struct SearchField_Previews: PreviewProvider {
    static var previews: some View {
        SearchField(text: .constant(""), onSearch: { _ in })
            .padding()
            .previewLayout(.sizeThatFits)
    }
}
```
