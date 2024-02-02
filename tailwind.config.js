/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sec-pomegranate': {
          '50': '#fff3ed',
          '100': '#ffe4d5',
          '200': '#fec4aa',
          '300': '#fd9b74',
          '400': '#fb673c',
          '500': '#f53e19',
          '600': '#ea260c',
          '700': '#c2180c',
          '800': '#9a1612',
          '900': '#7c1512',
          '950': '#430707',

        },
        'prim-jade': {
          '50': '#edfcf4',
          '100': '#d3f8e2',
          '200': '#aaf0ca',
          '300': '#73e2ac',
          '400': '#3acd8a',
          '500': '#17b472',
          '600': '#0b905b',
          '700': '#09734c',
          '800': '#0a5b3d',
          '900': '#094b34',
          '950': '#042a1e',
        },
        'blue-charcoal': {
          '50': '#f2f8fd',
          '100': '#e4effa',
          '200': '#c3dff4',
          '300': '#8fc6ea',
          '400': '#53a9dd',
          '500': '#2d8dca',
          '600': '#1e71ab',
          '700': '#195b8b',
          '800': '#194d73',
          '900': '#1a4160',
          '950': '#07111a',
        },
        'sun': {
          '50': '#fff9eb',
          '100': '#ffeec6',
          '200': '#ffdd88',
          '300': '#fec44b',
          '400': '#fead21',
          '500': '#f88a08',
          '600': '#dc6403',
          '700': '#b64407',
          '800': '#94340c',
          '900': '#792c0e',
          '950': '#461402',
        },


      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif']
      },


    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    }
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["light"],
  }
}

