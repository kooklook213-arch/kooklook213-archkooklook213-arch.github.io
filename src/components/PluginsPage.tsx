import { useState } from 'react';
import { X, Globe, FileText, Calculator, Calendar, Search, Code, Languages, Sparkles, Check } from 'lucide-react';

interface PluginsPageProps {
  onBack: () => void;
}

const plugins = [
  { id: 'web-search', name: 'Web Search', description: 'Search the web for current information', icon: Globe, enabled: true },
  { id: 'docs', name: 'Document Reader', description: 'Read and analyze PDF and text files', icon: FileText, enabled: false },
  { id: 'calculator', name: 'Calculator', description: 'Perform precise mathematical calculations', icon: Calculator, enabled: true },
  { id: 'calendar', name: 'Calendar', description: 'Check dates and schedule reminders', icon: Calendar, enabled: false },
  { id: 'code', name: 'Code Interpreter', description: 'Run code and analyze output', icon: Code, enabled: true },
  { id: 'translate', name: 'Translator', description: 'Translate text between languages', icon: Languages, enabled: false },
  { id: 'research', name: 'Deep Research', description: 'Multi-step research with citations', icon: Search, enabled: false },
  { id: 'slides', name: 'Slide Maker', description: 'Generate presentation slides from prompts', icon: Sparkles, enabled: false },
];

export default function PluginsPage({ onBack }: PluginsPageProps) {
  const [pluginStates, setPluginStates] = useState<Record<string, boolean>>(
    Object.fromEntries(plugins.map((p) => [p.id, p.enabled]))
  );

  const toggle = (id: string) => {
    setPluginStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Plugins</h1>
            <p className="mt-1 text-sm text-white/50">Toggle capabilities to extend Mars's abilities</p>
          </div>
          <button onClick={onBack} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white">
            Back to chat
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {plugins.map((plugin) => {
            const Icon = plugin.icon;
            const enabled = pluginStates[plugin.id];
            return (
              <button
                key={plugin.id}
                onClick={() => toggle(plugin.id)}
                className={`flex items-start gap-3 rounded-2xl border p-4 text-left backdrop-blur-md transition-all ${enabled ? 'border-white/25 bg-white/15' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${enabled ? 'bg-white text-black' : 'bg-white/10 text-white/40'}`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${enabled ? 'text-white' : 'text-white/60'}`}>{plugin.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/40">{plugin.description}</p>
                </div>
                <div className={`mt-1 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${enabled ? 'bg-white' : 'bg-white/20'}`}>
                  <div className={`h-4 w-4 rounded-full bg-black shadow-sm transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Check size={16} className="text-green-400" />
            {Object.values(pluginStates).filter(Boolean).length} plugins active
          </div>
        </div>
      </div>
    </div>
  );
}
