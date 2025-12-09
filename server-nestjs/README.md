# Relief360 - NestJS Backend API

A professional NestJS backend for the Relief360 emergency management system.

## Features

- ✅ JWT Authentication (regular users & static admin)
- ✅ Role-based access control (citizen, volunteer, hospital, admin)
- ✅ PostgreSQL database integration with TypeORM
- ✅ Volunteer management
- ✅ Hospital management
- ✅ Incident reporting and tracking
- ✅ CORS enabled for React frontend
- ✅ Input validation with class-validator
- ✅ Comprehensive error handling

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+

## Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000

# Database
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=relief360
PG_USER=postgres
PG_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=7d

# Admin Credentials (static)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/admin-login` - Admin login with username and password
- `GET /api/auth/me` - Get current user (requires JWT)

### Volunteers

- `GET /api/volunteers` - Get all volunteers
- `GET /api/volunteers/me` - Get current volunteer profile (requires JWT)

### Hospitals

- `GET /api/hospitals` - Get all hospitals

### Incidents

- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get incident by ID
- `POST /api/incidents` - Create incident (requires JWT)
- `GET /api/incidents/severity/:severity` - Get incidents by severity

## Default Admin Credentials

- **Username:** admin
- **Password:** admin123

⚠️ Change these in the `.env` file for production!

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
└── modules/
    ├── auth/               # Authentication module
    │   ├── entities/       # User entity
    │   ├── dto/            # Data transfer objects
    │   ├── strategies/     # JWT strategy
    │   ├── guards/         # JWT guard
    │   ├── auth.service.ts # Authentication logic
    │   ├── auth.controller.ts # Auth endpoints
    │   └── auth.module.ts  # Auth module
    ├── volunteers/         # Volunteer management
    ├── hospitals/          # Hospital management
    └── incidents/          # Incident management
```

## Database Schema

The application uses the existing PostgreSQL database schema from the original Node.js backend. Make sure your database has all required tables:

- `users` - User accounts
- `volunteers` - Volunteer profiles
- `hospitals` - Hospital information
- `incidents` - Incident reports

## Connecting with React Frontend

Update your React app's API base URL to point to the NestJS backend:

```javascript
// In your API calls or axios config
const API_URL = "http://localhost:5000";
```

## Development

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```

## Troubleshooting

### Port already in use

If port 5000 is already in use, change it in `.env`:

```env
PORT=3001
```

### Database connection error

- Check PostgreSQL is running
- Verify `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD` in `.env`
- Ensure database `relief360` exists

### JWT Token not working

- Check `JWT_SECRET` is set correctly
- Verify token is being sent in Authorization header: `Bearer <token>`

## License

MIT
