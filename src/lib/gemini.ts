import type { Message } from '@/types';

const GEMINI_KEY_STORAGE = 'mars-gemini-key';

export function getStoredGeminiKey(): string {
  try {
    return localStorage.getItem(GEMINI_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function setStoredGeminiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GEMINI_KEY_STORAGE);
    }
  } catch {
    // ignore
  }
}

export function hasGeminiKey(): boolean {
  return getStoredGeminiKey().length > 0;
}

export interface GeminiResponse {
  content: string;
  error?: string;
}

export async function callGemini(
  messages: Pick<Message, 'role' | 'content'>[],
  model?: string
): Promise<GeminiResponse> {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-chat`;
  const apiKey = getStoredGeminiKey();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (anonKey) headers['Authorization'] = `Bearer ${anonKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ messages, model, apiKey: apiKey || undefined }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        content: '',
        error: data?.error || `Request failed (${response.status}).`,
      };
    }

    const data = await response.json();
    if (!data || typeof data.content !== 'string') {
      return { content: '', error: 'Unexpected response from the AI service.' };
    }

    return { content: data.content };
  } catch {
    return {
      content: '',
      error: 'Could not reach the AI service. Please check your connection.',
    };
  }
}
