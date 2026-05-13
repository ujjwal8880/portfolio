import { skills } from '../data'
import SectionHeader from './SectionHeader'
import SkillCategory from './SkillCategory'

export default function Skills({ onView }) {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gta-dark2 border-t border-gta-pink/8">
      <div className="max-w-[1160px] mx-auto px-5 md:px-8">
        <SectionHeader tag="// TECH ARSENAL" title={'WEAPONS OF\nCHOICE'} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(s => <SkillCategory key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  )
}
