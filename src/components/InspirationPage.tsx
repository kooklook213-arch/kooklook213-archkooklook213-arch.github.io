import { Lightbulb, ArrowRight } from 'lucide-react';

interface InspirationPageProps {
  onBack: () => void;
  onUsePrompt: (prompt: string) => void;
}

const inspirations = [
  { title: 'Write a short story', prompt: 'Write a short story about a robot discovering emotions for the first time', category: 'Creative' },
  { title: 'Plan a trip', prompt: 'Help me plan a 7-day trip to Japan with a moderate budget', category: 'Travel' },
  { title: 'Learn something new', prompt: 'Explain quantum computing in simple terms with an analogy', category: 'Learning' },
  { title: 'Start a business', prompt: 'Brainstorm 5 innovative startup ideas in the sustainability space', category: 'Business' },
  { title: 'Get healthy', prompt: 'Create a beginner-friendly 4-week workout and meal plan', category: 'Health' },
  { title: 'Code a project', prompt: 'Help me build a simple todo app with React and TypeScript', category: 'Code' },
  { title: 'Write a poem', prompt: 'Write a poem about the beauty of a starry night on Mars', category: 'Creative' },
  { title: 'Study effectively', prompt: 'Create a study schedule for learning Spanish in 3 months', category: 'Learning' },
  { title: 'Design something', prompt: 'Give me ideas for a minimalist living room design with natural light', category: 'Design' },
];

export default function InspirationPage({ onBack, onUsePrompt }: InspirationPageProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Inspiration</h1>
            <p className="mt-1 text-sm text-white/50">Explore ideas to get started</p>
          </div>
          <button onClick={onBack} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white">
            Back to chat
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {inspirations.map((item) => (
            <button
              key={item.title}
              onClick={() => onUsePrompt(item.prompt)}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10"
            >
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-400/70" />
                <span className="text-xs font-medium text-white/40">{item.category}</span>
              </div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/40 line-clamp-2">{item.prompt}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-white/30 transition-colors group-hover:text-white/60">
                Use prompt <ArrowRight size={12} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
