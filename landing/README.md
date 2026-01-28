# Bengkel Motor - Landing Page

Modern, responsive landing page for the Bengkel Motor workshop. Built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   
   The landing page will be available at http://localhost:5173

3. **Build for production**
   ```bash
   npm run build
   ```
   
   Output will be in the `dist/` directory.

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
landing/
├── src/
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── styles.css           # Global styles
│   ├── components/
│   │   ├── navbar.jsx       # Navigation bar component
│   │   ├── forms/           # Form components
│   │   ├── layout/          # Layout components
│   │   ├── navbar/          # Navbar subcomponents
│   │   ├── sections/        # Page sections (Hero, Services, etc.)
│   │   └── ui/              # Reusable UI components
│   ├── constants/
│   │   ├── config.js        # App configuration
│   │   ├── navigation.js    # Navigation menu items
│   │   └── testimonials.js  # Testimonial data
│   ├── hooks/
│   │   ├── useDropdown.js   # Dropdown state management
│   │   ├── useForm.js       # Form state management
│   │   ├── useMobileMenu.js # Mobile menu state
│   │   └── useScroll.js     # Scroll position tracking
│   └── utils/
│       ├── classNames.js    # CSS class utility
│       ├── formatters.js    # Data formatting utilities
│       └── icons.jsx        # Icon components
├── assets/                  # Static assets (images, fonts)
├── index.html              # HTML template
├── package.json
├── vite.config.mjs         # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## 🎨 Features

### Responsive Design
- Mobile-first approach
- Breakpoints for all device sizes
- Touch-friendly navigation

### Smooth Animations
- Powered by Framer Motion
- Scroll-triggered animations
- Smooth page transitions
- Interactive hover effects

### Modern UI
- Clean, professional design
- Tailwind CSS utility classes
- Custom color palette
- Lucide React icons

### Sections
1. **Hero Section** - Eye-catching introduction with CTA
2. **Services** - Showcase of workshop services
3. **About** - Company information and values
4. **Testimonials** - Customer reviews and feedback
5. **Gallery** - Photo showcase (optional)
6. **Contact** - Contact form and information
7. **Footer** - Links and additional information

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
        // ... more colors
      }
    }
  }
}
```

### Navigation
Edit `src/constants/navigation.js` to modify menu items:

```javascript
export const navigationItems = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  // ... more items
];
```

### Content
Update content in the respective section components:
- `src/components/sections/Hero.jsx`
- `src/components/sections/Services.jsx`
- `src/components/sections/About.jsx`
- etc.

### Assets
Place images and other assets in the `assets/` directory and import them in your components:

```jsx
import logo from '../assets/logo.png';
```

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Build Configuration

### Vite Config (`vite.config.mjs`)
Customize build settings, plugins, and development server:

```javascript
export default {
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
}
```

### Tailwind Config (`tailwind.config.js`)
Configure Tailwind with custom theme extensions:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Custom configuration
    }
  }
}
```

## 🌐 Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting provider

### Docker
The landing page is served by Nginx in the Docker setup. See the root [README.md](../README.md) for Docker instructions.

### Environment Variables
Create a `.env` file if needed:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_URL=http://localhost/app
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🎯 Performance Optimization

### Built-in Optimizations
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Lazy loading
- ✅ Asset optimization

### Additional Tips
1. **Image Optimization**: Use WebP format and appropriate sizes
2. **Font Loading**: Preload critical fonts
3. **CSS Purging**: Tailwind automatically removes unused styles
4. **Lazy Loading**: Use React.lazy() for route-based code splitting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🧪 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR. Changes appear immediately without full page reload.

### Component Development
1. Keep components small and focused
2. Use custom hooks for reusable logic
3. Extract constants to separate files
4. Use PropTypes for type checking

### Styling Guidelines
1. Use Tailwind utility classes first
2. Create custom utilities for repeated patterns
3. Use @apply for component-specific styles
4. Keep the utility-first approach

## 🔍 SEO Optimization

### Meta Tags
Update meta tags in `index.html`:

```html
<meta name="description" content="Your description">
<meta property="og:title" content="Bengkel Motor">
<meta property="og:description" content="Your description">
<meta property="og:image" content="/og-image.jpg">
```

### Performance
- Optimize images (size and format)
- Minimize bundle size
- Use proper heading hierarchy (h1, h2, h3)
- Add alt text to images
- Ensure fast loading times

## 🤝 Contributing

1. Follow the existing code style
2. Use meaningful component names
3. Keep components under 200 lines
4. Write descriptive commit messages
5. Test responsive design on multiple devices

## 📄 License

MIT License

---

For the complete project, see the root [README.md](../README.md)

