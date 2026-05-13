import { numbers } from '../data'
import SectionHeader from './SectionHeader'
import NumCard from './NumCard'
import LiveFeed from './LiveFeed'

export default function Numbers({ onView }) {
  return (
    <section id="nums" className="py-16 md:py-24 bg-gta-dark">
      <div className="max-w-[1160px] mx-auto px-5 md:px-8">
        <SectionHeader tag="// KILL COUNT" title={'NUMBERS\nDON\'T LIE'} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {numbers.map((n, i) => <NumCard key={n.lbl} {...n} delay={i * 70} onView={i === 0 ? onView : undefined} />)}
        </div>
        <LiveFeed />
      </div>
    </section>
  )
}
