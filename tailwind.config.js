/* eslint-env node */

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'louis': ['louis', 'roboto', 'sans-serif']
    },
    colors: {
      grey: {
        DEFAULT: '#636363',
        light: '#F2F2F2',
        line: '#D5D5D5',
        mid: '#B0B0B0'
      },
      blue: {
        DEFAULT: '#1E80AB',
        light: '#27A5DC'
      },
      gold: '#B6862D',
      black: '#202020',
      white: '#FFFFFF',
      error: '#A62829'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
