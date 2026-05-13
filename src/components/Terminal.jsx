import { useState, useEffect, useRef } from 'react'

const SEQUENCE = [
  { t: 'cmd',  v: 'ssh ujjwal@portfolio.io --verbose' },
  { t: 'ok',   v: '✓  Auth handshake complete · AI-FIRST SDE 2' },
  { t: 'ok',   v: '✓  Session: ' + new Date().getFullYear() + ' · Vice City, India' },
  { t: 'gap' },
  { t: 'cmd',  v: 'system status --all' },
  { t: 'data', v: '   ⚡  AI Support Platform     ████  ONLINE   [40K+ users]' },
  { t: 'data', v: '   ⚡  Module Federation        ████  ACTIVE   [15 modules]' },
  { t: 'data', v: '   ⚡  Real-time Chat Engine    ████  LIVE     [10K+ msg/s]' },
  { t: 'data', v: '   ⚡  Ticket Deflect System    ████  RUNNING  [~95% auto]' },
  { t: 'gap' },
  { t: 'cmd',  v: 'ai-platform --metrics --live' },
  { t: 'live', k: 'defl',    label: '  Ticket Deflection  ', suffix: '%',  bar: true  },
  { t: 'live', k: 'latency', label: '  LLM Avg Latency    ', suffix: 'ms', bar: false },
  { t: 'live', k: 'users',   label: '  Active Sessions    ', suffix: '',   bar: false },
  { t: 'gap' },
  { t: 'cmd',  v: 'mfe --list --status' },
  { t: 'mfe',  v: '  ai-support@2.1.4      2.1 MB   LIVE   ████████' },
  { t: 'mfe',  v: '  payroll-v2@1.9.0      1.8 MB   LIVE   ████████' },
  { t: 'mfe',  v: '  realtime-chat@3.0.1   0.9 MB   LIVE   ████████' },
  { t: 'mfe',  v: '  ... 12 more modules              total: 15 ✓' },
  { t: 'gap' },
  { t: 'cmd',  v: 'git log --oneline -4' },
  { t: 'git',  v: '7a2f3b1 feat: AI auto-reply — 95% ticket deflection' },
  { t: 'git',  v: '3d8e9c2 perf: virtualize 10K+ msg list  (0 frame drop)' },
  { t: 'git',  v: 'f1a4b5e arch: ship 15-MFE module federation · zero downtime' },
  { t: 'git',  v: 'b9c2a1d chore: Angular → React migration · 3 orgs · no outage' },
  { t: 'gap' },
  { t: 'cmd',  v: 'ujjwal --contact' },
  { t: 'ok',   v: '  📧  ujjwalsinghal19@gmail.com' },
  { t: 'ok',   v: '  🔗  linkedin.com/in/ujjwalsinghal' },
  { t: 'ok',   v: '  📄  /Ujjwal_Singhal_Resume.pdf  ← download CV above' },
  { t: 'gap' },
  { t: 'done', v: '> █' },
]

const DELAY = { cmd: 420, ok: 70, data: 55, live: 60, mfe: 55, git: 75, gap: 200, done: 0 }

let globalToggle = null
export function toggleTerminal() { globalToggle?.() }

export default function Terminal() {
  const [open,    setOpen]    = useState(false)
  const [lines,   setLines]   = useState([])
  const [cursor,  setCursor]  = useState(0)
  const [metrics, setMetrics] = useState({ defl: 95.1, latency: 94, users: 40247 })
  const scrollRef   = useRef(null)
  const typingTimer = useRef(null)
  const metricsInt  = useRef(null)
  const openRef     = useRef(false)

  useEffect(() => {
    globalToggle = () => setOpen(o => !o)
    return () => { globalToggle = null }
  }, [])

  // Backtick shortcut
  useEffect(() => {
    const h = (e) => {
      if (e.key === '`') { e.preventDefault(); setOpen(o => !o) }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  // Reset + start typing when opened
  useEffect(() => {
    openRef.current = open
    if (open) { setLines([]); setCursor(0) }
    else {
      clearTimeout(typingTimer.current)
      clearInterval(metricsInt.current)
    }
  }, [open])

  // Advance lines
  useEffect(() => {
    if (!open || cursor >= SEQUENCE.length) return
    const item = SEQUENCE[cursor]
    const delay = DELAY[item.t] ?? 100
    typingTimer.current = setTimeout(() => {
      setLines(prev => [...prev, item])
      setCursor(c => c + 1)
    }, delay)
    return () => clearTimeout(typingTimer.current)
  }, [open, cursor])

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  // Live metrics
  useEffect(() => {
    if (!open) return
    metricsInt.current = setInterval(() => {
      setMetrics(prev => ({
        defl:    +(Math.min(99, prev.defl + (Math.random() - 0.35) * 0.5)).toFixed(1),
        latency: Math.max(78, Math.min(120, Math.round(prev.latency + (Math.random() - 0.5) * 10))),
        users:   prev.users + Math.floor(Math.random() * 4),
      }))
    }, 1400)
    return () => clearInterval(metricsInt.current)
  }, [open])

  if (!open) return null

  const renderLine = (item, i) => {
    switch (item.t) {
      case 'gap':  return <div key={i} className="h-[6px]" />
      case 'done': return null
      case 'cmd':  return (
        <div key={i} className="flex gap-2">
          <span style={{ color: '#00E5FF' }}>$</span>
          <span className="text-white">{item.v}</span>
        </div>
      )
      case 'ok':   return <div key={i} style={{ color: '#39FF14' }}>{item.v}</div>
      case 'data': return <div key={i} style={{ color: 'rgba(200,255,255,.6)' }}>{item.v}</div>
      case 'git':  return <div key={i} style={{ color: 'rgba(255,230,0,.8)' }}>{item.v}</div>
      case 'mfe':  return <div key={i} style={{ color: 'rgba(255,107,0,.8)' }}>{item.v}</div>
      case 'live': {
        const raw = metrics[item.k]
        const disp = item.k === 'users' ? raw.toLocaleString() : item.k === 'defl' ? raw.toFixed(1) : raw
        const barW = item.bar ? Math.min(100, raw) : null
        return (
          <div key={i} className="flex items-center gap-2">
            <span style={{ color: 'rgba(255,255,255,.45)', minWidth: 160 }}>{item.label}</span>
            <span style={{ color: '#00E5FF', minWidth: 56 }}>{disp}{item.suffix}</span>
            {barW !== null && (
              <div className="flex-1 max-w-[120px] h-[3px] bg-white/10">
                <div style={{ width: `${barW}%`, height: '100%', background: 'linear-gradient(90deg,#00E5FF,#8B00FF)', transition: 'width 1.2s ease' }} />
              </div>
            )}
          </div>
        )
      }
      default: return null
    }
  }

  return (
    <div
      className="fixed inset-0 z-[870] flex items-center justify-center p-3 md:p-8"
      style={{ background: 'rgba(0,0,4,.88)', backdropFilter: 'blur(10px)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl flex flex-col"
        style={{
          maxHeight: '85vh',
          background: 'rgba(0,6,0,.97)',
          border: '1px solid rgba(0,229,255,.35)',
          boxShadow: '0 0 80px rgba(0,229,255,.12), 0 0 200px rgba(0,229,255,.04)',
          animation: 'termSlideUp .22s cubic-bezier(.25,.46,.45,.94)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(0,229,255,.18)', background: 'rgba(0,229,255,.04)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-[9px] h-[9px] rounded-full" style={{ background: '#FF1F6D', boxShadow: '0 0 6px #FF1F6D' }} />
            <div className="w-[9px] h-[9px] rounded-full" style={{ background: '#FFE600', boxShadow: '0 0 6px #FFE600' }} />
            <div className="w-[9px] h-[9px] rounded-full" style={{ background: '#39FF14', boxShadow: '0 0 6px #39FF14' }} />
            <span className="font-mono text-[9px] md:text-[10px] tracking-[4px] text-gta-cyan/60 ml-3">
              UJJWAL_OS v2.6.1 · PORTFOLIO TERMINAL
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-[9px] tracking-[2px] text-white/30 hover:text-white px-2 py-1 transition-colors"
          >
            ✕ ESC
          </button>
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] md:text-[12px] leading-relaxed space-y-[1px]"
          style={{ color: 'rgba(255,255,255,.85)' }}
        >
          {lines.map((l, i) => renderLine(l, i))}

          {/* Typing cursor */}
          {cursor < SEQUENCE.length && (
            <div className="flex gap-2">
              <span style={{ color: '#00E5FF' }}>$</span>
              <span style={{ color: '#00E5FF', animation: 'termBlink 1s step-end infinite' }}>█</span>
            </div>
          )}
          {cursor >= SEQUENCE.length && (
            <div className="flex gap-2">
              <span style={{ color: '#00E5FF' }}>$</span>
              <span style={{ color: 'rgba(0,229,255,.5)', animation: 'termBlink 1s step-end infinite' }}>█</span>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Footer */}
        <div className="px-4 py-2 flex-shrink-0 font-mono text-[8px] tracking-[3px] text-white/18"
          style={{ borderTop: '1px solid rgba(0,229,255,.1)' }}
        >
          CLICK OUTSIDE OR PRESS ESC · BACKTICK ` TO TOGGLE
        </div>
      </div>
    </div>
  )
}
