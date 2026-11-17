import React, { useRef, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Gift,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import { ChatMessage } from '../../types/ios';
import {
  QUICK_REPLIES,
  SAKUYA_AVATAR,
  STORY_CHAPTERS,
} from '../../data/sakuyaDateData';
import { SafeImage } from '../SafeImage';

interface PotaAppProps {
  isDark: boolean;
  currentChapterIndex: number;
  affection: number;
  memories: string[];
  choicesMade: Record<number, number>;
  messages: ChatMessage[];
  onSelectChoice: (chapterIndex: number, choiceIndex: number) => void;
  onGoToChapter: (chapterIndex: number) => void;
  onNextChapter: () => boolean;
  onPreviousChapter: () => void;
  onSendMessage: (text: string) => void;
  onBackHome: () => void;
}

type PotaTab = 'story' | 'chat' | 'plan' | 'memory' | 'gift';

export const PotaApp: React.FC<PotaAppProps> = ({
  isDark,
  currentChapterIndex,
  affection,
  memories,
  choicesMade,
  messages,
  onSelectChoice,
  onGoToChapter,
  onNextChapter,
  onPreviousChapter,
  onSendMessage,
  onBackHome,
}) => {
  const [activeTab, setActiveTab] = useState<PotaTab>('story');
  const [chatInput, setChatInput] = useState('');
  const [modalState, setModalState] = useState<{
    title: string;
    text: string;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chapter = STORY_CHAPTERS[currentChapterIndex] || STORY_CHAPTERS[0];
  const chosenIndex = choicesMade[currentChapterIndex];
  const chosenOption =
    chosenIndex !== undefined ? chapter.choices[chosenIndex] : undefined;

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentChapterIndex === STORY_CHAPTERS.length - 1) {
      onGoToChapter(0);
      scrollToTop();
      return;
    }
    if (chosenIndex === undefined) {
      setModalState({
        title: '잠깐 ♡',
        text: '이 장면의 선택지를 먼저 골라 줘.\n어떤 선택을 하느냐에 따라 우리의 추억이 달라져.',
      });
      return;
    }
    const moved = onNextChapter();
    if (moved) {
      setActiveTab('story');
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      onPreviousChapter();
      scrollToTop();
    }
  };

  const handleScheduleClick = (idx: number) => {
    if (idx > currentChapterIndex) {
      setModalState({
        title: '아직 열리지 않은 일정',
        text: '현재 장면을 진행한 뒤 다음 일정을 확인할 수 있어.',
      });
      return;
    }
    onGoToChapter(idx);
    setActiveTab('story');
    scrollToTop();
  };

  const handleCallSakuya = () => {
    setModalState({
      title: '사쿠야에게 전화하기',
      text: '사쿠야에게 전화를 걸고 있어...\n\n사쿠야: 여보세요?\n\n"응, 왜? 목소리 듣고 싶었어?"\n\n그는 웃으며 전화를 받았다.',
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setChatInput('');
  };

  const bgMain = isDark
    ? 'bg-zinc-950 text-zinc-100'
    : 'bg-[#fff7fa] text-[#59434c]';
  const cardBg = isDark
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-white border-[#f0dce5]';
  const muted = isDark ? 'text-zinc-400' : 'text-[#a58c96]';
  const accent = isDark ? 'text-rose-300' : 'text-[#a86e87]';

  return (
    <div className={`relative h-full flex flex-col overflow-hidden font-story ${bgMain}`}>
      {/* Top Safe Bar + Navigation */}
      <div
        className={`pt-13 pb-2.5 px-4 border-b flex items-center justify-between shrink-0 ${
          isDark
            ? 'bg-zinc-900/95 border-zinc-800'
            : 'bg-gradient-to-r from-[#f9e8ef] to-[#f5dce7] border-[#f0dce5]'
        }`}
      >
        <button
          type="button"
          onClick={onBackHome}
          className={`flex items-center gap-0.5 text-xs font-semibold min-h-[34px] ${accent}`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>홈</span>
        </button>

        <div className="text-center">
          <p className={`text-[10px] tracking-[0.18em] ${accent}`}>
            A SPECIAL DAY WITH YOU
          </p>
          <h1
            className={`font-editorial text-[16px] font-medium tracking-tight ${
              isDark ? 'text-rose-200' : 'text-[#815269]'
            }`}
          >
            A DAY WITH SAKUYA
          </h1>
        </div>

        <button
          type="button"
          onClick={handleCallSakuya}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
              : 'bg-white/80 text-[#a86e87] hover:bg-white'
          }`}
          aria-label="사쿠야에게 전화하기"
          title="사쿠야에게 전화하기"
        >
          <Phone className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain no-scrollbar pb-20"
      >
        {/* Hero Progress & Timebar (visible on story tab) */}
        {activeTab === 'story' && (
          <>
            <div
              className={`px-4 py-3 border-b ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800'
                  : 'bg-[#fdf2f6] border-[#f0dce5]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className={accent}>OUR STORY</span>
                <span className="tabular-nums font-medium">
                  {currentChapterIndex + 1} / {STORY_CHAPTERS.length} CHAPTERS
                </span>
              </div>
              <div
                className={`h-1.5 rounded-full overflow-hidden ${
                  isDark ? 'bg-zinc-800' : 'bg-[#e9cdd9]'
                }`}
              >
                <div
                  className="h-full bg-[#b87997] transition-all duration-300"
                  style={{
                    width: `${
                      ((currentChapterIndex + 1) / STORY_CHAPTERS.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div
              className={`px-4 py-3 border-b flex items-center justify-between ${
                isDark
                  ? 'bg-zinc-950 border-zinc-800'
                  : 'bg-white border-[#f0dce5]'
              }`}
            >
              <div>
                <span className={`text-[10px] block ${muted}`}>OUR TIME</span>
                <strong
                  className={`font-editorial text-2xl tabular-nums ${
                    isDark ? 'text-rose-300' : 'text-[#9c657f]'
                  }`}
                >
                  {chapter.time}
                </strong>
              </div>
              <div className="text-right">
                <span className={`text-[10px] block ${muted}`}>
                  {chapter.label}
                </span>
                <span className={`text-[11px] ${muted}`}>November · Tokyo ♡</span>
              </div>
            </div>
          </>
        )}

        <div className="p-4 space-y-4">
          {activeTab === 'story' && (
            <>
              <div className={`rounded-2xl border p-4 space-y-3.5 ${cardBg}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] tracking-[0.16em] ${accent}`}>
                    CHAPTER {String(currentChapterIndex + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full ${
                      isDark
                        ? 'bg-rose-500/20 text-rose-200'
                        : 'bg-[#f8eaf0] text-[#a36d84]'
                    }`}
                  >
                    {chapter.tag}
                  </span>
                </div>

                <p className={`text-[11px] ${muted}`}>
                  {chapter.time} ─ {chapter.place}
                </p>

                <h2
                  className={`text-[19px] leading-snug font-normal ${
                    isDark ? 'text-rose-100' : 'text-[#785267]'
                  }`}
                >
                  {chapter.title}
                </h2>

                {chapter.coverImage && (
                  <div className="h-44 rounded-2xl overflow-hidden shadow-sm">
                    <SafeImage
                      src={chapter.coverImage}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3.5 text-[14px] leading-[1.95] break-keep">
                  {chapter.story.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Choices */}
                <div className="pt-3 space-y-2">
                  <p className={`text-xs font-semibold ${accent}`}>
                    ♡ 어떻게 할까?
                  </p>

                  {chapter.choices.map((choice, idx) => {
                    const isSelected = chosenIndex === idx;
                    const lockedOther =
                      chosenIndex !== undefined && chosenIndex !== idx;
                    if (lockedOther) return null;

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={chosenIndex !== undefined}
                        onClick={() => onSelectChoice(currentChapterIndex, idx)}
                        className={`w-full text-left rounded-xl border px-3.5 py-3 text-[13px] transition-colors ${
                          isSelected
                            ? isDark
                              ? 'bg-rose-500/25 border-rose-400 text-rose-100'
                              : 'bg-[#f5e1e9] border-[#ce9eb4] text-[#765969]'
                            : isDark
                            ? 'bg-zinc-800/70 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                            : 'bg-[#fff9fb] border-[#ead5df] text-[#765969] hover:bg-[#f5e1e9]'
                        }`}
                      >
                        {isSelected ? `✓ ${choice.text}` : choice.text}
                      </button>
                    );
                  })}

                  {chosenOption && (
                    <div
                      className={`mt-2 p-3.5 rounded-xl text-[13px] leading-relaxed ${
                        isDark
                          ? 'bg-zinc-800 text-rose-100'
                          : 'bg-[#f9edf2] text-[#67545d]'
                      }`}
                    >
                      {chosenOption.result}
                    </div>
                  )}
                </div>

                {/* Prev / Next Navigation */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    disabled={currentChapterIndex === 0}
                    onClick={handlePrev}
                    className={`flex-1 py-3 rounded-xl border text-xs font-medium transition-opacity disabled:opacity-35 ${
                      isDark
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                        : 'bg-white border-[#e8ceda] text-[#98677e]'
                    }`}
                  >
                    ← 이전
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 rounded-xl bg-[#b77b96] text-white text-xs font-semibold hover:bg-[#a66c86] transition-colors"
                  >
                    {currentChapterIndex === STORY_CHAPTERS.length - 1
                      ? '오늘의 이야기 다시 보기 ↻'
                      : '다음 장면 →'}
                  </button>
                </div>
              </div>

              {/* Relationship Status Card */}
              <div className={`rounded-2xl border p-4 space-y-2.5 ${cardBg}`}>
                <p className={`text-[10px] tracking-[0.15em] ${accent}`}>
                  RELATIONSHIP STATUS
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">SAKUYA ♥</span>
                  <span className="text-base font-bold tabular-nums text-[#b87997]">
                    ♥ {affection}
                  </span>
                </div>
                <div
                  className={`h-1.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-zinc-800' : 'bg-[#e9cdd9]'
                  }`}
                >
                  <div
                    className="h-full bg-[#b87997] transition-all duration-300"
                    style={{ width: `${affection}%` }}
                  />
                </div>
                <p className={`text-[11px] ${muted}`}>
                  오늘의 선택들이 우리의 추억이 돼.
                </p>
              </div>
            </>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-3">
              <div className={`rounded-2xl border p-3.5 flex items-center gap-3 ${cardBg}`}>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <SafeImage
                    src={SAKUYA_AVATAR}
                    alt="사쿠야"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold">사쿠야</p>
                  <p className={`text-[11px] ${muted}`}>online · 너의 남자친구</p>
                </div>
                <button
                  type="button"
                  onClick={handleCallSakuya}
                  className="px-3 py-1.5 rounded-full bg-[#b77b96] text-white text-[11px] font-semibold"
                >
                  전화하기
                </button>
              </div>

              <div
                className={`rounded-2xl p-3.5 space-y-2.5 min-h-[280px] ${
                  isDark ? 'bg-zinc-900' : 'bg-[#f4edf0]'
                }`}
              >
                <div className={`text-center text-[10px] ${muted}`}>TODAY ♡</div>
                {messages.map((msg) => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[82%] px-3 py-2 rounded-xl text-[13px] leading-relaxed whitespace-pre-line ${
                          isMe
                            ? isDark
                              ? 'bg-rose-500/30 text-rose-50 rounded-tr-sm'
                              : 'bg-[#f4dce6] text-[#59434c] rounded-tr-sm'
                            : isDark
                            ? 'bg-zinc-800 text-zinc-100 rounded-tl-sm'
                            : 'bg-white text-[#59434c] rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.id}
                    type="button"
                    onClick={() => onSendMessage(qr.userText)}
                    className={`px-3 py-1.5 rounded-full border text-[11px] ${
                      isDark
                        ? 'bg-zinc-900 border-zinc-700 text-rose-200'
                        : 'bg-white border-[#e6cbd7] text-[#9d6b82]'
                    }`}
                  >
                    {qr.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="메시지를 입력해 주세요..."
                  className={`flex-1 px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-700 text-white'
                      : 'bg-white border-[#f0dce5] text-[#59434c]'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#b77b96] text-white text-xs font-semibold"
                >
                  전송
                </button>
              </form>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className={`rounded-2xl border p-4 ${cardBg}`}>
              <h3 className="text-sm font-bold mb-2">오늘의 데이트 일정 ♡</h3>
              <div className="divide-y divide-[#f0dce5] dark:divide-zinc-800">
                {STORY_CHAPTERS.map((ch, idx) => {
                  const status =
                    idx < currentChapterIndex
                      ? '✓ 완료'
                      : idx === currentChapterIndex
                      ? '● 진행 중'
                      : '예정';
                  const isLocked = idx > currentChapterIndex;
                  const isCurrent = idx === currentChapterIndex;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => handleScheduleClick(idx)}
                      className={`w-full text-left py-3 flex items-center gap-3 transition-opacity ${
                        isLocked ? 'opacity-45' : ''
                      }`}
                    >
                      <span
                        className={`w-12 text-xs tabular-nums shrink-0 ${accent}`}
                      >
                        {ch.time}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[13px] truncate ${
                            isCurrent ? 'font-bold text-[#a46b83] dark:text-rose-300' : ''
                          }`}
                        >
                          {ch.title}
                        </p>
                        <p className={`text-[10px] truncate ${muted}`}>
                          {ch.place}
                        </p>
                      </div>
                      <span className={`text-[10px] shrink-0 ${muted}`}>
                        {status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className={`rounded-2xl border p-4 space-y-3 ${cardBg}`}>
              <div>
                <h3 className="text-sm font-bold">오늘의 추억 앨범</h3>
                <p className={`text-[11px] mt-0.5 ${muted}`}>
                  함께한 순간들이 하나씩 쌓여가고 있어.
                </p>
              </div>

              {memories.length === 0 ? (
                <p className={`text-xs text-center py-8 leading-relaxed ${muted}`}>
                  아직 기록된 추억이 없어.
                  <br />
                  데이트를 진행하면서 추억을 모아 봐 ♡
                </p>
              ) : (
                <div className="space-y-2.5">
                  {memories.map((m, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl border p-3.5 ${
                        isDark
                          ? 'bg-zinc-800/70 border-zinc-700'
                          : 'bg-[#fff9fb] border-[#f0dce5]'
                      }`}
                    >
                      <p className={`text-[11px] font-bold mb-1 ${accent}`}>
                        ♡ MEMORY {String(idx + 1).padStart(2, '0')}
                      </p>
                      <p className="text-xs leading-relaxed">{m}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'gift' && (
            <div className={`rounded-2xl border p-6 text-center space-y-3 ${cardBg}`}>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f8eaf0] dark:bg-rose-500/20 flex items-center justify-center text-[#a86e87] dark:text-rose-300">
                <Gift className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold">사쿠야가 준비한 선물</h3>

              {currentChapterIndex >= 14 ? (
                <div className="space-y-2 pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>선물 공개 완료</span>
                  </div>
                  <p className="text-sm font-semibold pt-2">
                    너를 위한 작은 선물들
                  </p>
                  <p className={`text-xs leading-relaxed ${muted}`}>
                    꽃다발 · 커플 액세서리 · 특별한 선물 · 손편지
                  </p>
                </div>
              ) : (
                <p className={`text-xs leading-relaxed ${muted}`}>
                  아직 공개되지 않은 선물이 있어.
                  <br />
                  오늘의 이야기를 조금 더 진행해 봐. (15화에서 공개)
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Repertoire Bottom Navigation Bar (above iOS Home Indicator) */}
      <nav
        className={`absolute bottom-0 inset-x-0 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 px-2 border-t grid grid-cols-5 z-20 ${
          isDark
            ? 'bg-zinc-900/95 border-zinc-800'
            : 'bg-white/95 border-[#f0dce5]'
        }`}
      >
        {(
          [
            { id: 'story', label: 'STORY', icon: Heart },
            { id: 'chat', label: 'CHAT', icon: MessageCircle },
            { id: 'plan', label: 'PLAN', icon: Calendar },
            { id: 'memory', label: 'MEMORY', icon: ImageIcon },
            { id: 'gift', label: 'GIFT', icon: Sparkles },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                scrollToTop();
              }}
              className={`flex flex-col items-center gap-0.5 py-1 text-[10px] font-semibold transition-colors ${
                active
                  ? isDark
                    ? 'text-rose-300'
                    : 'text-[#a96d86]'
                  : muted
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modal */}
      {modalState && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
          <div
            className={`w-full max-w-[320px] rounded-3xl p-6 text-center space-y-3 shadow-2xl ${
              isDark ? 'bg-zinc-900 text-white' : 'bg-[#fff8fb] text-[#59434c]'
            }`}
          >
            <Heart className="w-8 h-8 mx-auto text-[#b77b96] fill-[#b77b96]" />
            <h2 className="text-base font-bold">{modalState.title}</h2>
            <p className="text-xs leading-relaxed whitespace-pre-line opacity-90">
              {modalState.text}
            </p>
            <button
              type="button"
              onClick={() => setModalState(null)}
              className="mt-2 px-6 py-2.5 rounded-xl bg-[#b77b96] text-white text-xs font-semibold hover:bg-[#a66c86] transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
