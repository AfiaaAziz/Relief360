# Relief360 - Emergency Management Platform

<div align="center">

![Relief360 Logo](https://via.placeholder.com/150x150/990000/ffffff?text=R360)

**Connecting citizens, volunteers, hospitals, and emergency responders in real-time to save lives and manage disasters effectively.**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-336791?style=flat-square&logo=postgresql)](https://postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

</div>

##  Overview

Relief360 is a comprehensive emergency management platform designed to streamline disaster response and coordination between multiple stakeholders. The platform enables real-time communication and resource management among citizens, volunteers, hospitals, and emergency responders during crisis situations.

###  Key Objectives

- **Real-time Emergency Response**: Instant incident reporting and resource allocation
- **Multi-stakeholder Coordination**: Seamless communication between citizens, volunteers, hospitals, and admins
- **Resource Management**: Efficient tracking and deployment of volunteers and medical resources
- **Data-Driven Insights**: Analytics and reporting for better emergency preparedness
- **Accessibility**: Mobile-responsive design ensuring access during emergencies

##  Features

###  Public Features

- **Homepage**: Hero section with emergency contact numbers and platform overview
- **Incident Reporting**: Citizens can report emergencies with location and details
- **Volunteer Registration**: Easy signup for volunteers with skill-based matching
- **Hospital Registration**: Healthcare facilities can register and manage resources
- **Safety Information**: Safety tips and emergency preparedness guides
- **Contact System**: Direct communication with emergency coordinators
- **Donation Platform**: Support emergency response efforts through donations

###  User Dashboards

####  Admin Dashboard

- **Analytics**: Real-time statistics and performance metrics
- **User Management**: Manage citizens, volunteers, and hospital accounts
- **Incident Oversight**: Monitor and coordinate emergency responses
- **Resource Allocation**: Assign volunteers to incidents and manage hospital resources
- **Communication**: Reply to citizen inquiries and feedback
- **Emergency Plans**: Create and manage response protocols

####  Volunteer Dashboard

- **Assignments**: View and manage assigned emergency tasks
- **Emergency Plans**: Access response protocols and procedures
- **Hospital Coordination**: Connect with healthcare facilities
- **Profile Management**: Update skills and availability status
- **Response Tracking**: Monitor completed assignments and impact

####  Citizen Dashboard

- **My Incidents**: Track reported incidents and their status
- **Emergency Contacts**: Quick access to emergency numbers
- **Hospital Finder**: Locate nearby medical facilities
- **Safety Tips**: Access emergency preparedness information
- **Feedback System**: Provide feedback on response quality

##  Technology Stack

### Frontend

- **React 19.2.0**: Modern React with hooks and functional components
- **React Router 7.9.6**: Client-side routing for SPA
- **Tailwind CSS 3.4.18**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API communication

### Backend

- **NestJS 10.0.0**: Enterprise-grade Node.js framework
- **TypeORM**: Object-relational mapping for database operations
- **PostgreSQL**: Robust relational database
- **JWT**: JSON Web Tokens for authentication
- **Passport.js**: Authentication middleware
- **Bcrypt**: Password hashing and security
- **Nodemailer**: Email service integration

### Development Tools

- **TypeScript**: Type-safe JavaScript development
- **ESLint & Prettier**: Code linting and formatting
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities

##  Project Structure

```
relief-360/
├── 📂 src/                          # Frontend React application
│   ├── 📂 components/               # Reusable UI components
│   │   ├── 📂 ui/                   # Base UI components (buttons, inputs, etc.)
│   │   ├── Navbar.jsx               # Navigation component
│   │   ├── VolunteerRegister.jsx    # Volunteer registration form
│   │   └── HospitalRegistration.jsx # Hospital registration form
│   ├── 📂 pages/                    # Application pages
│   │   ├── 📂 admin/                # Admin dashboard pages
│   │   ├── 📂 citizen/              # Citizen dashboard pages
│   │   ├── 📂 volunteer/            # Volunteer dashboard pages
│   │   ├── Home.jsx                 # Landing page
│   │   ├── About.jsx                # About page
│   │   └── ContactUs.jsx            # Contact page
│   ├── 📂 layouts/                  # Layout components
│   │   └── DashboardLayout.jsx      # Dashboard layout wrapper
│   ├── 📂 context/                  # React context providers
│   │   └── AuthContext.jsx          # Authentication context
│   ├── 📂 hooks/                    # Custom React hooks
│   ├── 📂 utils/                    # Utility functions
│   ├── 📂 assets/                   # Static assets (images, icons)
│   └── 📂 styles/                   # Global styles and themes
├── 📂 server-nestjs/                # Backend NestJS application
│   ├── 📂 src/
│   │   ├── 📂 modules/              # Feature modules
│   │   │   ├── 📂 auth/             # Authentication module
│   │   │   ├── 📂 citizens/         # Citizen management
│   │   │   ├── 📂 volunteers/       # Volunteer management
│   │   │   ├── 📂 hospitals/        # Hospital management
│   │   │   ├── 📂 incidents/        # Incident management
│   │   │   ├── 📂 contact/          # Contact messages
│   │   │   ├── 📂 donations/        # Donation tracking
│   │   │   ├── 📂 feedback/         # Feedback system
│   │   │   └── 📂 emergency-plans/  # Emergency protocols
│   │   ├── 📂 migrations/           # Database migrations
│   │   ├── app.module.ts            # Root application module
│   │   └── main.ts                  # Application entry point
│   └── package.json
├── 📂 public/                       # Public static assets
├── package.json                     # Frontend dependencies and scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
└── README.md                        # Project documentation
```

##  Quick Start

### Prerequisites

- **Node.js 18+** and **npm** or **yarn**
- **PostgreSQL 12+** database
- **Git** for version control

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/relief360.git
cd relief-360
```

### 2. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE relief360;
\q
```

### 3. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 4. Backend Setup

```bash
cd server-nestjs

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
# Configure the following variables:
NODE_ENV=development
PORT=5000
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=relief360
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=7d

# Run database migrations
npm run migration:run

# Start development server
npm run start:dev
```

The backend API will be available at `http://localhost:5000`

### 5. Default Admin Credentials

For initial setup, use these default credentials:

- **Username**: `admin`
- **Password**: `admin123`

 **Important**: Change these credentials immediately after first login in production!

##  Database Schema

### Core Tables

#### Citizens

```sql
- id (SERIAL PRIMARY KEY)
- first_name (VARCHAR)
- last_name (VARCHAR)
- email (VARCHAR UNIQUE)
- phone (VARCHAR)
- address (TEXT)
- city (VARCHAR)
- postal_code (VARCHAR)
- password_hash (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Volunteers

```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR UNIQUE)
- phone (VARCHAR)
- skills (TEXT)
- availability (VARCHAR)
- status (VARCHAR)
- created_at (TIMESTAMP)
```

#### Hospitals

```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- address (TEXT)
- phone (VARCHAR)
- email (VARCHAR)
- capacity (INTEGER)
- available_beds (INTEGER)
- emergency_services (BOOLEAN)
- created_at (TIMESTAMP)
```

#### Incidents

```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR)
- description (TEXT)
- severity (VARCHAR)
- location (TEXT)
- status (VARCHAR)
- reported_by (INTEGER, FK to citizens)
- assigned_volunteer (INTEGER, FK to volunteers)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Database Migrations

The project uses TypeORM migrations for database schema management:

```bash
# Generate new migration
npm run migration:generate -- src/migrations/YourMigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

##  API Endpoints

### Authentication

```
POST   /api/auth/login        # User login
POST   /api/auth/admin-login  # Admin login
GET    /api/auth/me          # Get current user (requires JWT)
```

### Citizens

```
GET    /api/citizens          # Get all citizens
GET    /api/citizens/:id      # Get citizen by ID
POST   /api/citizens          # Create new citizen
PUT    /api/citizens/:id      # Update citizen
DELETE /api/citizens/:id      # Delete citizen
```

### Volunteers

```
GET    /api/volunteers        # Get all volunteers
GET    /api/volunteers/me     # Get current volunteer profile
POST   /api/volunteers        # Create volunteer
PUT    /api/volunteers/:id    # Update volunteer
```

### Hospitals

```
GET    /api/hospitals         # Get all hospitals
GET    /api/hospitals/:id     # Get hospital by ID
POST   /api/hospitals         # Create hospital
PUT    /api/hospitals/:id     # Update hospital
```

### Incidents

```
GET    /api/incidents         # Get all incidents
GET    /api/incidents/:id     # Get incident by ID
POST   /api/incidents         # Create incident (requires JWT)
PUT    /api/incidents/:id     # Update incident
GET    /api/incidents/severity/:severity # Get incidents by severity
```

### Contact Messages

```
GET    /api/contact           # Get all contact messages
POST   /api/contact           # Create contact message
PUT    /api/contact/:id/reply # Reply to message (admin only)
```

### Donations

```
GET    /api/donations         # Get all donations
POST   /api/donations         # Create donation
```

### Emergency Plans

```
GET    /api/emergency-plans   # Get all emergency plans
POST   /api/emergency-plans   # Create emergency plan
```

##  Authentication & Authorization

### JWT Token Structure

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "citizen|volunteer|hospital|admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Role-Based Access Control

#### Citizen Role

- Report incidents
- View own incidents
- Access safety information
- Contact support

#### Volunteer Role

- View assignments
- Update assignment status
- Access emergency plans
- Update profile

#### Hospital Role

- Manage hospital information
- Update capacity and resources
- View volunteer assignments

#### Admin Role

- Full system access
- User management
- Analytics and reporting
- System configuration

##  UI Components

### Design System

- **Primary Color**: `#990000` (Maroon)
- **Secondary Color**: `#16537e` (Blue)
- **Success Color**: `#6aa84f` (Green)
- **Warning Color**: `#f48836` (Orange)
- **Error Color**: `#ff3535` (Red)

### Key UI Components

- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Glass morphism with backdrop blur
- **Forms**: Validation with error messaging
- **Navigation**: Responsive navbar with role-based visibility
- **Dashboards**: Clean layouts with data visualization

##  Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured dashboard experience
- **Tablet**: Touch-friendly interface with adapted layouts
- **Mobile**: Streamlined mobile experience for emergency situations

##  Testing

### Frontend Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Backend Testing

```bash
cd server-nestjs

# Run unit tests
npm test

# Run integration tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

##  Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the application:

```bash
npm run build
```

2. Deploy the `build` folder to your hosting platform

3. Configure environment variables for API endpoints

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. Set environment variables:

```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:port/database
JWT_SECRET=your-production-jwt-secret
```

2. Deploy using your preferred platform

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual containers
docker build -t relief360-frontend .
docker build -t relief360-backend ./server-nestjs
```


### Phase 3 - Advanced Features 📅

- [ ] AI-powered incident prediction
- [ ] Integration with emergency services APIs
- [ ] Blockchain for donation tracking
- [ ] IoT sensor integration
- [ ] Advanced reporting and insights



<div align="center">


</div>
