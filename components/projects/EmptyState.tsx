interface EmptyStateProps {
  onClearFilters: () => void;
  hasFilters: boolean;
}

export default function EmptyState({ onClearFilters, hasFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 bg-gray-700/50 rounded-full flex items-center justify-center">
          <i className="fas fa-folder-open text-gray-400 text-2xl"></i>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-4">
          {hasFilters ? "No Projects Found" : "No Projects Available"}
        </h3>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {hasFilters 
            ? "No projects match your current search criteria. Try adjusting your filters or search terms."
            : "There are currently no projects to display. Check back later for new projects and updates."
          }
        </p>
        
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <i className="fas fa-filter"></i>
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}
