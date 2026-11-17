import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Heart, Phone, Send } from 'lucide-react';
import { ChatMessage } from '../../types/ios';
import { QUICK_REPLIES, SAKUYA_AVATAR } from '../../data/sakuyaDateData';
import { SafeImage } from '../SafeImage';

interface MessagesAppProps {
  isDark: boolean;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onBackHome: () => void;
}

export const MessagesApp: React.FC<MessagesAppProps> = ({
  isDark,
  messages,
  onSendMessage,
  onBackHome,
}) => {
  const [input, setInput] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInput('');
  };

  const bgMain = isDark ? 'bg-zinc-950 text-white' : 'bg-white text-slate-900';

  return (
    <div className={`relative h-full flex flex-col overflow-hidden ${bgMain}`}>
      {/* iOS 27 Glass Messages Header */}
      <div
        className={`pt-13 pb-2.5 px-4 border-b backdrop-blur-xl flex items-center justify-between shrink-0 ${
          isDark
            ? 'bg-zinc-900/85 border-zinc-800'
            : 'bg-slate-50/85 border-slate-200/80'
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

        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-sky-300/60 shadow-sm">
            <SafeImage
              src={SAKUYA_AVATAR}
              alt="사쿠야"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[12px] font-bold mt-0.5">사쿠야 ♡</span>
        </div>

        <button
          type="button"
          onClick={() => setShowCallModal(true)}
          className="w-9 h-9 rounded-full bg-sky-500/15 text-sky-500 flex items-center justify-center hover:bg-sky-500/25"
          aria-label="사쿠야에게 전화하기"
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar p-4 space-y-3">
        <div className="text-center py-1">
          <span
            className={`text-[10px] font-medium ${
              isDark ? 'text-zinc-500' : 'text-slate-400'
            }`}
          >
            TODAY ♡ · 사쿠야 (너의 남자친구)
          </span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`relative max-w-[78%] px-3.5 py-2.5 rounded-[20px] text-[13.5px] leading-snug ${
                  isMe
                    ? 'bg-sky-500 text-white rounded-br-md'
                    : isDark
                    ? 'bg-zinc-800 text-zinc-100 rounded-bl-md'
                    : 'bg-slate-100 text-slate-900 rounded-bl-md'
                }`}
              >
                {msg.photoUrl && (
                  <div className="mb-2 rounded-xl overflow-hidden">
                    <SafeImage
                      src={msg.photoUrl}
                      alt="첨부 사진"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                )}
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.reaction && (
                  <span className="absolute -bottom-2 -left-2 text-xs bg-white dark:bg-zinc-900 rounded-full px-1 shadow border border-slate-200 dark:border-zinc-700">
                    {msg.reaction}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 px-1 tabular-nums ${
                  isDark ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
                {msg.time}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Quick Reply Suggestions */}
      <div
        className={`px-3 py-2 border-t flex gap-1.5 overflow-x-auto no-scrollbar shrink-0 ${
          isDark ? 'border-zinc-800 bg-zinc-900/40' : 'border-slate-100 bg-slate-50/70'
        }`}
      >
        {QUICK_REPLIES.map((qr) => (
          <button
            key={qr.id}
            type="button"
            onClick={() => onSendMessage(qr.userText)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors ${
              isDark
                ? 'bg-zinc-800 border-zinc-700 text-sky-300 hover:bg-zinc-700'
                : 'bg-white border-sky-200 text-sky-600 hover:bg-sky-50'
            }`}
          >
            {qr.label}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <form
        onSubmit={handleSubmit}
        className={`p-3 pb-7 border-t flex items-center gap-2 shrink-0 ${
          isDark ? 'border-zinc-800 bg-zinc-950' : 'border-slate-200/70 bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => onSendMessage('사랑해 ♡')}
          className="w-9 h-9 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0 hover:bg-rose-500/25"
          aria-label="하트 보내기"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력해 주세요..."
          className={`flex-1 px-3.5 py-2 rounded-full border text-[13px] focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            isDark
              ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500'
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
          }`}
        />

        <button
          type="submit"
          className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 hover:bg-sky-600 transition-colors"
          aria-label="메시지 전송"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {showCallModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-5">
          <div
            className={`w-full max-w-[320px] rounded-3xl p-6 text-center space-y-3 shadow-2xl ${
              isDark ? 'bg-zinc-900 text-white' : 'bg-white text-slate-900'
            }`}
          >
            <Phone className="w-8 h-8 mx-auto text-emerald-500" />
            <h2 className="text-base font-bold">사쿠야에게 전화하기</h2>
            <p className="text-xs leading-relaxed opacity-85 whitespace-pre-line">
              {'사쿠야에게 전화를 걸고 있어...\n\n사쿠야: 여보세요?\n\n"누나, 왜? 목소리 듣고 싶었어?"\n\n그는 웃으며 전화를 받았다.'}
            </p>
            <button
              type="button"
              onClick={() => setShowCallModal(false)}
              className="px-6 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-semibold"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
