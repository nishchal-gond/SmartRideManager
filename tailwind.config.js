/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B0F14',
        'bg-card': '#121A22',
        'accent': '#00F0FF',
        'text-primary': '#EAF6FF',
        'warning': '#FFB020',
        'danger': '#FF2E2E',
      },
    },
  },
  plugins: [],
}
