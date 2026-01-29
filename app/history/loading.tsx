export default function HistoryLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            <div className="flex items-center gap-3">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div>
          <div className="h-9 w-32 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-80 mt-2 bg-gray-100 rounded animate-pulse dark:bg-gray-800" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="h-5 w-48 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              </div>
              <div className="h-4 mx-4 mb-4 bg-gray-100 rounded w-3/4 animate-pulse dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
