/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#242424',
        'gunmetal-grey': '#818589'
      }
    },
    fontFamily: {
      'Coiny': ['Coiny', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: [],
}

