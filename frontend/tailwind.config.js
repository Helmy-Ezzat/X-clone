/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      'light',
      {
        black: {
          ...require('daisyui/src/theming/themes')['black'],
          primary: 'rgb(29,155,240)',
          secondary: 'rgb(24,24,24)',
        },
      },
    ],
  },
}
