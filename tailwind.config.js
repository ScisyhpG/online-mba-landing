/** @type {import('tailwindcss').Config} */
module.exports = {
  // This tells Tailwind to scan all your HTML and JS files for class names
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        prata: ['Prata', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#2d618e', dark: '#0f172a', 900: '#2d618e', 800: '#234b6e',
          orange: '#f57238', sky: '#4ac4d0', skyLight: '#e0f7f9',
          brown: '#c0a480', brownLight: '#f5efe6', white: '#ffffff',
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(74, 196, 208, 0.3)',
        'glow-orange': '0 0 20px rgba(245, 114, 56, 0.3)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fadeUp': 'fadeUp 1s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'fadeUp': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}