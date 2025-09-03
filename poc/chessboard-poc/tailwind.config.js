/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Document 18 Research #1: Custom 8x8 grid
      gridTemplateColumns: {
        '8': 'repeat(8, 1fr)',
      },
      gridTemplateRows: {
        '8': 'repeat(8, 1fr)',
      },
      // Document 18 Research #5: CSS variables for themes
      colors: {
        'light-square': 'var(--light-square)',
        'dark-square': 'var(--dark-square)',
      },
    },
  },
  plugins: [],
}

