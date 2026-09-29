import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, SquarePen, PanelLeft } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import Sidebar from '@/components/Sidebar';
import type { PageId } from '@/components/Sidebar';
import WelcomeScreen from '@/components/WelcomeScreen';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import PluginsModal from '@/components/PluginsModal';
import LandingPage from '@/components/LandingPage';
import MyMarsPage from '@/components/MyMarsPage';
import PluginsPage from '@/components/PluginsPage';
import ScheduledPage from '@/components/ScheduledPage';
import InspirationPage from '@/components/InspirationPage';
import SlidesPage from '@/components/SlidesPage';
import ProjectsPage from '@/components/ProjectsPage';
import SettingsPage from '@/components/SettingsPage';
import { generateResponse, generateTitle } from '@/lib/aiResponses';
import { callGemini } from '@/lib/gemini';
import type { Conversation, Message } from '@/types';

const STORAGE_KEY = 'mars-conversations';
const LANDING_SEEN_KEY = 'mars-landing-seen';

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
  }
  return [];
}

export default function App() {
  const [showLanding, setShowLanding] = useState(() => {
    try { return localStorage.getItem(LANDING_SEEN_KEY) !== 'true'; } catch { return true; }
  });
  const [currentPage, setCurrentPage] = useState<PageId>('chat');
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pluginsOpen, setPluginsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeId) || null;
  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleEnterApp = () => {
    setShowLanding(false);
    try { localStorage.setItem(LANDING_SEEN_KEY, 'true'); } catch { /* ignore */ }
  };

  const handleNewChat = () => {
    setActiveId(null);
    setInput('');
    setSidebarOpen(false);
    setCurrentPage('chat');
  };

  const handleSelect = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
    setCurrentPage('chat');
  };

  const handleDelete = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleWelcomeAction = (label: string) => {
    if (label === 'Plugins') setPluginsOpen(true);
    else if (label === 'Web search') showToast('Web search plugin activated');
    else if (label === 'Select project') { setCurrentPage('projects'); }
    else showToast(`${label} — coming soon`);
  };

  const handleUsePrompt = (prompt: string) => {
    setInput(prompt);
    setCurrentPage('chat');
    setActiveId(null);
  };

  const fetchAIResponse = async (
    allMessages: Pick<Message, 'role' | 'content'>[],
    convId: string,
    pendingId: string
  ) => {
    setIsResponding(true);
    const result = await callGemini(allMessages);

    let content: string;
    if (result.error) {
      const lastUser = allMessages.filter((m) => m.role === 'user').pop();
      if (result.error.includes('GEMINI_API_KEY') || result.error.includes('key')) {
        content = generateResponse(lastUser?.content || '') + '\n\n*Note: Using offline mode. Add your Gemini API key in Settings for real AI responses.*';
      } else {
        content = generateResponse(lastUser?.content || '');
      }
    } else {
      content = result.content;
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? { ...c, messages: c.messages.map((m) => (m.id === pendingId ? { ...m, content, pending: false } : m)), updatedAt: Date.now() }
          : c
      )
    );
    setIsResponding(false);
  };

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isResponding) return;

    const userMsg: Message = { id: uid(), role: 'user', content: text, createdAt: Date.now() };
    const pendingMsg: Message = { id: uid(), role: 'assistant', content: '', createdAt: Date.now(), pending: true };

    let convId = activeId;
    let allMessages: Pick<Message, 'role' | 'content'>[] = [];

    if (!convId) {
      convId = uid();
      const newConv: Conversation = { id: convId, title: generateTitle(text), messages: [userMsg, pendingMsg], createdAt: Date.now(), updatedAt: Date.now() };
      setConversations((prev) => [...prev, newConv]);
      setActiveId(convId);
      allMessages = [{ role: 'user', content: text }];
    } else {
      const existing = conversations.find((c) => c.id === convId);
      const prior = existing?.messages.filter((m) => !m.pending).map((m) => ({ role: m.role, content: m.content })) ?? [];
      allMessages = [...prior, { role: 'user', content: text }];
      setConversations((prev) => prev.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, userMsg, pendingMsg], updatedAt: Date.now() } : c)));
    }

    setInput('');
    fetchAIResponse(allMessages, convId, pendingMsg.id);
  }, [input, isResponding, activeId, conversations]);

  const handleRegenerate = () => {
    if (!activeConversation || isResponding) return;
    const userMessages = activeConversation.messages.filter((m) => m.role === 'user' && !m.pending);
    const lastUser = userMessages[userMessages.length - 1];
    if (!lastUser) return;

    const pendingMsg: Message = { id: uid(), role: 'assistant', content: '', createdAt: Date.now(), pending: true };
    const allMessages = activeConversation.messages.filter((m) => !m.pending).map((m) => ({ role: m.role, content: m.content }));

    setConversations((prev) => prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, pendingMsg], updatedAt: Date.now() } : c)));
    fetchAIResponse(allMessages, activeId!, pendingMsg.id);
  };

  const handlePromptClick = (prompt: string) => setInput(prompt);

  // Landing page gate
  if (showLanding) {
    return (
      <div className="relative h-screen">
        <SpaceBackground />
        <LandingPage onEnter={handleEnterApp} />
      </div>
    );
  }

  const showChatUI = currentPage === 'chat';

  return (
    <div className="relative flex h-screen overflow-hidden">
      <SpaceBackground />

      {!sidebarCollapsed && (
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelect}
          onNew={handleNewChat}
          onDelete={handleDelete}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex items-center gap-2 px-4 py-3 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/15"><Menu size={20} /></button>
          <span className="mars-wordmark text-lg font-black tracking-tight text-white">MARS</span>
        </header>

        {/* Desktop header — only for chat view */}
        {showChatUI && (
          <header className="hidden items-center justify-between px-6 py-3 md:flex">
            <div className="flex items-center gap-2">
              {sidebarCollapsed && (
                <button onClick={() => setSidebarCollapsed(false)} className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="Show sidebar"><PanelLeft size={18} /></button>
              )}
              <h2 className="max-w-md truncate text-sm font-medium text-white/60">{activeConversation?.title || 'New chat'}</h2>
            </div>
            <button onClick={handleNewChat} className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/15 hover:text-white" title="New chat"><SquarePen size={18} /></button>
          </header>
        )}

        {/* Page content */}
        {showChatUI ? (
          messages.length === 0 ? (
            <WelcomeScreen onPromptClick={handlePromptClick} inputValue={input} onInputChange={setInput} onSend={handleSend} onAction={handleWelcomeAction} />
          ) : (
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl py-6">
                {messages.map((msg) => (<ChatMessage key={msg.id} message={msg} onRegenerate={handleRegenerate} />))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )
        ) : currentPage === 'my-mars' ? (
          <MyMarsPage conversations={conversations} onSelect={handleSelect} onDelete={handleDelete} onNew={handleNewChat} />
        ) : currentPage === 'plugins' ? (
          <PluginsPage onBack={() => handleNavigate('chat')} />
        ) : currentPage === 'scheduled' ? (
          <ScheduledPage onBack={() => handleNavigate('chat')} />
        ) : currentPage === 'inspiration' ? (
          <InspirationPage onBack={() => handleNavigate('chat')} onUsePrompt={handleUsePrompt} />
        ) : currentPage === 'slides' ? (
          <SlidesPage onBack={() => handleNavigate('chat')} />
        ) : currentPage === 'projects' ? (
          <ProjectsPage onBack={() => handleNavigate('chat')} />
        ) : currentPage === 'settings' ? (
          <SettingsPage onBack={() => handleNavigate('chat')} />
        ) : null}

        {showChatUI && messages.length > 0 && (
          <ChatInput value={input} onChange={setInput} onSend={handleSend} disabled={isResponding} />
        )}
      </div>

      <PluginsModal isOpen={pluginsOpen} onClose={() => setPluginsOpen(false)} />

      {toast && (<div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-4 py-2.5 text-sm text-black shadow-lg animate-fade-in">{toast}</div>)}
    </div>
  );
}
