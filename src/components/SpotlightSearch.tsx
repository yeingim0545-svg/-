import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { AppId, IconStyle } from '../types/ios';
import { IosAppIcon } from './IosAppIcon';

interface SpotlightSearchProps {
  isOpen: boolean;
  iconStyle: IconStyle;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
}

const SEARCHABLE_ITEMS: { id: AppId; label: string; keywords: string }[] = [
  { id: 'pota', label: '포타 · 사쿠야 생일 데이트', keywords: '포타 스토리 데이트 11월 18일' },
  { id: 'messages', label: '메시지 · 사쿠야', keywords: '메시지 카톡 문자 사쿠야 답장' },
  { id: 'photos', label: '사진 · 생일 앨범', keywords: '사진 앨범 크루아상 케이크' },
  { id: 'calendar', label: '캘린더 · 11월 18일', keywords: '캘린더 일정 생일' },
  { id: 'settings', label: '설정 · iOS 27', keywords: '설정 ios 27 배경화면 다크모드' },
  { id: 'music', label: '음악 · 생일 플레이리스트', keywords: '음악 노래 재생' },
  { id: 'maps', label: '지도 · 데이트 코스', keywords: '지도 성수 서촌 연남 코스' },
  { id: 'notes', label: '메모 · 비밀 체크리스트', keywords: '메모 리스트 케이크 선물' },
  { id: 'camera', label: '카메라 · 생일 네컷', keywords: '카메라 촬영 사진' },
];

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  isOpen,
  iconStyle,
  onClose,
  onOpenApp,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = SEARCHABLE_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.keywords.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div
      className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-2xl p-5 pt-14 flex flex-col animate-in fade-in duration-150"
      role="dialog"
      aria-label="Spotlight 검색"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/15 border border-white/25 text-white">
          <Search className="w-4 h-4 text-white/75 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="앱, 사쿠야, 11월 18일 일정 검색"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-white/70 hover:text-white"
              aria-label="검색어 지우기"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 text-xs font-semibold text-sky-300 hover:text-sky-200 whitespace-nowrap"
        >
          취소
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto no-scrollbar">
        <p className="text-[11px] font-semibold text-white/60 px-1">
          Siri 제안 · 바로 열기
        </p>
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onClose();
              onOpenApp(item.id);
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-left transition-colors"
          >
            <IosAppIcon appId={item.id} iconStyle={iconStyle} size="sm" showLabel={false} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-white/65 text-center py-8">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};
