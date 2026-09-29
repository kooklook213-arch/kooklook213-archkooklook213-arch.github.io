import { FolderPlus, Folder, MoreHorizontal } from 'lucide-react';

interface ProjectsPageProps {
  onBack: () => void;
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="mt-1 text-sm text-white/50">Organize your work into projects</p>
          </div>
          <button onClick={onBack} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white">
            Back to chat
          </button>
        </div>

        <button className="mb-6 flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10">
          <FolderPlus size={18} className="text-white/60" />
          <span className="text-sm font-medium text-white">New project</span>
        </button>

        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Folder size={48} className="text-white/20" />
          <p className="mt-4 text-white/40">No projects yet</p>
          <p className="mt-1 text-sm text-white/30">Create a project to organize related chats and files</p>
        </div>
      </div>
    </div>
  );
}
