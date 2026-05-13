# ⚡ GTA 6-Style Portfolio — Fork & Make It Yours

A cinematic, GTA 6-themed developer portfolio built with **React 19 + Vite + Tailwind CSS**.  
Designed to go viral on LinkedIn. Every piece of personal content lives in **one file**.

**Live demo:** https://ujjwalsinghal.vercel.app

---

## What's inside

| Feature | Description |
|---|---|
| 🌧️ Living city | Animated rain, flickering windows, moving cars, police strobes |
| 🎬 Mission transitions | Cinematic district overlays on section scroll |
| >_ Terminal | Fake live OS terminal with real-time AI metrics |
| 📡 Live feed | Streaming activity panel in the stats section |
| 🗺️ Minimap | Rotating radar scanner + section blips |
| ⚙️ Weapon Wheel | Skills overlay (Tab key) |
| 🤖 AI NPC Chat | In-character AI assistant built on keyword rules |
| 🏆 Achievements | 5 unlockable achievement toasts |
| 🕹️ Cheat codes | Type `AIFIRST`, `GOTWORK`, `TOPGUN`, `POWERUP`, `FASTLANE`, `GODMODE` |
| ↑↑↓↓ Konami | 5-star Wanted screen easter egg |
| 🔊 Web Audio | Procedural sounds — no audio files |
| 🖱️ Custom cursor | Spring-physics cursor with click ripple (desktop) |
| 📱 Mobile-ready | Full responsive, touch support, mobile NPC chat |
| 📊 Analytics | Vercel Web Analytics + Speed Insights built in |

---

## Fork in 5 minutes

### 1. Clone and install

```bash
git clone https://github.com/ujjwal8880/portfolio.git
cd portfolio
npm install
npm run dev
```

### 2. Edit the ONE config file

**Everything personal lives in `src/data.js`.**  
Open it and update these sections:

```js
// ── 1. YOUR IDENTITY ───────────────────────────────
export const personal = {
  firstName:    'YOUR_FIRST_NAME',
  lastName:     'YOUR_LAST_NAME',
  initials:     'AB',
  role:         'Software Engineer (SDE 2)',
  roleShort:    'SDE 2',
  tagline:      'FULL-STACK ENGINEER',
  badge:        '⚡ FAST · RELIABLE · SCALABLE',
  heroCaption:  '// SOFTWARE ENGINEER · SDE 2 · 4+ YEARS XP',
  yearsXp:      '4+',
  currentCompany: 'YOUR COMPANY',
  email:        'you@example.com',
  linkedin:     'https://linkedin.com/in/yourhandle',
  linkedinHandle: 'yourhandle',
  github:       'https://github.com/yourusername',
  githubHandle: 'yourusername',
  degree:       'B.TECH COMPUTER SCIENCE',
  college:      'YOUR UNIVERSITY',
  gradYear:     '2018 – 2022',
  cvFile:           '/Your_Resume.pdf',   // drop file in /public/
  cvDownloadName:   'Your_Resume.pdf',
  portfolioRepo:    'https://github.com/yourusername/portfolio',
}

// ── 2. HERO STATS ─────────────────────────────────
export const heroStats = [
  { val: '4+',   lbl: 'Years Active' },
  { val: '500K', lbl: 'Users Served' },
  // ...
]

// ── 3. SKILL BARS in About section ────────────────
export const charStats = [
  { label: 'React.js',  score: 90, colorClass: 'bg-gradient-to-r from-cyan-400 to-teal-400' },
  // ...
]

// ── 4. ABOUT BIO PARAGRAPHS (HTML ok) ─────────────
export const about = {
  paragraphs: [
    `I'm Your Name — a <strong>Software Engineer</strong> with ...`,
    // ...
  ],
  badge: '⚡ YOUR BADGE TEXT',
}

// ── 5. WORK EXPERIENCE ────────────────────────────
export const missions = [
  {
    title:   'SDE 2',
    company: 'YOUR COMPANY',
    period:  '01/2023 — PRESENT',
    status:  'active',
    badge:   '◉ ACTIVE',
    points:  ['...', '...'],
    tags:    ['React', 'TypeScript'],
  },
  // ...
]

// ── 6. SKILLS WHEEL ───────────────────────────────
export const skills = [
  { icon: '⚛️', title: 'FRONTEND', pills: ['React', 'Next.js', '...'] },
  // ...
]

// ── 7. ACHIEVEMENT NUMBERS ────────────────────────
export const numbers = [
  { icon: '🎯', val: '99%', lbl: 'Test Coverage' },
  // ...
]

// ── 8. CHEAT CODES (fully configurable) ───────────
export const cheatCodes = [
  { code: 'AIFIRST', msg: 'AI-FIRST MODE ACTIVATED', icon: '>_', desc: 'Open Live Terminal', action: 'terminal', color: '#00E5FF' },
  // action: 'terminal' | 'referral' | 'wanted' | 'skills' | 'stats' | 'nums'
]

// ── 9. LOADER TIPS ────────────────────────────────
export const loaderTips = [
  'Your achievement #1',
  'Your achievement #2',
  // ...
]
```

### 3. Update the NPC chat responses

The AI NPC is keyword-based. Edit **`src/components/NpcChat/responses.js`** to match your own story.  
Each rule has a `test` regex and a `responses` array — just swap in your own facts.

### 4. Add your CV

Drop your resume PDF into the `/public/` folder and update `cvFile` / `cvDownloadName` in `personal`.

### 5. Update the browser title

Edit `index.html` line 6:
```html
<title>⚡ YOUR NAME · YOUR ROLE · YOUR CITY</title>
```

### 6. Deploy

#### Option A — Vercel CLI (recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel auto-detects Vite. Build command: `npm run build`. Output dir: `dist`. Done.  
Every `git push` to `main` after that triggers a new production deploy automatically.

#### Option B — Vercel Dashboard (no CLI)

1. Push your fork to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository**.
3. Select your fork — Vercel detects Vite automatically.
4. Click **Deploy**. No config needed.

#### Option C — Netlify

```bash
npm run build
```

Drag the `/dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop), or connect your repo and set:
- Build command: `npm run build`
- Publish directory: `dist`

#### Option D — GitHub Pages

```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

Then enable GitHub Pages in your repo settings → branch: `gh-pages`.

### 7. Free custom domain (optional)

Get a free `yourname.is-a.dev` subdomain — no credit card needed.

> **Note:** [is-a-dev/register](https://github.com/is-a-dev/register) is a separate community-run repo — not this portfolio. You submit a PR there to claim your subdomain. This is standard GitHub PR workflow: you fork their repo, add one JSON file, and open a PR. Once merged, your subdomain goes live.

**Steps:**

1. Fork [is-a-dev/register](https://github.com/is-a-dev/register) (their repo, not this one)
2. In your fork, create `domains/yourname.json`:
```json
{
  "$schema": "../DOMAIN_SCHEMA.json",
  "description": "Your portfolio",
  "repo": "https://github.com/yourusername/portfolio",
  "owner": {
    "username": "yourusername",
    "email": "you@example.com"
  },
  "records": {
    "CNAME": "cname.vercel-dns.com"
  }
}
```
3. Open a PR from your fork → `is-a-dev/register` — maintainers usually merge within 24h.
4. Once merged, add `yourname.is-a.dev` to your Vercel project: **Project Settings → Domains**.

**Vercel domain ownership error?** If Vercel says the domain is linked to another account, create a second file `domains/_vercel.yourname.json` in the same fork/PR:
```json
{
  "owner": {
    "username": "yourusername",
    "email": "you@example.com"
  },
  "records": {
    "TXT": "vc-domain-verify=..."
  }
}
```
Get the `vc-domain-verify=...` value from **Vercel → Project Settings → Domains** when you try to add the domain.

### 8. Analytics (already included)

`@vercel/analytics` and `@vercel/speed-insights` are wired up in `src/main.jsx` and activate automatically on Vercel deployments. No extra config needed — just check your Vercel dashboard for data after deploying.

---

## Project structure

```
src/
├── data.js              ← 🔥 ALL personal content lives here
├── main.jsx             ← entry point + Analytics + SpeedInsights
├── App.jsx              ← root, wires everything together
├── index.css            ← global styles + keyframe animations
├── components/
│   ├── Hero.jsx         ← landing section + parallax + rain
│   ├── About.jsx        ← bio + stat bars
│   ├── Experience.jsx   ← career missions timeline
│   ├── Skills.jsx       ← skills section
│   ├── Numbers.jsx      ← achievement stats + live feed
│   ├── Footer.jsx       ← links + fork link
│   ├── HudNav.jsx       ← top navigation + hamburger
│   ├── Minimap.jsx      ← radar map (bottom-right)
│   ├── WeaponWheel.jsx  ← skills overlay (Tab)
│   ├── Terminal.jsx     ← live OS terminal (backtick)
│   ├── NpcChat/         ← AI chat assistant
│   │   ├── NpcChat.jsx
│   │   ├── responses.js ← ✏️ update with your own story
│   │   └── QuickReplies.jsx
│   ├── AchievementToast.jsx
│   ├── CheatSheet.jsx   ← reads cheat codes from data.js
│   ├── WantedScreen.jsx ← Konami easter egg
│   ├── ReferralModal.jsx
│   ├── MissionTransition.jsx
│   ├── RainCanvas.jsx
│   ├── ParticleField.jsx
│   ├── LiveFeed.jsx
│   └── Loader.jsx
├── hooks/
│   ├── useInView.js
│   ├── useScramble.js
│   └── useTilt.js
└── utils/
    └── sound.js         ← Web Audio API sound engine
```

---

## Tech stack

- **React 19** + **Vite**
- **Tailwind CSS** — utility styling
- **Lenis** — smooth scroll
- **@vercel/analytics** — page views & visitor stats
- **@vercel/speed-insights** — Core Web Vitals monitoring
- **Web Audio API** — procedural sounds (no audio files)
- **Canvas API** — rain + particle effects
- **IntersectionObserver** — scroll-triggered animations

---

## Credits

Built by [Ujjwal Singhal](https://linkedin.com/in/ujjwalsinghal) with [Claude by Anthropic](https://claude.ai).  
Not affiliated with Rockstar Games™.

**Star ⭐ the repo if you use it — it helps others find it.**
