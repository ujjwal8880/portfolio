import { QUICK_REPLIES } from './responses'

export default function QuickReplies({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {QUICK_REPLIES.map(q => (
        <button
          key={q.label}
          onClick={() => onSelect(q.text)}
          className="font-mono text-[10px] tracking-[1px] px-3 py-2 border border-gta-cyan/25 text-gta-cyan/70 hover:border-gta-cyan hover:text-gta-cyan hover:bg-gta-cyan/8 transition-all duration-200 text-left"
        >
          {q.label}
        </button>
      ))}
    </div>
  )
}
