import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for demo purposes
// In production, you'd use a proper database
let events = [
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
    description: "Join me at Canada's premier furry convention! I'll be hosting panels on space exploration, cosmic adventures, and interstellar travel. Looking forward to meeting fellow space enthusiasts and sharing stories from across the galaxy!",
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
];

let analytics = {
  websiteViews: 15670,
  apiCalls: 2340,
  flightTracked: 156,
  dailyViews: [120, 150, 98, 200, 176, 145, 189]
};

// Admin authentication
function validateAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  // Simple demo auth - replace with proper JWT/session in production
  return authHeader === 'Bearer lynix2025';
}

// GET - Fetch admin data
export async function GET(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  switch (type) {
    case 'events':
      return NextResponse.json({
        success: true,
        data: events
      });

    case 'analytics':
      return NextResponse.json({
        success: true,
        data: analytics
      });

    case 'stats':
      return NextResponse.json({
        success: true,
        data: {
          totalEvents: events.length,
          upcomingEvents: events.filter(e => e.status === 'upcoming').length,
          completedEvents: events.filter(e => e.status === 'completed').length,
          totalFlightTracked: analytics.flightTracked,
          apiCalls: analytics.apiCalls,
          websiteViews: analytics.websiteViews
        }
      });

    default:
      return NextResponse.json({
        success: true,
        data: {
          events,
          analytics,
          stats: {
            totalEvents: events.length,
            upcomingEvents: events.filter(e => e.status === 'upcoming').length,
            completedEvents: events.filter(e => e.status === 'completed').length,
            totalFlightTracked: analytics.flightTracked,
            apiCalls: analytics.apiCalls,
            websiteViews: analytics.websiteViews
          }
        }
      });
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'create_event':
        const newEvent = {
          id: Math.max(...events.map(e => e.id)) + 1,
          ...data,
          image: data.image || "/images/events/default.jpg",
          tags: data.tags || [],
          color: data.color || "purple"
        };
        events.push(newEvent);
        
        return NextResponse.json({
          success: true,
          message: 'Event created successfully',
          data: newEvent
        });

      case 'update_analytics':
        analytics = { ...analytics, ...data };
        return NextResponse.json({
          success: true,
          message: 'Analytics updated successfully',
          data: analytics
        });

      default:
        return NextResponse.json({
          error: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      error: 'Invalid request body'
    }, { status: 400 });
  }
}

// PUT - Update existing event
export async function PUT(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
      return NextResponse.json({
        error: 'Event not found'
      }, { status: 404 });
    }

    events[eventIndex] = { ...events[eventIndex], ...updateData };

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      data: events[eventIndex]
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Invalid request body'
    }, { status: 400 });
  }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '0');

  const eventIndex = events.findIndex(e => e.id === id);
  if (eventIndex === -1) {
    return NextResponse.json({
      error: 'Event not found'
    }, { status: 404 });
  }

  const deletedEvent = events.splice(eventIndex, 1)[0];

  return NextResponse.json({
    success: true,
    message: 'Event deleted successfully',
    data: deletedEvent
  });
}
