import { useState, useEffect, useCallback } from 'react'

const ACHIEVEMENTS = [
  { id: 'hero',       icon: '🎮', title: 'PLAYER ONE',          desc: 'Welcome to Ujjwal\'s world. Stay a while.' },
  { id: 'about',      icon: '📋', title: 'CHARACTER UNLOCKED',  desc: '6+ years of XP loaded successfully.' },
  { id: 'experience', icon: '🏆', title: 'MISSION HISTORY',     desc: 'You reviewed a career that actually shipped.' },
  { id: 'skills',     icon: '⚔️', title: 'ARSENAL INSPECTED',   desc: 'Press Tab to open the Weapon Wheel.' },
  { id: 'nums',       icon: '💰', title: 'HIGH SCORE UNLOCKED', desc: '1M+ users served. Top 1% engineer confirmed.' },
]

let globalFire = null

export function useAchievementTrigger() {
  return useCallback((id) => { globalFire?.(id) }, [])
}

export default function AchievementToast({ npcOpen = false }) {
  const [queue,   setQueue]   = useState([])
  const [current, setCurrent] = useState(null)
  const [visible, setVisible] = useState(false)
  const [seen,    setSeen]    = useState(new Set())

  useEffect(() => {
    globalFire = (id) => {
      setSeen(prev => {
        if (prev.has(id)) return prev
        const next = new Set(prev)
        next.add(id)
        const achievement = ACHIEVEMENTS.find(a => a.id === id)
        if (achievement) setQueue(q => [...q, achievement])
        return next
      })
    }
    return () => { globalFire = null }
  }, [])

  useEffect(() => {
    if (current || queue.length === 0) return
    const [next, ...rest] = queue
    setQueue(rest)
    setCurrent(next)
    setVisible(true)
    const t1 = setTimeout(() => setVisible(false), 3800)
    const t2 = setTimeout(() => setCurrent(null), 4400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [queue, current])

  if (!current) return null

  return (
    <div
      className={`fixed bottom-[90px] right-3 md:bottom-24 md:right-auto md:left-6 z-[800] flex items-center gap-3 px-3 md:px-5 py-3 md:py-4 max-w-[220px] md:max-w-[340px] transition-all duration-500 ${npcOpen ? 'hidden md:flex' : ''}`}
      style={{
        background: 'rgba(0,0,10,.92)',
        border: '1px solid rgba(255,230,0,.4)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 30px rgba(255,230,0,.15)',
        transform: visible ? 'translateX(0)' : 'translateX(-120%)',
        opacity:   visible ? 1 : 0,
      }}
    >
      {/* Gold shimmer top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg,#FFE600,#FF6B00,#FFE600)', animation: 'borderGlow 1.5s ease-in-out infinite' }}
      />
      <span className="text-2xl md:text-3xl flex-shrink-0">{current.icon}</span>
      <div className="min-w-0">
        <div className="font-mono text-[7px] md:text-[9px] tracking-[3px] text-gta-yellow/70 mb-[2px]">ACHIEVEMENT UNLOCKED</div>
        <div className="font-bebas text-[15px] md:text-[18px] tracking-[2px] text-gta-yellow leading-tight">{current.title}</div>
        <div className="font-rajdhani text-[11px] md:text-[13px] text-white/60 mt-[2px] leading-tight line-clamp-2">{current.desc}</div>
      </div>
    </div>
  )
}
