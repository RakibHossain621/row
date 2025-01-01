const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  important: true,
  purge: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', ...defaultTheme.fontFamily.sans]
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      'sxxl': '1305px',
      'xxl': '1340px',
      // => @media (min-width: 1340px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        black: '#121212',
        purple8000: '#902185',

        base: {
          100: '#FFFFFF',
          200: '#F7F7F7',
          300: '#ECECEC',
          400: '#D9D9D9',
          500: '#ADADAD',
          600: '#858585',
          700: '#525252',
          800: '#292929',
          900: '#212121',
        },

        blue: {
          100: '#E9F7FD',
          200: '#D3EFFB',
          300: '#A7DFF7',
          400: '#91D9F6',
          500: '#7BD1F3',
          600: '#66C9F1',
          700: '#51C1EF',
          800: '#3EB9EE',
          900: '#2CB1EC',
        },
        pink: {
          50: '#F3E6F1',
          100: '#F9D2E4',
          200: '#F094BF',
          300: '#ED82B4',
          400: '#EB71A9',
          500: '#E95F9E',
          600: '#E74D94',
          700: '#E43C89',
          800: '#E43C89',
          900: '#E1247A',
        },
        error: {
          500: '#DC1C1C',
          600: '#C71414',
          700: '#B20909'
        },
        warning: {
          500: '#DFA102',
          600: '#D19600',
          700: '#C28B00',
        },
        success: {
          500: '#1D8038',
          600: '#187A35',
          700: '#208F40',
        },
        alertGreen: '#24A148',
        BlueViolet: '#86108f',
      },
      backgroundColor:{
        purple: {
          100: '#F3E6F1',
          200: '#E7CDE4',
          300: '#CD9AC8',
          400: '#C182BB',
          500: '#B569AE',
          600: '#A950A0',
          700: '#9C3893',
          800: '#902185',
          900: '#850079',
        },
      },
      outline: {
        purple: '1px solid #902185',
        gray: '1px solid #D9D9D9',
      },
      borderWidth: {
        1: '1px',
      },
      ml:{
        3 : '3px'
      },
      colors: {
        customRight: '#902185',
      },
      margin: {
        '12px': '12px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
