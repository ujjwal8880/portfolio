import { useState, useEffect } from 'react'
import { personal } from '../data'

const CODES = [
  { code: 'AIFIRST',  desc: 'Open Live Terminal',     color: '#00E5FF', icon: '>_' },
  { code: 'GOTWORK',  desc: 'Open Referral Form',     color: '#39FF14', icon: '🤝' },
  { code: 'TOPGUN',   desc: '5★ Wanted Level',        color: '#FF2200', icon: '⭐' },
  { code: 'POWERUP',  desc: 'Unlock Skills Arsenal',  color: '#8B00FF', icon: '⚡' },
  { code: 'FASTLANE', desc: 'Jump to Kill Count',     color: '#FF6B00', icon: '🚀' },
  { code: 'GODMODE',  desc: 'Infinite Stats',         color: '#FFE600', icon: '👑' },
]

const SHORTCUTS = [
  { key: 'TAB',              desc: 'Open Weapon Wheel' },
  { key: '` (backtick)',     desc: 'Open Terminal' },
  { key: '↑↑↓↓←→←→ B A',   desc: 'Konami Code / Wanted' },
  { key: 'ESC',              desc: 'Close any overlay' },
]

export default function CheatSheet({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[860] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,4,.92)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden"
        style={{
          background: 'rgba(0,4,0,.98)',
          border: '1px solid rgba(255,230,0,.35)',
          boxShadow: '0 0 60px rgba(255,230,0,.12)',
          animation: 'termSlideUp .22s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: '1px solid rgba(255,230,0,.2)', background: 'rgba(255,230,0,.04)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🎮</span>
            <span className="font-bebas text-[18px] tracking-[4px] text-gta-yellow">CHEAT CODES</span>
          </div>
          <button onClick={onClose} className="font-mono text-[10px] text-white/40 hover:text-white px-2 py-1 transition-colors">
            ✕ ESC
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Cheat codes */}
          <div>
            <div className="font-mono text-[8px] tracking-[5px] text-gta-yellow/50 mb-3">
              TYPE ON KEYBOARD (no prefix needed)
            </div>
            <div className="space-y-2">
              {CODES.map(({ code, desc, color, icon }) => (
                <div key={code}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{ background: 'rgba(255,255,255,.03)', border: `1px solid ${color}22` }}
                >
                  <span className="text-base w-6 text-center flex-shrink-0">{icon}</span>
                  <span
                    className="font-mono text-[14px] md:text-[16px] tracking-[3px] font-bold flex-shrink-0 w-28"
                    style={{ color }}
                  >
                    {code}
                  </span>
                  <span className="font-rajdhani text-[13px] text-white/60">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Keyboard shortcuts */}
          <div>
            <div className="font-mono text-[8px] tracking-[5px] text-gta-cyan/50 mb-3">
              KEYBOARD SHORTCUTS
            </div>
            <div className="space-y-2">
              {SHORTCUTS.map(({ key, desc }) => (
                <div key={key} className="flex items-center gap-4">
                  <span
                    className="font-mono text-[11px] tracking-[1px] text-gta-cyan px-2 py-1 flex-shrink-0"
                    style={{ background: 'rgba(0,229,255,.08)', border: '1px solid rgba(0,229,255,.25)', minWidth: 120 }}
                  >
                    {key}
                  </span>
                  <span className="font-rajdhani text-[13px] text-white/50">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/8" />

          {/* Fork link */}
          <div className="flex items-center justify-center gap-3">
            <a href={personal.portfolioRepo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[10px] tracking-[3px] text-gta-cyan/70 hover:text-gta-cyan transition-colors"
            >
              <span>⑂</span>
              <span>FORK THIS PORTFOLIO</span>
            </a>
            <span className="text-white/15">·</span>
            <span className="font-mono text-[9px] text-white/25">github.com/{personal.githubHandle}/portfolio</span>
          </div>

          <div className="font-mono text-[8px] tracking-[3px] text-white/18 text-center">
            CLICK OUTSIDE OR PRESS ESC TO CLOSE
          </div>
        </div>
      </div>
    </div>
  )
}
