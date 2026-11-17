import React from 'react';
import { Camera, Flashlight, User } from 'lucide-react';

interface LockScreenProps {
  /** 리퀴드 글래스 시계에 표시할 시각 (이야기 진행 시각) */
  currentTime: string;
  flashlightOn: boolean;
  onToggleFlashlight: () => void;
  onUnlock: () => void;
}

/**
 * iOS 27 리퀴드 글래스 잠금화면.
 * 날짜 · 큰 반투명 시계 · 하단 손전등/개인 시간/카메라 · 홈 바만 남긴 최소 구성.
 * 잠금화면 본문 어디를 눌러도 포타 이야기(story)로 진입한다.
 */
export const LockScreen: React.FC<LockScreenProps> = ({
  currentTime,
  flashlightOn,
  onToggleFlashlight,
  onUnlock,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="잠금 해제하고 포타 시작하기"
      onClick={onUnlock}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onUnlock();
        }
      }}
      className="relative h-full w-full flex flex-col select-none cursor-pointer overflow-hidden focus:outline-none"
    >
      {/* 어두운 사진 위에서도 글자가 읽히도록 위·아래만 살짝 가라앉힌다 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      {/* 날짜 + 리퀴드 글래스 시계 */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[calc(env(safe-area-inset-top)+74px)]">
        <p className="text-[17px] font-semibold tracking-tight text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
          11월 18일 (수)
        </p>
        <div className="ios-lock-clock-glass mt-0.5 text-[clamp(92px,25.5vw,116px)] leading-[0.98] font-semibold tracking-[-0.035em] tabular-nums">
          {currentTime}
        </div>
      </div>

      <div className="flex-1" />

      {/* 하단: 손전등 · 개인 시간 · 카메라 */}
      <div className="relative z-10 w-full px-8 pb-[calc(env(safe-area-inset-bottom)+54px)] flex items-end justify-between">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFlashlight();
          }}
          aria-label={flashlightOn ? '손전등 끄기' : '손전등 켜기'}
          className={`w-14 h-14 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all active:scale-90 ${
            flashlightOn
              ? 'bg-white/85 text-slate-900 border-white shadow-[0_0_26px_rgba(255,255,255,0.55)]'
              : 'bg-white/15 text-white border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_20px_-8px_rgba(0,0,0,0.6)]'
          }`}
        >
          <Flashlight className="w-6 h-6" strokeWidth={1.8} />
        </button>

        <div className="flex flex-col items-center gap-1 pb-2.5">
          <div className="flex items-center gap-1.5 text-white/90">
            <User className="w-3.5 h-3.5" strokeWidth={2.2} />
            <span className="text-[13.5px] font-medium tracking-tight">
              개인 시간
            </span>
          </div>
          <span className="text-[10px] font-medium text-white/45">
            탭해서 잠금 해제
          </span>
        </div>

        <button
          type="button"
          onClick={(event) => {
            // 카메라로 이동하지 않는다 — 잠금화면에 머문다
            event.stopPropagation();
          }}
          aria-label="카메라 (이 화면에서는 열리지 않음)"
          className="w-14 h-14 rounded-full flex items-center justify-center border border-white/25 bg-white/15 text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_20px_-8px_rgba(0,0,0,0.6)] transition-all active:scale-90"
        >
          <Camera className="w-6 h-6" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};
