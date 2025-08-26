/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '80': '80%',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '-500%' },
          '100%': { backgroundPosition: '500%' },
        },
      },
      animation: {
        shine: 'shine 3s linear infinite',
      },
      colors: {
        // 🌙 Dark Futuristic
        darkBg: "#0E0E0F",
        darkAccent: "#00F5D4",
        darkAccent2: "#3A86FF",
        darkHighlight: "#FF4D6D",
        darkText: "#E5E5E5",
        darkMuted: "#9CA3AF",

        // ☀️ Light Mode
        lightBg: "#F9FAFB",
        lightAccent: "#2563EB",
        lightAccent2: "#2DD4BF",
        lightHighlight: "#F87171",
        lightText: "#1F2937",
        lightMuted: "#6B7280",

        // 🎨 Gradient stops (flattened)
        gradientCyanBlue: "#00F5D4",
        gradientCyanBlue2: "#3A86FF",
        gradientPurplePink: "#A78BFA",
        gradientPurplePink2: "#FF4D6D",
      },
    },
  },
  plugins: [],
};
