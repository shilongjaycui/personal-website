module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'piazzolla': ['"Piazzolla"', 'serif']
      },
      backgroundImage: {
        'stroke': "url('/src/images/home/stroke.png')",  // downloaded from https://www.vhv.rs/viewpic/hbihbTJ_black-brush-stroke-png-transparent-png/
        'cyborg_commando': "url('/src/images/home/cyborg_commando.png')",
        'stone_army': "url('/src/images/home/stone_army.png')",
        'cyborg': "url('/src/images/home/cyborg.png')",
      }
    },
    screens: {
      iPhone: { max: '897px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
      iPad: { min: '898px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).
      MacBook: { min: '1200px' },
    },
  },
  plugins: [],
}
