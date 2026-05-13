import { useEffect, useRef } from 'react'

// Only runs on pointer:fine (mouse) devices — no-op on touch/tablet
export default function GtaCursor() {
  const ringRef  = useRef(null)
  const dotRef   = useRef(null)
  const labelRef = useRef(null)
  const mouse    = useRef({ x: -300, y: -300 })
  const ring     = useRef({ x: -300, y: -300 })
  const locked   = useRef(false)
  const raf      = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return  // touch device

    const style = document.createElement('style')
    style.id = 'gta-no-cursor'
    style.textContent = '* { cursor: none !important; }'
    document.head.appendChild(style)

    const rippleStyle = document.createElement('style')
    rippleStyle.textContent = `
      @keyframes cursorRipple {
        0%   { width:8px;height:8px;opacity:1;margin:-4px 0 0 -4px; }
        100% { width:90px;height:90px;opacity:0;margin:-45px 0 0 -45px; }
      }
    `
    document.head.appendChild(rippleStyle)

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      if (labelRef.current)
        labelRef.current.style.transform = `translate(${e.clientX - 28}px, ${e.clientY + 16}px)`
    }

    const onClick = (e) => {
      const el = document.createElement('div')
      el.style.cssText = `position:fixed;pointer-events:none;z-index:9997;top:${e.clientY}px;left:${e.clientX}px;border:1.5px solid #FF1F6D;border-radius:50%;animation:cursorRipple .65s ease-out forwards;`
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 650)
    }

    const animate = () => {
      const el = document.elementFromPoint(mouse.current.x, mouse.current.y)
      locked.current = !!(el && el.closest('a,button,[role="button"],.cursor-pointer,input,select,textarea,[data-hover]'))

      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1

      if (ringRef.current) {
        const size  = locked.current ? 54 : 36
        const half  = size / 2
        ringRef.current.style.width      = size + 'px'
        ringRef.current.style.height     = size + 'px'
        ringRef.current.style.transform  = `translate(${ring.current.x - half}px, ${ring.current.y - half}px)`
        ringRef.current.style.borderColor = locked.current ? '#FF1F6D' : '#00E5FF'
        ringRef.current.style.boxShadow  = locked.current ? '0 0 14px rgba(255,31,109,.6)' : '0 0 8px rgba(0,229,255,.35)'
      }
      if (labelRef.current) labelRef.current.style.opacity = locked.current ? '1' : '0'

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    animate()

    return () => {
      document.head.removeChild(style)
      document.head.removeChild(rippleStyle)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{ transition: 'width .18s, height .18s, border-color .18s, box-shadow .18s', mixBlendMode: 'screen' }}
      />
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ width:6, height:6, background:'#FF1F6D', boxShadow:'0 0 10px #FF1F6D, 0 0 28px rgba(255,31,109,.45)' }}
      />
      <div ref={labelRef} className="fixed top-0 left-0 pointer-events-none z-[9997] font-mono text-[7px] tracking-[3px] text-gta-pink whitespace-nowrap"
        style={{ opacity:0, transition:'opacity .12s', textShadow:'0 0 8px #FF1F6D' }}
      >
        LOCKED ON
      </div>
    </>
  )
}
