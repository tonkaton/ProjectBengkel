/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft UI palette
        base: "#E6EAEF",      // page background
        panel: "#EDF1F6",     // raised cards / nav
        ink: "#2D3748",       // primary text (slate)
        muted: "#8A94A6",     // secondary text
        accent: "#E0463B",    // brand red — dipakai hemat
        accentDark: "#C23A30",
        ok: "#3BA776",        // status sukses
        warn: "#E0A23B",      // status warning
        // kartu near-white
        card: "#F4F6FA",
        // tint background per section (biar gak monoton)
        tintWarm: "#F1EBE4",
        tintBlue: "#E4EAF2",
        tintMint: "#E5F0EA",
        tintLav: "#ECEAF5",
        tintCream: "#F2EDE4",
        footerInk: "#232A33",
        // legacy (biar komponen lama gak error)
        primary: "#E0463B",
        secondary: "#FFD700",
        dark: "#1A1A1A",
        grayish: "#808080",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        // dual-shadow neumorphism
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
