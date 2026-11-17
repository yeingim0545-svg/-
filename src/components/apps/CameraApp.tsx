import React, { useState } from 'react';
import { Camera, Check, ChevronLeft, Sparkles } from 'lucide-react';
import { SAKUYA_PHOTOS } from '../../data/sakuyaDateData';
import { SafeImage } from '../SafeImage';

interface CameraAppProps {
  onCapturePhoto: (title: string, imageUrl: string, filterClass: string) => void;
  onOpenPhotos: () => void;
  onBackHome: () => void;
}

const CAMERA_SCENES = [
  {
    id: 'scene-bouquet',
    label: '생일 꽃다발',
    imageUrl: SAKUYA_PHOTOS.bouquet,
  },
  {
    id: 'scene-matcha',
    label: '카페 디저트',
    imageUrl: SAKUYA_PHOTOS.matchaDessert,
  },
  {
    id: 'scene-night',
    label: '도쿄 야경',
    imageUrl: SAKUYA_PHOTOS.nightIllumination,
  },
];

const FILTERS = [
  { id: 'vivid', label: '생일 필름', className: 'contrast-105 saturate-115' },
  { id: 'warm', label: '따뜻한 오후', className: 'sepia-[0.18] saturate-125' },
  { id: 'mono', label: '흑백 네컷', className: 'grayscale contrast-115' },
];

export const CameraApp: React.FC<CameraAppProps> = ({
  onCapturePhoto,
  onOpenPhotos,
  onBackHome,
}) => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [filterIdx, setFilterIdx] = useState(0);
  const [flash, setFlash] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const scene = CAMERA_SCENES[sceneIdx];
  const filter = FILTERS[filterIdx];

  const handleShutter = () => {
    setFlash(true);
    onCapturePhoto(
      `11.18 ${scene.label} (${filter.label})`,
      scene.imageUrl,
      filter.className,
    );
    setSavedNotice(true);
    setTimeout(() => setFlash(false), 180);
    setTimeout(() => setSavedNotice(false), 2400);
  };

  return (
    <div className="h-full bg-black text-white flex flex-col justify-between overflow-hidden relative">
      {/* Top Bar */}
      <div className="pt-13 pb-2 px-4 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center gap-0.5 text-amber-400 text-sm font-medium min-h-[36px]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>홈</span>
        </button>
        <div className="flex items-center gap-1 text-xs font-semibold text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>11·18 생일 프레임</span>
        </div>
        <button
          type="button"
          onClick={onOpenPhotos}
          className="text-xs font-semibold text-white/85 hover:text-white"
        >
          앨범
        </button>
      </div>

      {/* Viewfinder */}
      <div className="relative flex-1 mx-3 rounded-[28px] overflow-hidden border border-white/15">
        <SafeImage
          src={scene.imageUrl}
          alt={scene.label}
          className={`w-full h-full object-cover transition-all duration-200 ${filter.className}`}
        />

        {/* Birthday Frame Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-semibold tracking-wider text-white/95 border border-white/25">
            2026.11.18 · HAPPY SAKUYA DAY
          </span>
        </div>

        {/* Shutter Flash */}
        {flash && <div className="absolute inset-0 bg-white z-30" />}

        {savedNotice && (
          <div className="absolute top-3 inset-x-0 flex justify-center z-30">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg">
              <Check className="w-3.5 h-3.5" />
              사진 앱에 저장됨
            </span>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-4 pb-8 space-y-3 z-20">
        {/* Scene Selector */}
        <div className="flex items-center justify-center gap-1.5">
          {CAMERA_SCENES.map((sc, idx) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => setSceneIdx(idx)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                idx === sceneIdx
                  ? 'bg-amber-400 text-black'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Filter Selector */}
        <div className="flex items-center justify-center gap-2">
          {FILTERS.map((fl, idx) => (
            <button
              key={fl.id}
              type="button"
              onClick={() => setFilterIdx(idx)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                idx === filterIdx
                  ? 'text-amber-300 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {fl.label}
            </button>
          ))}
        </div>

        {/* Shutter Row */}
        <div className="flex items-center justify-center pt-1">
          <button
            type="button"
            onClick={handleShutter}
            className="w-16 h-16 rounded-full border-4 border-white p-1 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="사진 촬영"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-zinc-900">
              <Camera className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
