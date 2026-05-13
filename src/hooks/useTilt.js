import { useRef, useCallback } from 'react'

export default function useTilt(maxDeg = 10) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx   = (e.clientX - rect.left)  / rect.width  - 0.5  // -0.5 → 0.5
    const ny   = (e.clientY - rect.top)   / rect.height - 0.5
    el.style.transition = 'transform .08s linear'
    el.style.transform  = `perspective(900px) rotateX(${-ny * maxDeg}deg) rotateY(${nx * maxDeg}deg) scale(1.02)`
    const shimmer = el.querySelector('.tilt-shimmer')
    if (shimmer) {
      shimmer.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,.11) 0%, transparent 65%)`
      shimmer.style.opacity = '1'
    }
  }, [maxDeg])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform .65s cubic-bezier(.25,.46,.45,.94)'
    el.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'
    const shimmer = el.querySelector('.tilt-shimmer')
    if (shimmer) { shimmer.style.opacity = '0' }
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
