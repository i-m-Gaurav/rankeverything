/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        void: "#08080c",
        deep: "#0e0e14",
        surface: "#151520",
        elevated: "#1c1c2a",
        gold: {
          DEFAULT: "#f5b22d",
          dim: "rgba(245, 178, 45, 0.15)",
          glow: "rgba(245, 178, 45, 0.4)",
        },
        amber: "#e8930c",
        rose: "#f43f5e",
        emerald: "#34d399",
        violet: "#a78bfa",
      },
    },
  },
  plugins: [],
};
