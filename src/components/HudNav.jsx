import { useState } from 'react'
import { personal } from '../data'

export default function HudNav({ onCheatSheet }) {
  const [open, setOpen] = useState(false)
  const links  = ['#about', '#experience', '#skills', '#nums']
  const labels = ['PROFILE', 'MISSIONS', 'ARSENAL', 'STATS']

  const scrollTo = (href) => {
    setOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-5 md:px-8 py-4"
        style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.85) 0%,transparent 100%)', backdropFilter: 'blur(6px)' }}
      >
        <a href="#hero" className="font-bebas text-xl gta-pink-text" style={{ letterSpacing: 4 }}>
          {personal.initials} · {personal.roleShort}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-7">
          {labels.map((lbl, i) => (
            <a key={lbl} href={links[i]}
              className="font-rajdhani font-semibold text-[12px] tracking-[3px] uppercase text-white/50 hover:text-gta-cyan transition-colors duration-200"
              onMouseEnter={e => { e.target.style.textShadow = '0 0 10px #00E5FF' }}
              onMouseLeave={e => { e.target.style.textShadow = 'none' }}
            >
              {lbl}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Cheat sheet — always in nav bar */}
          <button
            onClick={onCheatSheet}
            className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-[2px] text-gta-yellow border border-gta-yellow/30 px-2 py-1 transition-all hover:bg-gta-yellow/10"
            style={{ background: 'rgba(0,0,20,.6)', boxShadow: '0 0 10px rgba(255,230,0,.08)' }}
            title="Cheat Codes"
          >
            <span>🕹️</span>
            <span className="hidden sm:inline">CHEATS</span>
          </button>

          <div className="flex gap-[3px]" title="6+ Years XP · 5-Star Engineer">
            {[0,1,2,3,4].map(i => (
              <span key={i} className="text-gta-yellow text-sm animate-star-flicker"
                style={{ textShadow: '0 0 8px #FFE600', animationDelay: `${i * 0.2}s` }}
              >★</span>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-center"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[2px] bg-gta-cyan transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-gta-cyan transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-gta-cyan transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[490] md:hidden flex flex-col items-center justify-center transition-all duration-400 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,8,.97)', backdropFilter: 'blur(24px)' }}
        onClick={() => setOpen(false)}
      >
        <div className="flex flex-col items-center gap-10" onClick={e => e.stopPropagation()}>
          <p className="font-mono text-[9px] tracking-[6px] text-white/25 mb-2">NAVIGATE</p>
          {labels.map((lbl, i) => (
            <button key={lbl}
              onClick={() => scrollTo(links[i])}
              className="font-bebas text-[40px] tracking-[6px] text-white/55 active:text-gta-cyan transition-colors"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {lbl}
            </button>
          ))}
        </div>
        <p className="absolute bottom-10 font-mono text-[8px] tracking-[4px] text-white/18">
          TAP ANYWHERE TO CLOSE
        </p>
      </div>
    </>
  )
}
