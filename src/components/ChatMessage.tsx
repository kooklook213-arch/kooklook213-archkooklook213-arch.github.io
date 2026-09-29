import { useState } from 'react';
import { Copy, Check, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
  onRegenerate: () => void;
}

function formatContent(content: string) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const lines = part.replace(/```\w*\n?/, '').replace(/```$/, '');
      return <pre key={i} className="my-3 overflow-x-auto rounded-xl bg-black/40 p-4 text-sm leading-relaxed backdrop-blur-md"><code className="font-mono text-gray-100">{lines}</code></pre>;
    }
    return <TextBlock key={i} text={part} />;
  });
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i} className="italic text-white/90">{part.slice(1, -1)}</em>;
    return part;
  });
}

function TextBlock({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-3" />;
        if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="mb-1 font-semibold text-white">{line.slice(2, -2)}</p>;
        if (/^\d+\.\s/.test(line)) return <p key={i} className="mb-1 pl-2 leading-relaxed text-white/85">{line}</p>;
        if (line.startsWith('- ')) return <p key={i} className="mb-1 flex gap-2 pl-2 leading-relaxed text-white/85"><span className="mt-1 text-white/40">•</span><span>{line.slice(2)}</span></p>;
        if (line.startsWith('---')) return <hr key={i} className="my-4 border-white/15" />;
        return <p key={i} className="mb-1 leading-relaxed text-white/85">{renderInline(line)}</p>;
      })}
    </>
  );
}

export default function ChatMessage({ message, onRegenerate }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-3 md:px-0 animate-fade-in">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-white/15 bg-white/15 px-4 py-3 backdrop-blur-md md:max-w-[70%]"><p className="whitespace-pre-wrap text-sm leading-relaxed text-white">{message.content}</p></div>
      </div>
    );
  }

  return (
    <div className="group flex gap-3 px-4 py-3 md:px-0 animate-fade-in">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25 backdrop-blur-md text-xs font-bold text-white">M</div>
      <div className="min-w-0 flex-1">
        {message.pending ? (
          <div className="flex items-center gap-1.5 py-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <>
            <div className="text-sm md:text-[15px]">{formatContent(message.content)}</div>
            <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button onClick={handleCopy} className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Copy">{copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}</button>
              <button onClick={onRegenerate} className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Regenerate"><RefreshCw size={14} /></button>
              <button className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Good response"><ThumbsUp size={14} /></button>
              <button className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Bad response"><ThumbsDown size={14} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
