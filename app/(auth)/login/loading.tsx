export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white/90 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800 rounded-3xl shadow-2xl p-8 animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl dark:bg-gray-700" />
              <div className="h-8 w-24 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="mb-6 space-y-2">
            <div className="h-8 w-32 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="h-4 w-64 bg-gray-100 rounded dark:bg-gray-800" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="h-4 w-12 bg-gray-200 rounded mb-2 dark:bg-gray-700" />
              <div className="h-11 w-full bg-gray-100 rounded-lg dark:bg-gray-800" />
            </div>
            <div>
              <div className="h-4 w-14 bg-gray-200 rounded mb-2 dark:bg-gray-700" />
              <div className="h-11 w-full bg-gray-100 rounded-lg dark:bg-gray-800" />
            </div>
            <div className="h-11 w-full bg-gray-200 rounded-lg dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
