import {
  Navbar,
  Hero,
  About,
  Services,
  Testimonials,
  Contact,
  Footer,
} from './components';

/**
 * Main App component
 * Landing page for Sintink Garage Performance
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans scroll-smooth">
      <Navbar />
      <Hero />
      <main className="flex-grow">
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
