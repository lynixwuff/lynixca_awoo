// Event Skeleton Component
const EventSkeleton = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-700/50"></div>
    <div className="p-6">
      <div className="flex items-center mb-3">
        <div className="w-4 h-4 bg-gray-600 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-600 rounded w-24"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-600 rounded w-2/3"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-600 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-600 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// Main Loading Component
export default function LoadingState() {
  return (
    <div className="space-y-16">
      {/* Upcoming Events Skeleton */}
      <div>
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-700/50 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-700/50 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <EventSkeleton key={i} />
          ))}
        </div>
      </div>
      
      {/* Past Events Skeleton */}
      <div>
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-700/50 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-700/50 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <EventSkeleton key={`past-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
