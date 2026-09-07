/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fdf8ef',
        'paper-dark': '#f5ecd8',
        ink: '#1a1a1a',
        muted: '#6b5d4d',
        border: '#e8ddd0',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
