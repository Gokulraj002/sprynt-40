/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff7a00',
          white: '#f5f4f1',
          muted: '#898989',
          black: '#030303',
          ink: '#050505',
          line: 'rgba(255,255,255,0.1)',
          dim: '#aaaaaa',
          faint: '#666666',
        },
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.095em',
        tighter2: '-0.08em',
        tighter3: '-0.055em',
        tighter4: '-0.05em',
        mono: '0.12em',
        widekicker: '0.16em',
        wideeye: '0.18em',
      },
      maxWidth: {
        hero: '1100px',
        content: '1000px',
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        reveal: 'reveal 0.8s ease both',
        'rocket-up': 'rocketUp 0.68s cubic-bezier(.6,0,.85,.3) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        reveal: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        rocketUp: {
          '0%': { transform: 'translateY(0)', filter: 'drop-shadow(0 0 0 rgba(255,122,0,0))' },
          '100%': { transform: 'translateY(-135vh)', filter: 'drop-shadow(0 0 26px rgba(255,122,0,.65))' },
        },
      },
    },
  },
  plugins: [],
};
