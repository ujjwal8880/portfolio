const CONTACT_LINKS = [
  {
    icon:  '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/ujjwalsinghal',
    href:  'https://linkedin.com/in/ujjwalsinghal',
  },
  {
    icon:  '📱',
    label: 'Phone',
    value: '+91-9528288880',
    href:  'tel:+919528288880',
  },
  {
    icon:  '📧',
    label: 'Email',
    value: 'ujjwalsinghal19@gmail.com',
    href:  'mailto:ujjwalsinghal19@gmail.com',
  },
]

function ContactCard() {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {CONTACT_LINKS.map(l => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 border border-gta-cyan/20 hover:border-gta-cyan hover:bg-gta-cyan/8 transition-all duration-200 group"
          style={{ background: 'rgba(0,229,255,.04)' }}
        >
          <span className="text-lg flex-shrink-0">{l.icon}</span>
          <div className="min-w-0">
            <div className="font-mono text-[8px] tracking-[3px] text-white/30 mb-[2px]">{l.label}</div>
            <div className="font-mono text-[12px] text-gta-cyan group-hover:text-white transition-colors truncate">
              {l.value}
            </div>
          </div>
          <span className="ml-auto font-mono text-[10px] text-white/20 group-hover:text-gta-cyan transition-colors flex-shrink-0">→</span>
        </a>
      ))}
    </div>
  )
}

export default function ChatBubble({ message }) {
  const isNpc = message.sender === 'npc'

  if (isNpc) {
    return (
      <div className="flex items-start gap-3 max-w-[90%]">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[16px] border border-gta-cyan/40 bg-gta-dark2">
          🎮
        </div>
        <div className="npc-message px-4 py-3 flex-1">
          <span className="font-mono text-[9px] tracking-[3px] text-gta-cyan block mb-1">UJJWAL (NPC)</span>
          <p className="font-rajdhani text-[15px] text-white/90 leading-[1.6]">{message.text}</p>
          {message.links && <ContactCard />}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-end">
      <div className="user-message px-4 py-3 max-w-[80%]">
        <span className="font-mono text-[9px] tracking-[3px] text-gta-purple block mb-1 text-right">YOU</span>
        <p className="font-rajdhani text-[15px] text-white/80 leading-[1.6] text-right">{message.text}</p>
      </div>
    </div>
  )
}
