/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gta: {
          pink:   '#FF1F6D',
          orange: '#FF6B00',
          cyan:   '#00E5FF',
          purple: '#8B00FF',
          yellow: '#FFE600',
          green:  '#39FF14',
          dark:   '#05050F',
          dark2:  '#0C0C1E',
        },
      },
      fontFamily: {
        bebas:    ['"Bebas Neue"', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono:     ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'grid-scroll':  'gridScroll 7s linear infinite',
        'star-flicker': 'starFlicker 1.5s ease-in-out infinite',
        'ping-glow':    'pingGlow 2s ease-in-out infinite',
        'bounce-scroll':'bounceScroll 2.2s ease-in-out infinite',
        'fade-up':      'fadeUp .9s ease both',
        'border-glow':  'borderGlow 3s ease-in-out infinite',
        'name-pulse':   'namePulse 2s ease-in-out infinite',
        'blink':        'blink 1s step-end infinite',
        'typing':       'typing 1.2s ease-in-out infinite',
        'glitch1':      'glitch1 4s infinite',
        'glitch2':      'glitch2 4s infinite',
      },
      keyframes: {
        gridScroll:   { '0%':{'background-position':'0 0'}, '100%':{'background-position':'0 55px'} },
        starFlicker:  { '0%,100%':{opacity:1},'50%':{opacity:.45} },
        pingGlow:     { '0%,100%':{'box-shadow':'0 0 8px #00E5FF'},'50%':{'box-shadow':'0 0 22px #00E5FF, 0 0 40px rgba(0,229,255,.3)'} },
        bounceScroll: { '0%,100%':{transform:'translateX(-50%) translateY(0)'},'50%':{transform:'translateX(-50%) translateY(7px)'} },
        fadeUp:       { from:{opacity:0,transform:'translateY(22px)'}, to:{opacity:1,transform:'translateY(0)'} },
        borderGlow:   { '0%,100%':{'box-shadow':'0 0 8px rgba(0,229,255,.2)'},'50%':{'box-shadow':'0 0 20px rgba(0,229,255,.5)'} },
        namePulse:    { '0%,100%':{filter:'drop-shadow(0 0 30px rgba(255,45,109,.4))'},'50%':{filter:'drop-shadow(0 0 60px rgba(255,45,109,.8))'} },
        blink:        { '0%,100%':{opacity:1},'50%':{opacity:0} },
        typing:       { '0%,100%':{opacity:1},'50%':{opacity:.3} },
        glitch1:      { '0%,90%':{opacity:0},'91%':{opacity:.7,transform:'translateX(4px)'},'93%':{opacity:.7,transform:'translateX(-2px)'},'94%,100%':{opacity:0} },
        glitch2:      { '0%,90%':{opacity:0},'91%':{opacity:.6,transform:'translateX(-4px)'},'93%':{opacity:.6,transform:'translateX(2px)'},'94%,100%':{opacity:0} },
      },
    },
  },
  plugins: [],
}
