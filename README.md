# AstroWatch 🌟

A modern astrology application with personalized horoscopes, compatibility matching, and cosmic insights.

## Project Structure

```
AstroWatch_client/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── lib/           # API client and utilities
│   │   └── utils/         # Astrological calculations
│   ├── package.json
│   └── README.md
├── server/                 # Backend Express API
│   ├── config/            # Configuration files
│   ├── database/          # Database migrations
│   ├── middleware/        # Express middleware
│   ├── routes/            # API route handlers
│   ├── package.json
│   └── README.md
└── README.md              # This file
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Supabase account and project
- Git

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd AstroWatch_client
```

2. **Setup the Server**
```bash
cd server
npm install
cp env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

3. **Setup the Client**
```bash
cd ../client
npm install
# Create .env file with VITE_API_URL=http://localhost:3001/api
npm run dev
```

4. **Database Setup**
   - Run the SQL migrations in your Supabase project:
     - `server/database/migrations/001_create_profiles_table.sql`
     - `server/database/migrations/002_create_horoscopes_table.sql`

## Features

### 🌟 User Authentication
- Secure signup and login
- JWT token-based sessions
- Profile management

### 🔮 Astrological Features
- **Personalized Horoscopes**: Daily, weekly, and monthly predictions
- **Zodiac Compatibility**: Calculate compatibility between signs
- **Moon Phases**: Current lunar phase and guidance
- **Birth Charts**: Basic astrological chart elements

### 🎨 User Experience
- Beautiful cosmic-themed UI
- Responsive design
- Real-time data updates
- Intuitive navigation

## Technology Stack

### Frontend (Client)
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend (Server)
- **Express.js** - Web framework
- **Supabase** - Database and auth
- **JWT** - Token authentication
- **CORS** - Cross-origin requests
- **Helmet** - Security headers
- **Rate Limiting** - API protection

### Database
- **PostgreSQL** (via Supabase)
- **Row Level Security** (RLS)
- **Real-time subscriptions**

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/session` - Get session
- `POST /api/auth/signout` - User logout

### Profiles
- `GET /api/profiles` - Get user profile
- `PUT /api/profiles` - Update profile

### Horoscopes
- `GET /api/horoscopes/:zodiacSign/:type` - Get horoscope
- `GET /api/horoscopes/:zodiacSign` - Get all horoscopes
- `POST /api/horoscopes` - Create horoscope

## Environment Variables

### Server (.env)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## Development

### Running in Development

1. **Start the server** (port 3001):
```bash
cd server
npm run dev
```

2. **Start the client** (port 5173):
```bash
cd client
npm run dev
```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/health

### Building for Production

1. **Build the client**:
```bash
cd client
npm run build
```

2. **Start the server in production**:
```bash
cd server
npm start
```

## Security Features

- JWT token authentication
- CORS protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions:
1. Check the README files in `client/` and `server/` directories
2. Review the API documentation
3. Check the environment configuration
4. Verify database migrations are applied

---

**May the stars guide your journey! ✨** 