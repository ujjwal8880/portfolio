import { useState } from 'react'
import { sound } from '../utils/sound'

export default function ReferralModal({ onClose }) {
  const [step, setStep]     = useState('form') // form | success
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole]     = useState('')
  const [note, setNote]     = useState('')
  const [busy, setBusy]     = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !email || !company) return
    setBusy(true)
    // Build mailto link — opens user's email client pre-filled
    const subject = encodeURIComponent(`Referral for Ujjwal Singhal — ${company}`)
    const body = encodeURIComponent(
      `Hi Ujjwal,\n\nI'd like to refer you at ${company}${role ? ` for the ${role} role` : ''}.\n\n${note ? `Note: ${note}\n\n` : ''}Best,\n${name}\n${email}`
    )
    window.open(`mailto:ujjwalsinghal19@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setTimeout(() => { setStep('success'); setBusy(false); sound.achievement() }, 400)
  }

  return (
    <div
      className="fixed inset-0 z-[780] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,8,.92)', backdropFilter: 'blur(18px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border border-gta-green/30"
        style={{ background: 'rgba(0,10,2,.95)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 py-5 border-b border-gta-green/20"
          style={{ background: 'linear-gradient(90deg,rgba(57,255,20,.06),transparent)' }}
        >
          <div className="font-mono text-[9px] tracking-[5px] text-gta-green/50 mb-1">MISSION: REFER</div>
          <div className="font-bebas text-[28px] tracking-[4px] text-gta-green">REFER ME TO YOUR COMPANY</div>
          <div className="font-rajdhani text-[13px] text-white/40 mt-1">
            Know a team that needs an AI-first frontend engineer? Make the intro.
          </div>
        </div>

        {step === 'form' ? (
          <form onSubmit={submit} className="px-7 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[8px] tracking-[3px] text-white/30 block mb-1">YOUR NAME *</label>
                <input value={name} onChange={e => setName(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-gta-green/50 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="font-mono text-[8px] tracking-[3px] text-white/30 block mb-1">YOUR EMAIL *</label>
                <input value={email} onChange={e => setEmail(e.target.value)} required type="email"
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-gta-green/50 transition-colors"
                  placeholder="jane@company.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[8px] tracking-[3px] text-white/30 block mb-1">COMPANY *</label>
                <input value={company} onChange={e => setCompany(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-gta-green/50 transition-colors"
                  placeholder="Google, Meta, Stripe..."
                />
              </div>
              <div>
                <label className="font-mono text-[8px] tracking-[3px] text-white/30 block mb-1">ROLE (OPTIONAL)</label>
                <input value={role} onChange={e => setRole(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-gta-green/50 transition-colors"
                  placeholder="Senior Frontend Engineer"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[8px] tracking-[3px] text-white/30 block mb-1">NOTE (OPTIONAL)</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
                className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-gta-green/50 transition-colors resize-none"
                placeholder="Any context for Ujjwal..."
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={busy}
                className="flex-1 font-bebas text-[15px] tracking-[4px] py-3 text-gta-dark transition-all hover:brightness-110 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#39FF14,#00E5FF)' }}
              >
                {busy ? 'SENDING...' : 'SEND REFERRAL ▸'}
              </button>
              <button type="button" onClick={onClose}
                className="px-5 font-bebas text-[13px] tracking-[3px] border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70 transition-all"
              >
                ABORT
              </button>
            </div>
            <p className="font-mono text-[8px] tracking-[2px] text-white/18 text-center">
              Opens your email client pre-filled · Your info goes to Ujjwal only
            </p>
          </form>
        ) : (
          <div className="px-7 py-10 text-center">
            <div className="text-[48px] mb-4">🎮</div>
            <div className="font-bebas text-[28px] tracking-[4px] text-gta-green mb-2">MISSION ACCEPTED</div>
            <div className="font-rajdhani text-[15px] text-white/60 leading-[1.6] mb-6">
              Your referral email is ready to send.<br />
              Ujjwal will follow up within 24 hours.
            </div>
            <div className="font-mono text-[9px] tracking-[3px] text-gta-green/50 mb-6">
              ✓ ACHIEVEMENT UNLOCKED: KINGMAKER
            </div>
            <button onClick={onClose}
              className="font-bebas text-[14px] tracking-[4px] px-8 py-3 border border-gta-green/40 text-gta-green hover:bg-gta-green/10 transition-all"
            >
              CLOSE ✕
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
