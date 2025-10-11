/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#94a3b8",
        tertiary: "#1e293b",
        accent: "#06b6d4",
        "accent-light": "#22d3ee",
        "accent-dark": "#0891b2",
        "accent-orange": "#f97316",
        "accent-pink": "#ec4899",
        "black-100": "#1e293b",
        "black-200": "#0f172a",
        "white-100": "#f1f5f9",
        "gradient-start": "#06b6d4",
        "gradient-end": "#f97316",
        "neon-cyan": "#00ffff",
        "neon-orange": "#ff6b00",
      },
      boxShadow: {
        card: "0px 10px 40px -5px rgba(6, 182, 212, 0.3)",
        "card-hover": "0px 20px 60px -10px rgba(6, 182, 212, 0.6)",
        glow: "0 0 30px rgba(6, 182, 212, 0.7)",
        "glow-lg": "0 0 50px rgba(6, 182, 212, 0.8)",
        neon: "0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.4)",
        "neon-orange":
          "0 0 10px rgba(249, 115, 22, 0.8), 0 0 20px rgba(249, 115, 22, 0.6)",
        brutal: "8px 8px 0px rgba(6, 182, 212, 1)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slideUp 0.5s ease-out",
        bounce: "bounce 1s infinite",
        "spin-slow": "spin 3s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(6, 182, 212, 1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
