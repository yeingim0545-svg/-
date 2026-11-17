import React from 'react';
import {
  Bluetooth,
  Flashlight,
  Lock,
  Moon,
  Pause,
  Play,
  Settings,
  SkipForward,
  Sparkles,
  Sun,
  Volume2,
  Wifi,
  X,
} from 'lucide-react';
import { MUSIC_TRACKS } from '../data/sakuyaDateData';
import { SafeImage } from './SafeImage';
import { AppId } from '../types/ios';

interface ControlCenterProps {
  isOpen: boolean;
  isDark: boolean;
  brightness: number;
  volume: number;
  wifiOn: boolean;
  bluetoothOn: boolean;
  focusModeOn: boolean;
  flashlightOn: boolean;
  isPlayingMusic: boolean;
  currentTrackIndex: number;
  onClose: () => void;
  onToggleDark: () => void;
  onChangeBrightness: (val: number) => void;
  onChangeVolume: (val: number) => void;
  onToggleWifi: () => void;
  onToggleBluetooth: () => void;
  onToggleFocusMode: () => void;
  onToggleFlashlight: () => void;
  onToggleMusic: () => void;
  onNextTrack: () => void;
  onLockPhone: () => void;
  onOpenApp: (appId: AppId) => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  isOpen,
  isDark,
  brightness,
  volume,
  wifiOn,
  bluetoothOn,
  focusModeOn,
  flashlightOn,
  isPlayingMusic,
  currentTrackIndex,
  onClose,
  onToggleDark,
  onChangeBrightness,
  onChangeVolume,
  onToggleWifi,
  onToggleBluetooth,
  onToggleFocusMode,
  onToggleFlashlight,
  onToggleMusic,
  onNextTrack,
  onLockPhone,
  onOpenApp,
}) => {
  if (!isOpen) return null;

  const track = MUSIC_TRACKS[currentTrackIndex];
  const tileBase = 'ios-liquid-glass-dark text-white rounded-[24px]';

  return (
    <div
      className="absolute inset-0 z-50 bg-slate-950/55 backdrop-blur-2xl flex flex-col justify-between p-5 pt-14 animate-in fade-in duration-150"
      role="dialog"
      aria-label="제어 센터"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-white/80">
            iOS 27 제어 센터
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[36px] min-h-[36px] rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
            aria-label="제어 센터 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top 2x2 Grid: Connectivity + Music */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Connectivity 4-button Cluster */}
          <div className={`${tileBase} p-3 grid grid-cols-2 gap-2.5`}>
            <button
              type="button"
              onClick={onToggleWifi}
              className={`h-14 rounded-2xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                wifiOn ? 'bg-sky-500 text-white' : 'bg-white/10 text-white/75'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>Wi-Fi</span>
            </button>
            <button
              type="button"
              onClick={onToggleBluetooth}
              className={`h-14 rounded-2xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                bluetoothOn
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/75'
              }`}
            >
              <Bluetooth className="w-4 h-4" />
              <span>Bluetooth</span>
            </button>
            <button
              type="button"
              onClick={onToggleFocusMode}
              className={`col-span-2 h-11 rounded-2xl flex items-center justify-center gap-1.5 text-[11px] font-semibold transition-colors ${
                focusModeOn
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/10 text-white/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{focusModeOn ? '생일 데이트 집중 켜짐' : '집중 모드 끔'}</span>
            </button>
          </div>

          {/* Music Now Playing Tile */}
          <div className={`${tileBase} p-3.5 flex flex-col justify-between`}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <SafeImage
                  src={track.coverImage}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-bold truncate">{track.title}</p>
                <p className="text-[10px] text-white/70 truncate">{track.artist}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-2">
              <button
                type="button"
                onClick={onToggleMusic}
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label={isPlayingMusic ? '일시정지' : '재생'}
              >
                {isPlayingMusic ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
              <button
                type="button"
                onClick={onNextTrack}
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label="다음 곡"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliders Row */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className={`${tileBase} p-3.5`}>
            <div className="flex items-center justify-between text-[11px] font-medium mb-2">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                화면 밝기
              </span>
              <span className="tabular-nums text-white/70">{brightness}%</span>
            </div>
            <input
              type="range"
              min={45}
              max={100}
              value={brightness}
              onChange={(e) => onChangeBrightness(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
              aria-label="화면 밝기 조절"
            />
          </div>

          <div className={`${tileBase} p-3.5`}>
            <div className="flex items-center justify-between text-[11px] font-medium mb-2">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-sky-300" />
                음량
              </span>
              <span className="tabular-nums text-white/70">{volume}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => onChangeVolume(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
              aria-label="음량 조절"
            />
          </div>
        </div>

        {/* Quick Action Row */}
        <div className="grid grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={onToggleDark}
            className={`h-16 rounded-[20px] flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
              isDark
                ? 'bg-white text-slate-900'
                : 'ios-liquid-glass-dark text-white hover:bg-white/15'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>{isDark ? '다크 켬' : '다크 모드'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleFlashlight}
            className={`h-16 rounded-[20px] flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
              flashlightOn
                ? 'bg-amber-200 text-amber-950'
                : 'ios-liquid-glass-dark text-white hover:bg-white/15'
            }`}
          >
            <Flashlight className="w-4 h-4" />
            <span>손전등</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onLockPhone();
            }}
            className="h-16 rounded-[20px] ios-liquid-glass-dark text-white flex flex-col items-center justify-center gap-1 text-[11px] font-medium hover:bg-white/15 transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>화면 잠금</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenApp('settings');
            }}
            className="h-16 rounded-[20px] ios-liquid-glass-dark text-white flex flex-col items-center justify-center gap-1 text-[11px] font-medium hover:bg-white/15 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>설정</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mx-auto py-2 px-8 rounded-full text-xs font-medium text-white/80 hover:text-white"
      >
        위로 쓸어올려 닫기
      </button>
    </div>
  );
};
