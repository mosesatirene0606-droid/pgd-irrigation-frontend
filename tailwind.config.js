/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#059669",  // emerald
          light: "#10b981",
          dark: "#047857",
        },
        accent: {
          DEFAULT: "#14b8a6",
        }
      }
    },
  },
  plugins: [],
};
