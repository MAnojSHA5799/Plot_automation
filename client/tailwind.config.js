/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#b3c7ff',
          400: '#809fff',
          500: '#4d77ff',
          600: '#1a4fff',
          700: '#0036e6',
          800: '#002bb3',
          900: '#001f80',
        },
      },
    },
  },
  plugins: [],
}
