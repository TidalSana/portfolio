/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        main: '#281d33',
        accent: '#b33e69',
        card: '#393543',
        offwhite: '#fbf9fa',
        /** Status / success (#22c55e); avoids replacing Tailwind default `green-*` scale */
        status: '#22c55e',
      },
      letterSpacing: {
        tighter: '-0.02em',
      },
    },
  },
  plugins: [],
};
