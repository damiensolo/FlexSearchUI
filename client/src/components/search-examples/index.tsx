import { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchField } from '../search-field/SearchField';
import { MobilePreview } from './mobile-preview';
import { CodePreview } from './code-preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SearchExamples() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('web');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white p-6 shadow-lg md:p-20">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Live Demo</h2>
        <div className="space-y-4">
          <SearchField
            onSearch={handleSearch}
            placeholder="Try searching something..."
            className="w-full transition-all duration-300 sm:w-auto"
          />
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600" // Styling for the search results
            >
              Searching for: {searchQuery}
            </motion.div>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-gray-2000 p-6 shadow-lg md:p-8"> 
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Platform Implementations
            </h2>
            <TabsList>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="ios">iOS</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="web" className="mt-0">
            <div className="space-y-4">
              <p className="text-gray-600">
                React implementation using Tailwind CSS and Framer Motion for animations.
              </p>
              <CodePreview platform="web" />
            </div>
          </TabsContent>

          <TabsContent value="ios" className="mt-0">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Native iOS implementation using SwiftUI with smooth animations and
                  state management.
                </p>
                <CodePreview platform="ios" />
              </div>
              <MobilePreview platform="ios" />
            </div>
          </TabsContent>

          <TabsContent value="android" className="mt-0">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Native Android implementation using Kotlin with Material Design
                  components.
                </p>
                <CodePreview platform="android" />
              </div>
              <MobilePreview platform="android" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
