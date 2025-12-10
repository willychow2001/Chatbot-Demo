/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#1c1c1c',
        'chat-secondary': '#2e2e2e',
        'chat-accent': '#00d4ff', // High contrast cyan
      },
    },
  },
  plugins: [],
}
