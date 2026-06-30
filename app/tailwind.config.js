/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#E6EAEF",
        panel: "#EDF1F6",
        ink: "#2D3748",
        muted: "#8A94A6",
        accent: "#E0463B",
        accentDark: "#C23A30",
        ok: "#3BA776",
        warn: "#E0A23B",
        card: "#F4F6FA",
        footerInk: "#232A33",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        "soft-sm": "-3px -3px 8px rgba(255,255,255,0.75), 3px 3px 8px rgba(163,177,198,0.40)",
        soft: "-6px -6px 14px rgba(255,255,255,0.80), 6px 6px 16px rgba(163,177,198,0.45)",
        "soft-lg": "-10px -10px 24px rgba(255,255,255,0.85), 10px 10px 28px rgba(163,177,198,0.50)",
        "soft-in": "inset -4px -4px 10px rgba(255,255,255,0.70), inset 4px 4px 10px rgba(163,177,198,0.45)",
        "soft-in-sm": "inset -2px -2px 5px rgba(255,255,255,0.65), inset 2px 2px 5px rgba(163,177,198,0.40)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
}
