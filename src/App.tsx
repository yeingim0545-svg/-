/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import {
  AppId,
  ChatMessage,
  IconStyle,
  LockClockStyle,
  LockNotification,
  NoteItem,
  PhotoMemory,
  ScreenState,
} from './types/ios';
import {
  INITIAL_MESSAGES,
  INITIAL_NOTES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PHOTOS,
  MUSIC_TRACKS,
  SAKUYA_AUTO_CHAT_MSGS,
  SAKUYA_RANDOM_REPLIES,
  STORY_CHAPTERS,
  WALLPAPERS,
} from './data/sakuyaDateData';
import { IPhoneFrame } from './components/IPhoneFrame';
import { LockScreen } from './components/LockScreen';
import { HomeScreen } from './components/HomeScreen';
import { StoryPlayerScreen } from './components/StoryPlayerScreen';
import { ControlCenter } from './components/ControlCenter';
import { SpotlightSearch } from './components/SpotlightSearch';
import { SettingsApp } from './components/apps/SettingsApp';
import { MessagesApp } from './components/apps/MessagesApp';
import { PhotosApp } from './components/apps/PhotosApp';
import { CalendarApp } from './components/apps/CalendarApp';
import { MusicApp } from './components/apps/MusicApp';
import { NotesApp } from './components/apps/NotesApp';
import { MapsApp } from './components/apps/MapsApp';
import { CameraApp } from './components/apps/CameraApp';

const STORAGE_KEY = 'sakuyaBirthdayOS_v1';

interface SavedRepertoireState {
  currentChapterIndex: number;
  affection: number;
  memories: string[];
  choicesMade: Record<number, number>;
  messages: ChatMessage[];
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

export default function App() {
  const initialSaved = loadSavedRepertoire();

  // Core iOS 27 OS State (Starts on Lock Screen)
  const [screen, setScreen] = useState<ScreenState>('lock');
  const [activeApp, setActiveApp] = useState<AppId>('pota');
  const [isDark, setIsDark] = useState(false);
  const [iconStyle, setIconStyle] = useState<IconStyle>('default');
  const [clockStyle, setClockStyle] = useState<LockClockStyle>('glass');
  const [wallpaperId, setWallpaperId] = useState<string>(WALLPAPERS[0].id);

  // Control Center & System Toggles
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(72);
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [focusModeOn, setFocusModeOn] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);

  const [userNickname, setUserNickname] = useState('지유');

  // Repertoire State (22 Chapters)
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
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialSaved.messages && initialSaved.messages.length > 0
      ? initialSaved.messages
      : INITIAL_MESSAGES,
  );

  // Notifications & Banner Toast
  const [notifications, setNotifications] = useState<LockNotification[]>(
    INITIAL_NOTIFICATIONS,
  );
  const [bannerToast, setBannerToast] = useState<{
    title: string;
    body: string;
    appId: AppId;
  } | null>(null);

  const [unreadMessages, setUnreadMessages] = useState<number>(1);
  const [photos, setPhotos] = useState<PhotoMemory[]>(INITIAL_PHOTOS);
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  const audioTimerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const wallpaper =
    WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS[0];

  const currentChapter =
    STORY_CHAPTERS[currentChapterIndex] || STORY_CHAPTERS[0];
  const currentTime = currentChapter.time;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Persist story progression to localStorage
  useEffect(() => {
    try {
      const payload: SavedRepertoireState = {
        currentChapterIndex,
        affection,
        memories,
        choicesMade,
        messages,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [currentChapterIndex, affection, memories, choicesMade, messages]);

  // Gentle synthesized Web Audio chime loop when Apple Music is playing
  useEffect(() => {
    if (!isPlayingMusic) {
      if (audioTimerRef.current) {
        window.clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
      return;
    }

    const playChordNote = (freq: number) => {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          void ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        const volLevel = Math.max(0.005, (volume / 100) * 0.045);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(volLevel, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.15);
      } catch {
        // Ignore browser audio restriction errors cleanly
      }
    };

    const notesSeq = MUSIC_TRACKS[currentTrackIndex].notes;
    let step = 0;
    playChordNote(notesSeq[0]);
    audioTimerRef.current = window.setInterval(() => {
      step = (step + 1) % notesSeq.length;
      playChordNote(notesSeq[step]);
    }, 850);

    return () => {
      if (audioTimerRef.current) {
        window.clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
    };
  }, [isPlayingMusic, currentTrackIndex, volume]);

  const handleOpenApp = (appId: AppId) => {
    setControlCenterOpen(false);
    setSpotlightOpen(false);
    if (appId === 'pota') {
      setScreen('story');
      return;
    }
    setActiveApp(appId);
    setScreen('app');
    if (appId === 'messages') {
      setUnreadMessages(0);
    }
  };

  const handleUnlock = (targetApp?: AppId) => {
    if (targetApp && targetApp !== 'pota') {
      handleOpenApp(targetApp);
    } else {
      setScreen('story');
    }
  };

  const handlePressPower = () => {
    setControlCenterOpen(false);
    setSpotlightOpen(false);
    if (screen === 'lock') {
      setScreen('story');
    } else {
      setScreen('lock');
    }
  };

  const showToast = (title: string, body: string, appId: AppId) => {
    setBannerToast({ title, body, appId });
    window.setTimeout(() => {
      setBannerToast((prev) => (prev?.body === body ? null : prev));
    }, 4200);
  };

  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text,
      time: currentTime,
    };
    setMessages((prev) => [...prev, newMsg]);

    window.setTimeout(() => {
      const reply =
        SAKUYA_RANDOM_REPLIES[
          Math.floor(Math.random() * SAKUYA_RANDOM_REPLIES.length)
        ];
      const replyMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'sakuya',
        text: reply,
        time: currentTime,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 650);
  };

  const handleSelectChoice = (chapterIndex: number, choiceIndex: number) => {
    if (choicesMade[chapterIndex] !== undefined) return;
    const ch = STORY_CHAPTERS[chapterIndex];
    const choice = ch.choices[choiceIndex];
    if (!ch || !choice) return;

    setChoicesMade((prev) => ({ ...prev, [chapterIndex]: choiceIndex }));
    setAffection((prev) => Math.min(100, Math.max(0, prev + choice.affectionDelta)));
    setMemories((prev) => (prev.includes(ch.memory) ? prev : [...prev, ch.memory]));
  };

  const handleNextChapter = (): boolean => {
    if (currentChapterIndex >= STORY_CHAPTERS.length - 1) {
      return false;
    }
    const nextIdx = currentChapterIndex + 1;
    setCurrentChapterIndex(nextIdx);

    const autoText =
      SAKUYA_AUTO_CHAT_MSGS[
        Math.min(Math.max(nextIdx - 1, 0), SAKUYA_AUTO_CHAT_MSGS.length - 1)
      ];
    const nextTime = STORY_CHAPTERS[nextIdx].time;
    const msg: ChatMessage = {
      id: `m-auto-${Date.now()}`,
      sender: 'sakuya',
      text: autoText,
      time: nextTime,
    };
    setMessages((prev) => [...prev, msg]);
    setUnreadMessages((c) => c + 1);
    showToast('사쿠야 ♡', autoText, 'messages');
    return true;
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((i) => i - 1);
    }
  };

  const handleResetStory = () => {
    setCurrentChapterIndex(0);
    setAffection(50);
    setMemories([]);
    setChoicesMade({});
    setMessages(INITIAL_MESSAGES);
    setUnreadMessages(1);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleCapturePhoto = (
    title: string,
    imageUrl: string,
    filterClass: string,
  ) => {
    const newPhoto: PhotoMemory = {
      id: `p-${Date.now()}`,
      title,
      location: currentChapter.place,
      time: currentTime,
      caption: `${userNickname}와 사쿠야가 직접 남긴 생일 기념 컷 📸`,
      imageUrl,
      liked: true,
      filterClass,
    };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleTriggerPing = () => {
    const pingText = '빨리 보고 싶다 ♡ 오늘 하루는 내가 다 예약했으니까 기대해.';
    const newNotif: LockNotification = {
      id: `n-${Date.now()}`,
      appId: 'messages',
      appName: '메시지',
      title: '사쿠야 ♡',
      body: pingText,
      time: currentTime,
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 3)]);
    if (screen !== 'lock') {
      showToast('사쿠야 ♡', pingText, 'messages');
    }
  };

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'settings':
        return (
          <SettingsApp
            isDark={isDark}
            brightness={brightness}
            iconStyle={iconStyle}
            wallpaper={wallpaper}
            clockStyle={clockStyle}
            userNickname={userNickname}
            onBackHome={() => setScreen('home')}
            onToggleDark={setIsDark}
            onChangeBrightness={setBrightness}
            onChangeIconStyle={setIconStyle}
            onSelectWallpaper={setWallpaperId}
            onSelectClockStyle={setClockStyle}
            onChangeNickname={setUserNickname}
            onTriggerTestNotification={handleTriggerPing}
            onLockPhone={() => setScreen('lock')}
            onResetStory={handleResetStory}
          />
        );
      case 'pota':
        return null;
      case 'messages':
        return (
          <MessagesApp
            isDark={isDark}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBackHome={() => setScreen('home')}
          />
        );
      case 'photos':
        return (
          <PhotosApp
            isDark={isDark}
            photos={photos}
            onToggleLike={(id) =>
              setPhotos((prev) =>
                prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)),
              )
            }
            onSetWallpaper={(url) => {
              const found = WALLPAPERS.find((w) => w.imageUrl === url);
              if (found) setWallpaperId(found.id);
            }}
            onBackHome={() => setScreen('home')}
          />
        );
      case 'calendar':
        return (
          <CalendarApp
            isDark={isDark}
            currentChapterIndex={currentChapterIndex}
            onBackHome={() => setScreen('home')}
            onOpenChapter={(idx) => {
              setCurrentChapterIndex(idx);
              handleOpenApp('pota');
            }}
          />
        );
      case 'music':
        return (
          <MusicApp
            isDark={isDark}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlayingMusic}
            onSelectTrack={(idx) => {
              setCurrentTrackIndex(idx);
              setIsPlayingMusic(true);
            }}
            onTogglePlay={() => setIsPlayingMusic((p) => !p)}
            onNextTrack={() =>
              setCurrentTrackIndex((i) => (i + 1) % MUSIC_TRACKS.length)
            }
            onPrevTrack={() =>
              setCurrentTrackIndex(
                (i) => (i - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length,
              )
            }
            onBackHome={() => setScreen('home')}
          />
        );
      case 'notes':
        return (
          <NotesApp
            isDark={isDark}
            notes={notes}
            onAddNote={(title, content) =>
              setNotes((prev) => [
                {
                  id: `n-${Date.now()}`,
                  title,
                  content,
                  updatedAt: `오늘 ${currentTime}`,
                },
                ...prev,
              ])
            }
            onUpdateNote={(id, content) =>
              setNotes((prev) =>
                prev.map((n) => (n.id === id ? { ...n, content } : n)),
              )
            }
            onBackHome={() => setScreen('home')}
          />
        );
      case 'maps':
        return (
          <MapsApp
            isDark={isDark}
            onBackHome={() => setScreen('home')}
            onOpenChapter={(idx) => {
              setCurrentChapterIndex(idx);
              handleOpenApp('pota');
            }}
          />
        );
      case 'camera':
        return (
          <CameraApp
            onCapturePhoto={handleCapturePhoto}
            onOpenPhotos={() => handleOpenApp('photos')}
            onBackHome={() => setScreen('home')}
          />
        );
    }
  };

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden overscroll-none bg-[#16171a] flex items-center justify-center">
      <IPhoneFrame
        screen={screen}
        currentTime={currentTime}
        wallpaper={wallpaper}
        isDark={isDark}
        brightness={brightness}
        flashlightOn={flashlightOn}
        wifiOn={wifiOn}
        isPlayingMusic={isPlayingMusic}
        currentTrackIndex={currentTrackIndex}
        bannerToast={bannerToast}
        onPressPower={handlePressPower}
        onOpenControlCenter={() => setControlCenterOpen(true)}
        onGoHome={() => setScreen('home')}
        onGoStory={() => setScreen('story')}
        onToggleMusic={() => setIsPlayingMusic((p) => !p)}
        onOpenApp={handleOpenApp}
        onDismissBanner={() => setBannerToast(null)}
      >
        {screen === 'lock' && (
          <LockScreen
            currentTime={currentTime}
            wallpaper={wallpaper}
            clockStyle={clockStyle}
            notifications={notifications}
            flashlightOn={flashlightOn}
            onToggleFlashlight={() => setFlashlightOn((f) => !f)}
            onUnlock={handleUnlock}
            onClearNotifications={() => setNotifications([])}
            onSelectWallpaper={setWallpaperId}
            onSelectClockStyle={setClockStyle}
          />
        )}

        {screen === 'story' && (
          <StoryPlayerScreen
            currentChapterIndex={currentChapterIndex}
            choicesMade={choicesMade}
            affection={affection}
            onSelectChoice={handleSelectChoice}
            onNextChapter={handleNextChapter}
            onRestartStory={handleResetStory}
          />
        )}

        {screen === 'home' && (
          <HomeScreen
            isDark={isDark}
            iconStyle={iconStyle}
            unreadMessageCount={unreadMessages}
            featuredPhoto={photos[0]}
            currentTrackIndex={currentTrackIndex}
            isPlayingMusic={isPlayingMusic}
            currentChapterIndex={currentChapterIndex}
            affection={affection}
            onOpenApp={handleOpenApp}
            onOpenSpotlight={() => setSpotlightOpen(true)}
            onToggleMusic={() => setIsPlayingMusic((p) => !p)}
          />
        )}

        {screen === 'app' && renderActiveApp()}

        <ControlCenter
          isOpen={controlCenterOpen}
          isDark={isDark}
          brightness={brightness}
          volume={volume}
          wifiOn={wifiOn}
          bluetoothOn={bluetoothOn}
          focusModeOn={focusModeOn}
          flashlightOn={flashlightOn}
          isPlayingMusic={isPlayingMusic}
          currentTrackIndex={currentTrackIndex}
          onClose={() => setControlCenterOpen(false)}
          onToggleDark={() => setIsDark((d) => !d)}
          onChangeBrightness={setBrightness}
          onChangeVolume={setVolume}
          onToggleWifi={() => setWifiOn((w) => !w)}
          onToggleBluetooth={() => setBluetoothOn((b) => !b)}
          onToggleFocusMode={() => setFocusModeOn((f) => !f)}
          onToggleFlashlight={() => setFlashlightOn((f) => !f)}
          onToggleMusic={() => setIsPlayingMusic((p) => !p)}
          onNextTrack={() =>
            setCurrentTrackIndex((i) => (i + 1) % MUSIC_TRACKS.length)
          }
          onLockPhone={() => setScreen('lock')}
          onOpenApp={handleOpenApp}
        />

        <SpotlightSearch
          isOpen={spotlightOpen}
          iconStyle={iconStyle}
          onClose={() => setSpotlightOpen(false)}
          onOpenApp={handleOpenApp}
        />
      </IPhoneFrame>
    </main>
  );
}
