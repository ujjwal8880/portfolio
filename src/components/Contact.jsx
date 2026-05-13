import { personal } from '../data'
import SectionHeader from './SectionHeader'

export default function Contact() {
  const links = [
    { icon: '📧', label: 'EMAIL',    value: personal.email,    href: `mailto:${personal.email}` },
    { icon: '📱', label: 'PHONE',    value: personal.phone,    href: `tel:${personal.phone}` },
    { icon: '💼', label: 'LINKEDIN', value: 'linkedin.com/in/ujjwalsinghal', href: personal.linkedin },
    { icon: '🐙', label: 'GITHUB',   value: 'github.com/ujjwalsinghal',      href: personal.github },
  ]

  return (
    <section id="contact" className="py-24 bg-gta-dark border-t border-gta-cyan/7">
      <div className="max-w-[1160px] mx-auto px-8">
        <SectionHeader tag="// MAKE CONTACT" title={'GET IN\nTOUCH'} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Links */}
          <div className="flex flex-col gap-4">
            {links.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 bg-black/45 border border-gta-cyan/12 transition-all duration-200 hover:border-gta-cyan hover:bg-gta-cyan/4"
              >
                <span className="text-[22px] flex-shrink-0">{l.icon}</span>
                <div>
                  <span className="font-mono text-[9px] tracking-[3px] text-white/28 block mb-1">{l.label}</span>
                  <span className="font-mono text-[13px] text-gta-cyan">{l.value}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Terminal card */}
          <div className="bg-black/80 border border-gta-cyan/25">
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gta-cyan/6 border-b border-gta-cyan/15">
              <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
              <span className="font-mono text-[10px] tracking-[3px] text-white/30 ml-2">HIRE.EXE — UJJWAL_SINGHAL</span>
            </div>
            {/* Terminal body */}
            <div className="p-6 font-mono text-[12px] leading-[2.1]">
              <span className="text-gta-cyan">$ profile.load()</span><br />
              <span className="text-white/25"># Fetching candidate data...</span><br />
              <br />
              <span className="text-white/35">name:   </span><span className="text-white/80">Ujjwal Singhal</span><br />
              <span className="text-white/35">role:   </span><span className="text-white/80">Frontend Engineer SDE 2</span><br />
              <span className="text-white/35">exp:    </span><span className="text-white/80">6+ years</span><br />
              <span className="text-white/35">stack:  </span><span className="text-white/80">React · TS · Node · AI</span><br />
              <span className="text-white/35">dsa:    </span><span className="text-white/80">Sharp ✓</span><br />
              <span className="text-white/35">ai:     </span><span className="text-gta-green">AI-native ✓</span><br />
              <span className="text-white/35">status: </span><span className="text-gta-green">OPEN TO WORK ✓</span><br />
              <br />
              <span className="text-gta-cyan">$ hire.now()</span><br />
              <span className="text-gta-green">Connecting to Ujjwal...</span>
              <span className="inline-block w-2 h-[13px] bg-gta-green align-middle animate-blink ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
