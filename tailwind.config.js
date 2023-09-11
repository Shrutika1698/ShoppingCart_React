/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': {'min': '320px', 'max': '767px'},

      'md': {'min': '768px', 'max': '1024px'},

      'lg': {'min': '1025px', 'max': '1275px'},

      'xl': {'min': '1276px', 'max': '1535px'},

      '2xl': {'min': '1536px'},
    }
  },
  plugins: [],
}