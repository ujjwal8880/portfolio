import { useState, useEffect } from 'react'
import { skills } from '../data'

const R    = 185
const N    = skills.length
const SIZE = 520
const CX   = SIZE / 2

function angle(i) {
  return ((i * 360) / N - 90) * (Math.PI / 180)
}

export default function WeaponWheel() {
  const [open,    setOpen]    = useState(false)
  const [hovered, setHovered] = useState(null)
  const [scale,   setScale]   = useState(1)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  useEffect(() => {
    const update = () => {
      const s = Math.min(1, (window.innerWidth - 24) / SIZE)
      setScale(s)
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Tab')    { e.preventDefault(); setOpen(o => !o) }
      if (e.key === 'Escape') { setOpen(false); setHovered(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const active = hovered !== null ? skills[hovered] : null

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => { setOpen(o => !o); setHovered(null) }}
        title="Skills Weapon Wheel (or press Tab)"
        className="fixed right-4 md:right-6 bottom-[90px] md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-[600] flex flex-col items-center gap-2 px-3 py-3 md:py-4 transition-all duration-200 hover:scale-105"
        style={{
          border:         `1px solid ${open ? '#00E5FF' : 'rgba(255,255,255,.15)'}`,
          background:     open ? 'rgba(0,229,255,.1)' : 'rgba(0,0,20,.8)',
          backdropFilter: 'blur(8px)',
          boxShadow:      open ? '0 0 20px rgba(0,229,255,.3)' : 'none',
        }}
      >
        <span className="text-xl">{open ? '✕' : '⚙️'}</span>
        <span className="font-mono text-[7px] tracking-[2px] text-white/40">{open ? 'CLOSE' : 'SKILLS'}</span>
        {!isTouch && <span className="font-mono text-[6px] tracking-[1px] text-gta-cyan/40">TAB</span>}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[750] flex flex-col items-center justify-center"
          style={{ background: 'rgba(0,0,8,.9)', backdropFilter: 'blur(18px)' }}
          onClick={() => { setOpen(false); setHovered(null) }}
        >
          {/* Scaled wheel container */}
          <div
            className="relative flex-shrink-0"
            style={{ width: SIZE, height: SIZE, transform: `scale(${scale})`, transformOrigin: 'center center' }}
            onClick={e => e.stopPropagation()}
          >
            {/* SVG rings + spokes */}
            <svg width={SIZE} height={SIZE} className="absolute inset-0 pointer-events-none">
              <circle cx={CX} cy={CX} r={R + 48} fill="none" stroke="rgba(0,229,255,.15)" strokeWidth="1" />
              <circle cx={CX} cy={CX} r={R - 48} fill="none" stroke="rgba(0,229,255,.08)" strokeWidth="1" strokeDasharray="6 5" />
              <circle cx={CX} cy={CX} r={5} fill="rgba(0,229,255,.45)" />
              {skills.map((_, i) => {
                const a   = angle(i)
                const x2  = CX + Math.cos(a) * (R - 34)
                const y2  = CX + Math.sin(a) * (R - 34)
                const hov = hovered === i
                return (
                  <line key={i} x1={CX} y1={CX} x2={x2} y2={y2}
                    stroke={hov ? '#00E5FF' : 'rgba(255,255,255,.13)'}
                    strokeWidth={hov ? 2 : 1}
                    style={{ transition: 'stroke .15s, stroke-width .15s' }}
                  />
                )
              })}
            </svg>

            {/* Icon boxes */}
            {skills.map((s, i) => {
              const a   = angle(i)
              const cx  = CX + Math.cos(a) * R
              const cy  = CX + Math.sin(a) * R
              const hov = hovered === i
              return (
                <div key={s.title}
                  onMouseEnter={() => !isTouch && setHovered(i)}
                  onMouseLeave={() => !isTouch && setHovered(null)}
                  onClick={() => setHovered(hov ? null : i)}
                  className="absolute flex flex-col items-center gap-[6px] cursor-pointer"
                  style={{
                    left: cx, top: cy,
                    transform:  'translate(-50%, -50%)',
                    scale:       hov ? '1.15' : '1',
                    filter:      hov ? 'drop-shadow(0 0 14px #00E5FF)' : 'none',
                    transition:  'scale .18s, filter .18s',
                  }}
                >
                  <div className="w-[60px] h-[60px] flex items-center justify-center transition-all duration-200"
                    style={{
                      background: hov ? 'rgba(0,229,255,.15)' : 'rgba(0,0,20,.88)',
                      border:     `1px solid ${hov ? '#00E5FF' : 'rgba(255,255,255,.18)'}`,
                      boxShadow:  hov ? '0 0 18px rgba(0,229,255,.45)' : 'none',
                    }}
                  >
                    <span className="text-[24px]">{s.icon}</span>
                  </div>
                  <span className="font-mono text-[8px] tracking-[1px] whitespace-nowrap"
                    style={{ color: hov ? '#00E5FF' : 'rgba(255,255,255,.38)' }}
                  >
                    {s.title}
                  </span>
                </div>
              )
            })}

            {/* Center info */}
            <div className="absolute pointer-events-none text-center"
              style={{ left: CX, top: CX, transform: 'translate(-50%, -50%)', width: 160 }}
            >
              {active ? (
                <>
                  <div className="text-[32px] mb-1">{active.icon}</div>
                  <div className="font-bebas text-[17px] tracking-[3px] text-gta-cyan mb-2">{active.title}</div>
                  <div className="flex flex-wrap justify-center gap-[5px]">
                    {active.pills.map(p => (
                      <span key={p} className="font-mono text-[8px] px-2 py-[3px] bg-gta-cyan/15 border border-gta-cyan/30 text-gta-cyan/90">{p}</span>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="font-bebas text-[11px] tracking-[6px] text-white/30 mb-1">TECH</div>
                  <div className="font-bebas text-[19px] tracking-[4px] text-white">ARSENAL</div>
                  <div className="font-mono text-[7px] tracking-[2px] text-white/20 mt-1">
                    {isTouch ? 'TAP A SEGMENT' : 'HOVER A SEGMENT'}
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="absolute bottom-8 font-mono text-[9px] tracking-[4px] text-white/18 text-center px-4">
            {isTouch ? 'TAP ANYWHERE TO CLOSE' : 'CLICK ANYWHERE OR ESC TO CLOSE'}
          </p>
        </div>
      )}
    </>
  )
}
