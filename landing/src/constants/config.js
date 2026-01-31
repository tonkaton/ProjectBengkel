/**
 * Application configuration constants
 */

// API configuration
// export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL = "https://backend-bengkel.miftadigital.cloud/api";

// App URLs - Main application URL (different from landing page)
export const APP_URL = import.meta.env.VITE_APP_URL;

// Company information
export const COMPANY = {
  name: "Sintink Garage Performance",
  tagline: "Servis Cepat, Hasil Hebat!",
  description:
    "Bengkel motor modern dengan sentuhan profesional. Kami menghadirkan performa maksimal untuk setiap motor — dari servis ringan hingga upgrade performa.",
  address: "Jl. Sintink No. 1, Jakarta",
  phone: "087776131793",
  phoneRaw: "087776131793",
  whatsapp: "6287776131793",
  operationalHours: {
    weekday: "Senin - Sabtu: 08.00 - 18.00",
    weekend: "Minggu: 08.00 - 14.00",
  },
};

// Animation variants for Framer Motion
export const ANIMATION = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  dropdownIn: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
};
