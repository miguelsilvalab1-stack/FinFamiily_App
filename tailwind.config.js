/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4332',
          dark: '#0F2419',
          light: '#2D6A4F'
        },
        secondary: {
          DEFAULT: '#2D6A4F',
          light: '#40916C'
        },
        income: '#40916C',
        expense: '#E63946',
        background: {
          light: '#F8F9FA',
          dark: '#1A1A2E'
        },
        text: {
          light: '#212529',
          dark: '#E9ECEF'
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif']
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
