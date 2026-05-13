/* ── Smart response engine for Ujjwal NPC ── */

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

const rules = [
  {
    test: /\b(hi|hey|hello|sup|yo|what'?s up|greetings)\b/i,
    responses: [
      "Ey, Ujjwal here. You reached me on a burner — make it count. What do you want to know?",
      "Yeah, this is Ujjwal. You've got my attention. Ask me something real.",
      "Heyyy. Didn't expect a call this late. What's the mission?",
    ],
  },
  {
    test: /\b(hire|job|opportunity|available|open|work together|recruit|position|role|looking for)\b/i,
    responses: [
      "Always open for the right mission. I'm currently at Papaya Global leading frontend and AI work, but if you've got something interesting — drop me a line. ujjwalsinghal19@gmail.com. I don't ghost.",
      "Depends what you're offering. I build AI-powered platforms, microfrontend architectures, and real-time systems that actually ship. If that's what you need, we should talk.",
      "Open to conversations. 6+ years deep in this game — from intern to SDE 2, built systems for 40K+ users. What kind of team are you running?",
    ],
  },
  {
    test: /\b(react|next\.?js|nextjs|frontend|tech stack|technologies|what do you use|framework)\b/i,
    responses: [
      "React + Next.js is my main weapon. TypeScript everyday, Redux for state, Webpack for bundling. Built 15+ microfrontends using Module Federation. Also solid with Vue and Angular if the mission demands it.",
      "React, Next.js, TypeScript, Redux — that's the core. But the real flex is architecture: Module Federation microfrontends, Single-SPA, real-time systems with optimised rendering. I build systems, not just components.",
      "Main stack: React + Next.js + TypeScript. But I'm a systems thinker — I've migrated entire monoliths, published npm packages, and built declarative analytics systems. Tech is just the tool.",
    ],
  },
  {
    test: /\b(ai|artificial intelligence|llm|machine learning|chatgpt|claude|gpt|openai)\b/i,
    responses: [
      "AI is in my daily toolkit. I built an AI-powered support platform at Papaya Global — 40K+ users, ~95% ticket reduction. Not a side project — actual production impact. I also use Cursor and Claude everyday to ship faster.",
      "Listen, I don't just talk about AI — I ship AI products. Built LLM-powered support systems, use AI-assisted coding daily, write better code faster because of it. That's my edge.",
      "I built an AI platform that made support tickets drop by ~95% for 40K users. I integrate LLMs into real products and use AI tools daily to 10x my output. That's what 'AI-first developer' actually means.",
    ],
  },
  {
    test: /\b(microfrontend|micro.?frontend|module federation|single.?spa|architecture|architect)\b/i,
    responses: [
      "Microfrontends are my speciality. Built 15+ at Papaya Global with Module Federation, designed org-wide architecture with Single-SPA at CashFlo. I've migrated monoliths with zero downtime. It's complex work — I love it.",
      "I've designed microfrontend architectures that teams actually adopt. At CashFlo, my Single-SPA setup was used across every team. At Papaya, I migrated a legacy monolith to 15+ federated modules. This is my zone.",
      "Two words: Module Federation. I've been deep in this since before it was cool. Designed, built, and maintained microfrontend systems at scale. The key is eliminating cross-team dependencies — and I've done it twice.",
    ],
  },
  {
    test: /\b(pharmeasy|cashflo|papaya|rentomojo|shopx)\b/i,
    responses: [
      "PharmEasy was where I worked at real scale — 1M+ daily users. No margin for error on the checkout flow. Reduced API calls by 30%, built carousel and bottom sheet components used app-wide. High stakes, loved it.",
      "CashFlo was a transformation mission — migrated Angular to React, designed the entire microfrontend architecture used by every team, cut page load times by 25%. Done in a year. Then promoted.",
      "Papaya Global is my current base. Leading frontend across multiple products, built the AI support platform, shipped 15+ microfrontends, mentoring engineers. This is the most complex technical work I've done — and the most impactful.",
    ],
  },
  {
    test: /\b(dsa|algorithm|leetcode|data structure|problem.?solv|coding challenge)\b/i,
    responses: [
      "DSA isn't just interview prep for me — it's how I think. My experience with graphs, dynamic programming, and tree traversals directly influences how I architect state management and data flows.",
      "I keep my DSA sharp. LeetCode is my training ground. Clean algorithmic thinking is what separates a good engineer from a great one. Check my profile if you want proof.",
      "Yeah I practice DSA regularly. It directly improves the quality of my architectural decisions. When you understand Big-O, you write better rendering pipelines and better API designs.",
    ],
  },
  {
    test: /\b(experience|years|background|career|journey|story)\b/i,
    responses: [
      "6+ years. Started as a frontend intern at Olcademy in 2018. Progressed through RentoMojo (intern → SDE 1 in 10 months), ShopX, PharmEasy (1M+ daily users), CashFlo (SDE 2), now leading at Papaya Global. Each mission levelled me up.",
      "Olcademy → RentoMojo → ShopX → PharmEasy → CashFlo → Papaya Global. Each company made me sharper. From building basic React UIs to shipping AI platforms for 40K users. That's the arc.",
      "Started in 2018 as an intern. Got my hands dirty, shipped fast, got promoted fast. Now at SDE 2 after 6+ years, leading frontend development and building AI systems. It's been a good run — and I'm just getting started.",
    ],
  },
  {
    test: /\b(contact|email|phone|reach|message|linkedin|call|connect|hire me|get in touch)\b/i,
    responses: [
      {
        text: "Here's how to reach me — I respond fast to serious opportunities. Pick your channel:",
        links: true,
      },
      {
        text: "Straight to it. I don't ghost real opportunities. Hit me on any of these:",
        links: true,
      },
      {
        text: "You've got options. I check all of these regularly:",
        links: true,
      },
    ],
  },
  {
    test: /\b(salary|money|rate|compensation|package|ctc|pay)\b/i,
    responses: [
      "Ha. Bold question. Let's just say I don't come cheap — but systems that reduce tickets by 95% for 40K users pay for themselves. Let's talk scope first, then numbers.",
      "That's a conversation for after we vibe on the role. What I'll say is: I'm worth more than most will offer, and less than what I'll eventually save you in technical debt.",
      "Numbers are negotiable. Value isn't. If you're building something that matters, the compensation will make sense. Email me.",
    ],
  },
  {
    test: /\b(proud|achievement|best work|biggest|impact|impressive)\b/i,
    responses: [
      "Proudest work? The AI support platform at Papaya Global. 40K+ users. Ticket reduction of ~95%. That's real impact — I didn't just build a feature, I changed how a company operates.",
      "The microfrontend architecture I designed at CashFlo. Built it from scratch, had it adopted org-wide. Eliminated cross-team deployment dependencies. When your architecture changes how 50 engineers work — that's impact.",
      "Real talk? Getting promoted at RentoMojo in 10 months as an intern. Everything since has been a compounding reward for that early hustle. That's where the foundation was built.",
    ],
  },
  {
    test: /\b(skill|best at|specialise|expert|strong)\b/i,
    responses: [
      "React + TypeScript at scale, microfrontend architecture, and AI integration. That's the triangle. Very few people are strong in all three. I am.",
      "Frontend architecture is where I live. Building systems that scale — microfrontends, real-time rendering, performance optimisation. Add AI integration on top and that's my sweet spot.",
      "My sharpest skill is making complex systems feel simple to the people using them. Whether it's a 15-microfrontend system or an AI-powered platform — I make it work seamlessly.",
    ],
  },
  {
    test: /\b(system design|distributed|scalab|architecture pattern|design pattern|api design|low level|high level|HLD|LLD)\b/i,
    responses: [
      "System design is where I thrive. I've designed distributed frontend architectures — microfrontend systems, event-driven communication between modules, caching strategies, API contract design. I've led design reviews and made calls that affected 50+ engineers.",
      "I think in systems, not just components. At Papaya Global I designed the entire microfrontend federation — how modules communicate, how they deploy independently, how caching and state management work across boundaries. That's HLD + LLD thinking.",
      "Ask me about event-driven architecture, distributed frontend systems, or API design — I've built all of it. My published @papayaglobal/react-event-bus is a real-world solution to cross-module communication at scale. System design isn't just interview prep for me — it's my daily job.",
    ],
  },
  {
    test: /\b(education|degree|university|college|study)\b/i,
    responses: [
      "B.Tech Computer Science from Lovely Professional University, 2016–2020. Solid foundation, but honestly? The real learning happened on the job.",
      "LPU, CS batch 2020. I learned the fundamentals in college, but built my actual skills shipping real products for real users.",
    ],
  },
  {
    test: /\b(thank|thanks|bye|goodbye|later|see you)\b/i,
    responses: [
      "Anytime. If you're serious about working together — hit me up. ujjwalsinghal19@gmail.com. Stay sharp.",
      "Later. Remember the address: ujjwalsinghal19@gmail.com. Don't be a stranger.",
      "Peace. If you've got the right opportunity, I'll answer. Good luck out there.",
    ],
  },
]

export const QUICK_REPLIES = [
  { label: '👔 Are you for hire?',    text: 'Are you available for hire?' },
  { label: '⚡ Tech stack?',           text: 'What is your tech stack?' },
  { label: '🤖 Your AI work?',         text: 'Tell me about your AI work' },
  { label: '🏗️ Architecture skills?', text: 'Tell me about your microfrontend architecture work' },
  { label: '🧠 DSA skills?',           text: 'What are your DSA skills?' },
  { label: '🗺️ System design?',         text: 'Tell me about your system design skills' },
  { label: '📬 How to contact?',       text: 'How can I contact you?' },
]

/* Returns either a string or { text, links: true } */
export function getResponse(input) {
  for (const rule of rules) {
    if (rule.test.test(input)) {
      const r = pick(rule.responses)
      return typeof r === 'string' ? { text: r } : r
    }
  }
  return {
    text: pick([
      "Interesting. Tell me more — what exactly are you trying to find out?",
      "You're going to have to be more specific. I'm an engineer, not a psychic.",
      "Hmm. Not sure what you mean. Try asking about my experience, skills, or how to hire me.",
      "I didn't catch that. Ask me about my tech stack, AI work, or career missions — I'll have something real to say.",
    ]),
  }
}
