/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#8892a6",
        tertiary: "#0f1729",
        accent: "#3b82f6",
        "accent-light": "#60a5fa",
        "accent-dark": "#2563eb",
        "accent-orange": "#f59e0b",
        "accent-pink": "#ec4899",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
        "card-hover": "0px 15px 40px -8px rgba(0, 0, 0, 0.4)",
        glow: "0 4px 14px 0 rgba(0, 0, 0, 0.2)",
        "glow-lg": "0 6px 20px 0 rgba(0, 0, 0, 0.25)",
        neon: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
        "neon-orange": "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
      },
      screens: {
        xs: "450px",
        // Width at which the navbar tagline fits alongside the full link row.
        // Below this it collides with "About" (xl/1280 is ~90px too narrow).
        "nav-wide": "1380px",
      },
      backgroundImage: {
        "hero-pattern": "url('/herobg.webp')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "spin-slow": "spin 4s linear infinite",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
