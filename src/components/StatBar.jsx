import { useEffect, useRef } from 'react'

export default function StatBar({ label, score, colorClass, animate }) {
  const fillRef = useRef(null)

  useEffect(() => {
    if (animate && fillRef.current) {
      setTimeout(() => { fillRef.current.style.width = `${score}%` }, 250)
    }
  }, [animate, score])

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-[5px]">
        <span className="font-rajdhani font-semibold text-[11px] tracking-[2px] text-white/55 uppercase">{label}</span>
        <span className="font-mono text-[11px] text-gta-yellow">{score}/100</span>
      </div>
      <div className="h-[7px] bg-white/10" style={{ clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)' }}>
        <div ref={fillRef} className={`h-full stat-fill ${colorClass}`} style={{ width: '0%' }} />
      </div>
    </div>
  )
}
