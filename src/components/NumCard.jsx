import { useEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView'
import useTilt   from '../hooks/useTilt'

function parseVal(str) {
  // Extract numeric part and suffix (e.g. "40K+" → { num: 40, suffix: "K+" }, "~95%" → { prefix: "~", num: 95, suffix: "%" })
  const match = str.match(/^([~]?)(\d+(?:\.\d+)?)([A-Za-z%+]*)$/)
  if (!match) return null
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] }
}

function CountUp({ target, inView }) {
  const [display, setDisplay] = useState('0')
  const parsed = parseVal(target)

  useEffect(() => {
    if (!inView || !parsed) { setDisplay(target); return }
    const { prefix, num, suffix } = parsed
    const duration = 1800
    const start    = performance.now()
    const frame = (now) => {
      const t    = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      const cur  = Math.floor(ease * num)
      setDisplay(`${prefix}${cur}${suffix}`)
      if (t < 1) requestAnimationFrame(frame)
      else setDisplay(target)
    }
    requestAnimationFrame(frame)
  }, [inView]) // eslint-disable-line

  return <>{display}</>
}

export default function NumCard({ icon, val, lbl, delay = 0, onView }) {
  const [ref, inView] = useInView(0.1)
  const tilt          = useTilt(10)
  const fired         = useRef(false)

  useEffect(() => {
    if (inView && !fired.current) { fired.current = true; onView?.() }
  }, [inView, onView])

  return (
    <div
      ref={ref}
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`,
      }}
    >
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="relative bg-black/50 border border-gta-yellow/18 p-7 text-center overflow-hidden transition-colors duration-300 cursor-default group hover:border-gta-yellow/55 hover:shadow-[0_0_30px_rgba(255,230,0,.15)] num-card-sweep"
    >
      <div className="tilt-shimmer absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300" style={{ opacity: 0 }} />
      <span className="text-[32px] block mb-3 group-hover:scale-125 transition-transform duration-300">{icon}</span>
      <div className="font-bebas text-[50px] leading-none gta-num-text group-hover:drop-shadow-[0_0_12px_rgba(255,230,0,.6)] transition-all duration-300">
        <CountUp target={val} inView={inView} />
      </div>
      <div className="font-rajdhani text-[10px] tracking-[3px] text-white/35 mt-1 uppercase">{lbl}</div>
    </div>
    </div>
  )
}
