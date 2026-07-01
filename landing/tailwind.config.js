/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft UI palette (CSS variable driven — adaptif light/dark)
        base: "var(--c-base)",
        panel: "var(--c-panel)",
        card: "var(--c-card)",
        ink: "var(--c-ink)",
        ink2: "var(--c-ink2)",
        muted: "var(--c-muted)",
        line: "var(--c-line)",
        hair: "var(--c-hair)",
        accent: "var(--c-accent)",
        accentDark: "var(--c-accent-dark)",
        ok: "var(--c-ok)",
        warn: "var(--c-warn)",
        footerInk: "var(--c-footer)",
        // tint background per section
        tintWarm: "var(--c-tint-warm)",
        tintBlue: "var(--c-tint-blue)",
        tintMint: "var(--c-tint-mint)",
        tintLav: "var(--c-tint-lav)",
        tintCream: "var(--c-tint-cream)",
        // legacy
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
        "soft-sm": "var(--sh-soft-sm)",
        soft: "var(--sh-soft)",
        "soft-lg": "var(--sh-soft-lg)",
        "soft-in": "var(--sh-soft-in)",
        "soft-in-sm": "var(--sh-soft-in-sm)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
}
