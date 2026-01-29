export default function AppLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-14 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 space-y-3">
          <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-96 max-w-full mx-auto bg-gray-100 rounded animate-pulse dark:bg-gray-800" />
        </div>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse dark:bg-gray-700" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse dark:bg-gray-700" />
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              </div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse dark:bg-gray-800" />
                <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse dark:bg-gray-800" />
                <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
