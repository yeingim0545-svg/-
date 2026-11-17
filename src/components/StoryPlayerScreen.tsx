import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { STORY_CHAPTERS, SAKUYA_PHOTOS } from '../data/sakuyaDateData';
import { SafeImage } from './SafeImage';
import { CallSceneBanner, MessagesSceneBanner } from './StorySceneBanner';

interface StoryPlayerScreenProps {
  currentChapterIndex: number;
  choicesMade: Record<number, number>;
  affection: number;
  onSelectChoice: (chapterIndex: number, choiceIndex: number) => void;
  onNextChapter: () => boolean;
  onPreviousChapter: () => void;
}

type Phase = 'narration' | 'choice' | 'reaction';

export const StoryPlayerScreen: React.FC<StoryPlayerScreenProps> = ({
  currentChapterIndex,
  choicesMade,
  affection,
  onSelectChoice,
  onNextChapter,
  onPreviousChapter,
}) => {
  const chapter = STORY_CHAPTERS[currentChapterIndex] || STORY_CHAPTERS[0];
  const slides = chapter.slides;

  const [slideIndex, setSlideIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [phase, setPhase] = useState<Phase>('narration');
  // 마지막 챕터 마지막 장면을 다 읽은 뒤의 엔딩 상태 — 처음으로 되돌아가지 않는다
  const [ended, setEnded] = useState(false);

  // '이전'으로 되돌아온 장면은 타자 효과 없이 전문을 보여준다 (장면 키로 기억)
  const instantScenesRef = useRef<Set<string>>(new Set());
  // '이전'으로 앞 챕터에 들어갈 때는 그 챕터의 마지막 장면에서 시작한다
  const jumpToLastSlideRef = useRef(false);

  const chosenIndex = choicesMade[currentChapterIndex];
  const chosenOption =
    chosenIndex !== undefined ? chapter.choices[chosenIndex] : undefined;

  // 챕터가 바뀌면 장면 위치·단계를 초기화한다
  useEffect(() => {
    const lastIndex = Math.max(
      0,
      (STORY_CHAPTERS[currentChapterIndex]?.slides.length ?? 1) - 1,
    );
    if (jumpToLastSlideRef.current) {
      jumpToLastSlideRef.current = false;
      setSlideIndex(lastIndex);
    } else {
      setSlideIndex(0);
    }
    setPhase('narration');
    setEnded(false);
  }, [currentChapterIndex]);

  const currentSlide = slides[slideIndex] || slides[0];
  const targetText =
    phase === 'reaction' && chosenOption
      ? chosenOption.result
      : currentSlide.text;
  const sceneKey = `${currentChapterIndex}-${slideIndex}-${phase}`;

  const isTypingDone =
    phase === 'choice' || ended || displayedChars >= targetText.length;

  useEffect(() => {
    if (instantScenesRef.current.has(sceneKey)) {
      instantScenesRef.current.delete(sceneKey);
      setDisplayedChars(targetText.length);
      return;
    }
    setDisplayedChars(0);
    // sceneKey가 바꾸는 장면을 식별한다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey, targetText]);

  useEffect(() => {
    if (phase === 'choice' || ended || displayedChars >= targetText.length) {
      return;
    }
    const timer = window.setTimeout(() => {
      setDisplayedChars((c) => c + 1);
    }, 26);
    return () => window.clearTimeout(timer);
  }, [displayedChars, targetText, phase, ended]);

  const handleNext = () => {
    if (!isTypingDone || phase === 'choice' || ended) return;

    if (phase === 'narration') {
      if (slideIndex < slides.length - 1) {
        setSlideIndex((i) => i + 1);
        return;
      }
      // 챕터의 마지막 장면
      if (chosenIndex !== undefined) {
        if (currentChapterIndex < STORY_CHAPTERS.length - 1) {
          onNextChapter();
        } else {
          setEnded(true);
        }
      } else {
        setPhase('choice');
      }
      return;
    }

    if (phase === 'reaction') {
      if (currentChapterIndex < STORY_CHAPTERS.length - 1) {
        onNextChapter();
      } else {
        setEnded(true);
      }
    }
  };

  const canGoPrevious =
    ended ||
    phase !== 'narration' ||
    slideIndex > 0 ||
    currentChapterIndex > 0;

  const handlePrevious = () => {
    if (!canGoPrevious) return;
    if (ended) {
      setEnded(false);
      return;
    }
    if (phase === 'reaction') {
      instantScenesRef.current.add(`${currentChapterIndex}-${slideIndex}-choice`);
      setPhase('choice');
      return;
    }
    if (phase === 'choice') {
      instantScenesRef.current.add(
        `${currentChapterIndex}-${slideIndex}-narration`,
      );
      setPhase('narration');
      return;
    }
    if (slideIndex > 0) {
      instantScenesRef.current.add(
        `${currentChapterIndex}-${slideIndex - 1}-narration`,
      );
      setSlideIndex((i) => i - 1);
      return;
    }
    if (currentChapterIndex > 0) {
      const previousChapter = STORY_CHAPTERS[currentChapterIndex - 1];
      const lastSlideIndex = Math.max(
        0,
        (previousChapter?.slides.length ?? 1) - 1,
      );
      instantScenesRef.current.add(
        `${currentChapterIndex - 1}-${lastSlideIndex}-narration`,
      );
      jumpToLastSlideRef.current = true;
      onPreviousChapter();
    }
  };

  const handlePickChoice = (idx: number) => {
    onSelectChoice(currentChapterIndex, idx);
    setDisplayedChars(0);
    setPhase('reaction');
  };

  const visibleText = targetText.slice(0, displayedChars);
  // 선택 결과 화면에서는 고른 선택지에 지정된 사진이 우선한다
  const reactionImage =
    phase === 'reaction' && chosenIndex !== undefined
      ? chapter.choiceImages?.[chosenIndex]
      : undefined;
  const activeImage =
    reactionImage || currentSlide.image || chapter.coverImage;
  // 영상 장면: slideVideos가 있으면 지정된 장면에서만 영상이 나오고,
  // 없을 때만 챕터 영상(video)이 모든 장면에 적용된다.
  const activeVideo =
    currentSlide.video ??
    chapter.slideVideos?.[slideIndex] ??
    (chapter.slideVideos ? undefined : chapter.video);

  const isLastChapter = currentChapterIndex === STORY_CHAPTERS.length - 1;  const nextLabel =
    phase === 'reaction' || slideIndex === slides.length - 1
      ? isLastChapter
        ? '마지막'
        : '다음 일정'
      : '다음';

  return (
    <div className="relative h-full w-full bg-[#16171a] text-[#f4f4f6] flex flex-col justify-between pt-[calc(env(safe-area-inset-top)+52px)] pb-8 overflow-hidden select-none">
      {/* 사진 뒤 은은한 빛 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <SafeImage
          src={activeImage}
          alt=""
          className="w-full h-full object-cover blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16171a]/70 via-[#16171a]/65 to-[#16171a]" />
      </div>

      {/* 상단 정보 + 사진 */}
      <div className="relative z-10 px-5 pt-1 flex flex-col shrink-0">
        <div className="flex items-center justify-between text-[11px] text-white/55 mb-2 px-0.5">
          <span className="truncate pr-2">
            CHAPTER {String(currentChapterIndex + 1).padStart(2, '0')} ·{' '}
            {chapter.place}
          </span>
          <span className="tabular-nums flex items-center gap-1 text-rose-300/85 shrink-0">
            <Heart className="w-3 h-3 fill-current" />
            {affection}
          </span>
        </div>

        <div className="w-full max-w-[430px] mx-auto h-[36dvh] min-h-[210px] max-h-[340px] rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.55)] border border-white/10 bg-black">
          {currentSlide.scene?.overlay === 'call' ? (
            <CallSceneBanner profileImage={SAKUYA_PHOTOS.callProfile} />
          ) : currentSlide.scene?.overlay === 'messages' ? (
            <MessagesSceneBanner messages={currentSlide.scene.messages} />
          ) : activeVideo ? (
            <video
              key={`${currentChapterIndex}-${slideIndex}-${activeVideo}`}
              src={activeVideo}
              poster={activeImage}
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              className="w-full h-full object-cover sm:object-contain"
            />
          ) : (
            <SafeImage
              src={activeImage}
              alt={chapter.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* 본문 (박스 없는 자막 · 선택지 · 엔딩) */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col px-6 pt-4 pb-1">
        {ended ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2.5">
            <span className="text-[10px] font-semibold tracking-[0.32em] text-rose-200/70">
              THE END
            </span>
            <p className="font-story text-[19px] leading-relaxed text-white/95">
              오늘의 생일 기록 완료 ♡
            </p>
            <p className="font-story text-[12.5px] leading-[1.8] text-white/50">
              11월 18일, 사쿠야와의 하루가 여기서 끝났어.
              <br />
              이 화면에 그대로 머물러도 괜찮아.
            </p>
          </div>
        ) : phase === 'choice' ? (
          <div className="flex-1 flex flex-col justify-center space-y-2.5 animate-in fade-in duration-200">
            <p className="text-[12px] text-rose-200/90 font-medium mb-1">
              ♡ 어떻게 할까?
            </p>
            {chapter.choices.map((ch, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePickChoice(idx)}
                className="w-full text-left py-2.5 px-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] active:scale-[0.99] border border-white/15 text-[13.5px] leading-snug text-white/95 backdrop-blur-md transition-all"
              >
                {ch.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <p className="font-story text-[15px] leading-[1.78] tracking-[-0.01em] text-white/95 whitespace-pre-line break-keep drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
              {visibleText}
            </p>
          </div>
        )}

        {/* 하단 이동: < 이전 · 진행도 · 다음 > */}
        <div className="flex items-center justify-between gap-2 pt-3 shrink-0">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            aria-label="이전 장면으로"
            className={`flex items-center gap-1 pl-2.5 pr-3.5 py-2 rounded-full border text-[12.5px] font-medium transition-all active:scale-[0.97] ${
              canGoPrevious
                ? 'bg-white/[0.09] border-white/15 text-white/85 hover:bg-white/[0.15]'
                : 'bg-white/[0.03] border-white/5 text-white/20'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>이전</span>
          </button>

          <span className="text-[11px] text-white/35 tabular-nums">
            {currentChapterIndex + 1} / {STORY_CHAPTERS.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isTypingDone || phase === 'choice' || ended}
            aria-label="다음 장면으로"
            className={`flex items-center gap-1 pl-3.5 pr-2.5 py-2 rounded-full border text-[12.5px] font-medium transition-all active:scale-[0.97] ${
              isTypingDone && phase !== 'choice' && !ended
                ? 'bg-white/[0.12] border-white/20 text-white/95 hover:bg-white/[0.18]'
                : 'bg-white/[0.03] border-white/5 text-white/20'
            }`}
          >
            <span>{ended ? '완료' : nextLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
