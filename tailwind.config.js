/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '80': '80%', // This defines the background size
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '-500%' },
          '100%': { 'background-position': '500%' },
        },
      },
      animation: {
        shine: 'shine 3s linear infinite', // Custom animation
      },
    },
  },
  plugins: [],
}