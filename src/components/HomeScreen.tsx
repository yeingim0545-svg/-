import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Heart,
  Music,
  Search,
  Sparkles,
} from 'lucide-react';
import { AppId, IconStyle, PhotoMemory } from '../types/ios';
import { DATE_EVENTS, MUSIC_TRACKS, STORY_CHAPTERS } from '../data/sakuyaDateData';
import { IosAppIcon } from './IosAppIcon';
import { SafeImage } from './SafeImage';

interface HomeScreenProps {
  isDark: boolean;
  iconStyle: IconStyle;
  unreadMessageCount: number;
  featuredPhoto: PhotoMemory;
  currentTrackIndex: number;
  isPlayingMusic: boolean;
  currentChapterIndex: number;
  affection: number;
  onOpenApp: (appId: AppId) => void;
  onOpenSpotlight: () => void;
  onToggleMusic: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  isDark,
  iconStyle,
  unreadMessageCount,
  featuredPhoto,
  currentTrackIndex,
  isPlayingMusic,
  currentChapterIndex,
  affection,
  onOpenApp,
  onOpenSpotlight,
  onToggleMusic,
}) => {
  const [page, setPage] = useState<0 | 1>(0);
  const track = MUSIC_TRACKS[currentTrackIndex];
  const currentChapter = STORY_CHAPTERS[currentChapterIndex] || STORY_CHAPTERS[0];

  const widgetSurface = isDark
    ? 'ios-liquid-glass-dark text-white'
    : 'ios-liquid-glass text-slate-900';

  const dockSurface = isDark ? 'ios-liquid-dock-dark' : 'ios-liquid-dock';

  return (
    <div className="relative h-full w-full flex flex-col justify-between px-5 pt-14 pb-[max(1.25rem,env(safe-area-inset-bottom))] select-none overflow-hidden">
      {/* Main Home Screen Content */}
      <div className="flex-1 flex flex-col justify-start overflow-y-auto overscroll-contain no-scrollbar pt-1">
        {page === 0 ? (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* iOS 27 Top 2x2 Widgets Row */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Widget 1: Nov 18 Calendar & Birthday Date Timeline */}
              <button
                type="button"
                onClick={() => onOpenApp('calendar')}
                className={`text-left rounded-[26px] p-3.5 h-[156px] flex flex-col justify-between transition-transform active:scale-[0.97] ${widgetSurface}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-rose-500">
                      11월 18일 수요일
                    </span>
                    <Calendar className="w-3.5 h-3.5 opacity-60" />
                  </div>
                  <p className="text-[15px] font-bold tracking-tight mt-0.5 leading-snug">
                    사쿠야 생일 🎂
                  </p>
                </div>

                <div className="space-y-1.5">
                  {DATE_EVENTS.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className={`flex items-center gap-1.5 text-[11px] rounded-lg px-2 py-1 ${
                        isDark ? 'bg-white/10' : 'bg-white/60'
                      }`}
                    >
                      <span className={`w-1.5 h-3.5 rounded-full shrink-0 ${ev.color}`} />
                      <span className="font-semibold tabular-nums shrink-0">
                        {ev.time}
                      </span>
                      <span className="truncate opacity-85">{ev.title}</span>
                    </div>
                  ))}
                </div>
              </button>

              {/* Widget 2: Featured Photo Memory */}
              <button
                type="button"
                onClick={() => onOpenApp('photos')}
                className="relative text-left rounded-[26px] h-[156px] overflow-hidden shadow-lg border border-white/35 transition-transform active:scale-[0.97]"
              >
                <SafeImage
                  src={featuredPhoto.imageUrl}
                  alt={featuredPhoto.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-[10px] font-medium text-white/80">
                    SAKUYA ♥ {affection}
                  </p>
                  <p className="text-[12px] font-bold leading-tight truncate mt-0.5">
                    {featuredPhoto.title}
                  </p>
                </div>
              </button>
            </div>

            {/* App Grid Page 1 */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 pt-1">
              <IosAppIcon
                appId="pota"
                iconStyle={iconStyle}
                badgeCount={STORY_CHAPTERS.length - currentChapterIndex - 1 > 0 ? STORY_CHAPTERS.length - currentChapterIndex - 1 : undefined}
                onClick={() => onOpenApp('pota')}
              />
              <IosAppIcon
                appId="messages"
                iconStyle={iconStyle}
                badgeCount={unreadMessageCount}
                onClick={() => onOpenApp('messages')}
              />
              <IosAppIcon
                appId="photos"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('photos')}
              />
              <IosAppIcon
                appId="calendar"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('calendar')}
              />
              <IosAppIcon
                appId="music"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('music')}
              />
              <IosAppIcon
                appId="maps"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('maps')}
              />
              <IosAppIcon
                appId="notes"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('notes')}
              />
              <IosAppIcon
                appId="camera"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('camera')}
              />
            </div>

            {/* Compact Interactive Story Card Widget */}
            <button
              type="button"
              onClick={() => onOpenApp('pota')}
              className={`w-full text-left rounded-[24px] p-3.5 flex items-center justify-between gap-3 transition-transform active:scale-[0.98] ${widgetSurface}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-rose-500 dark:text-rose-300 tabular-nums">
                    A DAY WITH SAKUYA · {currentChapterIndex + 1}/22화
                  </p>
                  <p className="text-[13px] font-bold truncate">
                    {currentChapter.title}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Page 2: Apple Music Liquid Glass Large Widget */}
            <div className={`rounded-[26px] p-4 ${widgetSurface}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold opacity-75 flex items-center gap-1">
                  <Music className="w-3.5 h-3.5 text-rose-500" />
                  오늘의 데이트 플레이리스트
                </span>
                <button
                  type="button"
                  onClick={() => onOpenApp('music')}
                  className="text-[11px] font-semibold text-rose-500 hover:underline"
                >
                  음악 앱 열기
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <SafeImage
                    src={track.coverImage}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold truncate">{track.title}</p>
                  <p className="text-[12px] opacity-75 truncate">{track.artist}</p>
                </div>
                <button
                  type="button"
                  onClick={onToggleMusic}
                  className="px-3.5 py-2 rounded-full bg-rose-500 text-white text-[11px] font-semibold shadow-sm hover:bg-rose-600 transition-colors shrink-0"
                >
                  {isPlayingMusic ? '일시정지' : '재생'}
                </button>
              </div>
            </div>

            {/* Page 2 App Grid */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2">
              <IosAppIcon
                appId="settings"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('settings')}
              />
              <IosAppIcon
                appId="pota"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('pota')}
              />
              <IosAppIcon
                appId="notes"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('notes')}
              />
              <IosAppIcon
                appId="camera"
                iconStyle={iconStyle}
                onClick={() => onOpenApp('camera')}
              />
            </div>

            {/* iOS 27 Setup Complete Notice Card */}
            <div className={`rounded-[24px] p-4 ${widgetSurface}`}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span className="text-[12px] font-bold">iOS 27 업데이트 적용 완료</span>
              </div>
              <p className="text-[11px] opacity-80 leading-relaxed">
                설정 앱에서 라이트/다크 모드, 리퀴드 글래스 아이콘 스타일, 배경화면을 언제든 바꿀 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Area: Page Dots + Spotlight Search Pill + Liquid Glass Dock */}
      <div className="flex flex-col items-center gap-2.5 pt-2">
        {/* Page Indicator & Spotlight Pill */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPage(0)}
            className={`h-2 rounded-full transition-all ${
              page === 0 ? 'w-5 bg-white' : 'w-2 bg-white/45'
            }`}
            aria-label="홈 화면 1페이지"
          />
          <button
            type="button"
            onClick={onOpenSpotlight}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-xl border border-white/35 text-white text-[11px] font-medium shadow-sm hover:bg-white/35 transition-colors"
          >
            <Search className="w-3 h-3" />
            <span>검색</span>
          </button>
          <button
            type="button"
            onClick={() => setPage(1)}
            className={`h-2 rounded-full transition-all ${
              page === 1 ? 'w-5 bg-white' : 'w-2 bg-white/45'
            }`}
            aria-label="홈 화면 2페이지"
          />
        </div>

        {/* Liquid Glass Bottom Dock */}
        <div
          className={`w-full rounded-[30px] px-4 py-2.5 flex items-center justify-between ${dockSurface}`}
        >
          <IosAppIcon
            appId="pota"
            iconStyle={iconStyle}
            showLabel={false}
            onClick={() => onOpenApp('pota')}
          />
          <IosAppIcon
            appId="messages"
            iconStyle={iconStyle}
            showLabel={false}
            badgeCount={unreadMessageCount}
            onClick={() => onOpenApp('messages')}
          />
          <IosAppIcon
            appId="photos"
            iconStyle={iconStyle}
            showLabel={false}
            onClick={() => onOpenApp('photos')}
          />
          <IosAppIcon
            appId="settings"
            iconStyle={iconStyle}
            showLabel={false}
            onClick={() => onOpenApp('settings')}
          />
        </div>
      </div>
    </div>
  );
};
