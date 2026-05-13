import { useEffect, useRef } from 'react'

const COLORS = ['#FF1F6D', '#00E5FF', '#8B00FF', '#FF6B00', '#FFE600']

export default function ParticleField() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999 })
  const particles = useRef([])
  const bursts    = useRef([])
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const COUNT   = isTouch ? 35 : 90  // fewer particles on mobile

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      particles.current = Array.from({ length: COUNT }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.45,
        vy:    (Math.random() - 0.5) * 0.45,
        r:     Math.random() * 2.2 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.55 + 0.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y

      particles.current.forEach(p => {
        const dx   = p.x - mx
        const dy   = p.y - my
        const dist = Math.hypot(dx, dy)
        if (dist < 130) {
          const force = (130 - dist) / 130
          p.vx += (dx / dist) * force * 0.65
          p.vy += (dy / dist) * force * 0.65
        }
        p.vx *= 0.97; p.vy *= 0.97
        p.x  += p.vx;  p.y  += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle  = p.color
        ctx.globalAlpha = p.alpha
        ctx.shadowBlur  = 10
        ctx.shadowColor = p.color
        ctx.fill()
      })

      ctx.shadowBlur = 0
      if (!isTouch) {
        for (let i = 0; i < particles.current.length; i++) {
          for (let j = i + 1; j < particles.current.length; j++) {
            const a = particles.current[i], b = particles.current[j]
            const d = Math.hypot(a.x - b.x, a.y - b.y)
            if (d < 105) {
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = a.color
              ctx.globalAlpha = (1 - d / 105) * 0.14
              ctx.lineWidth   = 0.5
              ctx.stroke()
            }
          }
        }
      }

      bursts.current = bursts.current.filter(p => p.alpha > 0.015)
      bursts.current.forEach(p => {
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.94; p.vy *= 0.94
        p.alpha *= 0.88
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha
        ctx.shadowBlur = 14; ctx.shadowColor = p.color; ctx.fill()
      })

      ctx.globalAlpha = 1
      rafRef.current  = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }

    const onClick = (e) => {
      const count = isTouch ? 15 : 28
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        const speed = 2.5 + Math.random() * 5
        bursts.current.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          r: Math.random() * 3 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
        })
      }
    }

    resize()
    draw()
    window.addEventListener('resize',    resize,      { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('click',     onClick)
    window.addEventListener('touchstart', onClick, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('click',      onClick)
      window.removeEventListener('touchstart', onClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />
}
