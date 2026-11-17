import React, { useState } from 'react';
import {
  BatteryFull,
  Calendar,
  Home,
  Lock,
  MessageCircle,
  Pause,
  Play,
  Signal,
  SlidersHorizontal,
  Wifi,
} from 'lucide-react';
import { AppId, ScreenState, WallpaperItem } from '../types/ios';
import { MUSIC_TRACKS } from '../data/sakuyaDateData';
import { SafeImage } from './SafeImage';

interface IPhoneFrameProps {
  screen: ScreenState;
  currentTime: string;
  wallpaper: WallpaperItem;
  isDark: boolean;
  brightness: number;
  flashlightOn: boolean;
  wifiOn: boolean;
  isPlayingMusic: boolean;
  currentTrackIndex: number;
  bannerToast: { title: string; body: string; appId: AppId } | null;
  onPressPower: () => void;
  onOpenControlCenter: () => void;
  onGoHome: () => void;
  onGoStory: () => void;
  onToggleMusic: () => void;
  onOpenApp: (appId: AppId) => void;
  onDismissBanner: () => void;
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  screen,
  currentTime,
  wallpaper,
  isDark,
  brightness,
  flashlightOn,
  wifiOn,
  isPlayingMusic,
  currentTrackIndex,
  bannerToast,
  onPressPower,
  onOpenControlCenter,
  onGoHome,
  onGoStory,
  onToggleMusic,
  onOpenApp,
  onDismissBanner,
  children,
}) => {
  const [islandExpanded, setIslandExpanded] = useState(false);
  const track = MUSIC_TRACKS[currentTrackIndex];

  const isLightWallpaperAndHome =
    (screen === 'lock' || screen === 'home') && !wallpaper.isDarkBg;
  const statusTextColor =
    screen === 'story'
      ? 'text-white'
      : screen === 'app'
      ? isDark
        ? 'text-white'
        : 'text-slate-900'
      : isLightWallpaperAndHome
      ? 'text-slate-900'
      : 'text-white';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Edge-to-edge full screen across all devices */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Inner Screen */}
        <div className="relative w-full h-full overflow-hidden bg-[#16171a]">
          {/* Wallpaper Layer (for Lock & Home) */}
          {(screen === 'lock' || screen === 'home') && (
            <div className="absolute inset-0 z-0">
              {wallpaper.imageUrl ? (
                <SafeImage
                  src={wallpaper.imageUrl}
                  alt={wallpaper.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${wallpaper.gradientClass}`}
                />
              )}
            </div>
          )}

          {/* Flashlight Screen Glow Effect */}
          {flashlightOn && (
            <div className="pointer-events-none absolute inset-0 z-30 bg-amber-100/35 mix-blend-screen" />
          )}

          {/* Brightness Dimmer Layer */}
          <div
            className="pointer-events-none absolute inset-0 z-[60] bg-black transition-opacity duration-150"
            style={{ opacity: Math.max(0, (100 - brightness) / 100) * 0.7 }}
          />

          {/* Top Status Bar & Dynamic Island */}
          <div
            className={`absolute top-0 inset-x-0 z-40 h-12 px-6 pt-[env(safe-area-inset-top)] flex items-center justify-between select-none ${statusTextColor}`}
          >
            <button
              type="button"
              onClick={onPressPower}
              className="text-[14px] font-bold tracking-tight tabular-nums w-14 text-left hover:opacity-75 transition-opacity"
              title="화면 잠금/깨우기"
              aria-label="현재 시간 (탭하면 화면 잠금 또는 깨우기)"
            >
              {currentTime}
            </button>

            {/* Dynamic Island (Album Cover + Audio Bars look from sketch) */}
            <div className="relative flex justify-center">
              <button
                type="button"
                onClick={() => setIslandExpanded((prev) => !prev)}
                className={`bg-black text-white rounded-full flex items-center justify-between transition-all duration-200 shadow-lg border border-white/10 ${
                  islandExpanded
                    ? 'w-[244px] h-10 px-3'
                    : 'w-[144px] h-[30px] px-2.5'
                }`}
                aria-label="다이나믹 아일랜드"
              >
                {islandExpanded ? (
                  <div className="w-full flex items-center justify-between gap-1.5 text-[11px]">
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMusic();
                      }}
                      className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25"
                      title="음악 재생/일시정지"
                    >
                      {isPlayingMusic ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIslandExpanded(false);
                        onOpenApp('calendar');
                      }}
                      className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                      title="일정"
                    >
                      <Calendar className="w-3.5 h-3.5 text-rose-300" />
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIslandExpanded(false);
                        onOpenApp('messages');
                      }}
                      className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                      title="메시지"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIslandExpanded(false);
                        onGoHome();
                      }}
                      className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                      title="홈 화면"
                    >
                      <Home className="w-3.5 h-3.5 text-sky-300" />
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIslandExpanded(false);
                        onPressPower();
                      }}
                      className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                      title="잠금화면"
                    >
                      <Lock className="w-3.5 h-3.5 text-white/80" />
                    </span>
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-between gap-2">
                    <div className="w-4 h-4 rounded-[4px] overflow-hidden shrink-0">
                      <SafeImage
                        src={track.coverImage}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-[2px] h-3">
                      <span
                        className={`w-[2px] rounded-full bg-amber-400 ${
                          isPlayingMusic ? 'h-2.5 animate-pulse' : 'h-1.5'
                        }`}
                      />
                      <span
                        className={`w-[2px] rounded-full bg-amber-400 ${
                          isPlayingMusic ? 'h-3 animate-pulse' : 'h-2.5'
                        }`}
                      />
                      <span
                        className={`w-[2px] rounded-full bg-amber-400 ${
                          isPlayingMusic ? 'h-1.5 animate-pulse' : 'h-2'
                        }`}
                      />
                      <span
                        className={`w-[2px] rounded-full bg-amber-400 ${
                          isPlayingMusic ? 'h-3 animate-pulse' : 'h-1.5'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Right Status Icons (clickable to open Control Center) */}
            <button
              type="button"
              onClick={onOpenControlCenter}
              className="flex items-center gap-1.5 w-14 justify-end py-2 rounded-lg hover:opacity-75 transition-opacity"
              title="제어 센터 열기"
              aria-label="제어 센터 열기"
            >
              <Signal className="w-3.5 h-3.5" />
              {wifiOn ? (
                <Wifi className="w-3.5 h-3.5" />
              ) : (
                <SlidersHorizontal className="w-3.5 h-3.5 opacity-60" />
              )}
              <BatteryFull className="w-4 h-4" />
            </button>
          </div>

          {/* Push Banner Notification Toast */}
          {bannerToast && (
            <div className="absolute top-12 inset-x-3.5 z-50 animate-in slide-in-from-top-3 duration-200">
              <div className="ios-liquid-glass rounded-[22px] p-3 text-slate-900 flex items-center justify-between gap-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    if (bannerToast.appId === 'pota') {
                      onGoStory();
                    } else {
                      onOpenApp(bannerToast.appId);
                    }
                    onDismissBanner();
                  }}
                  className="flex-1 text-left min-w-0"
                >
                  <p className="text-[11px] font-bold text-sky-700">
                    {bannerToast.title}
                  </p>
                  <p className="text-[12px] text-slate-800 truncate">
                    {bannerToast.body}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={onDismissBanner}
                  className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900"
                >
                  닫기
                </button>
              </div>
            </div>
          )}

          {/* Active Screen Content */}
          <div className="relative z-10 w-full h-full">{children}</div>

          {/* Bottom Home Indicator Bar inside Story & App Modes */}
          {(screen === 'app' || screen === 'story') && (
            <div className="absolute bottom-1 inset-x-0 pb-[env(safe-area-inset-bottom)] z-40 flex justify-center pointer-events-none">
              <button
                type="button"
                onClick={onGoHome}
                className="pointer-events-auto py-1.5 px-10 group focus:outline-none"
                aria-label="홈 화면으로 이동"
                title="홈 화면으로 이동"
              >
                <div
                  className={`w-32 h-1.5 rounded-full transition-all group-hover:w-36 ${
                    screen === 'story' || isDark ? 'bg-white/75' : 'bg-slate-900/70'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
