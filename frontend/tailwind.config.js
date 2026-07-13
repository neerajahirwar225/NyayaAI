/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Toggle dark mode support
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0b0f19',       // Deep navy background
          card: 'rgba(17, 24, 39, 0.7)', // Translucent card background
          accent: '#6366f1',   // Electric Indigo
          accentLight: '#818cf8',
          accentDark: '#4f46e5',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          text: '#f3f4f6',     // Bright gray text
          textMuted: '#9ca3af' // Muted gray text
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
