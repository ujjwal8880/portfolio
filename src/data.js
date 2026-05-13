/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO CONFIG — edit this file to make it yours when you fork.
   Every piece of personal content lives here.
   ═══════════════════════════════════════════════════════════════════ */

// ── 1. PERSONAL DETAILS ────────────────────────────────────────────
export const personal = {
  // Identity
  firstName:    'UJJWAL',
  lastName:     'SINGHAL',
  initials:     'US',           // shown in HUD nav (e.g. "US · SDE2")

  // Role
  role:         'Frontend Engineer (SDE 2)',
  roleShort:    'SDE 2',
  tagline:      'AI-FIRST FRONTEND ENGINEER',
  badge:        '⚡ AI-FIRST · DSA-SHARP · SCALE-PROVEN',
  heroCaption:  '// FRONTEND ENGINEER · SDE 2 · 6+ YEARS XP',
  yearsXp:      '6+',
  currentCompany: 'PAPAYA GLOBAL',

  // Contact
  email:        'ujjwalsinghal19@gmail.com',
  phone:        '+91-9528288880',
  linkedin:     'https://linkedin.com/in/ujjwalsinghal',
  linkedinHandle: 'ujjwalsinghal',
  github:       'https://github.com/ujjwal8880',
  githubHandle: 'ujjwal8880',
  leetcode:     '',             // add your LeetCode profile URL

  // Education
  degree:       'B.TECH COMPUTER SCIENCE',
  college:      'LOVELY PROFESSIONAL UNIVERSITY',
  gradYear:     '2016 – 2020',

  // CV / resume (file must be in /public/)
  cvFile:           '/Ujjwal_Singhal.pdf',
  cvDownloadName:   'Ujjwal_Singhal_Resume.pdf',

  // Portfolio source repo (shown in CheatSheet)
  portfolioRepo:    'https://github.com/ujjwal8880/portfolio',
}

// ── 2. HERO STATS (row of numbers under your name) ─────────────────
export const heroStats = [
  { val: '6+',   lbl: 'Years Active' },
  { val: '40K+', lbl: 'Users on AI Platform' },
  { val: '~95%', lbl: 'Ticket Reduction' },
  { val: '1M+',  lbl: 'Daily Users Served' },
  { val: '15+',  lbl: 'Microfrontends Built' },
]

// ── 3. CHARACTER STATS (skill bars in About section) ───────────────
export const charStats = [
  { label: 'React.js Mastery',         score: 95, colorClass: 'bg-gradient-to-r from-cyan-400 to-teal-400' },
  { label: 'Architecture Design',      score: 92, colorClass: 'bg-gradient-to-r from-gta-orange to-gta-pink' },
  { label: 'Performance Optimization', score: 90, colorClass: 'bg-gradient-to-r from-gta-green to-teal-400' },
  { label: 'TypeScript',               score: 88, colorClass: 'bg-gradient-to-r from-blue-500 to-gta-cyan' },
  { label: 'AI Integration',           score: 90, colorClass: 'bg-gradient-to-r from-gta-purple to-gta-pink' },
  { label: 'System Design',            score: 88, colorClass: 'bg-gradient-to-r from-gta-purple to-gta-cyan' },
  { label: 'DSA / Problem Solving',    score: 85, colorClass: 'bg-gradient-to-r from-gta-yellow to-gta-orange' },
]

// ── 4. ABOUT BIO (HTML strings — use <strong> for cyan highlights) ─
export const about = {
  paragraphs: [
    `I'm Ujjwal — a <strong>Frontend Engineer (SDE 2)</strong> with 6+ years turning complex engineering problems into sleek, performant products that humans actually love.`,
    `My edge? I <strong>ship AI-powered features daily</strong> — from building an AI support platform that served 40K+ users and cut tickets by ~95%, to automating workflows so my team moves 10× faster. I don't just use AI as a tool; <strong>I build products with it</strong>.`,
    `I specialise in <strong>microfrontend architecture</strong>, real-time systems, and high-scale apps serving <strong>millions of users</strong> at companies like PharmEasy, Papaya Global, and CashFlo. I also keep my <strong>DSA fundamentals sharp</strong> — clean algorithmic thinking underpins great architecture.`,
  ],
  badge: '⚡ AI-NATIVE DEVELOPER · LLMs IN DAILY WORKFLOW',
}

// ── 5. WORK EXPERIENCE (Career Missions section) ───────────────────
export const missions = [
  {
    title:   'SDE 2',
    company: 'PAPAYA GLOBAL',
    period:  '02/2024 — PRESENT',
    status:  'active',
    badge:   '◉ ACTIVE',
    points: [
      'Led frontend development across multiple products — mentoring engineers & driving architecture for India teams',
      'Built AI-powered support platform for 40K+ users, cutting tickets by ~95% using LLM integrations',
      'Developed real-time chat system handling 10K+ concurrent messages with virtual rendering optimizations',
      'Architected 15+ microfrontends with Module Federation — migrated legacy monolith with zero downtime',
      'Published react-event-bus to communicate between microfrontends and built a declarative analytics system',
    ],
    tags: ['Module Federation', 'AI / LLM', 'Real-time Chat', 'Mixpanel', 'Mentorship'],
  },
  {
    title:   'SDE 2',
    company: 'CASHFLO',
    period:  '02/2023 — 02/2024',
    status:  'done',
    badge:   '✓ MISSION PASSED',
    points: [
      'Designed org-wide microfrontend architecture with Single-SPA — adopted across every team',
      'Eliminated cross-team deployment dependencies, improving release velocity and autonomy',
      'Led full Angular → React migration, modernising the codebase and boosting developer productivity',
      'Reduced page load times by ~25% via code-splitting, lazy loading, and bundle analysis',
      'Built reusable design system in Storybook, used organisation-wide',
    ],
    tags: ['Single-SPA', 'Angular → React', 'Storybook', '-25% Load Time'],
  },
  {
    title:   'SOFTWARE ENGINEER',
    company: 'PHARMEASY',
    period:  '10/2021 — 01/2023',
    status:  'done',
    badge:   '✓ MISSION PASSED',
    points: [
      'Built critical homepage & checkout features for 1M+ daily users — zero tolerance for downtime',
      'Cut redundant API calls by ~30% through smart caching and request deduplication',
      'Shipped high-impact reusable UI components (carousels, bottom sheets) used app-wide',
    ],
    tags: ['1M+ Daily Users', '-30% API Calls', 'React', 'High Scale'],
  },
  {
    title:   'SOFTWARE ENGINEER',
    company: 'SHOPX (10i COMMERCE)',
    period:  '01/2021 — 09/2021',
    status:  'done',
    badge:   '✓ MISSION PASSED',
    points: [
      'Built and optimised microfrontend-based retailer web applications',
      'Developed consumer-facing webviews deeply integrated into native mobile apps',
    ],
    tags: ['Microfrontends', 'Mobile Webviews'],
  },
  {
    title:   'INTERN → SDE 1',
    company: 'RENTOMOJO',
    period:  '08/2019 — 01/2021',
    status:  'done',
    badge:   '✓ PROMOTED',
    points: [
      'Promoted from SDE Intern to SDE 1 in 10 months — fastest in the team',
      'Built CX dashboard (React + NestJS) used daily by 500+ support agents',
      'Developed backend services with Fastify & LoopBack; contributed to admin tooling',
    ],
    tags: ['React', 'NestJS', 'Fastify', 'Promoted Fast'],
  },
  {
    title:   'FRONTEND INTERN',
    company: 'OLCADEMY',
    period:  '11/2018 — 01/2019',
    status:  'done',
    badge:   '⬡ ORIGIN STORY',
    points: ['Built responsive UI components in HTML, CSS & JavaScript — where it all began'],
    tags:   ['HTML/CSS/JS', 'First Job'],
  },
]

// ── 6. SKILLS (Weapon Wheel) ────────────────────────────────────────
export const skills = [
  {
    icon:  '⚡',
    title: 'LANGUAGES',
    pills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SCSS'],
  },
  {
    icon:  '⚛️',
    title: 'FRONTEND',
    pills: ['React.js', 'Next.js', 'Redux', 'AngularJS', 'Vue.js', 'React Query'],
  },
  {
    icon:  '🏗️',
    title: 'ARCHITECTURE',
    pills: ['Microfrontends', 'Module Federation', 'Single-SPA', 'Monorepos'],
  },
  {
    icon:  '🤖',
    title: 'AI / DAILY TOOLS',
    pills: ['LLM Integration', 'Claude / ChatGPT', 'Cursor IDE', 'AI-powered PRs', 'Prompt Engineering'],
  },
  {
    icon:  '🗺️',
    title: 'SYSTEM DESIGN',
    pills: ['Distributed Frontend', 'Event-driven Architecture', 'API Design', 'Caching Strategies', 'Scalability Planning', 'Design Reviews'],
  },
  {
    icon:  '🚀',
    title: 'BACKEND',
    pills: ['Node.js', 'NestJS', 'Fastify', 'GraphQL', 'REST APIs'],
  },
  {
    icon:  '🛠️',
    title: 'TOOLS & TESTING',
    pills: ['Webpack', 'Storybook', 'Jest', 'Playwright', 'Mixpanel'],
  },
]

// ── 7. NUMBERS (Kill Count section) ────────────────────────────────
export const numbers = [
  { icon: '🎯', val: '~95%', lbl: 'Support Ticket Reduction' },
  { icon: '👥', val: '40K+', lbl: 'Users on AI Platform' },
  { icon: '📱', val: '1M+',  lbl: 'Daily Users' },
  { icon: '⚡', val: '~30%', lbl: 'API Call Reduction' },
  { icon: '🏗️', val: '15+',  lbl: 'Microfrontends Built' },
  { icon: '💬', val: '10K+', lbl: 'Real-time Messages' },
  { icon: '⚙️', val: '~25%', lbl: 'Page Load Improvement' },
  { icon: '🎓', val: '6+',   lbl: 'Years of Experience' },
]

// ── 8. CHEAT CODES ─────────────────────────────────────────────────
// code   : sequence to type on keyboard (no spaces, uppercase)
// msg    : notification shown when activated
// icon   : emoji for the CheatSheet panel
// desc   : description shown in CheatSheet panel
// action : one of → 'terminal' | 'referral' | 'wanted' | 'skills' | 'stats' | 'nums'
export const cheatCodes = [
  { code: 'AIFIRST',  msg: 'AI-FIRST MODE ACTIVATED',  icon: '>_', desc: 'Open Live Terminal',    action: 'terminal', color: '#00E5FF' },
  { code: 'GOTWORK',  msg: 'REFERRAL UNLOCKED',         icon: '🤝', desc: 'Open Referral Form',   action: 'referral', color: '#39FF14' },
  { code: 'TOPGUN',   msg: '5-STAR WANTED LEVEL',       icon: '⭐', desc: '5★ Wanted Level',      action: 'wanted',   color: '#FF2200' },
  { code: 'POWERUP',  msg: 'INFINITE AMMO LOADED',      icon: '⚡', desc: 'Unlock Skills Arsenal', action: 'skills',  color: '#8B00FF' },
  { code: 'FASTLANE', msg: 'SPEED BOOST ENGAGED',       icon: '🚀', desc: 'Jump to Kill Count',   action: 'stats',    color: '#FF6B00' },
  { code: 'GODMODE',  msg: 'INVINCIBILITY ON',          icon: '👑', desc: 'Infinite Stats',        action: 'nums',    color: '#FFE600' },
]

// ── 9. LOADER TIPS (rotate during the loading screen) ──────────────
export const loaderTips = [
  'AI-powered platform reduced support tickets by ~95% for 40K+ users',
  'Architected 15+ microfrontends with Module Federation at Papaya Global',
  'Built systems serving 1M+ daily users at PharmEasy',
  'Published open-source @papayaglobal/react-event-bus on npm',
  'Migrated entire orgs from Angular to React — twice',
  'Reduced page load time by ~25% through deep performance engineering',
  'Uses AI tools every single day to ship 10× faster',
  'DSA practitioner — algorithmic thinking shapes architecture decisions',
  'Real-time chat system — 10K+ messages, zero rendering lag',
  '6+ years growing from intern → SDE 2 at top product companies',
]
