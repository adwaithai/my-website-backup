/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary
        teal: {
          deep: '#0B3D3E',
          med: '#147D78',
          aqua: '#42B8AE',
        },
        // Backgrounds
        ivory: '#F8F7F2',
        mint: '#DDF3EE',
        // Text
        charcoal: '#172525',
        muted: '#657474',
        // Premium accent
        gold: '#D6B878',
        // Status
        healthy: '#3C9D73',
        attention: '#D69A3A',
        concern: '#C95757',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(11, 61, 62, 0.06), 0 1px 2px 0 rgba(11, 61, 62, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(11, 61, 62, 0.10), 0 2px 8px -2px rgba(11, 61, 62, 0.06)',
        'card-lg': '0 12px 40px -6px rgba(11, 61, 62, 0.14)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'progress': 'progress 2.5s ease-in-out forwards',
        'scan': 'scan 3s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.6' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(0.85)', opacity: '0' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(180px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
