let ctx = null
let unlocked = false

function getCtx() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)() } catch { return null }
  }
  return ctx
}

export function unlockAudio() {
  const c = getCtx()
  if (!c || unlocked) return
  c.resume().then(() => { unlocked = true }).catch(() => {})
}

async function play(freq, vol, type, dur) {
  const c = getCtx()
  if (!c) return
  try {
    if (c.state === 'suspended') {
      c.resume().catch(() => {})
      await new Promise(r => setTimeout(r, 30))
    }
    if (c.state !== 'running') return
    const osc  = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(vol, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + dur + 0.05)
  } catch {}
}

export const sound = {
  hover:       () => play(900,  0.06, 'sine',   0.05),
  click:       () => play(600,  0.10, 'square', 0.07),
  achievement: () => {
    play(523, 0.13, 'sine', 0.13)
    setTimeout(() => play(659, 0.13, 'sine', 0.13), 130)
    setTimeout(() => play(784, 0.15, 'sine', 0.25), 260)
  },
  npc: () => {
    play(480, 0.10, 'sine', 0.07)
    setTimeout(() => play(600, 0.08, 'sine', 0.09), 80)
  },
  wanted: () => [880, 784, 698, 622].forEach((f, i) =>
    setTimeout(() => play(f, 0.13, 'square', 0.2), i * 110)
  ),
  open:  () => play(440, 0.10, 'sine', 0.14),
  close: () => play(320, 0.10, 'sine', 0.12),
}
