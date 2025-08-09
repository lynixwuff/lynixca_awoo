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

interface EventCardProps {
  event: Event;
  isUpcoming?: boolean;
}

export default function EventCard({ event, isUpcoming = true }: EventCardProps) {
  const getEventColor = (eventType: string): string => {
    const colorMap: { [key: string]: string } = {
      'CONVENTION': 'purple',
      'MEETUP': 'cyan',
      'RAVE': 'orange'
    };
    return colorMap[eventType] || 'gray';
  };

  const getEventIcon = (eventType: string): string => {
    const iconMap: { [key: string]: string } = {
      'CONVENTION': 'fa-paw',
      'MEETUP': 'fa-users',
      'RAVE': 'fa-music'
    };
    return iconMap[eventType] || 'fa-calendar';
  };

  const color = getEventColor(event.eventType);
  const icon = getEventIcon(event.eventType);
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:transform hover:scale-105 transition-all duration-300 ${!isUpcoming ? 'opacity-75' : ''}`}>
      <div className={`relative h-48 bg-gradient-to-br ${
        color === 'purple' ? 'from-purple-600 to-pink-600' :
        color === 'cyan' ? 'from-cyan-600 to-blue-600' :
        color === 'orange' ? 'from-orange-600 to-red-600' :
        'from-gray-600 to-gray-700'
      } ${!isUpcoming ? 'opacity-75' : ''}`}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <div className={`${isUpcoming ? 'bg-white/90' : 'bg-black/60'} rounded-lg px-3 py-1`}>
            <span className={`font-bold text-sm ${
              isUpcoming ? (
                color === 'purple' ? 'text-purple-600' :
                color === 'cyan' ? 'text-cyan-600' :
                color === 'orange' ? 'text-orange-600' :
                'text-gray-600'
              ) : 'text-gray-400'
            }`}>
              {isUpcoming ? 'UPCOMING' : 'COMPLETED'}
            </span>
          </div>
        </div>

        {/* Event Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1">{event.name}</h3>
          <p className="text-gray-200 text-sm">
            {event.location}
            {!isUpcoming && ` • ${startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <i className={`fas ${icon} ${
            color === 'purple' ? 'text-purple-400' :
            color === 'cyan' ? 'text-cyan-400' :
            color === 'orange' ? 'text-orange-400' :
            'text-gray-400'
          } mr-2`}></i>
          <span className={`text-sm font-medium ${
            color === 'purple' ? 'text-purple-400' :
            color === 'cyan' ? 'text-cyan-400' :
            color === 'orange' ? 'text-orange-400' :
            'text-gray-400'
          }`}>
            {event.eventType.charAt(0) + event.eventType.slice(1).toLowerCase()} Event
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description || 'No description available'}
        </p>

        {isUpcoming && (
          <>
            <div className="flex items-center text-gray-400 text-xs mb-2">
              <i className="fas fa-calendar mr-2"></i>
              <span>
                {startDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                {endDate && ` - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              </span>
            </div>
            <div className="flex items-center text-gray-400 text-xs mb-4">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>{event.venue || event.location}</span>
            </div>
          </>
        )}

        <div className="flex gap-2">
          <button className={`flex-1 ${
            color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
            color === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' :
            color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
            'bg-gray-600 hover:bg-gray-700'
          } text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}>
            {isUpcoming ? 'Learn More' : 'View Photos'}
          </button>
          <button className={`px-4 py-2 border ${
            color === 'purple' ? 'border-purple-600 text-purple-400 hover:bg-purple-600/10' :
            color === 'cyan' ? 'border-cyan-600 text-cyan-400 hover:bg-cyan-600/10' :
            color === 'orange' ? 'border-orange-600 text-orange-400 hover:bg-orange-600/10' :
            'border-gray-600 text-gray-400 hover:bg-gray-600/10'
          } rounded-lg text-sm transition-colors`}>
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
