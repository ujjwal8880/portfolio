import { useEffect, useRef } from 'react'

export default function RainCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const layers = [
      { count: 60, speedMin: 6, speedMax: 10, lenMin: 10, lenMax: 20, opMin: 0.15, opMax: 0.45, w: 1.0 },
      { count: 50, speedMin: 3, speedMax:  6, lenMin:  6, lenMax: 12, opMin: 0.05, opMax: 0.18, w: 0.6 },
    ]

    let drops = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drops = []
      for (const l of layers) {
        for (let i = 0; i < l.count; i++) {
          drops.push({
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            len:   l.lenMin + Math.random() * (l.lenMax - l.lenMin),
            speed: l.speedMin + Math.random() * (l.speedMax - l.speedMin),
            op:    l.opMin + Math.random() * (l.opMax - l.opMin),
            w:     l.w,
          })
        }
      }
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const d of drops) {
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - d.len * 0.25, d.y + d.len)
        ctx.strokeStyle = `rgba(0,229,255,${d.op})`
        ctx.lineWidth   = d.w
        ctx.stroke()

        d.y += d.speed
        d.x -= d.speed * 0.25

        if (d.y > canvas.height || d.x < -50) {
          d.y = -d.len - Math.random() * 60
          d.x = Math.random() * (canvas.width + 80)
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none z-[3] w-full h-full"
      style={{ opacity: 0.45 }}
    />
  )
}
