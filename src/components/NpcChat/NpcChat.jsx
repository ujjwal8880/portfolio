import { useState, useRef, useEffect } from 'react'
import { getResponse } from './responses'
import ChatBubble from './ChatBubble'
import QuickReplies from './QuickReplies'
import { sound } from '../../utils/sound'

const GREETING = {
  text: "Ey, Ujjwal here. You caught me between missions. What do you want to know — my tech stack, AI work, system design, or are you here to offer me a job?",
}

export default function NpcChat({ onOpenChange }) {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([{ id: 0, sender: 'npc', ...GREETING }])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const [called, setCalled]   = useState(false)
  const bottomRef             = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const msg = text.trim()
    if (!msg) return
    setMessages(prev => [...prev, { id: prev.length, sender: 'user', text: msg }])
    setInput('')
    setTyping(true)
    // Simulate NPC thinking
    const delay = 800 + Math.random() * 700
    setTimeout(() => {
      setTyping(false)
      const response = getResponse(msg)
      setMessages(prev => [...prev, { id: prev.length, sender: 'npc', ...response }])
      sound.npc()
    }, delay)
  }

  const handleOpen = () => {
    setCalled(true)
    setTimeout(() => { setCalled(false); setOpen(true); onOpenChange?.(true) }, 1800)
  }

  return (
    <>
      {/* Floating trigger button */}
      {!open && !called && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 left-6 z-[600] flex items-center gap-3 px-5 py-3 border border-gta-pink/50 bg-gta-dark2/95 hover:border-gta-pink hover:bg-gta-pink/10 transition-all duration-300 group"
          style={{ backdropFilter: 'blur(12px)', boxShadow: '0 0 20px rgba(255,31,109,.2)' }}
        >
          <span className="text-[18px] group-hover:animate-bounce">📞</span>
          <div className="text-left">
            <div className="font-bebas text-[14px] tracking-[3px] text-gta-pink">CALL UJJWAL</div>
            <div className="font-mono text-[9px] tracking-[2px] text-white/30">AI NPC · ALWAYS ONLINE</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-gta-green ml-1" style={{ boxShadow: '0 0 6px #39FF14', animation: 'ping-glow 2s infinite' }} />
        </button>
      )}

      {/* Calling screen */}
      {called && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center bg-black/95" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="text-center">
            <div className="text-[60px] mb-6 animate-bounce">📞</div>
            <p className="font-mono text-[11px] tracking-[6px] text-gta-cyan mb-2" style={{ textShadow: '0 0 10px #00E5FF' }}>CALLING</p>
            <div className="font-bebas text-5xl gta-gradient-text mb-2">UJJWAL SINGHAL</div>
            <p className="font-mono text-[11px] tracking-[4px] text-white/30">NPC · FRONTEND ENGINEER</p>
            <div className="flex justify-center gap-2 mt-8">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-gta-cyan typing-dot" style={{ animationDelay: `${i*0.3}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed inset-0 z-[700] flex items-end md:items-center justify-center md:p-4" style={{ background: 'rgba(0,0,10,.85)', backdropFilter: 'blur(16px)' }}>
          <div className="w-full max-w-2xl flex flex-col" style={{ height: '100dvh', maxHeight: '100dvh' }} >
            <div className="flex flex-col flex-1 md:max-h-[90vh] overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-black/80 border border-gta-cyan/30 border-b-0 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-lg border border-gta-cyan/40 bg-gta-dark2">🎮</div>
                <div>
                  <div className="font-bebas text-[16px] md:text-[18px] tracking-[3px] gta-pink-text">UJJWAL SINGHAL</div>
                  <div className="flex items-center gap-2">
                    <div className="w-[6px] h-[6px] rounded-full bg-gta-green" style={{ boxShadow: '0 0 6px #39FF14' }} />
                    <span className="font-mono text-[8px] md:text-[9px] tracking-[2px] text-gta-green">NPC ONLINE · AI-FIRST FRONTEND ENGINEER</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setOpen(false); onOpenChange?.(false) }}
                className="font-mono text-[11px] tracking-[2px] text-white/40 active:text-white/80 px-3 py-2 border border-white/10 active:border-white/30 transition-all"
              >
                END CALL
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 bg-black/70 border-x border-gta-cyan/30 min-h-0">
              {messages.map(m => <ChatBubble key={m.id} message={m} />)}
              {typing && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-[16px] border border-gta-cyan/40 bg-gta-dark2 flex-shrink-0">🎮</div>
                  <div className="npc-message px-4 py-3 flex items-center gap-2">
                    <span className="font-mono text-[9px] tracking-[3px] text-gta-cyan mr-2">UJJWAL (NPC)</span>
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-gta-cyan/60 typing-dot" style={{ animationDelay: `${i*0.3}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="bg-black/80 border border-gta-cyan/30 border-t-0 p-3 md:p-4 flex-shrink-0">
              <QuickReplies onSelect={send} />
              <div className="flex gap-2 md:gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send(input)}
                  placeholder="Ask about my tech stack, AI work, hiring..."
                  className="flex-1 bg-white/5 border border-white/10 px-3 md:px-4 py-3 font-mono text-[12px] md:text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-gta-cyan/40 transition-colors"
                />
                <button
                  onClick={() => send(input)}
                  className="px-4 md:px-6 py-3 font-bebas text-[13px] md:text-[14px] tracking-[3px] text-white transition-all hover:brightness-125 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#FF1F6D,#8B00FF)' }}
                  disabled={typing}
                >
                  SEND ▸
                </button>
              </div>
              <p className="font-mono text-[8px] tracking-[2px] text-white/18 mt-2 text-center hidden md:block">
                🎮 GTA 6 AI NPC SYSTEM · UJJWAL SINGHAL PORTFOLIO · BUILT WITH CLAUDE
              </p>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
