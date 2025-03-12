import { SearchExamples } from '@/components/search-examples';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Cross-Platform Search Component
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A modern, responsive search field implementation for Web, iOS, and Android
            platforms. Features smooth animations, responsive design, and consistent
            behavior.
          </p>
        </div>
        <SearchExamples />
      </div>
    </div>
  );
}
