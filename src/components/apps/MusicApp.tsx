import React from 'react';
import {
  ChevronLeft,
  Disc3,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { MUSIC_TRACKS } from '../../data/sakuyaDateData';
import { SafeImage } from '../SafeImage';

interface MusicAppProps {
  isDark: boolean;
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (idx: number) => void;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onBackHome: () => void;
}

export const MusicApp: React.FC<MusicAppProps> = ({
  isDark,
  currentTrackIndex,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onBackHome,
}) => {
  const track = MUSIC_TRACKS[currentTrackIndex];
  const bgMain = isDark
    ? 'bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white'
    : 'bg-gradient-to-b from-rose-50 via-white to-slate-50 text-slate-900';
  const muted = isDark ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div className={`h-full flex flex-col overflow-hidden ${bgMain}`}>
      <div className="pt-13 pb-2 px-4 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-0.5 text-rose-500 text-sm font-medium min-h-[36px]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>홈</span>
        </button>
        <span className="text-xs font-bold tracking-tight">11.18 플레이리스트</span>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-12 flex flex-col justify-between">
        {/* Album Art */}
        <div className="pt-2">
          <div className="relative w-56 h-56 mx-auto rounded-[28px] overflow-hidden shadow-2xl border border-white/25">
            <SafeImage
              src={track.coverImage}
              alt={track.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>

          <div className="text-center mt-5">
            <h2 className="text-lg font-bold tracking-tight">{track.title}</h2>
            <p className={`text-xs mt-0.5 ${muted}`}>
              {track.artist} · {track.album}
            </p>
          </div>

          {/* Scrub Bar */}
          <div className="mt-4 space-y-1">
            <div
              className={`h-1.5 rounded-full overflow-hidden ${
                isDark ? 'bg-zinc-800' : 'bg-slate-200'
              }`}
            >
              <div
                className={`h-full rounded-full bg-rose-500 transition-all ${
                  isPlaying ? 'w-2/3' : 'w-1/3'
                }`}
              />
            </div>
            <div
              className={`flex justify-between text-[10px] tabular-nums ${muted}`}
            >
              <span>{isPlaying ? '01:24' : '00:48'}</span>
              <span>
                0{Math.floor(track.durationSec / 60)}:
                {String(track.durationSec % 60).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={onPrevTrack}
              className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-rose-500/10 transition-colors"
              aria-label="이전 곡"
            >
              <SkipBack className="w-6 h-6 fill-current" />
            </button>

            <button
              type="button"
              onClick={onTogglePlay}
              className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-transform active:scale-95"
              aria-label={isPlaying ? '일시정지' : '재생'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={onNextTrack}
              className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-rose-500/10 transition-colors"
              aria-label="다음 곡"
            >
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>

        {/* Up Next List */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold px-1">
            <span className={muted}>생일 데이트 재생 목록</span>
            <span className="flex items-center gap-1 text-rose-500">
              <Volume2 className="w-3.5 h-3.5" />
              다이나믹 아일랜드 연동
            </span>
          </div>

          {MUSIC_TRACKS.map((item, idx) => {
            const active = idx === currentTrackIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTrack(idx)}
                className={`w-full p-2.5 rounded-2xl flex items-center gap-3 text-left transition-colors ${
                  active
                    ? isDark
                      ? 'bg-rose-500/20 border border-rose-500/40'
                      : 'bg-rose-50 border border-rose-200'
                    : isDark
                    ? 'bg-zinc-900/60 hover:bg-zinc-800/70'
                    : 'bg-white/80 hover:bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <SafeImage
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold truncate">{item.title}</p>
                  <p className={`text-[10px] truncate ${muted}`}>{item.artist}</p>
                </div>
                {active && isPlaying && (
                  <Disc3 className="w-4 h-4 text-rose-500 animate-spin shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
