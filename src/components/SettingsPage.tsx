import { useState, useEffect } from 'react';
import { Key, ExternalLink, Check, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { getStoredGeminiKey, setStoredGeminiKey } from '@/lib/gemini';

interface SettingsPageProps {
  onBack: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const [keyValue, setKeyValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<'saved' | 'saving' | 'none'>('none');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const key = getStoredGeminiKey();
    if (key) {
      setKeyValue(key);
      setStatus('saved');
    }
  }, []);

  const handleSave = () => {
    setStatus('saving');
    setMessage(null);
    setStoredGeminiKey(keyValue);
    setTimeout(() => {
      setStatus(keyValue.trim() ? 'saved' : 'none');
      setMessage('Gemini API key saved. It will work across all tabs and sessions.');
    }, 400);
  };

  const handleClear = () => {
    setKeyValue('');
    setStoredGeminiKey('');
    setStatus('none');
    setMessage('Key cleared.');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="mt-1 text-sm text-white/50">Configure your Mars experience</p>
          </div>
          <button onClick={onBack} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white">
            Back to chat
          </button>
        </div>

        {/* Gemini API Key section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="mb-4 flex items-center gap-2">
            <Key size={18} className="text-white/70" />
            <h2 className="text-base font-semibold text-white">Gemini API Key</h2>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-white/50">
            Add your Gemini API key to enable real AI responses. Your key is stored locally in your browser and works across all tabs and sessions. It's sent securely to the Mars server to proxy requests to Google's AI.
          </p>

          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              placeholder="Paste your Gemini API key..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 pr-10 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
            />
            <button
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/50 underline underline-offset-2 hover:text-white/80"
          >
            Get a free API key from Google AI Studio <ExternalLink size={12} />
          </a>

          {/* Status indicators */}
          <div className="mt-4 space-y-2">
            {status === 'saved' && keyValue && (
              <p className="flex items-center gap-2 text-sm text-green-400">
                <Check size={16} /> Key is configured and ready to use.
              </p>
            )}
            {status === 'none' && !keyValue && (
              <p className="flex items-center gap-2 text-sm text-amber-400">
                <AlertCircle size={16} /> No key set. Add one above to enable AI responses.
              </p>
            )}
            {status === 'saving' && (
              <p className="flex items-center gap-2 text-sm text-white/50">
                <Loader2 size={16} className="animate-spin" /> Saving...
              </p>
            )}
            {message && status !== 'saving' && (
              <p className="text-xs text-white/40">{message}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSave}
              disabled={status === 'saving'}
              className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {status === 'saving' ? 'Saving...' : 'Save key'}
            </button>
            {keyValue && (
              <button
                onClick={handleClear}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/60 transition-colors hover:border-red-400/30 hover:text-red-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <h3 className="text-sm font-medium text-white/70">How it works</h3>
          <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-white/40">
            <li>1. Get a free key from Google AI Studio (link above)</li>
            <li>2. Paste it in the field above and click Save key</li>
            <li>3. Your key is stored locally and persists across tabs and reloads</li>
            <li>4. Mars sends your messages through a server proxy — your key stays private</li>
          </ol>
        </div>

        {/* About */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <h3 className="text-sm font-medium text-white/70">About Mars</h3>
          <p className="mt-2 text-xs leading-relaxed text-white/40">
            Mars is an AI assistant powered by Google's Gemini models. It offers smart chat, plugins, scheduled tasks, inspiration prompts, and slide generation — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
