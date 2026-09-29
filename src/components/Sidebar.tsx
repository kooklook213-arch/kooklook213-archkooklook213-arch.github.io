import { useState } from 'react';
import {
  ChevronDown,
  CircleHelp,
  FolderPlus,
  Gem,
  Lightbulb,
  MessageCircle,
  PanelLeft,
  PenLine,
  Plug,
  Settings,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import type { Conversation } from '@/types';

export type PageId = 'chat' | 'my-mars' | 'plugins' | 'scheduled' | 'inspiration' | 'slides' | 'projects' | 'settings';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onNavigate: (page: PageId) => void;
  currentPage: PageId;
  isOpen: boolean;
  onClose: () => void;
}

const navigation: { label: string; icon: typeof Gem; page: PageId }[] = [
  { label: 'New chat', icon: PenLine, page: 'chat' },
  { label: 'My Mars', icon: Gem, page: 'my-mars' },
  { label: 'Plugins', icon: Plug, page: 'plugins' },
  { label: 'Scheduled', icon: CircleHelp, page: 'scheduled' },
  { label: 'Inspiration', icon: Lightbulb, page: 'inspiration' },
  { label: 'Slides', icon: Sparkles, page: 'slides' },
];

export default function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, onNavigate, currentPage, isOpen, onClose }: SidebarProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col border-r border-white/15 bg-black/40 px-2.5 py-2.5 backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-3 flex items-center justify-between px-1">
          <button onClick={onNew} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-semibold text-black shadow-sm transition-transform hover:scale-105" aria-label="Mars home">M</button>
          <span className="mars-wordmark text-sm font-black tracking-tight text-white">MARS</span>
          <button onClick={onClose} className="p-1.5 text-white/50 md:hidden" aria-label="Close sidebar"><X size={16} /></button>
        </div>

        <button onClick={onNew} className="mb-2 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 text-left text-[13px] font-medium text-white shadow-sm transition-all hover:bg-white/20">
          <PenLine size={15} /><span className="flex-1">New chat</span><span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/40">Ctrl K</span>
        </button>

        <nav className="space-y-0.5">
          {navigation.map(({ label, icon: Icon, page }) => (
            <button
              key={label}
              onClick={() => { onNavigate(page); setSidebarClose(onClose); }}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${currentPage === page ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon size={15} strokeWidth={1.8} />{label}
            </button>
          ))}
        </nav>

        <div className="mt-4 flex items-center justify-between px-2 text-[11px] text-white/40">
          <span>Projects</span>
          <ChevronDown size={13} />
        </div>
        <button
          onClick={() => { onNavigate('projects'); setSidebarClose(onClose); }}
          className={`mt-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${currentPage === 'projects' ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
        >
          <FolderPlus size={15} />Projects
        </button>

        {conversations.length > 0 && (
          <div className="mt-4 flex-1 space-y-0.5 overflow-y-auto">
            <p className="px-2 text-[11px] text-white/40">Recent chats</p>
            {conversations.slice(0, 8).map((conversation) => (
              <div key={conversation.id} className={`group flex items-center gap-2 rounded-lg px-2 py-2 text-[12px] ${activeId === conversation.id && currentPage === 'chat' ? 'bg-white/15 text-white' : 'text-white/50 hover:bg-white/10'}`}>
                <MessageCircle size={13} className="shrink-0" />
                <button onClick={() => { onSelect(conversation.id); onNavigate('chat'); setSidebarClose(onClose); }} className="min-w-0 flex-1 truncate text-left">{conversation.title}</button>
                <button onClick={() => setConfirmDelete(conversation.id)} className="hidden text-white/40 hover:text-red-400 group-hover:block" aria-label="Delete conversation"><Trash2 size={12} /></button>
                {confirmDelete === conversation.id && <button onClick={() => { onDelete(conversation.id); setConfirmDelete(null); }} className="text-[10px] text-red-400">Del</button>}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => { onNavigate('settings'); setSidebarClose(onClose); }}
          className={`mt-auto flex items-center gap-2 border-t border-white/10 px-1 pt-3 text-left transition-colors ${currentPage === 'settings' ? 'text-white' : 'text-white/50 hover:text-white'}`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[10px] font-semibold text-white">M</div>
          <span className="flex-1 text-[12px]">Mars</span>
          <Settings size={14} />
        </button>
      </aside>
    </>
  );
}

function setSidebarClose(onClose: () => void) {
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) onClose();
}
