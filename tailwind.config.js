/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 1024px) { ... }

      lg: "1024px",
      // => @media (min-width: 1280px) { ... }
      xl: "1280px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
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
