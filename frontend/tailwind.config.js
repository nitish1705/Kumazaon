/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          light: '#232F3E',
          DEFAULT: '#131921',
          yellow: '#FEBD69',
          orange: '#f08804'
        }
      }
    },
  },
  plugins: [],
}

