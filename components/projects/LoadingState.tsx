export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden animate-pulse"
        >
          <div className="p-6">
            {/* Header skeleton */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
              </div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>

            {/* Footer skeleton */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                <div className="h-3 bg-gray-700 rounded w-20"></div>
              </div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
