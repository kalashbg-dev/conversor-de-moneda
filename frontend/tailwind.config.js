import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',
          100: '#E6F1FF',
          200: '#CCE3FF',
          300: '#99C7FF',
          400: '#66ABFF',
          500: '#3390FF',
          600: '#0066FF',
          700: '#0052CC',
          800: '#003D99',
          900: '#002966',
        },
        surface: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#EEEEEE',
          400: '#E0E0E0',
        },
        converter: {
          primary: '#E5133A',
        }
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            primary: {
              DEFAULT: '#0066FF',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#F0F7FF',
              foreground: '#0066FF',
            },
          },
        },
        dark: {
          colors: {
            background: '#0D1117',
            primary: {
              DEFAULT: '#3390FF',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#1F2937',
              foreground: '#3390FF',
            },
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
      },
    }),
  ],
};