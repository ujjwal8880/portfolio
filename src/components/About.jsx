import useInView from '../hooks/useInView'
import { charStats } from '../data'
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
          {/* Copy */}
          <div className="font-rajdhani text-[17px] leading-[1.85] text-white/68 space-y-5">
            <p>
              I'm Ujjwal — a <strong className="text-gta-cyan font-semibold">Frontend Engineer (SDE 2)</strong> with 6+ years turning complex engineering problems into sleek, performant products that humans actually love.
            </p>
            <p>
              My edge? I <strong className="text-gta-cyan font-semibold">ship AI-powered features daily</strong> — from building an AI support platform that served 40K+ users and cut tickets by ~95%, to automating workflows so my team moves 10× faster. I don't just use AI as a tool; <strong className="text-gta-cyan font-semibold">I build products with it</strong>.
            </p>
            <p>
              I specialise in <strong className="text-gta-cyan font-semibold">microfrontend architecture</strong>, real-time systems, and high-scale apps serving <strong className="text-gta-cyan font-semibold">millions of users</strong> at companies like PharmEasy, Papaya Global, and CashFlo. I also keep my <strong className="text-gta-cyan font-semibold">DSA fundamentals sharp</strong> — clean algorithmic thinking underpins great architecture.
            </p>
            <div className="inline-block mt-2 px-4 py-2 border border-gta-pink/50 bg-gta-pink/7 font-mono text-[11px] tracking-[3px] text-gta-pink">
              ⚡ AI-NATIVE DEVELOPER · LLMs IN DAILY WORKFLOW
            </div>
          </div>

          {/* Stat card */}
          <div ref={ref} className="relative bg-black/55 border border-gta-cyan/18 p-8 corner-tl corner-br">
            <div className="font-bebas text-[28px] tracking-[4px] mb-1">UJJWAL SINGHAL</div>
            <div className="font-mono text-[11px] tracking-[3px] text-gta-pink mb-7">// SDE 2 · AI-POWERED FRONTEND ENGINEER</div>
            {charStats.map(s => (
              <StatBar key={s.label} animate={inView} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
