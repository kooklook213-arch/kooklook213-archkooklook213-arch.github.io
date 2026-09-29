import { MessageCircle, Clock, Trash2 } from 'lucide-react';
import type { Conversation } from '@/types';

interface MyMarsPageProps {
  conversations: Conversation[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const now = Date.now();
  const diff = now - ts;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
}

export default function MyMarsPage({ conversations, onSelect, onDelete, onNew }: MyMarsPageProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My Mars</h1>
            <p className="mt-1 text-sm text-white/50">All your conversations in one place</p>
          </div>
          <button
            onClick={onNew}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition-all hover:scale-105"
          >
            New chat
          </button>
        </div>

        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MessageCircle size={48} className="text-white/20" />
            <p className="mt-4 text-white/40">No conversations yet</p>
            <p className="mt-1 text-sm text-white/30">Start a new chat to see it here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
                onClick={() => onSelect(conv.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <MessageCircle size={16} className="mt-1 shrink-0 text-white/40" />
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                    className="text-white/20 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <h3 className="mt-2 truncate text-sm font-medium text-white">{conv.title}</h3>
                <p className="mt-1 text-xs text-white/30">
                  {conv.messages.length} messages
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-white/30">
                  <Clock size={11} /> {formatTime(conv.updatedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
