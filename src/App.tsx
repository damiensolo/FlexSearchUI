```typescript
import React, { useState } from 'react';
import { SearchField } from './components/search-field/SearchField';
import { motion } from 'framer-motion';

function App() {
  const [searchResults, setSearchResults] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchResults(`Searching for: ${value}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              Cross-Platform Search Component
            </h1>
            <p className="mb-8 text-gray-600">
              A modern, responsive search field with animations and cross-platform
              implementations. Try resizing the window to see the responsive
              behavior.
            </p>
            
            <div className="space-y-4">
              <SearchField
                onSearch={handleSearch}
                placeholder="Search anything..."
                className="w-full transition-all duration-300 sm:w-auto"
              />
              
              {searchResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-gray-600"
                >
                  {searchResults}
                </motion.div>
              )}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Features
              </h2>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>Responsive design</li>
                <li>Smooth animations</li>
                <li>Debounced search</li>
                <li>Clear button</li>
                <li>Focus states</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Platform Support
              </h2>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>React Web</li>
                <li>iOS (Swift)</li>
                <li>Android (Kotlin)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
```
