import { useState, useEffect } from 'react'

const EVENTS = [
  { c: '#39FF14', t: 'AI query auto-resolved',           d: '94ms' },
  { c: '#00E5FF', t: 'Microfrontend bundle loaded',       d: '1.8MB' },
  { c: '#FF6B00', t: 'WebSocket message delivered',       d: '12ms p99' },
  { c: '#39FF14', t: 'New session · user #40,251',        d: 'LIVE' },
  { c: '#8B00FF', t: 'Module Federation sync',            d: 'OK' },
  { c: '#00E5FF', t: 'LLM context resolved',              d: '847 tokens' },
  { c: '#FF1F6D', t: 'Support ticket auto-deflected',     d: '~95% rate' },
  { c: '#39FF14', t: 'Cache hit · API call skipped',      d: '98.2%' },
  { c: '#FFE600', t: 'React render optimised',            d: '0 reflow' },
  { c: '#00E5FF', t: 'Real-time chat message',            d: '10,422nd' },
  { c: '#8B00FF', t: 'AI model response streamed',        d: '1.2s TTFT' },
  { c: '#FF6B00', t: 'Declarative analytics fired',       d: 'Mixpanel' },
]

export default function LiveFeed() {
  const [feed, setFeed] = useState([])

  useEffect(() => {
    const push = () => {
      const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)]
      const id = Date.now()
      setFeed(prev => [{ ...ev, id }, ...prev].slice(0, 8))
    }

    push()
    const interval = setInterval(push, 1800 + Math.random() * 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden lg:block mt-10 border border-gta-cyan/15 bg-black/40 p-4 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-gta-green" style={{ boxShadow: '0 0 6px #39FF14', animation: 'ping-glow 1.5s infinite' }} />
        <span className="font-mono text-[8px] tracking-[5px] text-gta-green/80">LIVE SYSTEM ACTIVITY</span>
        <div className="flex-1 h-px bg-gta-green/10 ml-2" />
        <span className="font-mono text-[8px] tracking-[2px] text-white/20">STREAM</span>
      </div>

      {/* Events */}
      <div className="space-y-[6px]">
        {feed.map((ev, i) => (
          <div
            key={ev.id}
            className="flex items-center gap-3"
            style={{
              opacity: Math.max(0.25, 1 - i * 0.1),
              animation: i === 0 ? 'feedIn .25s ease' : undefined,
            }}
          >
            <span style={{ color: ev.c, flexShrink: 0 }}>→</span>
            <span className="font-mono text-[10px] text-white/55 flex-1 truncate">{ev.t}</span>
            <span className="font-mono text-[9px] flex-shrink-0" style={{ color: ev.c, opacity: .7 }}>{ev.d}</span>
            <span className="font-mono text-[8px] text-white/15 flex-shrink-0 hidden xl:block">
              {Math.floor(i * 1.8 + 0.5)}s ago
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
