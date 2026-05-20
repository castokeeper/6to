/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B6E3F',
          dark: '#1B5E30',
          light: '#4CAF50',
        },
        accent: '#FF6B4A',
        bg: '#F0F2F5',
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1A2E1A',
        },
        txt: {
          DEFAULT: '#1A1A1A',
          secondary: '#6B7280',
          light: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
};
