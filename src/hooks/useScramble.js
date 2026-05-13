import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%*▓░█'

export default function useScramble(text, active, speed = 2.5) {
  const [display, setDisplay] = useState(text)
  const raf    = useRef(null)
  const frame  = useRef(0)
  const total  = text.replace(/\s/g, '').length * 6

  useEffect(() => {
    if (!active) return
    frame.current = 0
    setDisplay(text.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''))

    const animate = () => {
      frame.current += speed
      const progress = frame.current / total
      setDisplay(
        text.split('').map((ch, i) => {
          if (ch === ' ') return ' '
          return progress > i / (text.length - 1) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (frame.current < total) {
        raf.current = requestAnimationFrame(animate)
      } else {
        setDisplay(text)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [active]) // eslint-disable-line

  return display
}
