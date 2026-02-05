import {
  Navbar,
  Hero,
  About,
  Services,
  Testimonials,
  Booking,   
  Contact,
  Footer,
} from './components';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans scroll-smooth">
      <Navbar />
      <Hero />
      <main className="flex-grow">
        <About />
        <Services />
        <Booking />     
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
