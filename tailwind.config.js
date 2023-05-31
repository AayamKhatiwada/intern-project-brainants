/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        led: "#00FF9B"
      },
      fontFamily: {
        'item-titles': 'Permanent Marker',
        'item-head': 'Indie Flower',
        'cart-head': 'Indie Flower',
        'cart-titles': 'Permanent Marker',
        'home-titles': 'Dancing Script',
        'nav-fonts': 'Indie Flower',
      }
    },
  },
  plugins: [],
}

