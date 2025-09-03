/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-square': 'var(--light-square)',
        'dark-square': 'var(--dark-square)',
      },
    },
  },
  plugins: [],
};