'use client';

import LoaderEvents from "@/components/LoaderEvents";
import Navbar from "@/components/nav/Navbar";
import { Link } from "lucide-react";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  type: string;
  location: string;
  locationCode: string;
  date: string;
  endDate: string | null;
  time: string;
  venue: string;
  description: string;
  attendees: string;
  status: string;
  image: string;
  tags: string[];
  color: string;
  phosfurusAttending?: {
    isAttending: boolean;
    activity: 'vending' | 'raving' | 'attending';
  };
}

export default function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("date");

  const searchSuggestions = [
    "Anthrocon", "Toronto meetup", "VR Chat", "furry convention", 
    "local meetup", "virtual event", "gaming", "panels"
  ];

  // Event data structure - ready for API integration
  const eventData = {
    upcoming: [
      /*{
        id: 1,
        title: "Canfurence 2025",
        type: "convention",
        location: "Ottawa, ON",
        locationCode: "canada",
        date: "2025-08-01",
        endDate: "2026-08-05",
        time: "All Day",
        venue: "Delta Hotels Ottawa City Centre",
        description: "Canfurence is a furry convention held annually in Ottawa, Canada. Join us for a weekend of fun, panels, and community!",
        attendees: "1,000+",
        status: "upcoming",
        image: "/images/events/trilium-park.jpg",
        tags: ["furry", "event", "con", "ottawa"],
        color: "cyan",
        phosfurusAttending: {
          isAttending: true,
          activity: "vending" as const
        }
      },*/
    ],
    past: [
      /*{
        id: 5,
        title: "Furry Weekend Atlanta",
        type: "convention",
        location: "Atlanta, GA",
        locationCode: "usa",
        date: "2025-05-15",
        endDate: "2025-05-17",
        time: "All Day",
        venue: "Atlanta Airport Marriott",
        description: "Had an amazing time at FWA! Hosted 3 panels, met incredible people, and had some stellar photo shoots.",
        attendees: "17,700+",
        status: "completed",
        image: "/images/events/fwa.jpg",
        tags: ["convention", "panels", "atlanta", "photos"],
        color: "orange",
        phosfurusAttending: {
          isAttending: true,
          activity: "raving" as const
        }
      },
      {
        id: 6,
        title: "Smoke in the Smoke 7",
        type: "event",
        location: "Toronto, ON",
        locationCode: "canada",
        date: "2025-05-10",
        endDate: null,
        time: "2:00 PM",
        venue: "Science World",
        description: "Join us for an exciting event with potluck around the Toronto Olympic Island! Bring your favorite dish and enjoy a day of fun in the sun!",
        attendees: "100+",
        status: "completed",
        image: "/images/events/space-expo.jpg",
        tags: ["science", "space", "outreach", "talk"],
        color: "purple",
        phosfurusAttending: {
          isAttending: true,
        }
      }*/
    ]
  };

  // Simulate API loading
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEvents([...eventData.upcoming, ...eventData.past]);
      setIsLoading(false);
    };
    
    loadEvents();
  }, []);

  // Filter events based on search and filters
  const filteredEvents = events.filter((event: Event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || 
                         event.type === selectedFilter ||
                         (selectedFilter === "upcoming" && event.status === "upcoming") ||
                         (selectedFilter === "past" && event.status === "completed");
    
    const matchesLocation = selectedLocation === "all" ||
                           event.locationCode === selectedLocation ||
                           (selectedLocation === "toronto" && event.location.includes("Toronto")) ||
                           (selectedLocation === "vancouver" && event.location.includes("Vancouver"));
    
    return matchesSearch && matchesFilter && matchesLocation;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "name":
        return a.title.localeCompare(b.title);
      case "location":
        return a.location.localeCompare(b.location);
      case "type":
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = sortedEvents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter, selectedLocation]);

  // Pagination component
  const Pagination = () => {
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

    return (
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-700/50">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>
            Showing {startIndex + 1}-{Math.min(endIndex, sortedEvents.length)} of {sortedEvents.length} events
          </span>
          <div className="flex items-center gap-2">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
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
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                onClick={() => setCurrentPage(1)}
                className="px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors"
              >
                1
              </button>
              {getPageNumbers()[0] > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Page numbers */}
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
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
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            Next
            <i className="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    );
  };

  // Loading Skeleton Component
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
  const EventsLoader = () => (
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
  return (
    <div className="min-h-screen">
      <Navbar />


      {/* Hero Banner Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <img
          src="/images/events.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="w-full px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-0">
          <div className="mt-[73px] mx-auto max-w-2xl text-center">
            <div className="mb-6 hidden">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-4">
                <i className="fas fa-calendar-alt text-cyan-400 mr-2"></i>
                <span className="text-cyan-300 text-sm font-medium">%CON_NAME% is starting soon!</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Events
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
              Join me on my cosmic adventures! From furry conventions to intergalactic travels, check out my upcoming events and join the journey through space and time.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 hidden">
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-rocket mr-2"></i>
                <span className="text-sm">AAAAAAAAAAAAA</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-users mr-2"></i>
                <span className="text-sm">AAAAAAAAAAAAA</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-star mr-2"></i>
                <span className="text-sm">AAAAAAAAAAAAA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Content Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          
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
                      onFocus={() => setShowSearchSuggestions(false)}
                      onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Search events, conventions, meetups..."
                    />
                    
                    {/* Search Suggestions Dropdown */}
                    {showSearchSuggestions && searchTerm.length === 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10">
                        <div className="p-3 border-b border-gray-700">
                          <span className="text-gray-400 text-sm">Popular searches:</span>
                        </div>
                        <div className="p-2">
                          {searchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchTerm(suggestion);
                                setShowSearchSuggestions(false);
                              }}
                              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors flex items-center gap-2"
                            >
                              <i className="fas fa-search text-gray-500 text-sm"></i>
                              <span>{suggestion}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Type Filter */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto ">
                  <div className="min-w-[160px]">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      <option value="all">All Events</option>
                      <option value="convention">Conventions</option>
                      <option value="meetup">Local Meetups</option>
                      <option value="virtual">Virtual Events</option>
                      <option value="upcoming">Upcoming Only</option>
                      <option value="past">Past Events</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="min-w-[160px]">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      <option value="all">All Locations</option>
                      <option value="canada">Canada</option>
                      <option value="usa">United States</option>
                      <option value="virtual">Virtual/Online</option>
                      <option value="toronto">Toronto Area</option>
                      <option value="vancouver">Vancouver Area</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("all");
                    setSelectedLocation("all");
                  }}
                  className="px-6 py-3 bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap hidden"
                >
                  <i className="fas fa-times"></i>
                  Clear All
                </button>
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
                        <span>{selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}</span>
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

          {/* Results Counter */}
          <div className="mb-8 flex items-center justify-between">
            <div className="text-gray-400">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-500"></div>
                  <span>Loading events...</span>
                </div>
              ) : (
                <>
                  <span className="text-white font-medium">{sortedEvents.length} events</span> found
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
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="location">Location</option>
                <option value="type">Event Type</option>
              </select>
            </div>
          </div>
          
          {/* Quick Filter Buttons */}
          <div className="mb-8 hidden">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {setSelectedFilter("upcoming"); setSelectedLocation("all");}}
                className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-calendar-plus"></i>
                <span>Upcoming Events</span>
              </button>
              <button
                onClick={() => {setSelectedFilter("meetup"); setSelectedLocation("canada");}}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-600/30 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-map-marker-alt"></i>
                <span>Local Meetups</span>
              </button>
              <button
                onClick={() => {setSelectedFilter("virtual"); setSelectedLocation("virtual");}}
                className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-green-300 hover:bg-green-600/30 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-headset"></i>
                <span>Virtual Events</span>
              </button>
              <button
                onClick={() => {setSelectedFilter("convention"); setSelectedLocation("all");}}
                className="px-4 py-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 text-orange-300 hover:bg-orange-600/30 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-paw"></i>
                <span>Conventions</span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <EventsLoader />
          ) : (
            <>
              {/* No Results State - conditionally shown */}
              {sortedEvents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-search text-gray-500 text-2xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">No Events Found</h3>
                    <p className="text-gray-400 mb-6">
                      We couldn't find any events matching your current filters. Try adjusting your search criteria or browse all events.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedFilter("all");
                          setSelectedLocation("all");
                        }}
                        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-refresh"></i>
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Upcoming Events Section */}
                  {paginatedEvents.filter(event => event.status === "upcoming").length > 0 && (
                    <div className="mb-16">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
                        <p className="text-gray-400 text-lg">Don't miss out on these exciting upcoming adventures!</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedEvents
                          .filter(event => event.status === "upcoming")
                          .map((event) => (
                          <div key={event.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                            <div className={`relative h-48 bg-gradient-to-br ${
                              event.color === 'purple' ? 'from-purple-600 to-pink-600' :
                              event.color === 'cyan' ? 'from-cyan-600 to-blue-600' :
                              event.color === 'green' ? 'from-green-600 to-emerald-600' :
                              event.color === 'blue' ? 'from-blue-600 to-indigo-600' :
                              'from-gray-600 to-gray-700'
                            }`}>
                              <div className="absolute inset-0 bg-black/20"></div>
                              
                              {/* Phosfurus Attendance Banner */}
                              {event.phosfurusAttending?.isAttending && (
                                <div className="absolute top-2 right-2 z-10">
                                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                                    event.phosfurusAttending.activity === 'vending' 
                                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                                      : event.phosfurusAttending.activity === 'raving'
                                      ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                  } animate-pulse`}>
                                    <div className="flex items-center gap-1">
                                      <i className={`fas ${
                                        event.phosfurusAttending.activity === 'vending' 
                                          ? 'fa-store' 
                                          : event.phosfurusAttending.activity === 'raving'
                                          ? 'fa-music'
                                          : 'fa-star'
                                      }`}></i>
                                      <span>
                                        {event.phosfurusAttending.activity === 'vending' 
                                          ? 'PHOSFURUS VENDING' 
                                          : event.phosfurusAttending.activity === 'raving'
                                          ? 'PHOSFURUS RAVING'
                                          : 'PHOSFURUS ATTENDING'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="absolute top-4 left-4">
                                <div className="bg-white/90 rounded-lg px-3 py-1">
                                  <span className={`font-bold text-sm ${
                                    event.color === 'purple' ? 'text-purple-600' :
                                    event.color === 'cyan' ? 'text-cyan-600' :
                                    event.color === 'green' ? 'text-green-600' :
                                    event.color === 'blue' ? 'text-blue-600' :
                                    'text-gray-600'
                                  }`}>
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                                    {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}`}
                                  </span>
                                </div>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold text-xl mb-1">{event.title}</h3>
                                <p className="text-gray-200 text-sm">{event.location}</p>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <i className={`fas ${
                                  event.type === 'convention' ? 'fa-paw' :
                                  event.type === 'meetup' ? 'fa-users' :
                                  event.type === 'virtual' ? 'fa-gamepad' :
                                  'fa-calendar'
                                } ${
                                  event.color === 'purple' ? 'text-purple-400' :
                                  event.color === 'cyan' ? 'text-cyan-400' :
                                  event.color === 'green' ? 'text-green-400' :
                                  event.color === 'blue' ? 'text-blue-400' :
                                  'text-gray-400'
                                } mr-2`}></i>
                                <span className={`text-sm font-medium ${
                                  event.color === 'purple' ? 'text-purple-400' :
                                  event.color === 'cyan' ? 'text-cyan-400' :
                                  event.color === 'green' ? 'text-green-400' :
                                  event.color === 'blue' ? 'text-blue-400' :
                                  'text-gray-400'
                                }`}>
                                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)} Event
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm mb-4">
                                {event.description}
                              </p>
                              <div className="flex items-center text-gray-400 text-xs mb-2">
                                <i className="fas fa-calendar mr-2"></i>
                                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })} • {event.time}</span>
                              </div>
                              <div className="flex items-center text-gray-400 text-xs mb-4">
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                <span>{event.venue}</span>
                              </div>
                              <div className="flex gap-2">
                                <button className={`flex-1 ${
                                  event.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                                  event.color === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' :
                                  event.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                                  event.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                                  'bg-gray-600 hover:bg-gray-700'
                                } text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}>
                                  {event.type === 'virtual' ? 'Join Event' : 'Learn More'}
                                </button>
                                <button className={`px-4 py-2 border ${
                                  event.color === 'purple' ? 'border-purple-600 text-purple-400 hover:bg-purple-600/10' :
                                  event.color === 'cyan' ? 'border-cyan-600 text-cyan-400 hover:bg-cyan-600/10' :
                                  event.color === 'green' ? 'border-green-600 text-green-400 hover:bg-green-600/10' :
                                  event.color === 'blue' ? 'border-blue-600 text-blue-400 hover:bg-blue-600/10' :
                                  'border-gray-600 text-gray-400 hover:bg-gray-600/10'
                                } rounded-lg text-sm transition-colors`}>
                                  <i className="fas fa-heart"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Past Events Section */}
                  {paginatedEvents.filter(event => event.status === "completed").length > 0 && (
                    <div className="mb-16">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Recent Adventures</h2>
                        <p className="text-gray-400 text-lg">Check out some highlights from my recent events!</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {paginatedEvents
                          .filter(event => event.status === "completed")
                          .map((event) => (
                          <div key={event.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden">
                            <div className={`relative h-48 bg-gradient-to-br ${
                              event.color === 'orange' ? 'from-orange-600 to-red-600' :
                              event.color === 'purple' ? 'from-blue-600 to-purple-600' :
                              'from-gray-600 to-gray-700'
                            } opacity-75`}>
                              <div className="absolute inset-0 bg-black/40"></div>
                              
                              {/* Phosfurus Attendance Banner for Past Events */}
                              {event.phosfurusAttending?.isAttending && (
                                <div className="absolute top-2 right-2 z-10">
                                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                                    event.phosfurusAttending.activity === 'vending' 
                                      ? 'bg-gradient-to-r from-yellow-600/80 to-orange-600/80' 
                                      : event.phosfurusAttending.activity === 'raving'
                                      ? 'bg-gradient-to-r from-pink-600/80 to-purple-600/80'
                                      : 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80'
                                  }`}>
                                    <div className="flex items-center gap-1">
                                      <i className={`fas ${
                                        event.phosfurusAttending.activity === 'vending' 
                                          ? 'fa-store' 
                                          : event.phosfurusAttending.activity === 'raving'
                                          ? 'fa-music'
                                          : 'fa-star'
                                      }`}></i>
                                      <span>
                                        {event.phosfurusAttending.activity === 'vending' 
                                          ? 'PHOSFURUS VENDED' 
                                          : event.phosfurusAttending.activity === 'raving'
                                          ? 'PHOSFURUS RAVED'
                                          : 'PHOSFURUS ATTENDED'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="absolute top-4 left-4">
                                <div className="bg-black/60 rounded-lg px-3 py-1">
                                  <span className={`font-bold text-sm ${
                                    event.color === 'orange' ? 'text-orange-400' :
                                    event.color === 'purple' ? 'text-blue-400' :
                                    'text-gray-400'
                                  }`}>COMPLETED</span>
                                </div>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold text-xl mb-1">{event.title}</h3>
                                <p className="text-gray-200 text-sm">{event.location} • {new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <i className={`fas ${
                                  event.type === 'convention' ? 'fa-star' :
                                  event.type === 'special' ? 'fa-rocket' :
                                  'fa-calendar'
                                } ${
                                  event.color === 'orange' ? 'text-orange-400' :
                                  event.color === 'purple' ? 'text-blue-400' :
                                  'text-gray-400'
                                } mr-2`}></i>
                                <span className={`text-sm font-medium ${
                                  event.color === 'orange' ? 'text-orange-400' :
                                  event.color === 'purple' ? 'text-blue-400' :
                                  'text-gray-400'
                                }`}>
                                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm mb-4">
                                {event.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 text-xs">
                                  <i className="fas fa-users mr-1"></i>
                                  <span>{event.attendees} attendees</span>
                                </div>
                                <button className={`${
                                  event.color === 'orange' ? 'text-orange-400 hover:text-orange-300' :
                                  event.color === 'purple' ? 'text-blue-400 hover:text-blue-300' :
                                  'text-gray-400 hover:text-gray-300'
                                } text-sm transition-colors`}>
                                  {event.type === 'special' ? 'Watch Highlights' : 'View Photos'} <i className="fas fa-arrow-right ml-1"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Event Types Section */}
                  <div className="mb-16">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-white mb-4">Event Types</h2>
                      <p className="text-gray-400 text-lg">Discover the different kinds of events I attend and organize</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Convention Type */}
                      <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-calendar-week text-purple-400 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Conventions</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Multi-day furry conventions with panels, dealer dens, and community gatherings
                        </p>
                      </div>

                      {/* Meetup Type */}
                      <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-users text-cyan-400 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Local Meetups</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Casual gatherings with local furry communities for socializing and fun activities
                        </p>
                      </div>

                      {/* Virtual Type */}
                      <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-headset text-green-400 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Virtual Events</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Online meetups, VR Chat hangouts, and digital community building experiences
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col items-center space-y-4 mt-12">
                      {/* Items per page selector */}
                      <div className="flex items-center space-x-2 text-white">
                        <span>Show:</span>
                        <select 
                          value={itemsPerPage} 
                          onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                          className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
                        >
                          <option value={6}>6 events</option>
                          <option value={12}>12 events</option>
                          <option value={24}>24 events</option>
                        </select>
                      </div>

                      {/* Page navigation */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 bg-gray-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                        >
                          Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-2 rounded ${
                                currentPage === page 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-gray-800 text-white hover:bg-gray-700'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 bg-gray-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                        >
                          Next
                        </button>
                      </div>

                      {/* Page info */}
                      <div className="text-gray-400 text-sm">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} events
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="text-center bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-12 border border-cyan-500/20 mt-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Want to Meet Up?</h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                      Have an event you'd like me to attend, add or organize? I love connecting with the community and exploring new adventures together!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center">
                        <i className="fas fa-envelope mr-2"></i>
                        Get In Touch
                      </button>
                      <button className="border border-cyan-600 text-cyan-400 hover:bg-cyan-600/10 px-8 py-3 rounded-lg font-medium transition-colors flex items-center">
                        <i className="fas fa-calendar-plus mr-2"></i>
                        Suggest Event
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>



    </div>
  );
}