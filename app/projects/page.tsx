'use client';

import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsFilters from '@/components/projects/ProjectsFilters';
import LoadingState from '@/components/projects/LoadingState';
import ErrorState from '@/components/projects/ErrorState';
import EmptyState from '@/components/projects/EmptyState';
import Pagination from '@/components/projects/Pagination';
import { useProjects } from '@/hooks/useProjects';
import { useProjectFilters } from '@/hooks/useProjectFilters';

export default function Projects() {
  // API data fetching
  const { projects, isLoading, error, refetch } = useProjects();
  
  // Filtering and pagination logic
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filteredProjects,
    paginatedProjects,
    totalPages,
    hasActiveFilters,
    clearAllFilters
  } = useProjectFilters(projects);

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <img
          src="/images/projects.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="w-full px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-0">
          <div className="mt-[73px] mx-auto max-w-2xl text-center">
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Projects
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
              Explore my creative endeavors and technical projects! From software development to creative experiments, discover the things I've been working on.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Content Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Filters */}
          <ProjectsFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isLoading={isLoading}
            resultsCount={filteredProjects.length}
            currentPage={currentPage}
            totalPages={totalPages}
          />

          {/* Content States */}
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={handleRetry} />
          ) : filteredProjects.length === 0 ? (
            <EmptyState 
              onClearFilters={clearAllFilters} 
              hasFilters={hasActiveFilters}
            />
          ) : (
            <>
              <ProjectsGrid projects={paginatedProjects} />
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredProjects.length}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
