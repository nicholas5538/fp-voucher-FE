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
    },
    fontFamily: {
      sans: 'Open Sans, Arial, sans-serif',
    },
    extend: {},
  },
  plugins: [],
};
