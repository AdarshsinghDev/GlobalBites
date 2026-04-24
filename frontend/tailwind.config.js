/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Backgrounds
        'bg-base': '#F7F4EF',
        'bg-surface': '#FFFFFF',
        'bg-muted': '#F0EDE6',
        'bg-sunken': '#EAE6DC',
        
        // Brand Greens
        'green-900': '#0F3D24',
        'green-700': '#1A6B3C',
        'green-500': '#2D9B5A',
        'green-300': '#7AC99A',
        'green-100': '#D4EDDA',
        'green-50': '#EDF7F1',
        
        // Warm Accents
        'butter': '#F5E6B2',
        'butter-dark': '#D4A843',
        'terracotta': '#C9614A',
        'cream-pink': '#F2DDD6',
        
        // Neutrals
        'text-primary': '#1A1814',
        'text-secondary': '#5C5849',
        'text-muted': '#9A9485',
        'border': '#E0DBD0',
        'border-strong': '#C8C2B5',
        
        // Feedback
        'success-bg': '#EDF7F1',
        'success-text': '#1A6B3C',
        'error-bg': '#FDF2EF',
        'error-text': '#C9614A',
        'warning-bg': '#FDF6E3',
        'warning-text': '#9A6F00',
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(48px, 6vw, 80px)',
        'h1': 'clamp(32px, 4vw, 52px)',
        'h2': 'clamp(24px, 3vw, 36px)',
        'h3': '20px',
        'body': '16px',
        'small': '13px',
        'label': '11px',
        'number': '14px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
        'pill': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 4px rgba(26,24,20,0.06)',
        'md': '0 4px 16px rgba(26,24,20,0.08), 0 1px 3px rgba(26,24,20,0.04)',
        'lg': '0 12px 40px rgba(26,24,20,0.10), 0 2px 8px rgba(26,24,20,0.05)',
        'hover': '0 20px 60px rgba(26,24,20,0.13), 0 4px 12px rgba(26,24,20,0.06)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(2deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 1.6s infinite',
        'shake': 'shake 0.35s ease-in-out',
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'spin-slow': 'spin-slow 3s linear infinite',
      },
      spacing: {
        '18': '72px',
        '30': '120px',
        '96': '384px',
      },
    },
  },
  plugins: [],
}