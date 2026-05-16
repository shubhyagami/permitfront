/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6E3',
        offwhite: '#F5F0E8',
        teal: { DEFAULT: '#008080', dark: '#006666' },
        mustard: { DEFAULT: '#D4A017', dark: '#B8920F' },
        olive: '#556B2F',
        navy: { DEFAULT: '#1B2A47', dark: '#0F1A2E' },
        'br-cyan': '#00E5FF',
        'br-magenta': '#FF00FF',
        'br-amber': '#FFB000',
        'br-dark': '#0A0E1A',
        'br-dark-card': '#121828',
        'status-active': '#008080',
        'status-expiring': '#D4A017',
        'status-expired': '#C53030',
        'alert-yellow': '#FDF3D6',
        'alert-red': '#FDF0F0',
        'alert-green': '#F0FDF4',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        space: ['Space Mono', 'monospace'],
        worksans: ['Work Sans', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        },
        neonPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        rain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitch 0.3s ease-in-out',
        neonPulse: 'neonPulse 2s ease-in-out infinite',
        rain: 'rain 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}
