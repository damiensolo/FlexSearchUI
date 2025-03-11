import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Documentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SearchField Component API</CardTitle>
          <CardDescription>
            Available props and customization options for the SearchField component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Props</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><code>placeholder?: string</code> - Custom placeholder text</li>
                <li><code>value?: string</code> - Controlled input value</li>
                <li><code>onChange?: (value: string) {'->'} void</code> - Change handler</li>
                <li><code>onSubmit?: (value: string) {'->'} void</code> - Submit handler</li>
                <li><code>isLoading?: boolean</code> - Show loading indicator</li>
                <li><code>className?: string</code> - Additional CSS classes</li>
                <li><code>error?: string</code> - Error message to display</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Smooth focus/blur animations</li>
                <li>Loading state indicator</li>
                <li>Clear button when input has value</li>
                <li>Error state handling</li>
                <li>Fully responsive design</li>
                <li>Keyboard accessible</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Usage Example</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm">
                {`<SearchField
  value={searchQuery}
  onChange={setSearchQuery}
  onSubmit={handleSearch}
  isLoading={isSearching}
  placeholder="Search items..."
  error={searchError}
/>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}