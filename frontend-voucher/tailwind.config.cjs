/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': '568px',
      'sm': '640px',
      'md': '768px',
      'lg': '992px', 
    },
    colors: {
      black: "hsl(0, 0%, 20%)",
      pink: {
        300: 'hsl(334, 24%, 45%)',
        400: 'hsl(334, 79%, 43%)',
        500: 'hsl(334, 79%, 50%)',
        800: 'hsl(334, 79%, 85%)',
        900: 'hsl(334, 79%, 90%)',
      }
    },
    fontFamily: {
      sans: 'Open Sans, Arial, sans-serif',
    },
    extend: {},
  },
  plugins: [],
};
