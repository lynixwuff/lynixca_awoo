import { useState, useEffect } from 'react';

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

interface UseEventsReturn {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  retryCount: number;
  refetch: () => void;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const fetchEvents = async (attempt = 1): Promise<void> => {
    try {
      setError(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
      
      console.log(`Fetching events from: ${apiUrl}/events (attempt ${attempt})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${apiUrl}/events`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.success && Array.isArray(result.data)) {
        setEvents(result.data);
        setRetryCount(0);
        setIsLoading(false);
        console.log(`Successfully loaded ${result.data.length} events from API`);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error: any) {
      console.error(`Failed to fetch events (attempt ${attempt}):`, error.message);
      
      if (attempt < maxRetries) {
        setRetryCount(attempt);
        console.log(`Retrying in 2 seconds... (${attempt}/${maxRetries})`);
        setTimeout(() => fetchEvents(attempt + 1), 2000);
        return;
      }
      
      // Max retries reached, show error state
      setError(`Failed to load events after ${maxRetries} attempts: ${error.message}`);
      setEvents([]);
      setIsLoading(false);
      console.warn('API connection failed after maximum retries');
    }
  };

  const refetch = () => {
    setIsLoading(true);
    setRetryCount(0);
    fetchEvents();
  };

  // Load events on hook initialization
  useEffect(() => {
    setIsLoading(true);
    fetchEvents();
  }, []);

  return {
    events,
    isLoading,
    error,
    retryCount,
    refetch
  };
}
