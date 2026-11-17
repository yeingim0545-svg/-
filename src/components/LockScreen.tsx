import React, { useState } from 'react';
import {
  BatteryCharging,
  CalendarHeart,
  Camera,
  Check,
  CloudSun,
  Flashlight,
  Lock,
  Palette,
  Sparkles,
  Unlock,
  X,
} from 'lucide-react';
import {
  AppId,
  LockClockStyle,
  LockNotification,
  WallpaperItem,
} from '../types/ios';
import { WALLPAPERS } from '../data/sakuyaDateData';
import { SafeImage } from './SafeImage';

interface LockScreenProps {
  currentTime: string;
  wallpaper: WallpaperItem;
  clockStyle: LockClockStyle;
  notifications: LockNotification[];
  flashlightOn: boolean;
  onToggleFlashlight: () => void;
  onUnlock: (targetApp?: AppId) => void;
  onClearNotifications: () => void;
  onSelectWallpaper: (id: string) => void;
  onSelectClockStyle: (style: LockClockStyle) => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  currentTime,
  wallpaper,
  clockStyle,
  notifications,
  flashlightOn,
  onToggleFlashlight,
  onUnlock,
  onClearNotifications,
  onSelectWallpaper,
  onSelectClockStyle,
}) => {
  const [unlocking, setUnlocking] = useState(false);
  const [customizing, setCustomizing] = useState(false);

  const handleUnlock = (targetApp?: AppId) => {
    if (customizing) return;
    setUnlocking(true);
    setTimeout(() => {
      onUnlock(targetApp);
      setUnlocking(false);
    }, 260);
  };

  const clockClass =
    clockStyle === 'glass'
      ? 'ios-lock-clock-glass font-bold tracking-tight'
      : clockStyle === 'editorial'
      ? 'text-white/95 font-light tracking-[-0.04em] drop-shadow-[0_4px_16px_rgba(15,23,42,0.28)]'
      : 'text-white font-extrabold tracking-tight drop-shadow-[0_4px_16px_rgba(15,23,42,0.3)]';

  return (
    <div className="relative h-full w-full flex flex-col justify-between px-5 pt-14 pb-6 select-none overflow-hidden">
      {/* Top Scrim for legible white typography on bright glass wallpapers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-900/35 via-slate-900/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/45 via-slate-950/15 to-transparent" />

      {/* Top Date, Clock & Lock Screen Widgets */}
      <div className="relative z-10 flex flex-col items-center text-center mt-1">
        <div className="mb-1.5 flex items-center gap-1.5 text-white/90">
          {unlocking ? (
            <Unlock className="w-4 h-4 animate-bounce text-sky-200" />
          ) : (
            <Lock className="w-3.5 h-3.5 opacity-90" />
          )}
          <span className="text-[11px] font-medium tracking-wide uppercase opacity-80">
            Face ID
          </span>
        </div>

        <p className="text-[16px] font-semibold text-white/95 tracking-tight drop-shadow-sm">
          11월 18일 수요일
        </p>

        <div
          className={`text-[74px] leading-[0.95] mt-1 tabular-nums ${clockClass}`}
        >
          {currentTime}
        </div>

        {/* iOS 27 Lock Screen Widgets Row */}
        <div className="mt-4 flex items-center justify-center gap-2.5 w-full">
          <button
            type="button"
            onClick={() => handleUnlock('calendar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/35 text-white text-[11px] font-medium shadow-sm hover:bg-white/30 transition-colors"
          >
            <CalendarHeart className="w-3.5 h-3.5 text-sky-200 shrink-0" />
            <span className="whitespace-nowrap">지유 생일 D-DAY</span>
          </button>

          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/35 text-white text-[11px] font-medium shadow-sm">
            <CloudSun className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span className="tabular-nums whitespace-nowrap">11° 맑음</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/35 text-white text-[11px] font-medium shadow-sm">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
            <span className="tabular-nums whitespace-nowrap">98%</span>
          </div>
        </div>
      </div>

      {/* Middle Area: Customize Mode OR Stacked iOS 27 Glass Notifications */}
      <div className="relative z-10 flex-1 flex flex-col justify-end my-3 overflow-y-auto no-scrollbar">
        {customizing ? (
          <div className="ios-liquid-glass-dark rounded-[26px] p-4 text-white space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-sky-300" />
                <span className="text-xs font-semibold">잠금화면 사용자화 · iOS 27</span>
              </div>
              <button
                type="button"
                onClick={() => setCustomizing(false)}
                className="min-w-[32px] min-h-[32px] rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label="사용자화 닫기"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-[11px] text-white/70 mb-2">시계 스타일</p>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'glass', label: '리퀴드 글래스' },
                    { id: 'solid', label: '볼드 솔리드' },
                    { id: 'editorial', label: '슬림 세리프' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectClockStyle(item.id)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-medium transition-colors ${
                      clockStyle === item.id
                        ? 'bg-sky-400 text-slate-950 font-semibold'
                        : 'bg-white/10 text-white/85 hover:bg-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] text-white/70 mb-2">배경화면 선택</p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => onSelectWallpaper(wp.id)}
                    className={`relative shrink-0 w-14 h-20 rounded-xl overflow-hidden border-2 transition-transform ${
                      wallpaper.id === wp.id
                        ? 'border-sky-400 scale-105'
                        : 'border-white/25 opacity-80'
                    }`}
                    aria-label={wp.name}
                  >
                    {wp.imageUrl ? (
                      <SafeImage
                        src={wp.imageUrl}
                        alt={wp.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${wp.gradientClass}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.length > 0 && (
              <div className="flex items-center justify-between px-1 mb-1">
                <span className="text-[11px] font-semibold text-white/85 drop-shadow-sm">
                  알림 센터
                </span>
                <button
                  type="button"
                  onClick={onClearNotifications}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>지우기</span>
                </button>
              </div>
            )}

            {notifications.map((notif) => (
              <button
                key={notif.id}
                type="button"
                onClick={() => handleUnlock(notif.appId)}
                className="w-full text-left ios-liquid-glass rounded-[22px] p-3.5 text-slate-900 transition-transform active:scale-[0.98] hover:brightness-105"
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[11px] font-bold text-sky-700 shrink-0">
                      {notif.appName}
                    </span>
                    <span className="text-slate-400 text-[10px]" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-[12px] font-bold text-slate-900 truncate">
                      {notif.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 tabular-nums shrink-0">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[12px] text-slate-800 leading-snug line-clamp-2">
                  {notif.body}
                </p>
              </button>
            ))}

            {notifications.length === 0 && (
              <div className="text-center py-4">
                <p className="text-xs font-medium text-white/80 drop-shadow-sm">
                  새로운 알림이 없습니다 · 아래로 내려 잠금을 해제하세요
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Lock Screen Controls + Home Unlock Affordance */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-full flex items-center justify-between px-2">
          <button
            type="button"
            onClick={onToggleFlashlight}
            className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all active:scale-90 ${
              flashlightOn
                ? 'bg-amber-100 text-amber-700 border-white shadow-[0_0_24px_rgba(254,243,199,0.85)]'
                : 'bg-slate-900/35 text-white border-white/25 hover:bg-slate-900/50'
            }`}
            aria-label="손전등"
          >
            <Flashlight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setCustomizing((prev) => !prev)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/35 backdrop-blur-xl border border-white/25 text-white text-[11px] font-medium hover:bg-slate-900/50 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200" />
            <span>{customizing ? '완료' : '잠금화면 꾸미기'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleUnlock('camera')}
            className="w-12 h-12 rounded-full bg-slate-900/35 backdrop-blur-xl border border-white/25 text-white flex items-center justify-center hover:bg-slate-900/50 transition-all active:scale-90"
            aria-label="카메라 실행"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => handleUnlock()}
          className="group flex flex-col items-center gap-1.5 py-1 px-6 rounded-full focus:outline-none"
        >
          <span className="text-[11px] font-medium text-white/90 tracking-tight group-hover:text-white transition-colors">
            눌러서 잠금 해제 · 데이트 시작하기
          </span>
          <div className="w-32 h-1.5 rounded-full bg-white/90 shadow-sm group-hover:w-36 transition-all" />
        </button>
      </div>
    </div>
  );
};
