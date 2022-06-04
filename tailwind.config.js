module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'piazzolla': ['"Piazzolla"', 'serif']
      },
      backgroundImage: {
        'stroke': "url('/src/images/home/stroke.png')",
      }
    },
  },
  plugins: [],
}
