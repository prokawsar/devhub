/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#633cff',
        'primary-hover': '#efebff',

        'disabled-bg': '#ccc',
        'disabled-text': '#666',
      },
    },
  },
  plugins: [],
}
