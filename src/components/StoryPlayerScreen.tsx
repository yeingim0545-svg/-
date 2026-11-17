import React, { useEffect, useState } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import { STORY_CHAPTERS } from '../data/sakuyaDateData';
import { SafeImage } from './SafeImage';

interface StoryPlayerScreenProps {
  currentChapterIndex: number;
  choicesMade: Record<number, number>;
  affection: number;
  onSelectChoice: (chapterIndex: number, choiceIndex: number) => void;
  onNextChapter: () => boolean;
  onRestartStory: () => void;
}

export const StoryPlayerScreen: React.FC<StoryPlayerScreenProps> = ({
  currentChapterIndex,
  choicesMade,
  affection,
  onSelectChoice,
  onNextChapter,
  onRestartStory,
}) => {
  const chapter = STORY_CHAPTERS[currentChapterIndex] || STORY_CHAPTERS[0];
  const slides = chapter.slides;

  const [slideIndex, setSlideIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [phase, setPhase] = useState<'narration' | 'choice' | 'reaction'>('narration');

  const chosenIndex = choicesMade[currentChapterIndex];
  const chosenOption =
    chosenIndex !== undefined ? chapter.choices[chosenIndex] : undefined;

  // Reset slide & phase whenever chapter changes
  useEffect(() => {
    setSlideIndex(0);
    setDisplayedChars(0);
    setPhase('narration');
  }, [currentChapterIndex]);

  const currentSlide = slides[slideIndex] || slides[0];
  const targetText =
    phase === 'reaction' && chosenOption
      ? chosenOption.result
      : currentSlide.text;

  const isTypingDone = phase === 'choice' || displayedChars >= targetText.length;

  // Character-by-character typewriter effect (narration & reaction phases only)
  useEffect(() => {
    if (phase === 'choice') return;
    setDisplayedChars(0);
  }, [slideIndex, phase, currentChapterIndex, targetText]);

  useEffect(() => {
    if (phase === 'choice' || displayedChars >= targetText.length) return;
    const timer = window.setTimeout(() => {
      setDisplayedChars((c) => c + 1);
    }, 26);
    return () => window.clearTimeout(timer);
  }, [displayedChars, targetText, phase]);

  const handleBottomRightTap = () => {
    // Strictly ignore taps while text is still appearing
    if (!isTypingDone) return;

    if (phase === 'narration') {
      if (slideIndex < slides.length - 1) {
        setSlideIndex((i) => i + 1);
        return;
      }
      // Last slide of chapter reached
      if (chosenIndex !== undefined) {
        if (currentChapterIndex < STORY_CHAPTERS.length - 1) {
          onNextChapter();
        } else {
          onRestartStory();
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
        onRestartStory();
      }
    }
  };

  const handlePickChoice = (idx: number) => {
    onSelectChoice(currentChapterIndex, idx);
    setDisplayedChars(0);
    setPhase('reaction');
  };

  const visibleText = targetText.slice(0, displayedChars);
  const activeImage = currentSlide.image || chapter.coverImage;

  return (
    <div className="relative h-full w-full bg-[#16171a] text-[#f4f4f6] flex flex-col justify-between pt-14 pb-8 overflow-hidden select-none">
      {/* Subtle Ambient Glass Glow behind Photo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <SafeImage
          src={activeImage}
          alt=""
          className="w-full h-full object-cover blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16171a]/70 via-[#16171a]/65 to-[#16171a]" />
      </div>

      {/* Upper-Middle Photo Area (spaced from both sides, pushed cleanly up) */}
      <div className="relative z-10 px-5 pt-1 flex flex-col shrink-0">
        <div className="flex items-center justify-between text-[11px] text-white/55 mb-2 px-0.5">
          <span className="truncate pr-2">
            CHAPTER {String(currentChapterIndex + 1).padStart(2, '0')} · {chapter.place}
          </span>
          <span className="tabular-nums flex items-center gap-1 text-rose-300/85 shrink-0">
            <Heart className="w-3 h-3 fill-current" />
            {affection}
          </span>
        </div>

        <div className="w-full h-[39dvh] min-h-[220px] max-h-[360px] rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.55)] border border-white/10">
          <SafeImage
            src={activeImage}
            alt={chapter.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Unboxed Subtitle Area (NO box/border, character-by-character) */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-between px-6 pt-4 pb-1">
        {phase === 'choice' ? (
          <div className="space-y-2.5 my-auto animate-in fade-in duration-200">
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
          <div className="pt-1 overflow-y-auto no-scrollbar">
            <p className="font-story text-[15px] leading-[1.78] tracking-[-0.01em] text-white/95 whitespace-pre-line break-keep drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
              {visibleText}
            </p>
          </div>
        )}

        {/* Quiet Bottom-Right Next Indicator (visible ONLY when typing finishes) */}
        <div className="flex items-center justify-between pt-2 min-h-[28px] shrink-0">
          <span className="text-[11px] text-white/35 tabular-nums">
            {currentChapterIndex + 1} / {STORY_CHAPTERS.length}
          </span>

          {isTypingDone && phase !== 'choice' && (
            <span className="flex items-center gap-0.5 text-[12px] font-medium text-white/75 animate-in fade-in duration-200">
              <span>
                {phase === 'reaction' || slideIndex === slides.length - 1
                  ? currentChapterIndex === STORY_CHAPTERS.length - 1
                    ? '처음으로'
                    : '다음 일정'
                  : '다음'}
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* Bottom-Right Invisible Touch Zone (only active after typing finishes) */}
      {phase !== 'choice' && (
        <button
          type="button"
          onClick={handleBottomRightTap}
          disabled={!isTypingDone}
          aria-label="오른쪽 아래를 터치해 다음 장면으로 이동"
          className={`absolute bottom-6 right-0 w-[58%] h-[38%] z-20 focus:outline-none ${
            isTypingDone ? 'cursor-pointer' : 'cursor-default pointer-events-none'
          }`}
        />
      )}
    </div>
  );
};
