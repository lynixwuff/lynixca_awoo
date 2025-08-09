import { useState, useMemo } from 'react';

interface Project {
  id: string;
  strId: string;
  name: string;
  description?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseProjectFiltersReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  filteredProjects: Project[];
  paginatedProjects: Project[];
  totalPages: number;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
}

export function useProjectFilters(projects: Project[]): UseProjectFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        project.strId.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updatedAt':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  
  // Get projects for current page
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, itemsPerPage]);

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== '';

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSortBy('createdAt');
    setCurrentPage(1);
  };

  return {
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
  };
}
