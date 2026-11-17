import React from 'react';
import { Signal, Wifi } from 'lucide-react';
import { ScreenState, WallpaperItem } from '../types/ios';
import { SafeImage } from './SafeImage';

interface IPhoneFrameProps {
  screen: ScreenState;
  wallpaper: WallpaperItem;
  flashlightOn: boolean;
  children: React.ReactNode;
}

/**
 * 포타 전용 아이폰 프레임.
 * 상태바(KT · 신호 · 와이파이 · 배터리)와 홈 바만 남기고
 * 다이나믹 아일랜드 확장 배너·제어 센터·홈 화면 이동은 모두 제거했다.
 * 화면 이동은 잠금화면(lock) ↔ 이야기(story) 두 가지뿐이다.
 */
export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  screen,
  wallpaper,
  flashlightOn,
  children,
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden">
        <div className="relative w-full h-full overflow-hidden bg-black">
          {/* 잠금화면 배경 */}
          {screen === 'lock' && (
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

          {/* 손전등 화면 번짐 */}
          {flashlightOn && (
            <div className="pointer-events-none absolute inset-0 z-30 bg-amber-100/30 mix-blend-screen" />
          )}

          {/* 상태바 — 왼쪽 통신사, 오른쪽 신호·와이파이·배터리 (누를 수 없음) */}
          <div className="pointer-events-none absolute top-0 inset-x-0 z-40 h-12 px-7 pt-[env(safe-area-inset-top)] flex items-center justify-between select-none text-white">
            <span className="text-[14px] font-semibold tracking-tight">KT</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" strokeWidth={2.4} />
              <Wifi className="w-3.5 h-3.5" strokeWidth={2.4} />
              <span className="flex items-center gap-[1.5px]">
                <span className="w-[23px] h-[11.5px] rounded-[3.5px] border border-white/75 p-[1.5px] flex items-center">
                  <span className="h-full w-[16%] rounded-[1.5px] bg-rose-500" />
                </span>
                <span className="w-[1.5px] h-[4px] rounded-r-[1px] bg-white/60" />
              </span>
            </div>
          </div>

          {/* 화면 본문 */}
          <div className="relative z-10 w-full h-full">{children}</div>

          {/* 홈 바 (터치 불가 장식) */}
          <div className="pointer-events-none absolute bottom-2 inset-x-0 pb-[env(safe-area-inset-bottom)] z-40 flex justify-center">
            <div className="w-[134px] h-[5px] rounded-full bg-white/85" />
          </div>
        </div>
      </div>
    </div>
  );
};
