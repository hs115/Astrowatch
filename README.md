# AstroWatch 🌟

A modern astrology application with personalized horoscopes, compatibility matching, and cosmic insights.

## Project Structure

```
AstroWatch/
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
- MongoDB Cloud account and cluster
- Google Cloud Console account (for OAuth)
- Git

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd AstroWatch
```

2. **Setup the Server**
```bash
cd server
npm install
cp env.example .env
# Edit .env with your MongoDB and Google OAuth credentials
npm run dev
```

3. **Setup the Client**
```bash
cd ../client
npm install
# Create .env file with VITE_API_URL=http://localhost:3001/api and VITE_GOOGLE_CLIENT_ID
npm run dev
```

4. **Database Setup**
   - Create a MongoDB Cloud cluster
   - The application will automatically create collections as needed

## Features

### 🌟 User Authentication
- Secure signup and login with email/password
- **Google OAuth integration** for seamless login
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
- **@react-oauth/google** - Google OAuth integration

### Backend (Server)
- **Express.js** - Web framework
- **MongoDB Cloud** - Database
- **JWT** - Token authentication
- **bcryptjs** - Password hashing
- **google-auth-library** - Google OAuth verification
- **CORS** - Cross-origin requests
- **Helmet** - Security headers
- **Rate Limiting** - API protection

### Database
- **MongoDB Cloud** - NoSQL database
- **Collections**: users, profiles, horoscopes
- **Automatic user creation** on Google OAuth

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration (email/password)
- `POST /api/auth/signin` - User login (email/password)
- `POST /api/auth/google` - Google OAuth authentication
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
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id

# JWT Configuration
JWT_SECRET=your_jwt_secret

# Server Configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Google OAuth Setup

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API

2. **Create OAuth 2.0 Credentials**:
   - Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - Your production domain (when deployed)

3. **Configure Environment Variables**:
   - Use the same Client ID for both client and server
   - Add `VITE_GOOGLE_CLIENT_ID` to client `.env`
   - Add `GOOGLE_CLIENT_ID` to server `.env`

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
- Google OAuth integration
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation
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
4. Verify MongoDB connection and Google OAuth setup

---

**May the stars guide your journey! ✨** 