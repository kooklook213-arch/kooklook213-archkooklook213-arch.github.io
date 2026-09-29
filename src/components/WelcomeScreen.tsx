import { useState } from 'react';
import { ArrowUp, FolderOpen, Link2, Paperclip, Plus, Sparkles, X } from 'lucide-react';

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
  inputValue: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onAction: (label: string) => void;
}

const suggestions = ['Help me write a weekly report', 'Translate this text', 'Brainstorm startup ideas', 'Explain a concept simply'];

export default function WelcomeScreen({ onPromptClick, inputValue, onInputChange, onSend, onAction }: WelcomeScreenProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setAttachedFile(file.name);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-8">
      <div className="w-full max-w-[650px]">
        <div className="mb-5 text-center">
          <h1 className="mars-wordmark select-none text-[52px] font-black leading-none tracking-[-0.09em] text-white drop-shadow-lg sm:text-[62px]">MARS</h1>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-white/15 bg-white/8 shadow-2xl backdrop-blur-xl transition-shadow focus-within:shadow-[0_8px_28px_rgba(0,0,0,0.3)]">
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputValue.trim()) onSend();
              }
            }}
            rows={3}
            placeholder="Ask anything, or task an agent..."
            className="min-h-[108px] w-full resize-none bg-transparent px-4 py-4 text-[15px] text-white placeholder-white/40 outline-none"
          />

          {attachedFile && (
            <div className="mx-4 mb-2 flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs text-white/70">
              <Paperclip size={13} /><span className="min-w-0 flex-1 truncate">{attachedFile}</span><button onClick={() => setAttachedFile(null)}><X size={13} /></button>
            </div>
          )}

          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-1">
              <label className="cursor-pointer rounded-full p-2 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Attach a file">
                <Plus size={18} /><input type="file" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              </label>
              <button onClick={() => onAction('Web search')} className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Web search"><Link2 size={17} /></button>
              <button onClick={() => onAction('Plugins')} className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/15 hover:text-white"><Sparkles size={14} /> Plugins</button>
            </div>
            <button onClick={onSend} disabled={!inputValue.trim()} className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${inputValue.trim() ? 'bg-white text-black hover:scale-105' : 'bg-white/20 text-white/40'}`} title="Send"><ArrowUp size={17} /></button>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-5 rounded-b-[18px] bg-white/5 py-3 text-xs text-white/50 backdrop-blur-md">
          <button onClick={() => onAction('Select project')} className="flex items-center gap-1.5 transition-colors hover:text-white"><FolderOpen size={14} /> Select project</button>
          <button onClick={() => onAction('Plugins')} className="flex items-center gap-1.5 transition-colors hover:text-white"><Sparkles size={14} /> Plugins</button>
        </div>

        {showSuggestions && <div className="mt-4 flex flex-wrap justify-center gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => { onPromptClick(suggestion); setShowSuggestions(false); }} className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs text-white/70 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white">{suggestion}</button>)}</div>}

        <button onClick={() => setShowSuggestions((value) => !value)} className="mx-auto mt-28 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"><Sparkles size={16} /> Explore inspiration <span className="text-lg leading-none">»</span></button>
      </div>
    </div>
  );
}
