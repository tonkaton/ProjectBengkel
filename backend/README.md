# Bengkel Motor - Backend API

RESTful API server for the Bengkel Motor management system. Built with Node.js, Express, MySQL, and Sequelize ORM.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=bengkel_motor
   DB_PASS=bengkel_motor
   DB_NAME=bengkel_motor
   JWT_SECRET=your-secret-key
   VAPID_PUBLIC_KEY=your-vapid-public-key
   VAPID_PRIVATE_KEY=your-vapid-private-key
   ```

3. **Create MySQL database**
   ```sql
   CREATE DATABASE bengkel_motor;
   ```

4. **Generate VAPID keys** (for push notifications)
   ```bash
   npx web-push generate-vapid-keys
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on http://localhost:5000

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   ├── database.js        # Sequelize database connection
│   │   └── webPush.js         # Web push notification config
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── maintenanceController.js
│   │   ├── pushController.js
│   │   ├── rewardController.js
│   │   ├── serviceController.js
│   │   ├── transactionController.js
│   │   └── vehicleController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── adminMiddleware.js # Admin role check
│   ├── models/                # Sequelize models
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Vehicle.js
│   │   ├── Transaction.js
│   │   ├── LoyaltyPoint.js
│   │   ├── Reward.js
│   │   ├── Maintenance.js
│   │   └── PushSubscription.js
│   ├── routes/                # API route definitions
│   │   ├── authRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── vehiclesRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── rewardsRoutes.js
│   │   ├── maintenanceRoutes.js
│   │   └── pushRoutes.js
│   └── jobs/
│       └── maintenanceReminder.js  # Scheduled maintenance reminders
├── server.js                  # Entry point
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |

### Services
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/services` | List all services | Public |
| POST | `/api/services` | Create service | Admin |
| PUT | `/api/services/:id` | Update service | Admin |
| DELETE | `/api/services/:id` | Delete service | Admin |

### Vehicles
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/vehicles` | List user's vehicles | JWT |
| POST | `/api/vehicles` | Add new vehicle | JWT |
| PUT | `/api/vehicles/:id` | Update vehicle | JWT |
| DELETE | `/api/vehicles/:id` | Delete vehicle | JWT |

### Transactions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/transactions` | List transactions | JWT |
| POST | `/api/transactions` | Create transaction | Admin |
| PUT | `/api/transactions/:id` | Update transaction | Admin |

### Rewards
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/rewards` | List all rewards | JWT |
| POST | `/api/rewards` | Create reward | Admin |
| PUT | `/api/rewards/:id` | Update reward | Admin |
| DELETE | `/api/rewards/:id` | Delete reward | Admin |
| POST | `/api/rewards/:id/redeem` | Redeem reward | JWT |

### Maintenance
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/maintenance` | List maintenance schedules | JWT |
| POST | `/api/maintenance` | Schedule maintenance | JWT |
| PUT | `/api/maintenance/:id` | Update maintenance status | JWT |
| DELETE | `/api/maintenance/:id` | Delete maintenance | JWT |

### Push Notifications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/push/subscribe` | Subscribe to notifications | JWT |
| POST | `/api/push/unsubscribe` | Unsubscribe from notifications | JWT |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register or Login** to receive a JWT token
2. **Include the token** in the Authorization header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

### Default Admin Account
- Username: `admin`
- Password: `admin123`

**⚠️ Change these credentials in production!**

## 📊 Database Models

### User
- id, name, email, password (hashed), phone, address, role (admin/user)
- Relationships: has many Vehicles, Transactions, LoyaltyPoints

### Service
- id, name, description, price, category, duration
- Public information about workshop services

### Vehicle
- id, userId, plate, brand, model, year, type
- Customer vehicles linked to user accounts

### Transaction
- id, userId, vehicleId, date, totalAmount, pointsEarned, status
- Service transactions with associated services

### LoyaltyPoint
- id, userId, points, lastUpdated
- Customer loyalty point balance

### Reward
- id, name, description, pointCost, isActive
- Rewards that can be redeemed with points

### Maintenance
- id, userId, vehicleId, nextServiceDate, serviceType, isCompleted
- Scheduled maintenance reminders

### PushSubscription
- id, userId, subscription (JSON)
- Web push notification subscriptions

## 🔔 Push Notifications

The API supports web push notifications using the VAPID protocol:

1. **Generate VAPID keys**:
   ```bash
   npx web-push generate-vapid-keys
   ```

2. **Add keys to .env**:
   ```env
   VAPID_PUBLIC_KEY=your-public-key
   VAPID_PRIVATE_KEY=your-private-key
   ```

3. **Subscribe from frontend**:
   ```javascript
   // Frontend code
   const subscription = await registration.pushManager.subscribe({
     userVisibleOnly: true,
     applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
   });
   
   await fetch('/api/push/subscribe', {
     method: 'POST',
     headers: { 'Authorization': `Bearer ${token}` },
     body: JSON.stringify(subscription)
   });
   ```

## ⏰ Scheduled Jobs

The server runs scheduled tasks using `node-cron`:

### Maintenance Reminders
- **Schedule**: Daily at 9:00 AM
- **Task**: Sends push notifications for upcoming maintenance
- **File**: `src/jobs/maintenanceReminder.js`

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **Sequelize** - ORM for MySQL
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **web-push** - Push notifications
- **node-cron** - Task scheduling
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| DB_HOST | MySQL host | localhost |
| DB_USER | MySQL username | bengkel_motor |
| DB_PASS | MySQL password | bengkel_motor |
| DB_NAME | Database name | bengkel_motor |
| DB_PORT | MySQL port | 3306 |
| JWT_SECRET | JWT signing secret | - |
| VAPID_PUBLIC_KEY | VAPID public key | - |
| VAPID_PRIVATE_KEY | VAPID private key | - |

## 🐳 Docker Support

The backend can run in a Docker container:

```bash
# Build image
docker build -t bengkelmotor-backend .

# Run container
docker run -p 5000:5000 --env-file .env bengkelmotor-backend
```

Or use docker-compose from the project root:

```bash
docker compose up backend
```

## 🧪 Development

### Database Synchronization

Sequelize automatically creates/updates tables on startup:

```javascript
// In server.js
sequelize.sync({ alter: true })
```

**⚠️ Use `{ force: true }` to drop and recreate tables (data loss!)**

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Register route in `src/app.js`:
   ```javascript
   const newRoutes = require('./routes/newRoutes');
   app.use('/api/new', newRoutes);
   ```

### Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional details (optional)"
}
```

## 📈 Performance Tips

1. **Database Indexes**: Add indexes for frequently queried fields
2. **Connection Pooling**: Sequelize handles this automatically
3. **Caching**: Consider Redis for frequently accessed data
4. **Rate Limiting**: Implement rate limiting for public endpoints
5. **Compression**: Use gzip compression middleware

## 🔒 Security Best Practices

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ CORS configured
- ✅ SQL injection protection (Sequelize)
- ⚠️ Change default admin password
- ⚠️ Use strong JWT_SECRET in production
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting
- ⚠️ Validate and sanitize user input

## 📝 Logging

Consider adding logging middleware:

```bash
npm install morgan
```

```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## 🧪 Testing

To add testing:

```bash
npm install --save-dev jest supertest
```

Create test files in `tests/` directory.

## 🤝 Contributing

1. Follow existing code structure
2. Use meaningful variable/function names
3. Comment complex logic
4. Test your changes
5. Update this README if needed

## 📄 License

MIT License

---

For the complete project, see the root [README.md](../README.md)
