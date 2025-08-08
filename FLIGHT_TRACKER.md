# Flight Tracker Setup

## API Integration

This flight tracker integrates with the AviationStack API to fetch real-time flight data.

### Getting Started

1. **Get an API Key**
   - Sign up at [AviationStack](https://aviationstack.com/)
   - Free tier includes 1000 requests per month
   - Copy your API key

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Replace `your_aviationstack_api_key_here` with your actual API key
   ```bash
   cp .env.example .env.local
   ```

3. **Usage**
   - Navigate to `/flight/[flight_number]` where `[flight_number]` is the IATA flight code
   - Examples: `/flight/AC123`, `/flight/UA456`, `/flight/WS789`

### Features

- **Real-time Data**: Fetches live flight information from AviationStack API
- **Fallback Data**: Shows demo data if API is unavailable or flight not found
- **Dynamic Progress**: Calculates flight progress based on departure and arrival times
- **Status Tracking**: Shows different states (scheduled, active, landed, delayed, cancelled)
- **Responsive Design**: Works on desktop and mobile devices

### API Response Handling

The component handles various API scenarios:
- **Successful Response**: Displays real flight data
- **Flight Not Found**: Shows demo data with the requested flight number
- **API Error**: Falls back to demo data and shows error banner
- **Loading State**: Displays loading spinner while fetching data

### Alternative APIs

If you prefer other APIs, you can modify the `fetchFlightData` function to use:
- **FlightAware AeroAPI**: More comprehensive but paid
- **OpenSky Network**: Free but limited features
- **RapidAPI Aviation**: Multiple aviation APIs in one platform

### Demo Mode

Without an API key, the tracker will show demo data for any flight number, allowing you to test the interface and features.

## Admin Dashboard

The website includes a comprehensive admin dashboard for managing content and monitoring analytics.

### Access

- Navigate to `/admin` or `/admin/dashboard`
- Default password: `lynix2025` (change in production)

### Features

- **Overview Dashboard**: Real-time stats and quick actions
- **Event Management**: Create, edit, and delete events
- **Flight Tracker Analytics**: Monitor API usage and performance
- **Website Analytics**: Traffic and page view statistics
- **Settings**: Configure API keys and site settings

### Admin API

The dashboard uses RESTful API endpoints:
- `GET /api/admin` - Fetch dashboard data
- `POST /api/admin` - Create new content
- `PUT /api/admin` - Update existing content
- `DELETE /api/admin` - Remove content

### Security

- Simple password authentication (upgrade to JWT in production)
- API key management through admin interface
- Secure environment variable handling
- Request validation and error handling
