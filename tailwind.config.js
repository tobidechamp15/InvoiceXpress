/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: { max: '639px' },
      xsm: { max: '767px' },
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
