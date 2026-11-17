import React from 'react';
import { Cake, ChevronLeft, MapPin } from 'lucide-react';
import { STORY_CHAPTERS } from '../../data/sakuyaDateData';

interface CalendarAppProps {
  isDark: boolean;
  currentChapterIndex: number;
  onBackHome: () => void;
  onOpenChapter: (chapterIndex: number) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
// November 2026 starts on Sunday (Nov 1 = Sun, Nov 18 = Wed)
const DAYS_NOV_2026 = Array.from({ length: 30 }, (_, i) => i + 1);

export const CalendarApp: React.FC<CalendarAppProps> = ({
  isDark,
  currentChapterIndex,
  onBackHome,
  onOpenChapter,
}) => {
  const bgMain = isDark ? 'bg-zinc-950 text-white' : 'bg-[#f8f9fb] text-slate-900';
  const cardBg = isDark
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-white border-slate-200/70 shadow-sm';
  const muted = isDark ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div className={`h-full flex flex-col overflow-hidden ${bgMain}`}>
      <div
        className={`pt-13 pb-3 px-4 border-b backdrop-blur-xl flex items-center justify-between shrink-0 ${
          isDark
            ? 'bg-zinc-950/90 border-zinc-800'
            : 'bg-white/90 border-slate-200/70'
        }`}
      >
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-0.5 text-rose-500 text-sm font-medium min-h-[36px]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>홈</span>
        </button>
        <h1 className="text-[16px] font-bold tracking-tight">2026년 11월</h1>
        <span className="text-xs font-semibold text-rose-500 w-12 text-right">
          오늘
        </span>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar p-4 pb-12 space-y-4">
        {/* Month Grid */}
        <div className={`rounded-3xl p-4 border ${cardBg}`}>
          <div className="grid grid-cols-7 text-center mb-2">
            {WEEKDAYS.map((day, idx) => (
              <span
                key={day}
                className={`text-[11px] font-semibold ${
                  idx === 0 ? 'text-rose-500' : muted
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1.5 text-center">
            {DAYS_NOV_2026.map((d) => {
              const isBirthday = d === 18;
              return (
                <div
                  key={d}
                  className="flex flex-col items-center justify-center py-1"
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums ${
                      isBirthday
                        ? 'bg-rose-500 text-white shadow-md'
                        : d % 7 === 1
                        ? 'text-rose-500'
                        : ''
                    }`}
                  >
                    {d}
                  </span>
                  {isBirthday && (
                    <span className="text-[9px] font-bold text-rose-500 mt-0.5">
                      생일
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Full 22-Chapter Schedule */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 px-1">
            <Cake className="w-4 h-4 text-rose-500" />
            <h2 className="text-sm font-bold">
              11월 18일 · A DAY WITH SAKUYA 일정 (22)
            </h2>
          </div>

          {STORY_CHAPTERS.map((ch, idx) => {
            const isLocked = idx > currentChapterIndex;
            const isCurrent = idx === currentChapterIndex;
            const status =
              idx < currentChapterIndex
                ? '✓ 완료'
                : isCurrent
                ? '● 진행 중'
                : '예정';

            return (
              <button
                key={ch.id}
                type="button"
                disabled={isLocked}
                onClick={() => onOpenChapter(idx)}
                className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition-transform active:scale-[0.98] ${cardBg} ${
                  isLocked ? 'opacity-45 cursor-not-allowed' : ''
                }`}
              >
                <div
                  className={`w-1.5 h-10 rounded-full shrink-0 ${
                    isCurrent
                      ? 'bg-rose-500'
                      : idx < currentChapterIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-300 dark:bg-zinc-700'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold tabular-nums text-rose-500">
                      {ch.time}
                    </span>
                    <span className={`text-[10px] ${muted}`}>{status}</span>
                  </div>
                  <p className="text-[13px] font-bold mt-0.5 truncate">{ch.title}</p>
                  <p className={`text-[10px] flex items-center gap-0.5 truncate ${muted}`}>
                    <MapPin className="w-3 h-3 shrink-0" />
                    {ch.place}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
