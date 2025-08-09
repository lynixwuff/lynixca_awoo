import EventCard from './EventCard';

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

interface EventsGridProps {
  events: Event[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  const upcomingEvents = events.filter(event => 
    event.eventStatus === 'UPCOMING' || event.eventStatus === 'ONGOING'
  );
  const pastEvents = events.filter(event => 
    event.eventStatus === 'PAST'
  );

  return (
    <>
      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-gray-400 text-lg">Don't miss out on these exciting upcoming adventures!</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} isUpcoming={true} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recent Adventures</h2>
            <p className="text-gray-400 text-lg">Check out some highlights from my recent events!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} isUpcoming={false} />
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
              <i className="fas fa-paw text-purple-400 text-2xl"></i>
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

          {/* Rave Type */}
          <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
            <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-music text-orange-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Raves</h3>
            <p className="text-gray-400 text-sm mb-4">
              High-energy music events and dance parties with amazing beats and vibes
            </p>
          </div>
        </div>
      </div>

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
  );
}
