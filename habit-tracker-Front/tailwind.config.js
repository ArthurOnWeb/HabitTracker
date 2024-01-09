/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF567B'
      },
      fontFamily:{
        custom: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

