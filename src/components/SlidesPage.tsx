import { Sparkles, FileText } from 'lucide-react';

interface SlidesPageProps {
  onBack: () => void;
}

export default function SlidesPage({ onBack }: SlidesPageProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Slides</h1>
            <p className="mt-1 text-sm text-white/50">Generate presentation slides from your prompts</p>
          </div>
          <button onClick={onBack} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white">
            Back to chat
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Sparkles size={18} className="text-white/60" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Create a presentation</h2>
              <p className="text-xs text-white/40">Describe your topic and Mars will generate slides</p>
            </div>
          </div>

          <textarea
            placeholder="e.g. Create a 10-slide presentation about the future of space exploration..."
            rows={3}
            className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
          />

          <button className="mt-3 w-full rounded-xl bg-white py-2.5 text-sm font-medium text-black transition-all hover:scale-[1.01]">
            Generate slides
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center py-16 text-center">
          <FileText size={40} className="text-white/20" />
          <p className="mt-4 text-white/40">No slides yet</p>
          <p className="mt-1 text-sm text-white/30">Your generated presentations will appear here</p>
        </div>
      </div>
    </div>
  );
}
