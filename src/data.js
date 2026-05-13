/* ── All portfolio data in one place ── */

export const personal = {
  name: 'UJJWAL SINGHAL',
  role: 'Frontend Engineer (SDE 2)',
  email: 'ujjwalsinghal19@gmail.com',
  phone: '+91-9528288880',
  linkedin: 'https://linkedin.com/in/ujjwalsinghal', // UPDATE IF DIFFERENT
  github: 'https://github.com/ujjwal8880',       // UPDATE IF DIFFERENT
  leetcode: '',                                        // ADD YOUR LEETCODE URL
  lcEasy: null, // e.g. 120
  lcMed: null, // e.g. 85
  lcHard: null, // e.g. 22
}

export const heroStats = [
  { val: '6+', lbl: 'Years Active' },
  { val: '40K+', lbl: 'Users on AI Platform' },
  { val: '~95%', lbl: 'Ticket Reduction' },
  { val: '1M+', lbl: 'Daily Users Served' },
  { val: '15+', lbl: 'Microfrontends Built' },
]

export const charStats = [
  { label: 'React.js Mastery', score: 95, colorClass: 'bg-gradient-to-r from-cyan-400 to-teal-400' },
  { label: 'Architecture Design', score: 92, colorClass: 'bg-gradient-to-r from-gta-orange to-gta-pink' },
  { label: 'Performance Optimization', score: 90, colorClass: 'bg-gradient-to-r from-gta-green to-teal-400' },
  { label: 'TypeScript', score: 88, colorClass: 'bg-gradient-to-r from-blue-500 to-gta-cyan' },
  { label: 'AI Integration', score: 90, colorClass: 'bg-gradient-to-r from-gta-purple to-gta-pink' },
  { label: 'System Design', score: 88, colorClass: 'bg-gradient-to-r from-gta-purple to-gta-cyan' },
  { label: 'DSA / Problem Solving', score: 85, colorClass: 'bg-gradient-to-r from-gta-yellow to-gta-orange' },
]

export const missions = [
  {
    title: 'SDE 2',
    company: 'PAPAYA GLOBAL',
    period: '02/2024 — PRESENT',
    status: 'active',
    badge: '◉ ACTIVE',
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
    title: 'SDE 2',
    company: 'CASHFLO',
    period: '02/2023 — 02/2024',
    status: 'done',
    badge: '✓ MISSION PASSED',
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
    title: 'SOFTWARE ENGINEER',
    company: 'PHARMEASY',
    period: '10/2021 — 01/2023',
    status: 'done',
    badge: '✓ MISSION PASSED',
    points: [
      'Built critical homepage & checkout features for 1M+ daily users — zero tolerance for downtime',
      'Cut redundant API calls by ~30% through smart caching and request deduplication',
      'Shipped high-impact reusable UI components (carousels, bottom sheets) used app-wide',
    ],
    tags: ['1M+ Daily Users', '-30% API Calls', 'React', 'High Scale'],
  },
  {
    title: 'SOFTWARE ENGINEER',
    company: 'SHOPX (10i COMMERCE)',
    period: '01/2021 — 09/2021',
    status: 'done',
    badge: '✓ MISSION PASSED',
    points: [
      'Built and optimised microfrontend-based retailer web applications',
      'Developed consumer-facing webviews deeply integrated into native mobile apps',
    ],
    tags: ['Microfrontends', 'Mobile Webviews'],
  },
  {
    title: 'INTERN → SDE 1',
    company: 'RENTOMOJO',
    period: '08/2019 — 01/2021',
    status: 'done',
    badge: '✓ PROMOTED',
    points: [
      'Promoted from SDE Intern to SDE 1 in 10 months — fastest in the team',
      'Built CX dashboard (React + NestJS) used daily by 500+ support agents',
      'Developed backend services with Fastify & LoopBack; contributed to admin tooling',
    ],
    tags: ['React', 'NestJS', 'Fastify', 'Promoted Fast'],
  },
  {
    title: 'FRONTEND INTERN',
    company: 'OLCADEMY',
    period: '11/2018 — 01/2019',
    status: 'done',
    badge: '⬡ ORIGIN STORY',
    points: ['Built responsive UI components in HTML, CSS & JavaScript — where it all began'],
    tags: ['HTML/CSS/JS', 'First Job'],
  },
]

export const skills = [
  {
    icon: '⚡',
    title: 'LANGUAGES',
    pills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SCSS'],
  },
  {
    icon: '⚛️',
    title: 'FRONTEND',
    pills: ['React.js', 'Next.js', 'Redux', 'AngularJS', 'Vue.js', 'React Query'],
  },
  {
    icon: '🏗️',
    title: 'ARCHITECTURE',
    pills: ['Microfrontends', 'Module Federation', 'Single-SPA', 'Monorepos'],
  },
  {
    icon: '🤖',
    title: 'AI / DAILY TOOLS',
    pills: ['LLM Integration', 'Claude / ChatGPT', 'Cursor IDE', 'AI-powered PRs', 'Prompt Engineering'],
  },
  {
    icon: '🗺️',
    title: 'SYSTEM DESIGN',
    pills: ['Distributed Frontend', 'Event-driven Architecture', 'API Design', 'Caching Strategies', 'Scalability Planning', 'Design Reviews'],
  },
  {
    icon: '🚀',
    title: 'BACKEND',
    pills: ['Node.js', 'NestJS', 'Fastify', 'GraphQL', 'REST APIs'],
  },
  {
    icon: '🛠️',
    title: 'TOOLS & TESTING',
    pills: ['Webpack', 'Storybook', 'Jest', 'Playwright', 'Mixpanel'],
  },
]

export const numbers = [
  { icon: '🎯', val: '~95%', lbl: 'Support Ticket Reduction' },
  { icon: '👥', val: '40K+', lbl: 'Users on AI Platform' },
  { icon: '📱', val: '1M+', lbl: 'Daily Users' },
  { icon: '⚡', val: '~30%', lbl: 'API Call Reduction' },
  { icon: '🏗️', val: '15+', lbl: 'Microfrontends Built' },
  { icon: '💬', val: '10K+', lbl: 'Real-time Messages' },
  { icon: '⚙️', val: '~25%', lbl: 'Page Load Improvement' },
  { icon: '🎓', val: '6+', lbl: 'Years of Experience' },
]
