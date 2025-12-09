# Port Configuration and API Endpoints Fix

## Current Status

- Node server runs on port 5000
- NestJS server runs on port 5001
- Frontend points to localhost:5000

## Required Changes

- [ ] Change Node server port to 5001
- [ ] Change NestJS server port to 5000
- [ ] Verify frontend API calls work with Nest server
- [ ] Add missing API endpoints to Nest server if needed

## API Endpoints Analysis

### Node Server Endpoints:

- /api/auth/login (POST)
- /api/auth/admin-login (POST)
- /api/auth/me (GET)
- /api/volunteers/me (GET)
- /api/volunteers (GET)
- /api/hospitals (GET)
- /api/contact/send (POST)
- /api/hospital-registration (POST)
- /api/volunteer-registration (POST)
- /api/volunteers/:id (PUT)
- /api/hospitals/:id (PUT)
- /api/hospitals/pending (GET)
- /api/hospitals/:id/status (PUT)
- /api/hospitals/:id (DELETE)
- /api/volunteers/:id (DELETE)
- /api/incidents (GET, POST)
- /api/incidents/:id (PUT, DELETE)
- /api/incidents/:id/volunteers (GET)
- /api/incidents/:id/assign (POST)
- /api/incidents/:id/assign/:volunteerId (DELETE)
- /api/incidents/volunteers/available (GET)
- /api/incidents/volunteers (GET)

### Nest Server Current Endpoints:

- /api/auth/login (POST)
- /api/auth/admin-login (POST)
- /api/auth/me (GET)
- /api/volunteers (GET)
- /api/volunteers/me (GET, PUT)
- /api/volunteer-registration (POST)
- /api/hospitals (GET, POST, PUT, DELETE)
- /api/incidents (GET, POST, PUT, DELETE)
- /api/incidents/:id/assign (POST)
- /api/incidents/:id/assign/:volunteerId (DELETE)
- /api/incidents/volunteers (GET)

### Missing in Nest:

- /api/contact/send (POST)
- /api/hospital-registration (POST) - but has /api/hospitals POST
- /api/hospitals/pending (GET)
- /api/hospitals/:id/status (PUT)
- /api/incidents/:id/volunteers (GET)
- /api/incidents/volunteers/available (GET)
- /api/volunteers/:id (PUT, DELETE)
- /api/hospitals/:id (PUT, DELETE) - has them but may need different logic

### Frontend API Calls:

- AuthContext: /api/auth/login, /api/auth/me, /api/auth/signup
- VolunteerRegister: /api/volunteer-registration
- HospitalRegistration: /api/hospitals/register
