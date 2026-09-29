import { ArrowRight, Sparkles, MessageSquare, Zap, Globe } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-md animate-fade-in">
          <Sparkles size={13} className="text-white/80" />
          Powered by Gemini AI
        </div>

        {/* Logo */}
        <h1 className="mars-wordmark select-none text-[80px] font-black leading-none tracking-[-0.10em] text-white drop-shadow-2xl sm:text-[120px] animate-fade-in">
          MARS
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-lg text-white/70 sm:text-xl animate-fade-in">
          Your intelligent AI companion for everything
        </p>
        <p className="mt-2 text-sm text-white/40 sm:text-base">
          Ask anything, get answers, create, and explore — all in one place.
        </p>

        {/* CTA */}
        <button
          onClick={onEnter}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-2xl transition-all hover:scale-105 hover:bg-white/90 animate-fade-in"
        >
          Enter Mars
          <ArrowRight size={20} />
        </button>

        {/* Feature pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-md">
            <MessageSquare size={15} /> Smart Chat
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-md">
            <Zap size={15} /> Real-time AI
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-md">
            <Globe size={15} /> Plugins
          </div>
        </div>

        <p className="mt-16 text-xs text-white/30">Mars can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}
