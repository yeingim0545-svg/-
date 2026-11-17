export type ScreenState = 'lock' | 'story' | 'home' | 'app';

export type AppId =
  | 'pota'
  | 'messages'
  | 'photos'
  | 'settings'
  | 'calendar'
  | 'music'
  | 'notes'
  | 'maps'
  | 'camera';

export type IconStyle = 'default' | 'dark' | 'tinted-glass';

export type LockClockStyle = 'glass' | 'solid' | 'editorial';

export interface WallpaperItem {
  id: string;
  name: string;
  subtitle: string;
  imageUrl?: string;
  gradientClass: string;
  isDarkBg: boolean;
}

export interface LockNotification {
  id: string;
  appId: AppId;
  appName: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'sakuya' | 'me';
  text: string;
  time: string;
  photoUrl?: string;
  reaction?: string;
}

export interface QuickReplyOption {
  id: string;
  label: string;
  userText: string;
}

export interface StoryChoice {
  text: string;
  result: string;
  affectionDelta: number;
}

export interface StorySlide {
  text: string;
  image?: string;
  /** 동영상(.mp4) 장면. 지정되면 이미지 대신 <video>로 재생된다. */
  video?: string;
}

export interface StoryChapter {
  id: number;
  time: string;
  label: string;
  tag: string;
  title: string;
  place: string;
  coverImage: string;
  /** 챕터 전체를 움직이는 장면으로 보여줄 동영상(.mp4). coverImage는 포스터로 쓰인다. */
  video?: string;
  slides: StorySlide[];
  story: string;
  choices: StoryChoice[];
  memory: string;
}

export interface PhotoMemory {
  id: string;
  title: string;
  location: string;
  time: string;
  caption: string;
  imageUrl: string;
  liked: boolean;
  filterClass?: string;
}

export interface DateEvent {
  id: string;
  time: string;
  title: string;
  place: string;
  color: string;
  chapterIndex: number;
  note: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationSec: number;
  coverImage: string;
  notes: number[];
}

export interface NoteItem {
  id: string;
  title: string;
  updatedAt: string;
  content: string;
  pinned?: boolean;
}
