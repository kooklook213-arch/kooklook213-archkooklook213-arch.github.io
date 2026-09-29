import { Clock, Calendar, Bell } from 'lucide-react';

interface ScheduledPageProps {
  onBack: () => void;
}

export default function ScheduledPage({ onBack }: ScheduledPageProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Scheduled</h1>
            <p className="mt-1 text-sm text-white/50">Your scheduled tasks and reminders</p>
          </div>
          <button onClick={onBack} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white">
            Back to chat
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <Clock size={28} className="text-white/30" />
          </div>
          <p className="mt-4 text-white/50">No scheduled tasks yet</p>
          <p className="mt-1 text-sm text-white/30">Schedule messages and reminders from your chats</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/70 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white">
            <Calendar size={15} /> Schedule a task
          </button>
        </div>
      </div>
    </div>
  );
}
