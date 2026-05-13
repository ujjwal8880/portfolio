const BLIPS = [
  { x: 50, y: 18, label: 'PROFILE',  color: '#00E5FF' },
  { x: 28, y: 38, label: 'MISSIONS', color: '#FF1F6D' },
  { x: 72, y: 54, label: 'ARSENAL',  color: '#8B00FF' },
  { x: 45, y: 72, label: 'STATS',    color: '#FFE600' },
]

export default function Minimap({ scrollPct = 0 }) {
  return (
    <div className="fixed bottom-6 right-6 z-[500] w-[110px] h-[110px] hidden md:block"
      style={{ border: '1.5px solid rgba(0,229,255,.4)', background: 'rgba(0,0,20,.85)', overflow: 'hidden' }}
    >
      <div className="absolute inset-0 minimap-grid" />

      {/* Scanner beam — rotates from center */}
      <div className="absolute" style={{ left: 55, top: 55, width: 52, height: 1, transformOrigin: '0 50%', animation: 'scanRotate 3s linear infinite' }}>
        <div className="w-full h-full" style={{ background: 'linear-gradient(90deg,rgba(0,229,255,.6),transparent)' }} />
      </div>
      {/* Scanner sweep glow */}
      <div className="absolute" style={{ left: 55, top: 55, width: 52, height: 8, marginTop: -4, transformOrigin: '0 50%', animation: 'scanRotate 3s linear infinite' }}>
        <div className="w-full h-full" style={{ background: 'linear-gradient(90deg,rgba(0,229,255,.12),transparent)' }} />
      </div>

      {/* Section blips */}
      {BLIPS.map(b => (
        <div key={b.label}
          className="absolute w-[5px] h-[5px] rounded-full"
          style={{
            left: `${b.x}%`, top: `${b.y}%`,
            transform: 'translate(-50%,-50%)',
            background: b.color,
            boxShadow: `0 0 5px ${b.color}`,
            animation: 'ping-glow 2s infinite',
            animationDelay: `${BLIPS.indexOf(b) * 0.5}s`,
          }}
          title={b.label}
        />
      ))}

      {/* Player position (scroll indicator) */}
      <div
        className="absolute left-1/2 w-[7px] h-[7px] rounded-full bg-white -translate-x-1/2 transition-all duration-300"
        style={{ top: `${8 + scrollPct * 0.84}%`, boxShadow: '0 0 8px white', zIndex: 2 }}
      />

      {/* Label */}
      <div className="absolute bottom-1 left-0 right-0 text-center font-mono text-[7px] tracking-[2px] text-gta-cyan/40">
        SCROLL MAP
      </div>
    </div>
  )
}
