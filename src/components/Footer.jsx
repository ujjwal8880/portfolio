import { personal } from '../data'

export default function Footer({ onReferral, onCvDownload }) {
  return (
    <footer className="bg-black py-14 px-8 text-center border-t border-white/4">
      <div className="font-bebas text-[30px] tracking-[6px] gta-gradient-text mb-6">
        {personal.firstName} {personal.lastName}
      </div>

      {/* CTA row */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={onCvDownload}
          className="flex items-center gap-2 px-6 py-2 font-bebas text-[13px] tracking-[3px] text-white hover:brightness-125 transition-all"
          style={{ background:'linear-gradient(135deg,#FF6B00,#FF1F6D)' }}
        >
          ⬇ DOWNLOAD CV
        </button>
        <button
          onClick={onReferral}
          className="flex items-center gap-2 px-6 py-2 font-bebas text-[13px] tracking-[3px] text-gta-green border border-gta-green/40 hover:bg-gta-green/10 transition-all"
        >
          🤝 REFER ME TO YOUR COMPANY
        </button>
      </div>

      <p className="font-mono text-[10px] tracking-[2px] text-white/18 leading-[1.9]">
        {personal.degree} · {personal.college} · {personal.gradYear}<br />
        BUILT WITH AI, CAFFEINE &amp; AN OBSESSION FOR CRAFT<br />
        <br />
        <span className="text-gta-cyan/50">✦ PORTFOLIO CRAFTED WITH CLAUDE BY ANTHROPIC ✦</span><br />
        <a href={personal.portfolioRepo} target="_blank" rel="noopener noreferrer"
          className="text-gta-cyan/40 hover:text-gta-cyan transition-colors">
          ⑂ FORK THIS PORTFOLIO
        </a><br />
        <br />
        © 2026 {personal.firstName} {personal.lastName} · NOT AFFILIATED WITH ROCKSTAR GAMES™
      </p>
    </footer>
  )
}
