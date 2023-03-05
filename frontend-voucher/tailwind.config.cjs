/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    screens: {
      xs: '568px',
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: 'Open Sans, Arial, sans-serif',
    },
    extend: {
      colors: {
        white: '#fff',
        black: 'hsl(0, 0%, 20%)',
        pink: {
          300: 'hsl(334, 24%, 45%)',
          400: 'hsl(334, 79%, 43%)',
          500: 'hsl(334, 79%, 50%)',
          600: 'hsl(334, 79%, 60%)',
          700: 'hsl(334, 79%, 70%)',
          800: 'hsl(334, 79%, 85%)',
          900: 'hsl(334, 79%, 90%)',
        },
        gray: {
          100: 'rgb(243 244 246)',
          200: 'rgb(229 231 235)',
          300: 'rgb(209 213 219)',
          400: 'rgb(156 163 175)',
          500: 'rgb(107 114 128)',
          600: 'rgb(75 85 99)',
          700: 'rgb(55 65 81)',
        },
      },
    },
  },
  plugins: [],
};
