import React, { useState } from 'react';
import { ChevronLeft, Heart, MapPin, X } from 'lucide-react';
import { PhotoMemory } from '../../types/ios';
import { SafeImage } from '../SafeImage';

interface PhotosAppProps {
  isDark: boolean;
  photos: PhotoMemory[];
  onToggleLike: (id: string) => void;
  onSetWallpaper: (imageUrl: string) => void;
  onBackHome: () => void;
}

export const PhotosApp: React.FC<PhotosAppProps> = ({
  isDark,
  photos,
  onToggleLike,
  onBackHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visiblePhotos =
    filter === 'liked' ? photos.filter((p) => p.liked) : photos;
  const selectedPhoto = photos.find((p) => p.id === selectedId) || null;

  const bgMain = isDark ? 'bg-zinc-950 text-white' : 'bg-white text-slate-900';
  const muted = isDark ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div className={`relative h-full flex flex-col overflow-hidden ${bgMain}`}>
      {/* Header */}
      <div
        className={`pt-13 pb-3 px-4 border-b backdrop-blur-xl flex items-center justify-between shrink-0 ${
          isDark
            ? 'bg-zinc-950/90 border-zinc-800'
            : 'bg-white/90 border-slate-200/70'
        }`}
      >
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-0.5 text-sky-500 text-sm font-medium min-h-[36px]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>홈</span>
        </button>

        <div className="text-center">
          <h1 className="text-[16px] font-bold tracking-tight">사진</h1>
          <p className={`text-[10px] ${muted}`}>
            11월 18일 · 사쿠야 생일 앨범 ({photos.length}장)
          </p>
        </div>

        <div className="w-12" />
      </div>

      {/* Filter Bar */}
      <div className="px-4 py-2.5 flex items-center gap-2 shrink-0">
        <div
          className={`flex items-center p-1 rounded-xl ${
            isDark ? 'bg-zinc-900' : 'bg-slate-100'
          }`}
        >
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all'
                ? isDark
                  ? 'bg-zinc-700 text-white'
                  : 'bg-white text-slate-900 shadow-sm'
                : muted
            }`}
          >
            전체 보관함
          </button>
          <button
            type="button"
            onClick={() => setFilter('liked')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'liked'
                ? isDark
                  ? 'bg-zinc-700 text-white'
                  : 'bg-white text-slate-900 shadow-sm'
                : muted
            }`}
          >
            즐겨찾기
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-12">
        <div className="grid grid-cols-2 gap-2.5">
          {visiblePhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedId(photo.id)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden text-left shadow-sm"
            >
              <SafeImage
                src={photo.imageUrl}
                alt={photo.title}
                className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${
                  photo.filterClass || ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              {photo.liked && (
                <Heart className="absolute top-2.5 right-2.5 w-4 h-4 text-rose-400 fill-rose-400 drop-shadow" />
              )}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <p className="text-[11px] font-bold truncate">{photo.title}</p>
                <p className="text-[10px] text-white/75 tabular-nums">{photo.time}</p>
              </div>
            </button>
          ))}
        </div>

        {visiblePhotos.length === 0 && (
          <p className={`text-xs text-center py-12 ${muted}`}>
            즐겨찾기에 추가된 사진이 없습니다.
          </p>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="absolute inset-0 z-50 bg-black/95 text-white flex flex-col justify-between p-4 pt-14 pb-8 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">{selectedPhoto.title}</p>
              <p className="text-[11px] text-white/70 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selectedPhoto.location} · {selectedPhoto.time}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25"
              aria-label="사진 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 flex-1 flex items-center justify-center overflow-hidden rounded-3xl">
            <SafeImage
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className={`max-h-full w-full object-contain rounded-2xl ${
                selectedPhoto.filterClass || ''
              }`}
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs text-white/85 leading-relaxed text-center">
              {selectedPhoto.caption}
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onToggleLike(selectedPhoto.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  selectedPhoto.liked
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${selectedPhoto.liked ? 'fill-current' : ''}`}
                />
                <span>{selectedPhoto.liked ? '즐겨찾기됨' : '즐겨찾기 추가'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
