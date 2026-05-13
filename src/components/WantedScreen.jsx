import { useEffect, useState, useCallback } from 'react'
import { sound } from '../utils/sound'

export default function WantedScreen({ onDismiss }) {
  const [phase, setPhase] = useState('flash')
  const [stars, setStars] = useState(0)

  const dismiss = useCallback(() => { onDismiss() }, [onDismiss])

  useEffect(() => {
    sound.wanted()

    const t1 = setTimeout(() => setPhase('wanted'), 350)
    // Fill stars 1 by 1
    const t2 = setTimeout(() => {
      let s = 0
      const iv = setInterval(() => {
        s++
        setStars(s)
        if (s >= 5) clearInterval(iv)
      }, 180)
    }, 500)
    const t3 = setTimeout(() => setPhase('message'), 1800)
    const t4 = setTimeout(dismiss, 10000)

    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [dismiss])

  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center select-none"
      onClick={dismiss}
      style={{
        background: phase === 'flash'
          ? 'white'
          : '#000',
        transition: 'background .35s',
      }}
    >
      {/* Siren overlay */}
      {phase !== 'flash' && (
        <div className="absolute inset-0 pointer-events-none" style={{ animation: 'sirenPulse .45s ease-in-out infinite alternate' }} />
      )}

      {/* Stars row */}
      <div className="flex gap-5 mb-8">
        {[1,2,3,4,5].map(i => (
          <span key={i}
            className="text-5xl transition-all duration-300"
            style={{
              opacity:    stars >= i ? 1 : 0.08,
              filter:     stars >= i ? 'drop-shadow(0 0 22px #FFE600)' : 'none',
              transform:  stars >= i ? 'scale(1.25)' : 'scale(0.8)',
              color:      '#FFE600',
            }}
          >★</span>
        ))}
      </div>

      <p className="font-mono text-[10px] tracking-[8px] text-red-500 mb-2 animate-pulse">WANTED LEVEL</p>

      <h1 className="font-bebas text-[80px] md:text-[110px] tracking-[6px] text-white leading-none"
        style={{ textShadow: '0 0 60px rgba(255,0,0,.7), 0 0 120px rgba(255,0,0,.3)' }}
      >
        5 STARS
      </h1>

      <p className="font-mono text-[10px] tracking-[4px] text-white/30 mt-2 mb-10">
        CHEAT CODE ACTIVATED · KONAMI SEQUENCE DETECTED
      </p>

      {phase === 'message' && (
        <div className="text-center max-w-lg mx-5 animate-fade-up space-y-5">
          <div className="border border-red-500/30 p-7" style={{ background: 'rgba(255,0,0,.05)', backdropFilter: 'blur(8px)' }}>
            <div className="font-mono text-[9px] tracking-[4px] text-red-400 mb-3">◉ CLASSIFIED INTEL</div>
            <div className="font-bebas text-[32px] tracking-[5px] text-white mb-3">HIRE UJJWAL SINGHAL</div>
            <div className="font-rajdhani text-[16px] text-white/70 leading-[1.7]">
              Doing so will instantly clear your wanted level<br />
              and grant your team +9999 to performance stats.<br />
              <span className="text-gta-cyan">System design · AI platforms · Microfrontends.</span>
            </div>
          </div>

          <div className="font-mono text-[9px] tracking-[3px] text-white/30 border border-gta-yellow/20 px-5 py-3"
            style={{ background: 'rgba(255,230,0,.04)' }}
          >
            <span className="text-gta-yellow">🕹️</span>
            <span className="ml-2 text-gta-yellow/70">TAP THE CHEATS BUTTON</span>
            <span className="text-white/30"> for all codes · or type them on keyboard</span>
          </div>

          <div className="font-mono text-[9px] tracking-[3px] text-white/25">
            CLICK ANYWHERE TO ESCAPE · IF YOU CAN
          </div>
        </div>
      )}
    </div>
  )
}
