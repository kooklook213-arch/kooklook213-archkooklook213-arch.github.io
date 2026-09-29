import { useRef, useEffect, KeyboardEvent } from 'react';
import { ArrowUp, Paperclip, Globe, Image, Sparkles } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-3xl border border-white/15 bg-white/8 p-3 shadow-2xl backdrop-blur-xl transition-colors focus-within:border-white/25">
          <button className="mb-0.5 ml-1 rounded-full p-2 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Attach file"><Paperclip size={18} /></button>
          <textarea ref={textareaRef} value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={handleKeyDown} rows={1} placeholder="Send a message..." className="flex-1 max-h-[200px] resize-none bg-transparent py-2 text-[15px] text-white placeholder-white/40 outline-none" />
          <div className="mb-1 mr-1 flex items-center gap-1">
            <button className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Web search"><Globe size={18} /></button>
            <button className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Attach image"><Image size={18} /></button>
            <button className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Plugins"><Sparkles size={14} /> Plugins</button>
            <button onClick={onSend} disabled={!value.trim() || disabled} className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${value.trim() && !disabled ? 'bg-white text-black hover:scale-105' : 'cursor-not-allowed bg-white/20 text-white/40'}`} title="Send"><ArrowUp size={18} /></button>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-white/40">Mars can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}
