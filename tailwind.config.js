/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'discord-dark': '#2c2f33',
        'discord-blurple': '#5865f2',
      },
      animation: {
        'star-fall': 'fall 50s linear infinite',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-200px)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}