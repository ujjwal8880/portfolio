import { useState, useEffect } from 'react'

const DISTRICTS = {
  about:      { region: 'EAST VICE · DISTRICT 01', name: 'CHARACTER\nFILE',    code: '0x01 LOADED' },
  experience: { region: 'DOWNTOWN VICE · DISTRICT 02', name: 'CAREER\nMISSIONS', code: '0x02 LOADED' },
  skills:     { region: 'TECH HARBOR · DISTRICT 03', name: 'TECH\nARSENAL',    code: '0x03 LOADED' },
  nums:       { region: 'HIGH SCORE DISTRICT · 04', name: 'KILL\nCOUNT',       code: '0x04 LOADED' },
}

let globalTrigger = null
const firedIds = new Set()

export function triggerMission(id) {
  if (firedIds.has(id)) return   // only once per page load
  firedIds.add(id)
  globalTrigger?.(id)
}

export default function MissionTransition() {
  const [mission, setMission] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    globalTrigger = (id) => {
      const m = DISTRICTS[id]
      if (!m) return
      setMission(m)
      setVisible(true)
      const t1 = setTimeout(() => setVisible(false), 2200)
      const t2 = setTimeout(() => setMission(null), 2800)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    return () => { globalTrigger = null }
  }, [])

  if (!mission) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[840] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity .45s ease' }}
    >

      {/* District panel — slides in from left */}
      <div
        className="absolute left-0 top-1/2 pl-6 md:pl-14 pr-8"
        style={{
          transform: `translateY(-50%) translateX(${visible ? 0 : -105}%)`,
          transition: 'transform .4s cubic-bezier(.25,.46,.45,.94)',
        }}
      >
        {/* Top accent line */}
        <div className="mb-2 flex items-center gap-3">
          <div className="h-px flex-shrink-0 w-8 md:w-12" style={{ background: '#FF1F6D' }} />
          <span className="font-mono text-[7px] md:text-[9px] tracking-[5px] text-gta-pink whitespace-nowrap">
            {mission.region}
          </span>
        </div>

        {/* Main district name */}
        <div
          className="font-bebas whitespace-pre-line leading-none"
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            color: '#00E5FF',
            textShadow: '0 0 40px #00E5FF, 0 0 80px rgba(0,229,255,.4)',
            letterSpacing: 3,
          }}
        >
          {mission.name}
        </div>

        {/* Bottom accent */}
        <div className="mt-2 flex items-center gap-3">
          <div className="h-px flex-shrink-0 w-8 md:w-20" style={{ background: '#00E5FF', opacity: .5 }} />
          <span className="font-mono text-[7px] md:text-[8px] tracking-[4px] text-gta-cyan/50">
            {mission.code}
          </span>
        </div>
      </div>
    </div>
  )
}
