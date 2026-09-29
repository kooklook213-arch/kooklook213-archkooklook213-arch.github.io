import { useState } from 'react';
import { X, Globe, FileText, Calculator, Calendar, Search, Code, Languages, Sparkles } from 'lucide-react';

interface PluginsModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function PluginsModal({ isOpen, onClose }: PluginsModalProps) {
  const [pluginStates, setPluginStates] = useState<Record<string, boolean>>(
    Object.fromEntries(plugins.map((p) => [p.id, p.enabled]))
  );

  if (!isOpen) return null;

  const toggle = (id: string) => {
    setPluginStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-2xl border border-[#e9e9e7] bg-white shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#e9e9e7] p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Plugins</h2>
            <p className="text-xs text-slate-500">Toggle capabilities to extend Mars's abilities</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-[#f3f3f1] hover:text-slate-700"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {plugins.map((plugin) => {
              const Icon = plugin.icon;
              const enabled = pluginStates[plugin.id];
              return (
                <button
                  key={plugin.id}
                  onClick={() => toggle(plugin.id)}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${enabled ? 'border-[#d8d8d5] bg-[#f9f9f8]' : 'border-[#e9e9e7] bg-white hover:border-[#dcdcd9]'}`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${enabled ? 'bg-black text-white' : 'bg-[#f0f0ee] text-slate-400'}`}>
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium ${enabled ? 'text-slate-900' : 'text-slate-600'}`}>{plugin.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{plugin.description}</p>
                  </div>
                  <div className={`mt-1 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${enabled ? 'bg-black' : 'bg-[#dcdcd9]'}`}>
                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#e9e9e7] p-4">
          <button onClick={onClose} className="w-full rounded-xl bg-black py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.01]">Done</button>
        </div>
      </div>
    </div>
  );
}
