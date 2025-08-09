interface EmptyStateProps {
  onClearFilters: () => void;
  hasFilters: boolean;
}

export default function EmptyState({ onClearFilters, hasFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-search text-gray-500 text-2xl"></i>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          {hasFilters ? 'No Events Found' : 'No Events Available'}
        </h3>
        <p className="text-gray-400 mb-6">
          {hasFilters 
            ? "We couldn't find any events matching your current filters. Try adjusting your search criteria or browse all events."
            : "There are currently no events available. Check back later for new adventures!"
          }
        </p>
        {hasFilters && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClearFilters}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-refresh"></i>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
