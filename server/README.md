# AstroWatch Server

Backend API server for the AstroWatch astrology application.

## Features

- User authentication (email/password signup, signin, signout)
- **Google OAuth integration** for seamless authentication
- User profile management
- Horoscope data management
- JWT-based authentication
- **MongoDB Cloud integration** for database
- CORS enabled for client communication
- Rate limiting and security middleware
- Comprehensive API logging with timestamps

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Cloud account and cluster
- Google Cloud Console account (for OAuth)
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
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB=your_database_name_here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

### Database Setup

1. **Create MongoDB Cloud Cluster**:
   - Sign up at [MongoDB Cloud](https://cloud.mongodb.com/)
   - Create a new cluster
   - Get your connection string

2. **Collections will be created automatically**:
   - `users` - User accounts and authentication data
   - `profiles` - User astrological profile data
   - `horoscopes` - Horoscope content and predictions

3. **Google OAuth Setup**:
   - Create OAuth 2.0 credentials in Google Cloud Console
   - Add authorized JavaScript origins
   - Configure the same Client ID in both client and server

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
- `POST /api/auth/signup` - User registration (email/password)
- `POST /api/auth/signin` - User login (email/password)
- `POST /api/auth/google` - Google OAuth authentication
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
- Google OAuth integration
- Password hashing with bcrypt
- CORS protection
- Rate limiting (100 requests per 15 minutes per IP)
- Helmet.js security headers
- Input validation
- Error handling
- Comprehensive request logging

## Development

The server uses:
- Express.js for the web framework
- MongoDB Cloud for database
- JWT for token management
- bcryptjs for password hashing
- google-auth-library for Google OAuth verification
- CORS for cross-origin requests
- Helmet for security headers
- Rate limiting for API protection

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Cloud connection string | Yes |
| `MONGODB_DB` | MongoDB database name | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `CLIENT_URL` | Client application URL for CORS | No |

## API Logging

All API endpoints include comprehensive logging:
- **Timestamps** for all requests
- **Request bodies** for POST/PUT endpoints
- **Start and end** markers for each request
- **Error logging** with detailed information

Example log output:
```
[2024-01-15T10:30:45.123Z] [POST] /api/auth/signin - start - Body: {"email":"user@example.com","password":"password123"}
[2024-01-15T10:30:45.456Z] [POST] /api/auth/signin - end
``` 