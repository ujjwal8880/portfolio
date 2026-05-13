import { useEffect, useRef, useState } from 'react'
import { personal, loaderTips as TIPS } from '../data'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [tipIdx, setTipIdx]     = useState(0)
  const [visible, setVisible]   = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    const tipTimer = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 1300)
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 9 + 2
        if (next >= 100) {
          clearInterval(intervalRef.current)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onDone, 600)
          }, 350)
          return 100
        }
        return next
      })
    }, 75)
    return () => { clearInterval(tipTimer); clearInterval(intervalRef.current) }
  }, [onDone])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-end pb-20 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 loader-bg" />

      {/* City SVG silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '45%' }}
        viewBox="0 0 1440 260"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        {[
          [0,180,90,80],[100,140,70,120],[180,100,80,160],[270,155,55,105],[335,105,90,155],
          [435,130,65,130],[510,70,110,190],[630,115,75,145],[715,160,55,100],[780,90,90,170],
          [880,135,65,125],[955,105,95,155],[1060,75,115,185],[1185,125,75,135],[1270,95,65,165],[1345,145,95,115],
        ].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={i%2===0?'#06060F':'#08081A'} />
        ))}
        {/* neon window dots */}
        {[[115,150,'#FF1F6D',.6],[138,170,'#00E5FF',.5],[525,90,'#FF6600',.5],[795,105,'#00E5FF',.7],[1075,90,'#FF6600',.6]].map(([x,y,c,o],i) => (
          <rect key={i} x={x} y={y} width={5} height={5} fill={c} opacity={o} />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 w-[90%] max-w-[580px] text-center">
        <p className="font-mono text-[11px] tracking-[8px] text-white/30 mb-9">
          A ROCKSTAR ENGINEER PRODUCTION · 2026
        </p>

        <h1
          className="font-bebas gta-gradient-text animate-name-pulse"
          style={{ fontSize: 'clamp(56px, 13vw, 118px)', lineHeight: 0.85, letterSpacing: 6 }}
        >
          {personal.firstName}<br />{personal.lastName}
        </h1>

        <p className="font-rajdhani font-light text-white/55 mt-2 mb-12" style={{ letterSpacing: 7, fontSize: 13 }}>
          {personal.role.toUpperCase()} · AI-FIRST DEVELOPER
        </p>

        <div className="flex justify-between font-mono text-[10px] tracking-[3px] text-white/35 mb-2">
          <span>INITIALIZING PORTFOLIO</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="w-full h-[3px] bg-white/10">
          <div
            className="h-full transition-all"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg,#FF6600,#FF1F6D,#8B00FF,#00E5FF)',
              boxShadow: '0 0 12px #FF1F6D',
            }}
          />
        </div>

        <p className="mt-6 font-mono text-[11px] text-white/30 tracking-[1px] min-h-[28px]">
          <em className="not-italic text-yellow-400/55">TIP:</em> {TIPS[tipIdx]}
        </p>
      </div>
    </div>
  )
}
