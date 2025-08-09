interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-700/50">
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>
          Showing {startIndex + 1}-{endIndex} of {totalItems} events
        </span>
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value={6}>6 per page</option>
            <option value={12}>12 per page</option>
            <option value={18}>18 per page</option>
            <option value={24}>24 per page</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          <i className="fas fa-chevron-left text-xs"></i>
          Previous
        </button>

        {/* First page */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors"
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          Next
          <i className="fas fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>
  );
}
