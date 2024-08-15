/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        "blue-1000": "#0D1326",
      },
      backgroundImage: {
        "blue-diagonal": "url('assets/blue-diagonal.jpg')",
        "search-icon": "url('assets/search.svg')",
        "down-icon": "url('assets/down.svg')",
      },
    },
  },
  plugins: [],
};
