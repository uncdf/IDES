module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#000099',
          400: '#3333cc',
          300: '#6666ff',
          200: '#9999ff',
          100: '#ccccff'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
