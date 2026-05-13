export default function SkillCategory({ icon, title, pills }) {
  return (
    <div className="bg-black/45 border border-gta-cyan/14 p-7 transition-all duration-300 hover:border-gta-cyan/40 hover:-translate-y-1">
      <span className="text-[26px] block mb-3">{icon}</span>
      <div className="font-bebas text-[18px] tracking-[3px] text-gta-cyan mb-4">{title}</div>
      <div className="flex flex-wrap gap-2">
        {pills.map(p => (
          <span key={p}
            className="font-mono text-[11px] px-3 py-[5px] bg-white/4 border border-white/10 text-white/65 cursor-default transition-all duration-200 hover:bg-gta-pink/12 hover:border-gta-pink hover:text-white"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}
