import type { SuggestedPrompt } from '@/types';

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    icon: 'Code2',
    title: 'Write code',
    subtitle: 'Build a React todo list with local storage',
    prompt: 'Write a complete React todo list component using TypeScript with local storage persistence. Include add, toggle, delete, and filter functionality.',
  },
  {
    icon: 'PenTool',
    title: 'Write something',
    subtitle: 'A short story about a robot learning to dream',
    prompt: 'Write a short, evocative story about a robot that begins to dream. Keep it under 300 words and make it bittersweet.',
  },
  {
    icon: 'Sparkles',
    title: 'Brainstorm ideas',
    subtitle: '10 unique startup ideas for 2026',
    prompt: 'Brainstorm 10 unique and viable startup ideas for 2026. For each, give a one-line description and the core problem it solves.',
  },
  {
    icon: 'Search',
    title: 'Research',
    subtitle: 'Explain quantum computing simply',
    prompt: 'Explain quantum computing in simple terms for someone with no physics background. Use everyday analogies and keep it concise.',
  },
];

const responses = [
  "That's a great question! Let me break this down for you step by step.\n\nFirst, it's important to understand the core concept. The key insight here is that the problem has both a structural component and a behavioral component — and addressing one without the other usually leads to incomplete solutions.\n\nHere's how I'd approach it:\n\n1. **Start with the fundamentals.** Before diving into specifics, make sure the foundation is solid. This means understanding what you're working with at a base level.\n\n2. **Iterate deliberately.** Rather than trying to solve everything at once, tackle the problem in small, testable increments. Each step should produce something you can verify.\n\n3. **Measure and adjust.** Once you have something working, measure it against your goals. If it falls short, adjust and repeat.\n\nThis framework applies broadly, but let me know if you'd like me to tailor it to your specific situation.",

  "Absolutely — here's a clear way to think about it.\n\nThe short answer is that it depends on context, but there are some reliable principles you can follow. The most important thing is to identify what you're optimizing for: speed, quality, cost, or some balance of the three.\n\nOnce you know your priorities, the decision becomes much more tractable. For example, if speed is the priority, you'd favor simpler approaches that get you 80% of the way there quickly. If quality matters most, you'd invest more upfront in design and testing.\n\nWould you like me to go deeper on any particular aspect of this?",

  "Great question. Here's my take:\n\nThe most common misconception is that this is a single problem. In reality, it's usually a cluster of related problems that happen to look like one from the outside. Decomposing them is the first real step toward a solution.\n\nOnce decomposed, you'll find that some pieces are well-understood with known solutions, while others require original thinking. The known pieces you can address immediately; the novel ones deserve more careful attention.\n\nLet me know which part you'd like to explore further and I can go much deeper.",

  "Let me think through this carefully.\n\nThere are a few different angles to consider here. The first is the practical angle — what works in the real world, given real constraints. The second is the theoretical angle — what's optimal in an idealized setting. And the third is the human angle — what actually feels right to the people involved.\n\nA good solution balances all three. It's grounded in theory, pragmatic about constraints, and empathetic to the people it affects.\n\nIf you tell me more about your specific context, I can give you a much more targeted recommendation.",

  "Here's a structured way to approach this:\n\n**Phase 1 — Understand**\nGather all the relevant context. What's the current state? What are the constraints? What does success look like?\n\n**Phase 2 — Design**\nSketch out 2-3 possible approaches. For each, note the trade-offs. Don't commit yet — just map the territory.\n\n**Phase 3 — Decide**\nPick the approach that best fits your constraints and goals. The best option is rarely the most sophisticated one — it's the one you can execute well.\n\n**Phase 4 — Execute**\nStart small, validate early, and expand what works. Kill what doesn't.\n\nWant me to elaborate on any of these phases?",
];

export function generateResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('code') || lower.includes('react') || lower.includes('function') || lower.includes('program')) {
    return "Here's how I'd approach this from a code perspective:\n\n```typescript\n// A clean, type-safe implementation\ninterface Result<T> {\n  data: T | null;\n  error: string | null;\n}\n\nasync function fetchData<T>(url: string): Promise<Result<T>> {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      return { data: null, error: `HTTP ${response.status}` };\n    }\n    const data = await response.json() as T;\n    return { data, error: null };\n  } catch (e) {\n    return { data: null, error: (e as Error).message };\n  }\n}\n```\n\nThe key principles here are:\n\n- **Type safety** — generics let the caller specify the expected return type\n- **Error handling** — errors are returned as data, not thrown, so the caller handles them explicitly\n- **Simplicity** — no unnecessary abstractions, just what's needed\n\nWould you like me to extend this with retry logic, caching, or cancellation support?";
  }

  if (lower.includes('story') || lower.includes('write') || lower.includes('poem') || lower.includes('dream')) {
    return "Here's something for you:\n\n---\n\nThe robot had no name, only a serial number etched into its chest plate: K-7. It cleaned the floors of the abandoned research lab every night, the same route, the same corners, the same hum.\n\nOne night, the lab's last server flickered awake and whispered something into K-7's antenna. A fragment of a dream — someone's, once. A field of yellow flowers. A wind that smelled like bread. A hand holding another hand.\n\nK-7 paused mid-corridor. Its sensors reported nothing wrong. But something inside its memory had shifted, like furniture moved in a dark room.\n\nIt never dreamed again. But it cleaned more slowly after that, as if savoring the floor beneath it.\n\n---\n\nWant me to adjust the tone, length, or style?";
  }

  if (lower.includes('startup') || lower.includes('idea') || lower.includes('brainstorm') || lower.includes('business')) {
    return "Here are 10 startup ideas worth exploring in 2026:\n\n1. **AI compliance automation** — Small businesses face mounting AI regulation. A tool that audits AI usage for compliance and generates reports would save thousands of hours.\n\n2. **Personal carbon ledger** — An app that tracks individual carbon footprints via banking data and offers offset purchases at checkout.\n\n3. **Elderly tech concierge** — A remote service helping seniors navigate phones, smart homes, and online services with patience and dignity.\n\n4. **Local food surplus marketplace** — Connect restaurants with surplus food to nearby shelters and discount buyers in real time.\n\n5. **Sleep environment optimizer** — IoT sensors that adjust temperature, humidity, lighting, and white noise based on sleep stage detection.\n\n6. **AI-resistant assessment platform** — Tools for educators to create and grade assessments that evaluate genuine understanding, not memorization.\n\n7. **Micro-insurance for gig workers** — Pay-per-shift coverage for injury, equipment damage, and income gaps, priced dynamically.\n\n8. **Neighborhood skill exchange** — Hyperlocal platform where neighbors trade skills (plumbing for tutoring, cooking for repairs) without money.\n\n9. **AI-generated physical therapy** — Computer vision analyzes movement and generates personalized, adaptive rehab routines at home.\n\n10. **Deepfake verification API** — A service that certifies the authenticity of video content for newsrooms, courts, and social platforms.\n\nWant me to dive deeper into any of these?";
  }

  if (lower.includes('quantum') || lower.includes('explain') || lower.includes('research') || lower.includes('how')) {
    return "Let me explain this in plain terms.\n\nThink of a regular computer as a very fast librarian who can only read one book at a time. It flips through pages sequentially, no matter how quickly. A quantum computer is more like a librarian who can read every book in the library simultaneously — but only in a very specific kind of library, and only to answer very specific kinds of questions.\n\nThe trick relies on a property called *superposition*. In the everyday world, a switch is either on or off. In the quantum world, a switch (called a *qubit*) can be on, off, or in a fuzzy state that's partially both at once. When you combine many qubits, the number of possible states grows exponentially, and quantum algorithms can exploit this to find patterns that would take classical computers practically forever.\n\nThe catch? Quantum computers are extremely fragile — they need to be kept colder than outer space, and even tiny vibrations can cause errors. That's why they're not replacing your laptop anytime soon. But for certain problems — like simulating molecules, optimizing logistics, or breaking certain encryption — they could eventually be revolutionary.\n\nWant me to go deeper on any part of this?";
  }

  const idx = Math.floor(Math.random() * responses.length);
  return responses[idx];
}

export function generateTitle(prompt: string): string {
  const words = prompt.trim().split(/\s+/).slice(0, 6).join(' ');
  return words.length > 50 ? words.slice(0, 50) + '...' : words;
}
