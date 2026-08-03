/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f2', 100: '#e0ebe1', 200: '#c2d7c5', 300: '#97b89c',
          400: '#6b9472', 500: '#4a774f', 600: '#385f3d', 700: '#2d4c31',
          800: '#243d28', 900: '#1e3322', 950: '#0f1d12',
        },
        gold: {
          50: '#fbf7ed', 100: '#f6ebcf', 200: '#ecd49b', 300: '#e0b85f',
          400: '#d6a23c', 500: '#c4882a', 600: '#a66a21', 700: '#854f1e',
          800: '#6d401f', 900: '#5c361e', 950: '#331a0c',
        },
        clay: {
          50: '#fbf4f0', 100: '#f6e5da', 200: '#eccab6', 300: '#e0a888',
          400: '#d2825f', 500: '#c26743', 600: '#a85236', 700: '#8a402e',
          800: '#71362b', 900: '#5e2f27', 950: '#341512',
        },
        sand: {
          50: '#faf8f3', 100: '#f3efe3', 200: '#e7ddc6', 300: '#d8c69e',
          400: '#c9ad77', 500: '#bd9759', 600: '#a87d49', 700: '#8a643e',
          800: '#70523a', 900: '#5d4533', 950: '#33271c',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
