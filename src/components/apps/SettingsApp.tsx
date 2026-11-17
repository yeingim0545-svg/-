import React, { useState } from 'react';
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Image,
  Moon,
  Palette,
  RotateCcw,
  Smartphone,
  Sparkles,
  Sun,
  User,
} from 'lucide-react';
import { IconStyle, LockClockStyle, WallpaperItem } from '../../types/ios';
import { SAKUYA_AVATAR, WALLPAPERS } from '../../data/sakuyaDateData';
import { SafeImage } from '../SafeImage';

interface SettingsAppProps {
  isDark: boolean;
  brightness: number;
  iconStyle: IconStyle;
  wallpaper: WallpaperItem;
  clockStyle: LockClockStyle;
  userNickname: string;
  onBackHome: () => void;
  onToggleDark: (dark: boolean) => void;
  onChangeBrightness: (val: number) => void;
  onChangeIconStyle: (style: IconStyle) => void;
  onSelectWallpaper: (id: string) => void;
  onSelectClockStyle: (style: LockClockStyle) => void;
  onChangeNickname: (name: string) => void;
  onTriggerTestNotification: () => void;
  onLockPhone: () => void;
  onResetStory: () => void;
}

type SettingsView = 'root' | 'software' | 'display' | 'wallpaper' | 'profile';

export const SettingsApp: React.FC<SettingsAppProps> = ({
  isDark,
  brightness,
  iconStyle,
  wallpaper,
  clockStyle,
  userNickname,
  onBackHome,
  onToggleDark,
  onChangeBrightness,
  onChangeIconStyle,
  onSelectWallpaper,
  onSelectClockStyle,
  onChangeNickname,
  onTriggerTestNotification,
  onLockPhone,
  onResetStory,
}) => {
  const [view, setView] = useState<SettingsView>('root');
  const [draftName, setDraftName] = useState(userNickname);
  const [resetDone, setResetDone] = useState(false);

  const bgMain = isDark ? 'bg-zinc-950 text-white' : 'bg-[#f2f2f7] text-slate-900';
  const cardBg = isDark
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-white border-slate-200/70';
  const divider = isDark ? 'border-zinc-800' : 'border-slate-100';
  const mutedText = isDark ? 'text-zinc-400' : 'text-slate-500';

  const renderHeader = (title: string, backTo?: SettingsView) => (
    <div
      className={`sticky top-0 z-20 pt-13 pb-3 px-4 backdrop-blur-xl border-b ${
        isDark
          ? 'bg-zinc-950/85 border-zinc-800'
          : 'bg-[#f2f2f7]/85 border-slate-200/70'
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => (backTo ? setView(backTo) : onBackHome())}
          className="flex items-center gap-0.5 text-sky-500 text-sm font-medium min-h-[36px]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{backTo ? '설정' : '홈'}</span>
        </button>
        <h1 className="text-[16px] font-bold tracking-tight">{title}</h1>
        <div className="w-12" />
      </div>
    </div>
  );

  if (view === 'software') {
    return (
      <div className={`h-full overflow-y-auto overscroll-contain no-scrollbar pb-10 ${bgMain}`}>
        {renderHeader('소프트웨어 업데이트', 'root')}
        <div className="p-4 space-y-4">
          <div className={`rounded-3xl p-5 border text-center ${cardBg}`}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg mb-3">
              <span className="text-xl font-extrabold tracking-tight">27</span>
            </div>
            <h2 className="text-lg font-bold">iOS 27.0</h2>
            <p className={`text-xs mt-1 ${mutedText}`}>
              iOS가 최신 상태입니다 · 11월 18일 지유 생일 에디션
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>업데이트 설치 완료</span>
            </div>
          </div>

          <div className={`rounded-3xl p-4 border space-y-2.5 ${cardBg}`}>
            <p className="text-xs font-bold">iOS 27 주요 변경 사항</p>
            <ul className={`text-xs space-y-2 leading-relaxed ${mutedText}`}>
              <li>• 리퀴드 글래스(Liquid Glass) 반투명 잠금화면 시계 및 독 적용</li>
              <li>• 홈 화면 아이콘 스타일 전환 (기본 / 다크 / 틴트 글래스)</li>
              <li>• 지유의 11월 18일 생일 데이트 22화 & 다이나믹 아일랜드 연동</li>
              <li>• 제어 센터 실시간 밝기 및 사운드 믹서 지원</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'display') {
    return (
      <div className={`h-full overflow-y-auto overscroll-contain no-scrollbar pb-10 ${bgMain}`}>
        {renderHeader('디스플레이 및 밝기', 'root')}
        <div className="p-4 space-y-4">
          <div className={`rounded-3xl p-4 border ${cardBg}`}>
            <p className={`text-xs font-semibold mb-3 ${mutedText}`}>화면 모드</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onToggleDark(false)}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-colors ${
                  !isDark
                    ? 'border-sky-500 bg-sky-500/10 text-sky-600'
                    : 'border-zinc-700 text-zinc-400'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="text-xs font-semibold">라이트 모드</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleDark(true)}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-colors ${
                  isDark
                    ? 'border-sky-400 bg-sky-500/15 text-sky-300'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="text-xs font-semibold">다크 모드</span>
              </button>
            </div>
          </div>

          <div className={`rounded-3xl p-4 border ${cardBg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">밝기</span>
              <span className={`text-xs tabular-nums ${mutedText}`}>{brightness}%</span>
            </div>
            <input
              type="range"
              min={45}
              max={100}
              value={brightness}
              onChange={(e) => onChangeBrightness(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          <div className={`rounded-3xl p-4 border ${cardBg}`}>
            <p className={`text-xs font-semibold mb-3 ${mutedText}`}>
              iOS 27 홈 화면 아이콘 스타일
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'default', label: '기본' },
                  { id: 'dark', label: '다크' },
                  { id: 'tinted-glass', label: '리퀴드 글래스' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeIconStyle(opt.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-colors ${
                    iconStyle === opt.id
                      ? 'border-sky-500 bg-sky-500 text-white'
                      : isDark
                      ? 'border-zinc-700 text-zinc-300'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'wallpaper') {
    return (
      <div className={`h-full overflow-y-auto overscroll-contain no-scrollbar pb-10 ${bgMain}`}>
        {renderHeader('배경화면 및 잠금화면', 'root')}
        <div className="p-4 space-y-4">
          <div className={`rounded-3xl p-4 border ${cardBg}`}>
            <p className={`text-xs font-semibold mb-3 ${mutedText}`}>
              잠금화면 시계 스타일
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'glass', label: '글래스' },
                  { id: 'solid', label: '볼드' },
                  { id: 'editorial', label: '슬림' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectClockStyle(item.id)}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    clockStyle === item.id
                      ? 'border-sky-500 bg-sky-500 text-white'
                      : isDark
                      ? 'border-zinc-700 text-zinc-300'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {WALLPAPERS.map((wp) => {
              const selected = wallpaper.id === wp.id;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => onSelectWallpaper(wp.id)}
                  className={`text-left rounded-3xl overflow-hidden border-2 transition-all ${
                    selected ? 'border-sky-500 scale-[1.01]' : 'border-transparent'
                  } ${cardBg}`}
                >
                  <div className="h-36 w-full relative">
                    {wp.imageUrl ? (
                      <SafeImage
                        src={wp.imageUrl}
                        alt={wp.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${wp.gradientClass}`} />
                    )}
                    {selected && (
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold truncate">{wp.name}</p>
                    <p className={`text-[10px] truncate ${mutedText}`}>{wp.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'profile') {
    return (
      <div className={`h-full overflow-y-auto overscroll-contain no-scrollbar pb-10 ${bgMain}`}>
        {renderHeader('나의 정보 · 호칭 설정', 'root')}
        <div className="p-4 space-y-4">
          <div className={`rounded-3xl p-4 border space-y-3 ${cardBg}`}>
            <label className="block text-xs font-semibold">
              내 프로필 이름
            </label>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              maxLength={12}
              placeholder="예: 지유, 누나, 자기"
              className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                isDark
                  ? 'bg-zinc-800 border-zinc-700 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
            <button
              type="button"
              onClick={() => {
                onChangeNickname(draftName.trim() || '지유');
                setView('root');
              }}
              className="w-full py-2.5 rounded-2xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-600 transition-colors"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full overflow-y-auto overscroll-contain no-scrollbar pb-12 ${bgMain}`}>
      {renderHeader('설정')}
      <div className="p-4 space-y-4">
        {/* Apple Account Profile Card */}
        <button
          type="button"
          onClick={() => setView('profile')}
          className={`w-full text-left rounded-3xl p-4 border flex items-center justify-between ${cardBg}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-sky-300/40">
              <SafeImage
                src={SAKUYA_AVATAR}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold truncate">
                {userNickname} · 사쿠야 11.18
              </p>
              <p className={`text-xs truncate ${mutedText}`}>
                Apple 계정 · 프로필 및 데이트 설정
              </p>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 shrink-0 ${mutedText}`} />
        </button>

        {/* iOS 27 Settings List */}
        <div className={`rounded-3xl border overflow-hidden ${cardBg}`}>
          <button
            type="button"
            onClick={() => setView('software')}
            className={`w-full px-4 py-3.5 flex items-center justify-between border-b ${divider}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-500 text-white flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">일반 · 소프트웨어 업데이트</p>
                <p className={`text-[11px] ${mutedText}`}>iOS 27.0 최신 버전</p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 ${mutedText}`} />
          </button>

          <button
            type="button"
            onClick={() => setView('display')}
            className={`w-full px-4 py-3.5 flex items-center justify-between border-b ${divider}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">디스플레이 및 밝기</p>
                <p className={`text-[11px] ${mutedText}`}>
                  {isDark ? '다크 모드' : '라이트 모드'} · 아이콘 {iconStyle}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 ${mutedText}`} />
          </button>

          <button
            type="button"
            onClick={() => setView('wallpaper')}
            className="w-full px-4 py-3.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                <Image className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">배경화면 및 잠금화면</p>
                <p className={`text-[11px] ${mutedText}`}>{wallpaper.name}</p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 ${mutedText}`} />
          </button>
        </div>

        {/* Quick iOS 27 Actions */}
        <div className={`rounded-3xl border overflow-hidden ${cardBg}`}>
          <button
            type="button"
            onClick={onTriggerTestNotification}
            className={`w-full px-4 py-3.5 flex items-center justify-between border-b ${divider}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">지유 생일 푸시 알림 미리보기</span>
            </div>
            <Sparkles className="w-4 h-4 text-sky-500" />
          </button>

          <button
            type="button"
            onClick={onLockPhone}
            className={`w-full px-4 py-3.5 flex items-center justify-between border-b ${divider}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">잠금화면으로 돌아가 확인하기</span>
            </div>
            <User className={`w-4 h-4 ${mutedText}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              onResetStory();
              setResetDone(true);
              setTimeout(() => setResetDone(false), 2000);
            }}
            className="w-full px-4 py-3.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-500 text-white flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">
                {resetDone ? '1화부터 다시 시작 준비됨 ✓' : '스토리 진행 처음부터 초기화'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
