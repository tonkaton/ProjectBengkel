# Bengkel Motor - App Frontend

Progressive Web App (PWA) for the Bengkel Motor management system. Includes customer portal and admin dashboard with real-time updates and push notifications.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running (see [backend README](../backend/README.md))

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API endpoint** (optional)
   
   Create a `.env` file if you need to override the API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at http://localhost:5173

4. **Build for production**
   ```bash
   npm run build
   ```
   
   Output will be in the `dist/` directory.

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
app/
├── src/
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles
│   │
│   ├── components/
│   │   ├── BengkelMotorApp.jsx   # Main app component
│   │   ├── index.js              # Component exports
│   │   │
│   │   ├── common/               # Shared components
│   │   │   ├── Loading.jsx
│   │   │   ├── MaintenanceCard.jsx
│   │   │   └── TransactionRow.jsx
│   │   │
│   │   ├── forms/                # Form components
│   │   │   ├── MaintenanceForm.jsx
│   │   │   ├── RewardForm.jsx
│   │   │   ├── ServiceForm.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── VehicleForm.jsx
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/                # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── RewardsPage.jsx
│   │   │   ├── TransactionsPage.jsx
│   │   │   ├── CustomersPage.jsx
│   │   │   ├── VehiclesPage.jsx
│   │   │   ├── MaintenancePage.jsx
│   │   │   ├── SchedulePage.jsx
│   │   │   └── HistoryPage.jsx
│   │   │
│   │   └── ui/                   # UI components
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       ├── Card.jsx
│   │       └── ...
│   │
│   ├── contexts/                 # React contexts
│   │   ├── AuthContext.jsx      # Authentication state
│   │   ├── DataContext.jsx      # App data state
│   │   └── index.js
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useForm.js           # Form state management
│   │   ├── useModal.js          # Modal state management
│   │   ├── useSearch.js         # Search functionality
│   │   └── index.js
│   │
│   ├── services/                 # API services
│   │   ├── api.js               # Base API configuration
│   │   ├── authService.js       # Authentication API
│   │   ├── maintenanceService.js
│   │   ├── rewardService.js
│   │   ├── serviceService.js
│   │   ├── transactionService.js
│   │   ├── vehicleService.js
│   │   └── index.js
│   │
│   ├── utils/                    # Utility functions
│   │   ├── filters.js           # Data filtering
│   │   ├── formatters.js        # Data formatting
│   │   └── index.js
│   │
│   └── constants/                # App constants
│       ├── menuItems.js         # Navigation menu
│       └── index.js
│
├── public/                       # Static assets
│   ├── manifest.json            # PWA manifest
│   ├── service-worker.js        # Service worker
│   └── icons/                   # App icons
│
├── index.html                   # HTML template
├── package.json
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── postcss.config.js           # PostCSS config
```

## 🎯 Features

### Authentication & Authorization
- User login and registration
- JWT-based authentication
- Role-based access control (Admin/User)
- Persistent login with localStorage
- Auto-logout on token expiration

### Dashboard
- Overview statistics
- Recent transactions
- Quick actions
- Customer insights

### Service Management (Admin)
- Create, read, update, delete services
- Service categorization
- Pricing management
- Duration tracking

### Customer Management (Admin)
- View customer profiles
- Customer history
- Contact information
- Loyalty points tracking

### Vehicle Management
- Add customer vehicles
- Track vehicle details (plate, brand, model, year)
- Link vehicles to customers
- Service history per vehicle

### Transaction Management
- Create service transactions
- Multi-service transactions
- Automatic loyalty points calculation
- Transaction history
- Status tracking (pending, completed, cancelled)

### Loyalty Program
- Earn points with transactions
- View point balance
- Browse available rewards
- Redeem rewards with points
- Transaction history with points earned

### Maintenance Scheduling
- Schedule upcoming maintenance
- View maintenance calendar
- Automatic reminders
- Mark maintenance as completed
- Service type tracking

### Push Notifications (PWA)
- Subscribe to push notifications
- Maintenance reminders
- Special offers
- Service updates

### Responsive Design
- Mobile-first approach
- Works on all device sizes
- Touch-friendly interface
- Optimized for both mobile and desktop

## 🔐 User Roles

### Admin
- Full access to all features
- Manage services, rewards, transactions
- View all customers and vehicles
- Create and manage user accounts

### User (Customer)
- View services
- Manage personal vehicles
- View transaction history
- Earn and redeem loyalty points
- Schedule maintenance

## 🛠️ Technology Stack

- **React 18** - UI library with hooks
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management
- **Fetch API** - HTTP requests
- **Service Worker** - PWA offline support
- **Web Push API** - Push notifications

## 📡 API Integration

The app communicates with the backend API using a centralized service layer.

### API Configuration

Edit `src/services/api.js` to configure the API base URL:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Service Files

Each feature has a dedicated service file:

- **authService.js** - Login, register, token management
- **serviceService.js** - Service CRUD operations
- **vehicleService.js** - Vehicle management
- **transactionService.js** - Transaction operations
- **rewardService.js** - Reward and redemption
- **maintenanceService.js** - Maintenance scheduling

### Authentication Flow

```javascript
// Login
const response = await authService.login(email, password);
// Token is automatically stored and added to subsequent requests

// Protected API calls
const services = await serviceService.getAll();
// Authorization header is automatically added
```

## 🎨 Styling

### Tailwind CSS
The app uses Tailwind utility classes for styling:

```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Click me
</button>
```

### Custom Styles
Global styles are in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
}
```

## 🔄 State Management

### Auth Context
Manages authentication state across the app:

```jsx
const { isLoggedIn, currentUser, login, logout } = useAuth();
```

### Data Context
Manages app data (services, customers, vehicles, etc.):

```jsx
const {
  services,
  customers,
  vehicles,
  addService,
  updateService,
  deleteService
} = useData();
```

## 🪝 Custom Hooks

### useForm
Manage form state and validation:

```jsx
const { form, handleChange, resetForm, setFormData } = useForm({
  name: '',
  email: ''
});
```

### useModal
Manage modal state:

```jsx
const { isOpen, modalType, openModal, closeModal } = useModal();
```

### useSearch
Filter data with search:

```jsx
const { searchTerm, setSearchTerm, filteredData } = useSearch(data, ['name', 'email']);
```

## 📱 PWA Features

### Installation
Users can install the app on their devices:
1. Visit the app in a browser
2. Click "Install" or "Add to Home Screen"
3. The app appears as a standalone application

### Offline Support
- Service Worker caches essential assets
- App works offline with cached data
- Background sync for pending actions

### Push Notifications
1. **Subscribe**: Request notification permission
2. **Receive**: Get push notifications from the backend
3. **Interact**: Click notifications to open relevant pages

### Manifest Configuration
Edit `public/manifest.json`:

```json
{
  "name": "Bengkel Motor",
  "short_name": "Bengkel",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1e40af",
  "background_color": "#ffffff",
  "icons": [...]
}
```

## 🧪 Development Tips

### Component Structure
```jsx
// components/MyComponent.jsx
import React from 'react';

const MyComponent = ({ title, onAction }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default MyComponent;
```

### Context Usage
```jsx
// Provide context
<AuthProvider>
  <DataProvider>
    <App />
  </DataProvider>
</AuthProvider>

// Consume context
const { currentUser } = useAuth();
```

### API Calls with Error Handling
```jsx
try {
  const response = await serviceService.create(data);
  // Handle success
} catch (error) {
  console.error('Error:', error.message);
  // Handle error
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Bengkel Motor
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Build Configuration

Edit `vite.config.js`:

```javascript
export default {
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
}
```

## 🚀 Deployment

### Docker
The app is served by Nginx in the Docker setup. See the root [README.md](../README.md).

### Static Hosting
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting provider (Netlify, Vercel, etc.)
3. Configure environment variables on your hosting platform

### Nginx Configuration
```nginx
location /app {
  alias /usr/share/nginx/html/app;
  try_files $uri $uri/ /app/index.html;
}
```

## 🎯 Performance Optimization

### Code Splitting
```jsx
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### Image Optimization
- Use appropriate image formats (WebP)
- Lazy load images
- Use responsive images

### Bundle Size
- Use production build
- Enable tree shaking
- Remove unused dependencies

## 🐛 Debugging

### React DevTools
Install React DevTools browser extension for component inspection.

### Console Logging
```javascript
console.log('Debug:', data);
console.error('Error:', error);
```

### Network Tab
Monitor API calls in browser DevTools Network tab.

## 🔒 Security

- ✅ JWT tokens stored in localStorage
- ✅ Tokens automatically added to requests
- ✅ Auto-logout on token expiration
- ✅ Role-based access control
- ⚠️ Use HTTPS in production
- ⚠️ Implement CSRF protection
- ⚠️ Sanitize user input
- ⚠️ Rate limit API calls

## 🤝 Contributing

1. Follow existing component structure
2. Use TypeScript-style JSDoc comments
3. Keep components under 200 lines
4. Write meaningful prop names
5. Test responsive design
6. Update this README for new features

## 📄 License

MIT License

---

For the complete project, see the root [README.md](../README.md)
