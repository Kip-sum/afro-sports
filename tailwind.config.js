/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f7b3f',
        'primary-dark': '#0a5a2d',
        gold: '#d9a31a',
        'gold-dark': '#a67c12',
        secondary: '#2c3e50',
      },
      fontFamily: {
        sans: ['Z003', 'sans-serif'],
        heading: ['Z003', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
