import { useState } from 'react'
import useInView from '../hooks/useInView'
import useTilt   from '../hooks/useTilt'

export default function MissionCard({ mission, delay = 0, onView }) {
  const [expanded, setExpanded] = useState(false)
  const [ref, inView]           = useInView(0.1)
  const tilt                    = useTilt(8)
  const { title, company, period, badge, status, points, tags } = mission

  if (inView) onView?.()

  const isActive  = status === 'active'
  const badgeCls  = isActive
    ? 'bg-gta-green/12 border border-gta-green text-gta-green'
    : 'bg-gta-yellow/8 border border-gta-yellow text-gta-yellow'

  return (
    <>
      <div
        ref={ref}
        onClick={() => setExpanded(true)}
        className="relative pl-11 mb-14 cursor-pointer group transition-all duration-[550ms]"
        style={{
          opacity:   inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(-18px)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* Timeline dot */}
        <div
          className={`absolute left-[-6px] top-3 w-[13px] h-[13px] transition-transform duration-300 group-hover:scale-150 ${isActive ? 'animate-ping-glow' : ''}`}
          style={{
            background: isActive ? '#39FF14' : '#00E5FF',
            clipPath:   'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
            boxShadow:  isActive ? '0 0 14px #39FF14' : '0 0 12px #00E5FF',
          }}
        />

        {/* Card content */}
        <div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          className="relative border border-white/8 group-hover:border-gta-cyan/30 transition-colors duration-300 p-5 overflow-hidden"
          style={{ background: 'rgba(255,255,255,.02)' }}
        >
          <div className="tilt-shimmer absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300" style={{ opacity: 0 }} />
          {/* ── GTA Mission progress bar ── */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[8px] tracking-[3px] text-white/30 flex-shrink-0">
              {isActive ? 'ON MISSION' : 'COMPLETED'}
            </span>
            <div className="flex-1 h-[3px] bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width:      inView ? (isActive ? '65%' : '100%') : '0%',
                  background: isActive
                    ? 'linear-gradient(90deg, #39FF14, #00E5FF)'
                    : 'linear-gradient(90deg, #FFE600, #FF6B00)',
                  boxShadow:  isActive ? '0 0 6px #39FF14' : '0 0 6px #FFE600',
                  transitionDelay: `${delay + 300}ms`,
                  animation:  isActive ? 'borderGlow 2s ease-in-out infinite' : 'none',
                }}
              />
            </div>
            <span className={`font-mono text-[10px] tracking-[3px] px-2 py-[2px] flex-shrink-0 ${badgeCls}`}>
              {isActive ? '◉ ACTIVE' : '✓ PASSED'}
            </span>
          </div>

          <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
            <div>
              <div className="font-bebas text-[26px] tracking-[3px] group-hover:text-gta-cyan transition-colors duration-200">{title}</div>
              <div className="font-rajdhani font-semibold text-[13px] tracking-[2px] text-gta-pink">{company}</div>
              <div className="font-mono text-[10px] tracking-[3px] text-white/30 mt-1">{period}</div>
            </div>
            <span className="font-mono text-[8px] tracking-[2px] text-white/20 group-hover:text-gta-cyan/60 transition-colors self-end">
              CLICK FOR BRIEFING ▸
            </span>
          </div>

          {/* Preview — first 2 points */}
          <ul className="space-y-2 mb-4">
            {points.slice(0, 2).map((p, i) => (
              <li key={i} className="flex items-start gap-3 font-rajdhani text-[15px] text-white/75 leading-[1.5]">
                <span className="text-gta-cyan flex-shrink-0 mt-[2px]">▸</span>
                <span>{p}</span>
              </li>
            ))}
            {points.length > 2 && (
              <li className="font-mono text-[10px] tracking-[2px] text-gta-cyan/40 pl-6">
                + {points.length - 2} more objectives...
              </li>
            )}
          </ul>

          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <span key={t}
                className="font-mono text-[10px] tracking-[1px] px-[10px] py-1 bg-gta-pink/7 border border-gta-pink/25 text-white/55 group-hover:border-gta-pink/50 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Full briefing modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-[750] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,10,.92)', backdropFilter: 'blur(16px)' }}
          onClick={() => setExpanded(false)}
        >
          <div
            className="w-full max-w-2xl border border-gta-cyan/30 bg-gta-dark"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-8 py-5 border-b border-gta-cyan/20"
              style={{ background: 'linear-gradient(90deg, rgba(0,229,255,.06), transparent)' }}
            >
              <div className="font-mono text-[9px] tracking-[5px] text-gta-cyan/50 mb-1">MISSION BRIEFING</div>
              <div className="font-bebas text-[32px] tracking-[4px]">{title}</div>
              <div className="font-rajdhani font-semibold text-[14px] tracking-[2px] text-gta-pink">{company}</div>
              <div className="font-mono text-[10px] tracking-[3px] text-white/30">{period}</div>
            </div>
            <div className="px-8 py-6">
              <div className="font-mono text-[9px] tracking-[4px] text-white/30 mb-4">OBJECTIVES</div>
              <ul className="space-y-4">
                {points.map((p, i) => (
                  <li key={i} className="flex items-start gap-4 font-rajdhani text-[16px] text-white/80 leading-[1.5]">
                    <span className="font-bebas text-[16px] text-gta-cyan flex-shrink-0">0{i+1}</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-6">
                {tags.map(t => (
                  <span key={t} className="font-mono text-[11px] px-3 py-1 bg-gta-cyan/10 border border-gta-cyan/25 text-gta-cyan/70">{t}</span>
                ))}
              </div>
            </div>
            <div className="px-8 pb-6 flex justify-end">
              <button onClick={() => setExpanded(false)}
                className="font-bebas text-[14px] tracking-[4px] px-6 py-2 border border-white/20 text-white/40 hover:border-white/40 hover:text-white/70 transition-all"
              >
                CLOSE BRIEFING ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
