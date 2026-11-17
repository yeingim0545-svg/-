import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, Clock, MapPin, Navigation } from 'lucide-react';
import { DATE_EVENTS } from '../../data/sakuyaDateData';

interface MapsAppProps {
  isDark: boolean;
  onBackHome: () => void;
  onOpenChapter: (chapterIndex: number) => void;
}

const PIN_POSITIONS = [
  { top: '26%', left: '72%' },
  { top: '38%', left: '34%' },
  { top: '62%', left: '54%' },
  { top: '44%', left: '19%' },
];

export const MapsApp: React.FC<MapsAppProps> = ({
  isDark,
  onBackHome,
  onOpenChapter,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedEvent = DATE_EVENTS[selectedIdx];

  const bgMain = isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900';

  return (
    <div className={`h-full flex flex-col overflow-hidden relative ${bgMain}`}>
      {/* Header */}
      <div
        className={`relative z-20 pt-13 pb-3 px-4 border-b backdrop-blur-xl flex items-center justify-between shrink-0 ${
          isDark
            ? 'bg-zinc-950/85 border-zinc-800'
            : 'bg-white/85 border-slate-200/70'
        }`}
      >
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-0.5 text-sky-500 text-sm font-medium min-h-[36px]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>홈</span>
        </button>
        <h1 className="text-[15px] font-bold tracking-tight">
          Tokyo ♡ 데이트 코스
        </h1>
        <div className="w-12" />
      </div>

      {/* Stylized Vector Map Canvas */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950'
              : 'bg-gradient-to-br from-sky-50 via-rose-50/35 to-amber-50/50'
          }`}
        />

        {/* Stylized River & City Grid SVG */}
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 w-full h-full opacity-75"
          aria-hidden="true"
        >
          <path
            d="M 40 90 L 360 150 M 90 40 L 140 420 M 260 60 L 290 400 M 20 220 L 380 210"
            stroke={isDark ? '#334155' : '#cbd5e1'}
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M -10 340 Q 120 295 220 335 T 410 315"
            stroke={isDark ? '#0c4a6e' : '#7dd3fc'}
            strokeWidth="36"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M 288 130 L 136 190 L 216 310 L 76 220"
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            fill="none"
          />
        </svg>

        {/* Interactive Pins */}
        {DATE_EVENTS.map((ev, idx) => {
          const pos = PIN_POSITIONS[idx];
          const active = idx === selectedIdx;
          return (
            <button
              key={ev.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              style={{ top: pos.top, left: pos.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform ${
                active ? 'scale-115 z-20' : 'scale-95 opacity-85 z-10'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white ${ev.color}`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <span
                className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold shadow whitespace-nowrap ${
                  isDark
                    ? 'bg-zinc-900/90 text-white'
                    : 'bg-white/95 text-slate-900'
                }`}
              >
                {ev.place}
              </span>
            </button>
          );
        })}

        {/* Floating Bottom Detail Card */}
        <div className="absolute bottom-7 inset-x-4 z-30">
          <div
            className={`rounded-[26px] p-4 border shadow-xl backdrop-blur-xl ${
              isDark
                ? 'bg-zinc-900/90 border-zinc-700 text-white'
                : 'bg-white/95 border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                코스 {selectedIdx + 1} · {selectedEvent.place}
              </span>
              <span className="text-[11px] font-medium opacity-70 flex items-center gap-1 tabular-nums">
                <Clock className="w-3 h-3" />
                {selectedEvent.time}
              </span>
            </div>
            <p className="text-[15px] font-bold">{selectedEvent.title}</p>
            <p className="text-xs opacity-75 mt-0.5">{selectedEvent.note}</p>

            <div className="flex items-center justify-between gap-2 mt-3">
              <div className="flex gap-1">
                {DATE_EVENTS.map((ev, idx) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      idx === selectedIdx
                        ? 'bg-rose-500 text-white'
                        : isDark
                        ? 'bg-zinc-800 text-zinc-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onOpenChapter(selectedEvent.chapterIndex)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors"
              >
                <span>CHAPTER {String(selectedEvent.chapterIndex + 1).padStart(2, '0')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
