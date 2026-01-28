/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000", // merah
        secondary: "#FFD700", // kuning
        dark: "#1A1A1A", // hitam
        grayish: "#808080", // abu
      },
    },
  },
  plugins: [],
}
