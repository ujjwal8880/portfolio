import { missions } from '../data'
import SectionHeader from './SectionHeader'
import MissionCard from './MissionCard'

export default function Experience({ onView }) {
  return (
    <section id="experience" className="py-16 md:py-24 bg-gta-dark">
      <div className="max-w-[1160px] mx-auto px-5 md:px-8">
        <SectionHeader tag="// MISSION LOG" title={'CAREER\nMISSIONS'} />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg,#00E5FF,#FF1F6D,#8B00FF)' }}
          />
          {missions.map((m, i) => (
            <MissionCard key={m.company} mission={m} delay={i * 80} onView={i === 0 ? onView : undefined} />
          ))}
        </div>
      </div>
    </section>
  )
}
