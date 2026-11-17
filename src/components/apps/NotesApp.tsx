import React, { useState } from 'react';
import { ChevronLeft, Pin, Plus } from 'lucide-react';
import { NoteItem } from '../../types/ios';

interface NotesAppProps {
  isDark: boolean;
  notes: NoteItem[];
  onAddNote: (title: string, content: string) => void;
  onUpdateNote: (id: string, content: string) => void;
  onBackHome: () => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({
  isDark,
  notes,
  onAddNote,
  onUpdateNote,
  onBackHome,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  const bgMain = isDark ? 'bg-zinc-950 text-white' : 'bg-[#fbfaf5] text-slate-900';
  const cardBg = isDark
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-white border-amber-200/60 shadow-sm';
  const muted = isDark ? 'text-zinc-400' : 'text-slate-500';

  if (selectedNote) {
    return (
      <div className={`h-full flex flex-col overflow-hidden ${bgMain}`}>
        <div
          className={`pt-13 pb-3 px-4 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-zinc-800' : 'border-amber-200/60'
          }`}
        >
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-0.5 text-amber-500 text-sm font-medium min-h-[36px]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>메모</span>
          </button>
          <span className={`text-[11px] ${muted}`}>{selectedNote.updatedAt}</span>
          <div className="w-10" />
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3">
          <h2 className="text-lg font-bold tracking-tight">{selectedNote.title}</h2>
          <textarea
            value={selectedNote.content}
            onChange={(e) => onUpdateNote(selectedNote.id, e.target.value)}
            className="flex-1 w-full bg-transparent text-[14px] leading-relaxed resize-none focus:outline-none"
            placeholder="오늘의 생일 데이트 메모를 적어보세요..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col overflow-hidden ${bgMain}`}>
      <div
        className={`pt-13 pb-3 px-4 border-b flex items-center justify-between shrink-0 ${
          isDark ? 'border-zinc-800' : 'border-amber-200/60'
        }`}
      >
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-0.5 text-amber-500 text-sm font-medium min-h-[36px]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>홈</span>
        </button>
        <h1 className="text-[16px] font-bold tracking-tight">메모</h1>
        <button
          type="button"
          onClick={() =>
            onAddNote(
              '11월 18일 사쿠야에게 전할 말',
              '누나, 오늘 하루 웃는 모습 많이 볼 수 있어서 너무 좋았어. 생일 축하해!',
            )
          }
          className="w-9 h-9 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center hover:bg-amber-500/25"
          aria-label="새 메모 추가"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-12 space-y-3">
        {notes.map((note) => (
          <button
            key={note.id}
            type="button"
            onClick={() => setSelectedId(note.id)}
            className={`w-full text-left rounded-2xl p-4 border transition-transform active:scale-[0.98] ${cardBg}`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-sm font-bold truncate">{note.title}</span>
              {note.pinned && (
                <Pin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              )}
            </div>
            <p className={`text-xs line-clamp-2 whitespace-pre-line ${muted}`}>
              {note.content}
            </p>
            <p className={`text-[10px] mt-2 ${muted}`}>{note.updatedAt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
