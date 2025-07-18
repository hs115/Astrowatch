# AstroWatch Client

Frontend React application for the AstroWatch astrology platform.

## Features

- User authentication and profile management
- Personalized horoscopes (daily, weekly, monthly)
- Zodiac compatibility calculator
- Moon phase information
- Birth chart display
- Responsive design with cosmic theme
- Real-time data from backend API

## Setup

### Prerequisites

- Node.js (v16 or higher)
- Running AstroWatch server (see server README)
- Environment variables configured

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
# API Configuration
VITE_API_URL=http://localhost:3001/api
```

### Running the Client

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

The client will start on port 5173 and connect to the server on port 3001.

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── AuthForm.tsx          # Login/signup form
│   └── dashboard/
│       ├── Dashboard.tsx         # Main dashboard layout
│       ├── Header.tsx            # Navigation header
│       ├── Profile.tsx           # User profile management
│       ├── Horoscope.tsx         # Horoscope display
│       ├── Compatibility.tsx     # Zodiac compatibility
│       ├── MoonPhase.tsx         # Moon phase information
│       └── BirthChart.tsx        # Birth chart display
├── context/
│   └── AuthContext.tsx           # Authentication state management
├── lib/
│   └── api.ts                    # API client for server communication
├── utils/
│   └── astrology.ts              # Astrological calculations
├── App.tsx                       # Main application component
└── main.tsx                      # Application entry point
```

## API Integration

The client communicates with the backend server through the API client (`src/lib/api.ts`):

### Authentication
- User registration and login
- Session management with JWT tokens
- Automatic token storage in localStorage

### Profile Management
- Fetch and update user astrological profiles
- Birth date, time, and location storage
- Automatic zodiac sign calculation

### Data Flow
1. User authenticates → JWT token stored
2. API calls include Authorization header
3. Server validates token and returns data
4. Client updates UI with received data

## Features

### Authentication
- Email/password registration and login
- Persistent sessions with JWT tokens
- Automatic session restoration on page reload

### Profile Management
- Complete astrological profile setup
- Birth information collection
- Automatic zodiac sign determination

### Horoscopes
- Daily, weekly, and monthly horoscopes
- Personalized content based on zodiac sign
- Beautiful cosmic-themed UI

### Compatibility
- Zodiac compatibility calculator
- Score-based compatibility ratings
- Detailed compatibility descriptions

### Moon Phases
- Current moon phase display
- Lunar cycle information
- Moon phase meanings and guidance

### Birth Chart
- Basic birth chart elements
- Sun, Moon, and Rising sign information
- Astrological insights and descriptions

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Router** - Client-side routing
- **Fetch API** - HTTP requests

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001/api` |

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

3. Ensure the backend server is running and accessible

4. Update `VITE_API_URL` to point to your production server

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure the server is running on the correct port
   - Check `VITE_API_URL` environment variable
   - Verify CORS configuration on the server

2. **Authentication Issues**
   - Clear localStorage and try logging in again
   - Check server authentication endpoints
   - Verify JWT token handling

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript compilation errors
   - Verify environment variables are set correctly 