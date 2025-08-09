import { useState, useRef, useEffect } from 'react';

interface EventFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  isLoading: boolean;
  resultsCount: number;
  currentPage: number;
  totalPages: number;
}

export default function EventFilters({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
  isLoading,
  resultsCount,
  currentPage,
  totalPages
}: EventFiltersProps) {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "CONVENTION", label: "Conventions" },
    { value: "MEETUP", label: "Local Meetups" },
    { value: "RAVE", label: "Raves" },
    { value: "UPCOMING", label: "Upcoming Only" },
    { value: "PAST", label: "Past Events" }
  ];

  const sortOptions = [
    { value: "startDate", label: "Date" },
    { value: "name", label: "Name" },
    { value: "location", label: "Location" },
    { value: "eventType", label: "Event Type" }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSuggestions = [
    "Anthrocon", "Toronto meetup", "VR Chat", "furry convention", 
    "local meetup", "virtual event", "gaming", "panels"
  ];

  return (
    <>
      {/* Search and Filters Section */}
      <div className="mb-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            
            {/* Search Bar */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Search events, conventions, meetups..."
                />
              </div>
            </div>

            {/* Event Type Filter */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="min-w-[160px] relative z-[1000]" ref={filterDropdownRef}>
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="w-full px-3 py-2 pr-8 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer text-left"
                >
                  {filterOptions.find(option => option.value === selectedFilter)?.label || "All Events"}
                </button>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <i className={`fas fa-chevron-down text-gray-400 text-sm transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`}></i>
                </div>
                
                {/* Custom Dropdown List */}
                {isFilterDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl overflow-hidden" style={{ zIndex: 99999 }}>
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedFilter(option.value);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-700 transition-colors ${
                          selectedFilter === option.value 
                            ? 'bg-cyan-600/20 text-cyan-300' 
                            : 'text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedFilter !== "all" || selectedLocation !== "all") && (
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-gray-400 text-sm">Active filters:</span>
                
                {searchTerm && (
                  <div className="flex items-center gap-1 bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-search text-xs"></i>
                    <span>"{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:text-cyan-100 transition-colors"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                )}
                
                {selectedFilter !== "all" && (
                  <div className="flex items-center gap-1 bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-filter text-xs"></i>
                    <span>{selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1).toLowerCase()}</span>
                    <button
                      onClick={() => setSelectedFilter("all")}
                      className="ml-1 hover:text-purple-100 transition-colors"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                )}
                
                {selectedLocation !== "all" && (
                  <div className="flex items-center gap-1 bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-map-marker-alt text-xs"></i>
                    <span>{selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1)}</span>
                    <button
                      onClick={() => setSelectedLocation("all")}
                      className="ml-1 hover:text-green-100 transition-colors"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Counter and Sort */}
      <div className="mb-8 flex items-center justify-between">
        <div className="text-gray-400">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-500"></div>
              <span>Loading events...</span>
            </div>
          ) : (
            <>
              <span className="text-white font-medium">{resultsCount} events</span> found
              {totalPages > 1 && (
                <span className="ml-2 text-gray-500">
                  • Page {currentPage} of {totalPages}
                </span>
              )}
              {(searchTerm || selectedFilter !== "all" || selectedLocation !== "all") && (
                <span className="ml-2 text-cyan-400">
                  • Filtered results
                </span>
              )}
            </>
          )}
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Sort by:</span>
          <div className="relative z-[10]" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="px-3 py-2 pr-8 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer text-left min-w-[120px]"
            >
              {sortOptions.find(option => option.value === sortBy)?.label || "Date"}
            </button>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`}></i>
            </div>
            
            {/* Custom Sort Dropdown List */}
            {isSortDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-[50] overflow-hidden min-w-[120px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-700 transition-colors ${
                      sortBy === option.value 
                        ? 'bg-cyan-600/20 text-cyan-300' 
                        : 'text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
