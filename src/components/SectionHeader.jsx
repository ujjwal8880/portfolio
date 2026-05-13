import useInView    from '../hooks/useInView'
import useScramble  from '../hooks/useScramble'

export default function SectionHeader({ tag, title }) {
  const [ref, inView] = useInView(0.15)
  const scrambled     = useScramble(title, inView)

  return (
    <div ref={ref}>
      <p className="font-mono text-gta-pink text-[10px] tracking-[6px] mb-2" style={{ textShadow: '0 0 10px #FF1F6D' }}>
        {tag}
      </p>
      <h2 className="font-bebas text-white mb-4"
        style={{ fontSize: 'clamp(38px, 7vw, 78px)', lineHeight: .88, letterSpacing: 4 }}
      >
        {scrambled}
      </h2>
      <div className="w-14 h-[3px] mb-14" style={{ background: 'linear-gradient(90deg,#FF1F6D,#00E5FF)' }} />
    </div>
  )
}
