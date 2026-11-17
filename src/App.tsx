/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ScreenState } from './types/ios';
import { STORY_CHAPTERS, WALLPAPERS } from './data/sakuyaDateData';
import { IPhoneFrame } from './components/IPhoneFrame';
import { LockScreen } from './components/LockScreen';
import { StoryPlayerScreen } from './components/StoryPlayerScreen';

const STORAGE_KEY = 'sakuyaBirthdayOS_v1';

interface SavedRepertoireState {
  currentChapterIndex: number;
  affection: number;
  memories: string[];
  choicesMade: Record<number, number>;
}

function loadSavedRepertoire(): Partial<SavedRepertoireState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<SavedRepertoireState>;
  } catch {
    return {};
  }
}

/**
 * 11월 18일 사쿠야 생일 포타 — 잠금화면과 이야기 진행 화면만 존재하는 전용 앱.
 * 다른 화면(홈·앱·제어 센터·알림 배너)으로 이동하는 경로는 모두 제거되어 있다.
 */
export default function App() {
  const initialSaved = loadSavedRepertoire();

  const [screen, setScreen] = useState<ScreenState>('lock');
  const [flashlightOn, setFlashlightOn] = useState(false);

  // 22개 챕터 진행 상태
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(() =>
    Math.min(
      Math.max(initialSaved.currentChapterIndex ?? 0, 0),
      STORY_CHAPTERS.length - 1,
    ),
  );
  const [affection, setAffection] = useState<number>(
    initialSaved.affection ?? 50,
  );
  const [memories, setMemories] = useState<string[]>(
    initialSaved.memories ?? [],
  );
  const [choicesMade, setChoicesMade] = useState<Record<number, number>>(
    initialSaved.choicesMade ?? {},
  );

  const wallpaper = WALLPAPERS[0];
  const currentChapter =
    STORY_CHAPTERS[currentChapterIndex] || STORY_CHAPTERS[0];
  const currentTime = currentChapter.time;

  // 이야기 진행 상황만 저장한다 (다시 열어도 읽던 곳에서 이어진다)
  useEffect(() => {
    try {
      const payload: SavedRepertoireState = {
        currentChapterIndex,
        affection,
        memories,
        choicesMade,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // 저장 공간 오류는 조용히 무시한다
    }
  }, [currentChapterIndex, affection, memories, choicesMade]);

  const handleSelectChoice = (chapterIndex: number, choiceIndex: number) => {
    if (choicesMade[chapterIndex] !== undefined) return;
    const ch = STORY_CHAPTERS[chapterIndex];
    const choice = ch?.choices[choiceIndex];
    if (!ch || !choice) return;

    setChoicesMade((prev) => ({ ...prev, [chapterIndex]: choiceIndex }));
    setAffection((prev) =>
      Math.min(100, Math.max(0, prev + choice.affectionDelta)),
    );
    setMemories((prev) =>
      prev.includes(ch.memory) ? prev : [...prev, ch.memory],
    );
  };

  const handleNextChapter = (): boolean => {
    if (currentChapterIndex >= STORY_CHAPTERS.length - 1) {
      return false;
    }
    setCurrentChapterIndex((i) => Math.min(i + 1, STORY_CHAPTERS.length - 1));
    return true;
  };

  const handlePreviousChapter = () => {
    setCurrentChapterIndex((i) => Math.max(0, i - 1));
  };

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden overscroll-none bg-black flex items-center justify-center">
      <IPhoneFrame
        screen={screen}
        wallpaper={wallpaper}
        flashlightOn={flashlightOn}
      >
        {screen === 'lock' ? (
          <LockScreen
            currentTime={currentTime}
            flashlightOn={flashlightOn}
            onToggleFlashlight={() => setFlashlightOn((f) => !f)}
            onUnlock={() => {
              setFlashlightOn(false);
              setScreen('story');
            }}
          />
        ) : (
          <StoryPlayerScreen
            currentChapterIndex={currentChapterIndex}
            choicesMade={choicesMade}
            affection={affection}
            onSelectChoice={handleSelectChoice}
            onNextChapter={handleNextChapter}
            onPreviousChapter={handlePreviousChapter}
          />
        )}
      </IPhoneFrame>
    </main>
  );
}
