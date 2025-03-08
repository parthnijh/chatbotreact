/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'max-1024': { 'max': '1024px' },
        'max-667': { 'max': '667px' },
      },
    },
  },
  plugins: [],
}

