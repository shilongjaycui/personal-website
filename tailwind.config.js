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
        'stroke': "url('/src/images/home/stroke.png')",  // downloaded from https://www.vhv.rs/viewpic/hbihbTJ_black-brush-stroke-png-transparent-png/
      }
    },
    screens: {
      'smartphone': '480px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  },
  plugins: [],
}
