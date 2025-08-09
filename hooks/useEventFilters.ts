import { useState, useMemo, useEffect } from 'react';

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  eventType: 'CONVENTION' | 'MEETUP' | 'RAVE';
  eventStatus: 'UPCOMING' | 'ONGOING' | 'PAST' | 'CANCELLED';
  maxAttendees?: number;
  imageUrl?: string;
  panels?: any[];
}

interface UseEventFiltersReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  filteredEvents: Event[];
  paginatedEvents: Event[];
  totalPages: number;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
}

export function useEventFilters(events: Event[]): UseEventFiltersReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("startDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Helper function to get location code
  const getLocationCode = (location: string): string => {
    if (!location) return 'other';
    const loc = location.toLowerCase();
    if (loc.includes('toronto') || loc.includes('ottawa') || loc.includes('vancouver')) return 'canada';
    if (loc.includes('atlanta') || loc.includes('new york') || loc.includes('los angeles')) return 'usa';
    if (loc.includes('virtual') || loc.includes('online')) return 'virtual';
    return 'other';
  };

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    // Event type/status filter
    if (selectedFilter !== "all") {
      if (selectedFilter === "UPCOMING") {
        filtered = filtered.filter(event => 
          event.eventStatus === "UPCOMING" || event.eventStatus === "ONGOING"
        );
      } else if (selectedFilter === "PAST") {
        filtered = filtered.filter(event => event.eventStatus === "PAST");
      } else if (['CONVENTION', 'MEETUP', 'RAVE'].includes(selectedFilter)) {
        filtered = filtered.filter(event => event.eventType === selectedFilter);
      }
    }

    // Location filter
    if (selectedLocation !== "all") {
      if (selectedLocation === "virtual") {
        filtered = filtered.filter(event => 
          getLocationCode(event.location) === 'virtual'
        );
      } else if (selectedLocation === "canada") {
        filtered = filtered.filter(event => 
          getLocationCode(event.location) === 'canada'
        );
      } else if (selectedLocation === "usa") {
        filtered = filtered.filter(event => 
          getLocationCode(event.location) === 'usa'
        );
      } else {
        filtered = filtered.filter(event => 
          event.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );
      }
    }

    return filtered;
  }, [events, searchTerm, selectedFilter, selectedLocation]);

  // Sort events
  const sortedEvents = useMemo(() => {
    const sorted = [...filteredEvents];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'location':
        return sorted.sort((a, b) => a.location.localeCompare(b.location));
      case 'eventType':
        return sorted.sort((a, b) => a.eventType.localeCompare(b.eventType));
      case 'startDate':
      default:
        return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }
  }, [filteredEvents, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = sortedEvents.slice(startIndex, endIndex);

  // Check if there are active filters
  const hasActiveFilters = searchTerm !== "" || selectedFilter !== "all" || selectedLocation !== "all";

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedFilter("all");
    setSelectedLocation("all");
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter, selectedLocation]);

  return {
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    selectedLocation,
    setSelectedLocation,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filteredEvents: sortedEvents,
    paginatedEvents,
    totalPages,
    hasActiveFilters,
    clearAllFilters
  };
}
