import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import Loader from './components/Loader';
import HudNav from './components/HudNav';
import Minimap from './components/Minimap';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Numbers from './components/Numbers';
import Footer from './components/Footer';
import NpcChat from './components/NpcChat/NpcChat';
import AchievementToast, { useAchievementTrigger } from './components/AchievementToast';
import WeaponWheel from './components/WeaponWheel';
import GtaCursor from './components/GtaCursor';
import WantedScreen from './components/WantedScreen';
import ReferralModal from './components/ReferralModal';
import Terminal, { toggleTerminal } from './components/Terminal';
import MissionTransition, { triggerMission } from './components/MissionTransition';
import CheatSheet from './components/CheatSheet';
import { sound, unlockAudio } from './utils/sound';

export default function App() {
  const [loaded,    setLoaded]   = useState(false);
  const [letterbox, setLetterbox]= useState(true);
  const [scroll,    setScroll]   = useState(0);
  const [wanted,    setWanted]   = useState(false);
  const [referral,  setReferral] = useState(false);
  const [npcOpen,   setNpcOpen]  = useState(false);
  const [cheatMsg,  setCheatMsg] = useState(null);
  const [cheatOpen, setCheatOpen] = useState(false);
  const fire = useAchievementTrigger();

  const showCheat = useCallback((label) => {
    setCheatMsg(label);
    setTimeout(() => setCheatMsg(null), 2800);
  }, []);

  const onLoaderDone = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setLetterbox(false), 300);
    setTimeout(() => fire('hero'), 1200);
  }, [fire]);

  // Global sound — hover + click on any interactive element
  useEffect(() => {
    const SELECTOR = 'a, button, [role="button"], .cursor-pointer, label';
    let lastHovered = null;
    const onOver = (e) => {
      const el = e.target.closest(SELECTOR);
      if (el && el !== lastHovered) { lastHovered = el; sound.hover(); }
      if (!el) lastHovered = null;
    };
    const onClick = (e) => { if (e.target.closest(SELECTOR)) sound.click(); };
    // Mobile: unlock AudioContext and play click sound on touch
    const onTouchEnd = (e) => {
      unlockAudio();
      if (e.target.closest(SELECTOR)) sound.click();
    };
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    const id = requestAnimationFrame(raf);
    lenis.on('scroll', ({ progress }) => setScroll(Math.min(progress * 100, 100)));
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  // Konami easter egg → WANTED screen
  useEffect(() => {
    const K = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let ki = 0;
    const h = (e) => {
      ki = e.keyCode === K[ki] ? ki + 1 : 0;
      if (ki === K.length) { ki = 0; setWanted(true); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  // GTA-style cheat codes
  useEffect(() => {
    const CODES = {
      'AIFIRST':   () => { showCheat('AI-FIRST MODE ACTIVATED'); toggleTerminal() },
      'GOTWORK':   () => { showCheat('REFERRAL UNLOCKED'); setReferral(true); sound.open() },
      'TOPGUN':    () => { showCheat('5-STAR WANTED LEVEL'); setWanted(true) },
      'POWERUP':   () => { showCheat('INFINITE AMMO LOADED'); fire('skills') },
      'FASTLANE':  () => { showCheat('SPEED BOOST ENGAGED'); document.querySelector('#nums')?.scrollIntoView({ behavior: 'smooth' }) },
      'GODMODE':   () => { showCheat('INVINCIBILITY ON'); fire('nums') },
    };
    let buf = '';
    const h = (e) => {
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey) return;
      buf = (buf + e.key.toUpperCase()).slice(-10);
      for (const [code, fn] of Object.entries(CODES)) {
        if (buf.endsWith(code)) { buf = ''; fn(); break; }
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [showCheat, fire]);

  const downloadCv = () => {
    const link = document.createElement('a');
    link.href = '/Ujjwal_Singhal.pdf';
    link.download = 'Ujjwal_Singhal_Resume.pdf';
    link.click();
  };

  return (
    <>
      <GtaCursor />
      <div className='noise' />
      <div className='scanlines' />

      {/* Vignette */}
      <div className='fixed inset-0 pointer-events-none z-[50]'
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.55) 100%)' }}
      />

      {/* Scroll progress bar */}
      <div className='fixed top-0 left-0 right-0 z-[900] h-[2px]' style={{ background: 'rgba(0,0,0,.3)' }}>
        <div className='h-full transition-all duration-150'
          style={{ width: `${scroll}%`, background: 'linear-gradient(90deg,#FF6B00,#FF1F6D,#8B00FF,#00E5FF)', boxShadow: '0 0 8px #FF1F6D' }}
        />
      </div>

      {/* Cinematic letterbox */}
      <div className='fixed left-0 right-0 z-[800] bg-black transition-all duration-700'
        style={{ top: 0, height: letterbox ? 60 : 0, overflow: 'hidden' }}
      />
      <div className='fixed left-0 right-0 z-[800] bg-black transition-all duration-700'
        style={{ bottom: 0, height: letterbox ? 60 : 0, overflow: 'hidden' }}
      />

      {/* CV + Referral + Terminal — above minimap (desktop) */}
      <div className='fixed z-[600] hidden md:flex flex-col gap-2 items-end' style={{ bottom: '140px', right: '24px' }}>
        <button onClick={downloadCv}
          className='flex items-center gap-2 px-4 py-2 font-bebas text-[12px] tracking-[3px] text-white transition-all hover:brightness-125 hover:scale-105'
          style={{ background: 'linear-gradient(135deg,#FF6B00,#FF1F6D)', boxShadow: '0 0 18px rgba(255,107,0,.3)' }}
        >
          ⬇ DOWNLOAD CV
        </button>
        <button onClick={() => { setReferral(true); sound.open(); }}
          className='flex items-center gap-2 px-4 py-2 font-bebas text-[12px] tracking-[3px] text-gta-green border border-gta-green/40 transition-all hover:bg-gta-green/10 hover:scale-105'
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,20,.8)', boxShadow: '0 0 14px rgba(57,255,20,.15)' }}
        >
          🤝 REFER ME
        </button>
        <button onClick={toggleTerminal}
          className='flex items-center gap-2 px-4 py-2 font-bebas text-[12px] tracking-[3px] text-gta-cyan border border-gta-cyan/30 transition-all hover:bg-gta-cyan/10 hover:scale-105'
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,20,.8)', boxShadow: '0 0 14px rgba(0,229,255,.1)' }}
        >
          &gt;_ TERMINAL
        </button>
      </div>

      {/* Terminal button — mobile only, bottom-left above NPC */}
      <button
        onClick={toggleTerminal}
        className='fixed z-[600] md:hidden font-mono text-[9px] tracking-[2px] text-gta-cyan border border-gta-cyan/30 px-3 py-2 transition-all hover:bg-gta-cyan/10'
        style={{ bottom: '164px', left: '16px', background: 'rgba(0,0,20,.85)', backdropFilter: 'blur(8px)' }}
      >
        &gt;_ TERM
      </button>

      {!loaded && <Loader onDone={onLoaderDone} />}

      <div className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <HudNav onCheatSheet={() => { setCheatOpen(true); sound.open() }} />
        <Minimap scrollPct={scroll} />
        <main>
          <Hero       onView={(id) => fire(id)} />
          <About      onView={() => { fire('about');      triggerMission('about') }} />
          <Experience onView={() => { fire('experience'); triggerMission('experience') }} />
          <Skills     onView={() => { fire('skills');     triggerMission('skills') }} />
          <Numbers    onView={() => { fire('nums');       triggerMission('nums') }} />
        </main>
        <Footer onReferral={() => { setReferral(true); sound.open(); }} onCvDownload={downloadCv} />
        <NpcChat onOpenChange={setNpcOpen} />
        <AchievementToast npcOpen={npcOpen} />
        <WeaponWheel />
        <MissionTransition />
        <Terminal />
      </div>

      {/* Cheat code notification */}
      {cheatMsg && (
        <div className="fixed top-16 left-1/2 z-[9000] -translate-x-1/2 pointer-events-none"
          style={{ animation: 'termSlideUp .2s ease' }}
        >
          <div className="font-mono text-[10px] md:text-[12px] tracking-[5px] px-6 py-3 text-center"
            style={{
              background: 'rgba(0,0,4,.95)',
              border: '1px solid #FFE600',
              boxShadow: '0 0 30px rgba(255,230,0,.3)',
              color: '#FFE600',
            }}
          >
            <span className="text-white/40 mr-2">CHEAT CODE:</span>{cheatMsg}
          </div>
        </div>
      )}

      <CheatSheet open={cheatOpen} onClose={() => setCheatOpen(false)} />
      {wanted   && <WantedScreen  onDismiss={() => setWanted(false)} />}
      {referral && <ReferralModal onClose={() => setReferral(false)} />}
    </>
  );
}
