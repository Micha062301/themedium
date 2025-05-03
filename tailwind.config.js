/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'charter': ['Charter', 'Georgia', 'serif'],
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'medium-black': '#000',
        'medium-white': '#fff',
        'medium-gray': '#F7F7F7',
        'medium-green': '#03a87c',
        'medium-border': '#E6E6E6',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
