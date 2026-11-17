import React from 'react';
import { Phone } from 'lucide-react';
import { SafeImage } from './SafeImage';

const CALLER_NAME = '사쿠야🥨';

/**
 * 아이폰 전화 수신 배너 — 둥근 다크 그레이 패널 안에
 * 프로필 사진 · 발신자 이름 · 거절/수락 원형 버튼을 놓는다.
 */
export const CallSceneBanner: React.FC<{ profileImage: string }> = ({
  profileImage,
}) => (
  <div className="w-full h-full flex items-center justify-center bg-[#111113] px-3 py-4">
    <div className="w-full rounded-[24px] bg-[#3a3a3c] px-3.5 py-3.5 flex items-center gap-3 shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
      <SafeImage
        src={profileImage}
        alt="사쿠야 프로필 사진"
        className="w-11 h-11 rounded-full object-cover shrink-0 bg-white/10"
      />

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-tight text-white truncate">
          {CALLER_NAME}
        </p>
        <p className="mt-0.5 text-[11px] leading-tight text-white/55">
          수신 전화 · iPhone
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          aria-hidden="true"
          className="w-9 h-9 rounded-full bg-[#ff3b30] flex items-center justify-center"
        >
          <Phone className="w-4 h-4 text-white rotate-[135deg]" />
        </span>
        <span
          aria-hidden="true"
          className="w-9 h-9 rounded-full bg-[#34c759] flex items-center justify-center"
        >
          <Phone className="w-4 h-4 text-white" />
        </span>
      </div>
    </div>
  </div>
);

/**
 * 아이폰 메시지 알림 배너 — 어두운 배경 위 반투명 그레이 알림.
 * 메시지가 여러 개면 알림이 쌓인 것처럼 위아래로 붙여 보여준다.
 */
export const MessagesSceneBanner: React.FC<{ messages: string[] }> = ({
  messages,
}) => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#0a0a0c] px-3 py-3">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`w-full rounded-[19px] bg-[#9b9b9f]/85 backdrop-blur-md px-3 py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.45)] ${
          index === 0 ? '' : 'bg-[#8e8e93]/75'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-[17px] h-[17px] rounded-[5px] bg-[#34c759] flex items-center justify-center shrink-0">
            <span className="w-[9px] h-[7px] rounded-[2px] bg-white" />
          </span>
          <span className="text-[10px] font-semibold tracking-[0.06em] text-black/60">
            MESSAGES
          </span>
          <span className="ml-auto text-[10px] text-black/45">now</span>
        </div>

        <p className="mt-1.5 text-[11px] font-semibold text-black/70">
          {CALLER_NAME}
        </p>
        <p className="mt-0.5 text-[12.5px] leading-[1.45] text-black/90">
          {message}
        </p>
      </div>
    ))}
  </div>
);
