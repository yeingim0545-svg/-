import React from 'react';
import {
  BookOpen,
  Camera,
  Image,
  MapPin,
  MessageCircle,
  Music,
  Settings,
  StickyNote,
} from 'lucide-react';
import { AppId, IconStyle } from '../types/ios';

interface IosAppIconProps {
  appId: AppId;
  iconStyle: IconStyle;
  size?: 'sm' | 'md' | 'lg';
  badgeCount?: number;
  showLabel?: boolean;
  labelColorClass?: string;
  onClick?: () => void;
}

const APP_META: Record<
  AppId,
  {
    name: string;
    bg: string;
    tintText: string;
  }
> = {
  pota: {
    name: '포타',
    bg: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600',
    tintText: 'text-sky-200',
  },
  messages: {
    name: '메시지',
    bg: 'bg-gradient-to-b from-emerald-400 to-green-600',
    tintText: 'text-emerald-200',
  },
  photos: {
    name: '사진',
    bg: 'bg-white',
    tintText: 'text-rose-200',
  },
  calendar: {
    name: '캘린더',
    bg: 'bg-white',
    tintText: 'text-sky-200',
  },
  music: {
    name: '음악',
    bg: 'bg-gradient-to-b from-rose-500 to-pink-600',
    tintText: 'text-rose-200',
  },
  maps: {
    name: '지도',
    bg: 'bg-gradient-to-br from-sky-400 via-emerald-400 to-amber-300',
    tintText: 'text-sky-200',
  },
  notes: {
    name: '메모',
    bg: 'bg-white',
    tintText: 'text-amber-200',
  },
  camera: {
    name: '카메라',
    bg: 'bg-gradient-to-b from-zinc-600 to-zinc-800',
    tintText: 'text-zinc-200',
  },
  settings: {
    name: '설정',
    bg: 'bg-gradient-to-b from-slate-400 to-slate-600',
    tintText: 'text-slate-200',
  },
};

export const IosAppIcon: React.FC<IosAppIconProps> = ({
  appId,
  iconStyle,
  size = 'md',
  badgeCount,
  showLabel = true,
  labelColorClass = 'text-white',
  onClick,
}) => {
  const meta = APP_META[appId];

  const sizeClass =
    size === 'sm'
      ? 'w-11 h-11 rounded-[12px]'
      : size === 'lg'
      ? 'w-16 h-16 rounded-[18px]'
      : 'w-[58px] h-[58px] rounded-[15px]';

  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-7 h-7';

  const renderGlyph = () => {
    const isTinted = iconStyle === 'tinted-glass';
    const isDark = iconStyle === 'dark';

    if (appId === 'calendar' && !isTinted) {
      return (
        <div
          className={`w-full h-full flex flex-col items-center justify-center ${
            isDark ? 'bg-zinc-900 text-white' : 'bg-white text-slate-900'
          }`}
        >
          <span className="text-[9px] font-bold text-rose-500 leading-none tracking-tight">
            수요일
          </span>
          <span className="text-[23px] font-bold leading-none mt-0.5 tabular-nums">
            18
          </span>
        </div>
      );
    }

    if (appId === 'notes' && !isTinted) {
      return (
        <div
          className={`w-full h-full flex flex-col overflow-hidden ${
            isDark ? 'bg-zinc-900' : 'bg-white'
          }`}
        >
          <div className="h-[30%] w-full bg-gradient-to-r from-amber-400 to-yellow-400" />
          <div className="flex-1 flex flex-col justify-center gap-1 px-2">
            <div className={`h-[2px] w-full rounded ${isDark ? 'bg-zinc-700' : 'bg-slate-200'}`} />
            <div className={`h-[2px] w-3/4 rounded ${isDark ? 'bg-zinc-700' : 'bg-slate-200'}`} />
          </div>
        </div>
      );
    }

    if (appId === 'photos' && !isTinted) {
      return (
        <div
          className={`w-full h-full flex items-center justify-center relative ${
            isDark ? 'bg-zinc-900' : 'bg-white'
          }`}
        >
          <div className="relative w-9 h-9">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4.5 rounded-full bg-rose-400/85" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-4.5 rounded-full bg-sky-400/85" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4.5 h-3 rounded-full bg-amber-400/85" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4.5 h-3 rounded-full bg-emerald-400/85" />
            <span className="absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-orange-400/80 rotate-45" />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-indigo-400/80 rotate-45" />
          </div>
        </div>
      );
    }

    const glyphColor = isTinted
      ? 'text-white drop-shadow-sm'
      : isDark
      ? meta.tintText
      : 'text-white';

    switch (appId) {
      case 'pota':
        return <BookOpen className={`${iconSize} ${glyphColor}`} strokeWidth={2.1} />;
      case 'messages':
        return (
          <MessageCircle
            className={`${iconSize} ${glyphColor} fill-current`}
            strokeWidth={1.8}
          />
        );
      case 'photos':
        return <Image className={`${iconSize} ${glyphColor}`} strokeWidth={2} />;
      case 'calendar':
        return (
          <div className="flex flex-col items-center justify-center text-white">
            <span className="text-[9px] font-semibold leading-none opacity-80">11월</span>
            <span className="text-[20px] font-bold leading-none mt-0.5 tabular-nums">18</span>
          </div>
        );
      case 'music':
        return <Music className={`${iconSize} ${glyphColor}`} strokeWidth={2.2} />;
      case 'maps':
        return <MapPin className={`${iconSize} ${glyphColor}`} strokeWidth={2.2} />;
      case 'notes':
        return <StickyNote className={`${iconSize} ${glyphColor}`} strokeWidth={2.1} />;
      case 'camera':
        return <Camera className={`${iconSize} ${glyphColor}`} strokeWidth={2} />;
      case 'settings':
        return <Settings className={`${iconSize} ${glyphColor}`} strokeWidth={2} />;
    }
  };

  const containerStyleClass =
    iconStyle === 'tinted-glass'
      ? 'bg-white/25 backdrop-blur-xl border border-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_8px_20px_rgba(15,23,42,0.18)]'
      : iconStyle === 'dark'
      ? 'bg-zinc-900/95 border border-white/15 shadow-[0_8px_18px_rgba(0,0,0,0.45)]'
      : `${meta.bg} shadow-[0_6px_16px_rgba(15,23,42,0.22)]`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl p-0.5 transition-transform active:scale-90"
      aria-label={`${meta.name} 열기`}
    >
      <div className={`relative ${sizeClass} overflow-hidden flex items-center justify-center ${containerStyleClass} transition-transform duration-150 group-hover:scale-[1.03]`}>
        {/* Specular top highlight for iOS 27 depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
        {renderGlyph()}

        {badgeCount && badgeCount > 0 ? (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md tabular-nums">
            {badgeCount}
          </span>
        ) : null}
      </div>
      {showLabel && (
        <span
          className={`text-[11px] font-medium tracking-tight leading-tight whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] ${labelColorClass}`}
        >
          {meta.name}
        </span>
      )}
    </button>
  );
};
