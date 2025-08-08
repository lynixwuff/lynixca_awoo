'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import StatCard from '@/components/admin/StatCard';
import EventModal from '@/components/admin/EventModal';
import PhotoUploadModal from '@/components/admin/PhotoUploadModal';
import GalleryGrid from '@/components/admin/GalleryGrid';

interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  totalFlightTracked: number;
  apiCalls: number;
  websiteViews: number;
  totalPhotos: number;
  publicPhotos: number;
}

interface Event {
  id: number;
  title: string;
  type: string;
  location: string;
  locationCode: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  description: string;
  attendees: string;
  status: string;
  image: string;
  tags: string[];
  color: string;
}

interface Photo {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  uploadDate: string;
  isPublic: boolean;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // Modals
  const [showEventModal, setShowEventModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Data
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    totalFlightTracked: 0,
    apiCalls: 0,
    websiteViews: 0,
    totalPhotos: 0,
    publicPhotos: 0
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Mock data
  useEffect(() => {
    if (isAuthenticated) {
      // Simulate loading stats
      setStats({
        totalEvents: 12,
        upcomingEvents: 3,
        completedEvents: 9,
        totalFlightTracked: 156,
        apiCalls: 2340,
        websiteViews: 5670,
        totalPhotos: 671,
        publicPhotos: 32
      });

      // Mock events
      setEvents([
        {
          id: 1,
          title: "Furnal Equinox 2026",
          type: "convention",
          location: "Toronto, ON",
          locationCode: "canada",
          date: "2026-03-20",
          endDate: "2026-03-22",
          time: "All Day",
          venue: "Westin Harbour Castle",
          description: "Join me at Canada's premier furry convention! I'll be hosting panels on space exploration, cosmic adventures, and interstellar travel.",
          attendees: "15,000+",
          status: "upcoming",
          image: "/images/events/anthrocon.jpg",
          tags: ["furry", "convention", "panels", "dealers"],
          color: "purple"
        },
        {
          id: 2,
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
          color: "orange"
        }
      ]);

      // Mock photos
      setPhotos([
        {
          id: 1,
          url: "/images/profile.jpg",
          title: "Convention Portrait",
          description: "Professional fursuit photo from Anthrocon",
          category: "convention",
          tags: ["fursuit", "portrait", "anthrocon"],
          uploadDate: "2025-07-20",
          isPublic: true
        },
        {
          id: 2,
          url: "/images/bg.jpg",
          title: "Space Background",
          description: "Cosmic space theme background",
          category: "space",
          tags: ["space", "background", "cosmic"],
          uploadDate: "2025-07-19",
          isPublic: true
        }
      ]);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === 'lynix2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setActiveTab('dashboard');
  };

  const handleSaveEvent = async (eventData: Partial<Event>) => {
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...eventData } : e));
    } else {
      // Create new event
      const newEvent: Event = {
        id: Math.max(...events.map(e => e.id), 0) + 1,
        image: "/images/events/default.jpg",
        ...eventData as Event
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setEditingEvent(null);
    // Update stats
    const upcoming = events.filter(e => e.status === 'upcoming').length;
    const completed = events.filter(e => e.status === 'completed').length;
    setStats(prev => ({
      ...prev,
      totalEvents: events.length + 1,
      upcomingEvents: upcoming,
      completedEvents: completed
    }));
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
      setStats(prev => ({
        ...prev,
        totalEvents: prev.totalEvents - 1
      }));
    }
  };

  const handlePhotoUpload = async (files: File[], metadata: any) => {
    // Simulate photo upload
    const newPhotos = files.map((file, index) => ({
      id: Math.max(...photos.map(p => p.id), 0) + index + 1,
      url: URL.createObjectURL(file),
      title: metadata.title || file.name,
      description: metadata.description || '',
      category: metadata.category,
      tags: metadata.tags.split(',').map((tag: string) => tag.trim()),
      uploadDate: new Date().toISOString().split('T')[0],
      isPublic: metadata.isPublic
    }));

    setPhotos(prev => [...prev, ...newPhotos]);
    setStats(prev => ({
      ...prev,
      totalPhotos: prev.totalPhotos + files.length,
      publicPhotos: prev.publicPhotos + (metadata.isPublic ? files.length : 0)
    }));
  };

  const handleDeletePhoto = (id: number) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      const photo = photos.find(p => p.id === id);
      setPhotos(prev => prev.filter(p => p.id !== id));
      setStats(prev => ({
        ...prev,
        totalPhotos: prev.totalPhotos - 1,
        publicPhotos: prev.publicPhotos - (photo?.isPublic ? 1 : 0)
      }));
    }
  };

  const handleTogglePhotoPublic = (id: number, isPublic: boolean) => {
    setPhotos(prev => prev.map(p =>
      p.id === id ? { ...p, isPublic } : p
    ));
    const currentPhoto = photos.find(p => p.id === id);
    if (currentPhoto) {
      setStats(prev => ({
        ...prev,
        publicPhotos: prev.publicPhotos + (isPublic ? 1 : -1)
      }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-rocket text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Lynix Admin</h1>
            <p className="text-gray-400">Secure dashboard access</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-in-alt"></i>
              Access Dashboard
            </button>
            <div className="text-center text-xs text-gray-500 mt-4">
              Demo: lynix2025
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        <div className="p-6 min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                  {activeTab === 'dashboard' && 'Dashboard Overview'}
                  {activeTab === 'events' && 'Event Management'}
                  {activeTab === 'gallery' && 'Photo Gallery'}
                  {activeTab === 'flights' && 'Flight Tracker'}
                  {activeTab === 'analytics' && 'Analytics'}
                  {activeTab === 'content' && 'Content Management'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
                <p className="text-gray-400 text-lg">
                  {activeTab === 'dashboard' && 'Monitor your website performance and activity'}
                  {activeTab === 'events' && 'Create and manage events, conventions, and meetups'}
                  {activeTab === 'gallery' && 'Upload and organize your photo collections'}
                  {activeTab === 'flights' && 'Monitor flight tracking API and usage'}
                  {activeTab === 'analytics' && 'View detailed website and user analytics'}
                  {activeTab === 'content' && 'Manage website content and pages'}
                  {activeTab === 'settings' && 'Configure system settings and preferences'}
                </p>
              </div>
              <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Events"
                  value={stats.totalEvents}
                  icon="fa-calendar-alt"
                  color="bg-purple-600/20"
                  change="+2 this month"
                  changeType="increase"
                />
                <StatCard
                  title="Upcoming Events"
                  value={stats.upcomingEvents}
                  icon="fa-paw"
                  color="bg-cyan-600/20"
                  change="Next in 3 days"
                  changeType="neutral"
                />
                <StatCard
                  title="Photo Gallery"
                  value={stats.totalPhotos}
                  icon="fa-images"
                  color="bg-green-600/20"
                  change={`${stats.publicPhotos} public`}
                  changeType="increase"
                />
                <StatCard
                  title="Website Views"
                  value={stats.websiteViews}
                  icon="fa-eye"
                  color="bg-blue-600/20"
                  change="+12% this week"
                  changeType="increase"
                />
                <StatCard
                  title="Flight Tracking"
                  value={stats.totalFlightTracked}
                  icon="fa-plane"
                  color="bg-orange-600/20"
                  change="3 countries"
                  changeType="neutral"
                />
                <StatCard
                  title="API Calls"
                  value={stats.apiCalls}
                  icon="fa-server"
                  color="bg-pink-600/20"
                  change="98.5% uptime"
                  changeType="increase"
                />
                <StatCard
                  title="Completed Events"
                  value={stats.completedEvents}
                  icon="fa-check-circle"
                  color="bg-gray-600/20"
                  change="All successful"
                  changeType="increase"
                />
                <StatCard
                  title="HOWL Network Status"
                  value="Online"
                  icon="fa-heartbeat"
                  color="bg-yellow-400/20"
                  change="Degraded Network Performance"
                  changeType="decrease"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-bolt text-yellow-400"></i>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setShowEventModal(true)}
                    className="p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 rounded-lg text-purple-300 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <i className="fas fa-plus"></i>
                    <span>New Event</span>
                  </button>
                  <button
                    onClick={() => setShowPhotoModal(true)}
                    className="p-4 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 rounded-lg text-green-300 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <i className="fas fa-upload"></i>
                    <span>Upload Photos</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 rounded-lg text-blue-300 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <i className="fas fa-chart-line"></i>
                    <span>View Analytics</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="p-4 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-600/30 rounded-lg text-orange-300 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-history text-cyan-400"></i>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm">New event created: "Furnal Equinox 2026"</span>
                        <p className="text-gray-500 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm">5 photos uploaded to gallery</span>
                        <p className="text-gray-500 text-xs">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm">Flight AC123 tracked successfully</span>
                        <p className="text-gray-500 text-xs">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-exclamation-triangle text-orange-400"></i>
                    System Alerts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <i className="fas fa-info-circle text-yellow-400 mt-0.5"></i>
                      <div>
                        <p className="text-yellow-300 text-sm font-medium">High Network Latency Detected</p>
                        <p className="text-yellow-400/70 text-xs">Internet connection WAN1 (Bell Canada) on port 9 is experiencing high latency.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg hidden">
                      <i className="fas fa-check text-green-400 mt-0.5"></i>
                      <div>
                        <p className="text-green-300 text-sm font-medium">All systems operational</p>
                        <p className="text-green-400/70 text-xs">Last checked: 5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <i className="fas fa-info-circle text-yellow-400 mt-0.5"></i>
                      <div>
                        <p className="text-yellow-300 text-sm font-medium">API usage at 23% of monthly limit</p>
                        <p className="text-yellow-400/70 text-xs">2,340 / 10,000 requests used</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Management */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <i className="fas fa-calendar-alt text-purple-400"></i>
                    Events ({events.length})
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setShowEventModal(true);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-plus"></i>
                  Create Event
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {events.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${event.color === 'purple' ? 'bg-purple-400' :
                                  event.color === 'cyan' ? 'bg-cyan-400' :
                                    event.color === 'green' ? 'bg-green-400' :
                                      event.color === 'orange' ? 'bg-orange-400' :
                                        'bg-gray-400'
                                }`}></div>
                              <div>
                                <div className="text-sm font-medium text-white">{event.title}</div>
                                <div className="text-sm text-gray-400">{event.attendees} attendees</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-purple-600/20 text-purple-300 rounded-full">
                              {event.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${event.status === 'upcoming'
                                ? 'bg-cyan-600/20 text-cyan-300'
                                : event.status === 'completed'
                                  ? 'bg-green-600/20 text-green-300'
                                  : 'bg-gray-600/20 text-gray-300'
                              }`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingEvent(event);
                                  setShowEventModal(true);
                                }}
                                className="text-cyan-400 hover:text-cyan-300 transition-colors p-1"
                                title="Edit Event"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                title="Delete Event"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                              <button
                                className="text-green-400 hover:text-green-300 transition-colors p-1"
                                title="View Details"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Photo Gallery Management */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <i className="fas fa-images text-green-400"></i>
                    Photo Gallery ({photos.length} photos)
                  </h2>
                </div>
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-upload"></i>
                  Upload Photos
                </button>
              </div>

              <GalleryGrid
                photos={photos}
                onEdit={(photo) => console.log('Edit photo:', photo)}
                onDelete={handleDeletePhoto}
                onTogglePublic={handleTogglePhotoPublic}
              />
            </div>
          )}

          {/* Other tabs placeholder */}
          {(activeTab === 'flights' || activeTab === 'analytics' || activeTab === 'content' || activeTab === 'settings') && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${activeTab === 'flights' ? 'fa-plane' :
                    activeTab === 'analytics' ? 'fa-chart-line' :
                      activeTab === 'content' ? 'fa-file-alt' :
                        'fa-cog'
                  } text-gray-500 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {activeTab === 'flights' && 'Flight Tracker Management'}
                {activeTab === 'analytics' && 'Analytics Dashboard'}
                {activeTab === 'content' && 'Content Management'}
                {activeTab === 'settings' && 'System Settings'}
              </h3>
              <p className="text-gray-400">
                This section is coming soon! Full functionality will be implemented here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <EventModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        event={editingEvent}
      />

      <PhotoUploadModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onUpload={handlePhotoUpload}
      />
    </div>
  );
}
