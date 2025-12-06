/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1623',
        surface: '#141B2D', // Dark lighter
        primary: {
          DEFAULT: '#1A42FF',
          dark: '#0A2FE0',
        },
        secondary: {
          DEFAULT: '#00D4B4',
          dark: '#00B89C',
        },
        accent: {
          DEFAULT: '#FF4D4F',
          hover: '#E63E40',
        },
        gray: {
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float 8s ease-in-out infinite reverse',
        'pulse-bg': 'pulse-bg 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin 20s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(5deg)' },
        },
        'pulse-bg': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate(10%, 10%) scale(1.1)', opacity: '0.8' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
