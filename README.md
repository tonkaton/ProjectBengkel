# Bengkel Motor Management System

A comprehensive motorcycle workshop management system with a landing page, customer portal, and admin dashboard. Built with React, Node.js, Express, MySQL, and Docker.

## 📋 Project Overview

This project consists of three main components:

1. **Landing Page** (`/landing`) - Marketing website for the workshop
2. **App Frontend** (`/app`) - Customer portal and admin dashboard with PWA support
3. **Backend API** (`/backend`) - RESTful API server with JWT authentication

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- MySQL 8+ (if running without Docker)

### Running with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bengkelmotorapp
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

3. **Start all services**
   ```bash
   docker compose up --build
   ```

   Or with live reload (watch mode):
   ```bash
   docker compose up --build --watch nginx backend
   ```

4. **Access the applications**
   - Landing Page: http://localhost
   - App Dashboard: http://localhost/app
   - Backend API: http://localhost:5000

### Running Locally (Development)

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure your MySQL database in .env
npm run dev
```

#### App Frontend
```bash
cd app
npm install
npm run dev
```

#### Landing Page
```bash
cd landing
npm install
npm run dev
```

## 📁 Project Structure

```
bengkelmotorapp/
├── app/                    # Customer portal & admin dashboard (React + Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts (Auth, Data)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── backend/               # RESTful API server (Node.js + Express)
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & validation middleware
│   │   └── jobs/          # Scheduled tasks (maintenance reminders)
│   └── package.json
│
├── landing/               # Marketing landing page (React + Vite)
│   ├── src/
│   │   ├── components/    # Landing page components
│   │   └── sections/      # Page sections
│   └── package.json
│
├── .docker/              # Docker configuration
│   ├── mysql/           # MySQL Docker setup
│   └── nginx/           # Nginx reverse proxy
│
└── docker-compose.yml    # Docker orchestration
```

## 🔑 Features

### Landing Page
- Responsive marketing website
- Service showcase
- Contact information
- Smooth animations with Framer Motion

### App Frontend (Customer Portal)
- **Authentication** - User login and registration
- **Dashboard** - Overview of services, customers, and transactions
- **Service Management** - CRUD operations for workshop services
- **Customer Management** - Customer profiles and history
- **Vehicle Management** - Track customer vehicles
- **Transaction Management** - Service transactions and billing
- **Loyalty Program** - Points and rewards system
- **Maintenance Scheduling** - Schedule and track maintenance
- **PWA Support** - Installable app with offline capabilities
- **Push Notifications** - Maintenance reminders

### Backend API
- RESTful API with Express.js
- JWT-based authentication
- Role-based access control (Admin/User)
- MySQL database with Sequelize ORM
- Web Push notifications
- Scheduled maintenance reminders (cron jobs)
- CORS enabled

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:

- **Public endpoints**: Service listing, authentication
- **Protected endpoints**: Require valid JWT token
- **Admin endpoints**: Require admin role

Default admin credentials (change in production):
- Username: `admin`
- Password: `admin123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Services
- `GET /api/services` - List all services (public)
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Vehicles
- `GET /api/vehicles` - List user vehicles
- `POST /api/vehicles` - Add new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction

### Rewards
- `GET /api/rewards` - List rewards
- `POST /api/rewards` - Create reward (admin only)
- `POST /api/rewards/:id/redeem` - Redeem reward

### Maintenance
- `GET /api/maintenance` - List maintenance schedules
- `POST /api/maintenance` - Schedule maintenance
- `PUT /api/maintenance/:id` - Update maintenance status

### Push Notifications
- `POST /api/push/subscribe` - Subscribe to push notifications
- `POST /api/push/unsubscribe` - Unsubscribe from notifications

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Framer Motion** - Animation library (landing page)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **Sequelize** - ORM for MySQL
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **web-push** - Push notification support
- **node-cron** - Scheduled tasks

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and static file serving

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=bengkel_motor
DB_PASS=bengkel_motor
DB_NAME=bengkel_motor
DB_PORT=3306

# JWT
JWT_SECRET=your-secret-key-change-in-production

# VAPID Keys (for push notifications)
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
```

### Generating VAPID Keys

```bash
cd backend
npx web-push generate-vapid-keys
```

## 📦 Building for Production

### Frontend Apps
```bash
# App Frontend
cd app
npm run build
# Output: app/dist

# Landing Page
cd landing
npm run build
# Output: landing/dist
```

### Backend
```bash
cd backend
npm start
```

## 🐳 Docker Services

- **db** - MySQL 8 database (port 3306)
- **backend** - Express API server (port 5000)
- **nginx** - Reverse proxy (ports 80, 443)
  - Routes `/` to landing page
  - Routes `/app` to app frontend
  - Routes `/api` to backend

## 🔄 Database Schema

Key tables:
- `Users` - User accounts (admin/customer)
- `Services` - Workshop services
- `Vehicles` - Customer vehicles
- `Transactions` - Service transactions
- `LoyaltyPoints` - Customer loyalty points
- `Rewards` - Redeemable rewards
- `Maintenance` - Maintenance schedules
- `PushSubscriptions` - Push notification subscriptions

## 🧪 Development

### Watch Mode
Docker Compose watch mode enables live reload:

```bash
docker compose up --build --watch nginx backend
```

Changes to frontend and backend code will trigger automatic rebuilds.

### Code Structure Best Practices
- Keep components small and focused
- Use custom hooks for reusable logic
- Centralize API calls in service files
- Use contexts for global state (Auth, Data)
- Follow REST conventions for API endpoints

## 📱 PWA Features

The app frontend is a Progressive Web App with:
- Service Worker for offline support
- Web App Manifest for installability
- Push notification support
- Responsive design
- Fast loading with Vite optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Note**: Remember to change default passwords and secrets before deploying to production!
