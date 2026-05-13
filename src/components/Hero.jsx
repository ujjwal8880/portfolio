import { useState, useEffect, useRef, useCallback } from 'react'
import { heroStats, personal } from '../data'
import ParticleField from './ParticleField'
import RainCanvas from './RainCanvas'

function MagneticButton({ children, className, style, onClick }) {
  const ref = useRef(null)
  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const cx = r.left + r.width  / 2
    const cy = r.top  + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    el.style.transition = 'transform .1s linear'
    el.style.transform  = `translate(${dx * 0.28}px, ${dy * 0.28}px)`
  }, [])
  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform .55s cubic-bezier(.25,.46,.45,.94)'
    el.style.transform  = 'translate(0,0)'
  }, [])
  return (
    <button ref={ref} className={className} style={style} onClick={onClick}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >{children}</button>
  )
}

export default function Hero({ onView }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  // Trigger achievement when hero is in view
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { onView?.('hero'); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [onView])

  const px = mouse.x
  const py = mouse.y

  return (
    <section id="hero" ref={ref} className="relative w-full overflow-hidden flex items-center justify-center pb-24 md:pb-0" style={{ minHeight: '100vh' }}>
      {/* Sunset BG */}
      <div className="absolute inset-0 hero-bg" />
      {/* Perspective grid — moves slightly with mouse */}
      <div className="absolute inset-0 hero-grid animate-grid-scroll"
        style={{ transform: `perspective(700px) rotateX(60deg) translateY(30%) scale(2.2) translate(${px * 8}px, ${py * 4}px)` }}
      />

      {/* Interactive particles */}
      <ParticleField />
      {/* Rain effect — desktop only */}
      <RainCanvas />

      {/* Palm left — parallax */}
      <div className="absolute bottom-0 left-[-10px] transition-transform duration-75"
        style={{ transform: `translate(${px * -22}px, ${py * -8}px)` }}
      >
        <PalmTree className="w-[160px] md:w-[200px] opacity-85" />
      </div>
      {/* Palm right — parallax (opposite) */}
      <div className="absolute bottom-0 right-[-10px] transition-transform duration-75"
        style={{ transform: `translate(${px * 22}px, ${py * -8}px)` }}
      >
        <PalmTree className="w-[160px] md:w-[200px] opacity-85" mirror />
      </div>

      {/* City — slower parallax */}
      <div className="absolute bottom-0 left-0 w-full transition-transform duration-100"
        style={{ height: '42%', transform: `translate(${px * -8}px, ${py * 3}px)` }}
      >
        <CitySkyline />
      </div>

      {/* Hero copy — gentle parallax */}
      <div className="relative z-10 text-center px-5 transition-transform duration-75"
        style={{ transform: `translate(${px * -4}px, ${py * -4}px)` }}
      >
        <p className="font-mono text-gta-cyan text-[11px] tracking-[7px] mb-4 animate-fade-up"
          style={{ animationDelay: '.4s', textShadow: '0 0 12px #00E5FF' }}
        >
          {personal.heroCaption}
        </p>

        {/* Glitch title */}
        <div className="relative inline-block">
          <h1 className="font-bebas gta-gradient-text animate-name-pulse"
            style={{ fontSize: 'clamp(58px, 13vw, 148px)', lineHeight: .82, letterSpacing: 5 }}
          >
            {personal.firstName}<br />{personal.lastName}
          </h1>
          <span className="font-bebas absolute inset-0 text-gta-cyan animate-glitch1 pointer-events-none opacity-0"
            style={{ fontSize: 'clamp(58px, 13vw, 148px)', lineHeight: .82, letterSpacing: 5 }}
            aria-hidden="true"
          >{personal.firstName}<br />{personal.lastName}</span>
          <span className="font-bebas absolute inset-0 text-gta-pink animate-glitch2 pointer-events-none opacity-0"
            style={{ fontSize: 'clamp(58px, 13vw, 148px)', lineHeight: .82, letterSpacing: 5 }}
            aria-hidden="true"
          >{personal.firstName}<br />{personal.lastName}</span>
        </div>

        <p className="font-rajdhani font-light text-white/80 mt-2 md:mt-3 animate-fade-up"
          style={{ fontSize: 'clamp(12px, 3vw, 22px)', letterSpacing: 5, animationDelay: '.8s' }}
        >
          {personal.tagline}
        </p>

        <div className="inline-block mt-3 md:mt-5 px-4 md:px-5 py-[6px] md:py-2 border border-gta-cyan font-mono text-[9px] md:text-[11px] tracking-[3px] md:tracking-[4px] text-gta-cyan animate-border-glow animate-fade-up"
          style={{ animationDelay: '1s', background: 'rgba(0,229,255,.07)', textShadow: '0 0 8px #00E5FF' }}
        >
          {personal.badge}
        </div>

        {/* Numbers — 2×2 grid on mobile, single row on desktop */}
        <div className="mt-7 md:mt-9 animate-fade-up" style={{ animationDelay: '1.1s' }}>
          {/* Mobile: 2-col grid, show first 4 stats */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 md:hidden">
            {heroStats.slice(0, 4).map(s => (
              <div key={s.lbl} className="text-center">
                <div className="font-bebas text-[34px] text-gta-cyan" style={{ textShadow: '0 0 12px #00E5FF' }}>{s.val}</div>
                <div className="font-mono text-[8px] tracking-[1px] text-white/55 mt-[2px]">{s.lbl}</div>
              </div>
            ))}
          </div>
          {/* Desktop: single flex row */}
          <div className="hidden md:flex justify-center flex-wrap gap-9">
            {heroStats.map((s, i) => (
              <div key={s.lbl} className="flex items-stretch gap-9">
                {i > 0 && <div className="w-px bg-white/15 self-stretch" />}
                <div className="text-center">
                  <div className="font-bebas text-4xl text-gta-cyan" style={{ textShadow: '0 0 16px #00E5FF' }}>{s.val}</div>
                  <div className="font-rajdhani text-[10px] tracking-[3px] text-white/35 mt-1">{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 mt-7 md:mt-10 w-full px-6 md:px-0 animate-fade-up" style={{ animationDelay: '1.3s' }}>
          <MagneticButton
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto clip-btn px-9 py-3 font-bebas text-[15px] tracking-[4px] text-white hover:brightness-125"
            style={{ background: 'linear-gradient(135deg,#FF1F6D,#8B00FF)' }}
          >
            EXPLORE PROFILE
          </MagneticButton>
          <MagneticButton
            onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto clip-btn px-9 py-3 font-bebas text-[15px] tracking-[4px] text-gta-cyan border border-gta-cyan hover:bg-gta-cyan/10"
            style={{ textShadow: '0 0 8px #00E5FF', boxShadow: 'inset 0 0 20px rgba(0,229,255,.08)' }}
          >
            VIEW MISSIONS
          </MagneticButton>
        </div>

        {/* Keyboard shortcuts row — desktop only */}
        <div className="hidden md:flex items-center justify-center gap-3 mt-6 flex-wrap">
          {[
            { key: 'TAB', label: 'WEAPON WHEEL' },
            { key: '`',   label: 'TERMINAL' },
            { key: '↑↑↓↓←→←→BA', label: 'WANTED' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-mono text-[9px] px-2 py-[3px] text-gta-cyan"
                style={{ background: 'rgba(0,229,255,.1)', border: '1px solid rgba(0,229,255,.25)' }}
              >{key}</span>
              <span className="font-mono text-[8px] tracking-[2px] text-white/40">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint — hidden on mobile (NPC button overlaps) */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden md:flex flex-col items-center gap-2 animate-bounce-scroll">
        <span className="font-mono text-[9px] tracking-[4px] text-white/25">SCROLL</span>
        <div className="w-[18px] h-[18px] border-r-2 border-b-2 border-white/25 rotate-45" />
      </div>
    </section>
  )
}

function PalmTree({ className, mirror }) {
  return (
    <svg className={className} viewBox="0 0 180 380" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
    >
      <path d="M90 380 Q85 280 88 200 Q90 140 90 100" stroke="#07071C" strokeWidth="9" fill="none" strokeLinecap="round" />
      {[[-35],[15],[55],[-75],[95],[-110]].map(([r], i) => (
        <ellipse key={i} cx="90" cy="100" rx={65 - i * 5} ry={14 - i * 1} fill="#07071C" transform={`rotate(${r} 90 100)`} />
      ))}
    </svg>
  )
}

function CitySkyline() {
  const buildings = [[0,160,90],[100,120,70],[180,90,80],[270,140,55],[335,95,90],[435,120,65],[510,60,110],[630,105,75],[715,150,55],[780,80,90],[880,125,65],[955,95,95],[1060,65,115],[1185,115,75],[1270,85,65],[1345,135,95]]
  // Hand-placed windows [x, y, flicker-anim, delay-s]
  const windows = [
    [115,167,'winFlickerA',0],[125,167,'winFlickerB',1.2],[115,178,'winFlickerC',0.4],
    [210,110,'winFlickerB',0.7],[222,110,'winFlickerA',1.5],[210,122,'winFlickerD',0.2],
    [355,115,'winFlickerC',0.9],[370,115,'winFlickerA',0.3],[355,128,'winFlickerB',1.8],
    [540,82,'winFlickerD',0.5],[555,82,'winFlickerC',1.1],[570,82,'winFlickerA',0.6],
    [540,95,'winFlickerB',1.4],[555,95,'winFlickerD',0.8],
    [795,112,'winFlickerA',0.2],[807,112,'winFlickerC',1.6],[795,124,'winFlickerB',0.4],
    [1075,85,'winFlickerD',0.7],[1090,85,'winFlickerA',1.3],[1105,85,'winFlickerC',0.1],
    [1075,98,'winFlickerB',0.9],[1090,98,'winFlickerD',1.7],
    [1290,102,'winFlickerA',0.5],[1305,102,'winFlickerC',1.0],[1290,115,'winFlickerB',0.3],
  ]
  return (
    <svg viewBox="0 0 1440 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" width="100%" height="100%">
      <defs>
        <linearGradient id="glow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#FF1F6D"/>
          <stop offset="50%" stopColor="#00E5FF"/>
          <stop offset="100%" stopColor="#8B00FF"/>
        </linearGradient>
      </defs>

      {/* Buildings */}
      {buildings.map(([x,y,w],i)=>(
        <rect key={i} x={x} y={y} width={w} height={260-y} fill={i%2===0?'#07071C':'#09091E'} />
      ))}

      {/* Flickering windows */}
      {windows.map(([x,y,anim,delay],i)=>(
        <rect key={i} x={x} y={y} width={5} height={4} fill="#FFE87A"
          style={{ animation: `${anim} ${3.5+i*0.37}s ease-in-out infinite ${delay}s` }} />
      ))}

      {/* Police strobe on building at x=780 */}
      <rect x={800} y={95} width={6} height={6} style={{ animation: 'polStrobe .6s step-end infinite' }} />
      <rect x={812} y={95} width={6} height={6} style={{ animation: 'polStrobe .6s step-end infinite .3s' }} />

      {/* Neon accent dots (static + glow) */}
      {[[525,90,'#FF6600'],[138,170,'#00E5FF'],[1075,90,'#FF6600']].map(([x,y,c],i)=>(
        <rect key={i} x={x} y={y} width={5} height={5} fill={c}
          style={{ animation: `neonGlow ${2+i*0.5}s ease-in-out infinite` }} />
      ))}

      {/* Road */}
      <rect x={0} y={248} width={1440} height={12} fill="#04040F" />

      {/* Moving car headlights — right direction */}
      <g style={{ animation: 'driveR 9s linear infinite' }}>
        <rect x={0} y={251} width={10} height={3} fill="#FFEE99" opacity={.9} rx={1} />
        <rect x={14} y={251} width={10} height={3} fill="#FFEE99" opacity={.9} rx={1} />
      </g>
      <g style={{ animation: 'driveR 14s linear infinite 4s' }}>
        <rect x={0} y={253} width={8} height={2} fill="#FFCC66" opacity={.7} rx={1} />
        <rect x={11} y={253} width={8} height={2} fill="#FFCC66" opacity={.7} rx={1} />
      </g>

      {/* Moving car taillights — left direction */}
      <g style={{ animation: 'driveL 11s linear infinite 2s' }}>
        <rect x={0} y={252} width={8} height={3} fill="#FF2200" opacity={.8} rx={1} />
        <rect x={-12} y={252} width={8} height={3} fill="#FF2200" opacity={.8} rx={1} />
      </g>
      <g style={{ animation: 'driveL 16s linear infinite 7s' }}>
        <rect x={0} y={254} width={6} height={2} fill="#CC1100" opacity={.6} rx={1} />
        <rect x={-10} y={254} width={6} height={2} fill="#CC1100" opacity={.6} rx={1} />
      </g>

      {/* Neon ground glow */}
      <rect x={0} y={254} width={1440} height={6} fill="url(#glow)" opacity={.4} />
    </svg>
  )
}
