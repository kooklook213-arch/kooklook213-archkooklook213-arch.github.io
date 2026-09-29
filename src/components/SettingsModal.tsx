import { useState, useEffect } from 'react';
import { X, Key, ExternalLink, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
}

export default function SettingsModal({ isOpen, onClose, userEmail }: SettingsModalProps) {
  const [keyValue, setKeyValue] = useState('');
  const [status, setStatus] = useState<'loading' | 'saved' | 'saving' | 'error' | 'none'>('loading');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    loadKey();
  }, [isOpen]);

  const loadKey = async () => {
    setStatus('loading');
    setMessage(null);
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('gemini_api_key')
        .maybeSingle();

      if (error) throw error;

      if (data?.gemini_api_key) {
        setKeyValue(data.gemini_api_key);
        setStatus('saved');
      } else {
        setKeyValue('');
        setStatus('none');
      }
    } catch {
      setStatus('error');
      setMessage('Could not load settings.');
    }
  };

  const handleSave = async () => {
    setStatus('saving');
    setMessage(null);
    try {
      const { data: existing } = await supabase
        .from('user_settings')
        .select('id')
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('user_settings')
          .update({ gemini_api_key: keyValue.trim() || null, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_settings')
          .insert({ gemini_api_key: keyValue.trim() || null });
        if (error) throw error;
      }

      setStatus('saved');
      setMessage('Gemini API key saved successfully.');
    } catch {
      setStatus('error');
      setMessage('Could not save the key. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#1a1a1a] p-6 shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"><X size={18} /></button>
        </div>

        {userEmail && (
          <p className="mb-4 text-xs text-white/40">Signed in as {userEmail}</p>
        )}

        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white"><Key size={15} /> Gemini API Key</div>
            <p className="text-xs leading-relaxed text-white/50">Your key is stored securely in your account and never exposed in the browser. Mart uses it to power real AI responses.</p>
          </div>

          <div>
            <input
              type="password"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              placeholder="Paste your Gemini API key..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
            />
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/50 underline underline-offset-2 hover:text-white/80">
              Get a free API key from Google AI Studio <ExternalLink size={12} />
            </a>
          </div>

          {status === 'saved' && keyValue && (
            <p className="flex items-center gap-2 text-sm text-green-400"><Check size={16} /> Key is configured.</p>
          )}
          {status === 'none' && (
            <p className="flex items-center gap-2 text-sm text-amber-400"><AlertCircle size={16} /> No key set. Add one above to enable AI responses.</p>
          )}
          {status === 'error' && message && (
            <p className="flex items-center gap-2 text-sm text-red-400"><AlertCircle size={16} /> {message}</p>
          )}
          {status === 'saving' && (
            <p className="flex items-center gap-2 text-sm text-white/50"><Loader2 size={16} className="animate-spin" /> Saving...</p>
          )}
          {message && status === 'saved' && (
            <p className="text-xs text-green-400">{message}</p>
          )}

          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {status === 'saving' ? 'Saving...' : 'Save key'}
          </button>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs font-medium text-white/70">How it works:</p>
            <ol className="mt-1.5 space-y-1 text-xs text-white/40">
              <li>1. Get a free key from Google AI Studio (link above)</li>
              <li>2. Paste it in the field above and click Save</li>
              <li>3. Your key is stored securely in your account</li>
              <li>4. Mart sends messages through a server proxy — the key never touches the browser</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
