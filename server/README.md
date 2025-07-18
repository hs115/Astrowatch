# AstroWatch Server

Backend API server for the AstroWatch astrology application.

## Features

- User authentication (signup, signin, signout)
- User profile management
- Horoscope data management
- JWT-based authentication
- Supabase integration for database
- CORS enabled for client communication
- Rate limiting and security middleware

## Setup

### Prerequisites

- Node.js (v16 or higher)
- Supabase account and project
- Environment variables configured

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp env.example .env
```

3. Configure environment variables in `.env`:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (for custom token handling if needed)
JWT_SECRET=your_jwt_secret_here

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

### Database Setup

1. Run the database migrations in your Supabase project:
   - `001_create_profiles_table.sql`
   - `002_create_horoscopes_table.sql`

2. These migrations will create:
   - `profiles` table for user astrological data
   - `horoscopes` table for horoscope content
   - Row Level Security (RLS) policies
   - Automatic profile creation on user signup

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on port 3001 (or the port specified in your environment variables).

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - User logout

### Profiles
- `GET /api/profiles` - Get user profile (authenticated)
- `PUT /api/profiles` - Update user profile (authenticated)

### Horoscopes
- `GET /api/horoscopes/:zodiacSign/:type` - Get horoscope by sign and type
- `GET /api/horoscopes/:zodiacSign` - Get all horoscopes for a sign
- `POST /api/horoscopes` - Create new horoscope (authenticated)

### Health Check
- `GET /health` - Server health status

## Security Features

- JWT token authentication
- CORS protection
- Rate limiting (100 requests per 15 minutes per IP)
- Helmet.js security headers
- Input validation
- Error handling

## Development

The server uses:
- Express.js for the web framework
- Supabase for database and authentication
- JWT for token management
- CORS for cross-origin requests
- Helmet for security headers
- Rate limiting for API protection

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `JWT_SECRET` | Secret for JWT tokens | No |
| `CLIENT_URL` | Client application URL for CORS | No | 