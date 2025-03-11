import { useState } from "react";
import { SearchField } from "@/components/search/SearchField";
import { PlatformExamples } from "@/components/search/PlatformExamples";
import { Documentation } from "@/components/search/Documentation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SearchDemo() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSearch = async (value: string) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!value.trim()) {
        throw new Error("Please enter a search term");
      }
      
      // Search successful
      console.log("Searching for:", value);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Cross-Platform Search Component
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern, responsive search field component with smooth animations and cross-platform implementation examples
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-2xl mx-auto">
            <SearchField
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              isLoading={isLoading}
              error={error}
              placeholder="Try searching for something..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <PlatformExamples />
        </CardContent>
      </Card>

      <Documentation />
    </div>
  );
}
