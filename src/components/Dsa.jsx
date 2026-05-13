import { personal } from '../data'
import SectionHeader from './SectionHeader'

export default function Dsa() {
  const { leetcode, lcEasy, lcMed, lcHard } = personal

  return (
    <section id="dsa" className="py-24 bg-gta-dark2 border-t border-gta-purple/15">
      <div className="max-w-[1160px] mx-auto px-8">
        <SectionHeader tag="// ALGORITHM PROFICIENCY" title={'DSA &\nLEETCODE'} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="font-rajdhani text-[17px] leading-[1.85] text-white/65 space-y-5">
            <p>
              Great frontend engineering isn't just about frameworks.{' '}
              <strong className="text-gta-purple">Clean algorithmic thinking</strong> separates engineers who write code from engineers who craft systems.
            </p>
            <p>
              I regularly practice DSA to keep my problem-solving instincts sharp — from{' '}
              <strong className="text-gta-purple">dynamic programming to graph traversals</strong>. It directly influences how I architect state management, optimise rendering pipelines, and design scalable data flows.
            </p>
            <p>
              My LeetCode profile reflects <strong className="text-gta-purple">deliberate practice</strong> — not just interview prep. Solving hard problems is a mindset I apply to engineering decisions every day.
            </p>
          </div>

          <div className="relative bg-black/55 border border-gta-purple/30 p-8">
            {/* Corner brackets in purple/cyan */}
            <div className="absolute top-[-1px] left-[-1px] w-7 h-7 border-t-2 border-l-2 border-gta-purple" />
            <div className="absolute bottom-[-1px] right-[-1px] w-7 h-7 border-b-2 border-r-2 border-gta-cyan" />

            <div className="font-bebas text-[22px] tracking-[3px] text-gta-purple mb-1">LEETCODE PROFILE</div>
            <div className="font-mono text-[11px] tracking-[3px] text-white/30 mb-6">
              {leetcode ? `// ${leetcode.replace('https://', '')}` : '// ADD YOUR LEETCODE URL IN src/data.js'}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'EASY',   val: lcEasy, color: 'text-gta-green',  glow: '#39FF14' },
                { label: 'MEDIUM', val: lcMed,  color: 'text-gta-yellow', glow: '#FFE600' },
                { label: 'HARD',   val: lcHard, color: 'text-gta-pink',   glow: '#FF1F6D' },
              ].map(({ label, val, color, glow }) => (
                <div key={label} className="text-center py-4 px-2 bg-white/4">
                  <div className={`font-bebas text-[32px] leading-none ${color}`} style={{ textShadow: `0 0 8px ${glow}` }}>
                    {val ?? '–'}
                  </div>
                  <div className="font-rajdhani text-[9px] tracking-[3px] text-white/30 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {leetcode ? (
              <a href={leetcode} target="_blank" rel="noopener noreferrer"
                className="block text-center py-3 border border-gta-purple/50 font-bebas text-[15px] tracking-[4px] text-gta-purple hover:bg-gta-purple/12 transition-colors duration-200"
              >
                VIEW LEETCODE PROFILE →
              </a>
            ) : (
              <div className="block text-center py-3 border border-gta-purple/30 font-bebas text-[15px] tracking-[4px] text-white/30">
                ADD URL IN src/data.js
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
