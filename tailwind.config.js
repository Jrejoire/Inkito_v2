module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: theme => ({
        '11/12': '91.666667%'
      })
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    minWidth: {
      '0': '0',
      '1/12': '8.33%',
      '2/12': '16.66%',
      '3/12': '25%',
      '4/12': '33.33%',
      '5/12': '41.66%',
      '6/12': '50%',
      '7/12': '58.33%',
      '8/12': '66.66%',
      '9/12': '75%',
      '10/12': '83.33%',
      '11/12': '91.66%',
      'full': '100%',
    }
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    extend: {
      visibility: ['hover', 'focus'],
    },
  },
  plugins: [],
}