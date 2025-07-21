/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#00dc3c', // Much more saturated green
          600: '#00b82f', // Vibrant green
          700: '#00a026', // Deep saturated green
          800: '#008a1f',
          900: '#006b18',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#00e6a3', // Much more saturated teal
          600: '#00cc92', // Vibrant teal
          700: '#00b380', // Deep saturated teal
          800: '#009a6e',
          900: '#00805c',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00d4ff', // Much more saturated cyan/blue
          600: '#00b8e6', // Vibrant cyan
          700: '#009fcc', // Deep saturated cyan
          800: '#0086b3',
          900: '#006d99',
        },
        // New vibrant yellow for gradients
        yellow: {
          400: '#ffed4a', // Bright yellow
          500: '#ffcd02', // Very saturated yellow
          600: '#e6b800', // Deep yellow
        }
      },
      backgroundImage: {
        'gradient-cricket': 'linear-gradient(135deg, #00dc3c 0%, #00e6a3 100%)', // Much more saturated
        'gradient-cricket-dark': 'linear-gradient(135deg, #00b82f 0%, #00cc92 100%)', // Vibrant dark
        'gradient-page': 'linear-gradient(135deg, #e6fffa 0%, #ccfff5 25%, #ffffcc 50%, #ccf0ff 75%, #e6f3ff 100%)', // Light saturated gradient
        'gradient-page-dark': 'linear-gradient(135deg, #0f172a 0%, #064e3b 30%, #14532d 60%, #134e4a 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        'gradient-card-dark': 'linear-gradient(145deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)',
        'gradient-hero': 'linear-gradient(135deg, #00dc3c 0%, #ffcd02 30%, #00e6a3 60%, #00d4ff 100%)', // Vibrant green-yellow-teal-blue
        'gradient-hero-dark': 'linear-gradient(135deg, #00b82f 0%, #e6b800 30%, #00cc92 60%, #00b8e6 100%)', // Dark vibrant version
        'gradient-header': 'linear-gradient(90deg, #00dc3c 0%, #00e6a3 50%, #00d4ff 100%)', // Saturated header gradient
        'gradient-header-dark': 'linear-gradient(90deg, #00b82f 0%, #00cc92 50%, #00b8e6 100%)', // Dark header gradient
      },
      animation: {
        'slideDown': 'slideDown 0.3s ease-out forwards',
        'slideInLeft': 'slideInLeft 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        slideDown: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-10px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        slideInLeft: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' 
          },
        },
        shimmer: {
          '0%': { 
            backgroundPosition: '-200% center' 
          },
          '100%': { 
            backgroundPosition: '200% center' 
          },
        },
      }
    },
  },
  plugins: [],
}
