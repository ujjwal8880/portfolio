import useInView from '../hooks/useInView'
import { charStats, personal, about } from '../data'
import SectionHeader from './SectionHeader'
import StatBar from './StatBar'

export default function About({ onView }) {
  const [ref, inView] = useInView(0.3)
  if (inView) onView?.()

  return (
    <section id="about" className="py-16 md:py-24 bg-gta-dark2 border-t border-b border-gta-cyan/10">
      <div className="max-w-[1160px] mx-auto px-5 md:px-8">
        <SectionHeader tag="// PLAYER PROFILE" title={'CHARACTER\nOVERVIEW'} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Copy — edit about.paragraphs in src/data.js */}
          <div className="font-rajdhani text-[17px] leading-[1.85] text-white/68 space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, '<strong class="text-gta-cyan font-semibold">') }} />
            ))}
            <div className="inline-block mt-2 px-4 py-2 border border-gta-pink/50 bg-gta-pink/7 font-mono text-[11px] tracking-[3px] text-gta-pink">
              {about.badge}
            </div>
          </div>

          {/* Stat card */}
          <div ref={ref} className="relative bg-black/55 border border-gta-cyan/18 p-8 corner-tl corner-br">
            <div className="font-bebas text-[28px] tracking-[4px] mb-1">{personal.firstName} {personal.lastName}</div>
            <div className="font-mono text-[11px] tracking-[3px] text-gta-pink mb-7">// {personal.roleShort} · AI-POWERED FRONTEND ENGINEER</div>
            {charStats.map(s => (
              <StatBar key={s.label} animate={inView} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
