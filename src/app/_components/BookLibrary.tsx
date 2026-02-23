"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, PlayCircle, Clock, BookOpen, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { BOOKS_DATA, type BookItem } from "./books.data";

const HISTORY_KEY = "hsk-reader-meta";

type BookLibraryProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ReaderMeta = {
  page?: number;
  numPages?: number;
  lastRead?: string;
};

type HistoryItem = BookItem & ReaderMeta;
type SelectedBook = BookItem & Partial<ReaderMeta>;

type PremiumReaderProps = {
  url: string;
  title: string;
  bookId: string;
  onClose: () => void;
};

const PremiumReader = dynamic<PremiumReaderProps>(() => import("./PremiumReader"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/80 text-white backdrop-blur-md">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    </div>
  ),
});

const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));
const toProgress = (page = 0, total = 100): number =>
  clamp(Math.round((page / Math.max(total, 1)) * 100), 0, 100);

type ThreeDBookProps = {
  cover: string;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
};

const ThreeDBook = ({ cover, title, onClick, disabled = false }: ThreeDBookProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      type="button"
      className={`relative w-full aspect-[3/4.25] text-left ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      style={{ perspective: "1200px" }}
      aria-label={title}
    >
      <div
        className="absolute -bottom-4 left-2 right-4 h-4 rounded-full blur-xl"
        style={{ background: "rgba(15,23,42,0.42)" }}
      />
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d", transform: "rotateY(-14deg) rotateX(2deg)" }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-[2px]"
          style={{
            transform: "translateZ(8px)",
            boxShadow:
              "0 20px 26px rgba(15,23,42,.25), 0 8px 14px rgba(15,23,42,.16), inset 0 0 0 1px rgba(255,255,255,.18)",
          }}
        >
          <img src={cover} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/18 via-transparent to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-white/12" />
          <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-1 bg-black/25" />
        </div>

        <div
          className="absolute top-[3px] bottom-[3px] right-[-10px] w-[12px] rounded-r-sm border-l border-slate-300"
          style={{
            transform: "translateZ(1px)",
            background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 35%, #eef2f7 100%)",
            boxShadow: "inset -1px 0 0 rgba(0,0,0,.05), inset 0 0 10px rgba(148,163,184,.25)",
          }}
        >
          {Array.from({ length: 13 }, (_, i) => i).map((i) => (
            <div key={i} className="mx-[1px] h-px bg-slate-300/55" style={{ marginTop: i === 0 ? 2 : 3 }} />
          ))}
        </div>

        <div
          className="absolute top-[2px] bottom-[2px] left-[-3px] w-[4px] rounded-l-sm"
          style={{
            transform: "rotateY(-90deg)",
            background: "linear-gradient(180deg, #cbd5e1 0%, #f8fafc 48%, #cbd5e1 100%)",
          }}
        />

        <div
          className="absolute top-[2px] bottom-[2px] left-[2px] right-[-8px] rounded-sm"
          style={{ transform: "translateZ(-3px)", background: "#fff", boxShadow: "0 4px 8px rgba(15,23,42,.08)" }}
        />

        {disabled && (
          <div className="absolute inset-0 flex items-end justify-center rounded-r-md rounded-l-[2px] bg-slate-900/35 pb-2">
            <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white">即将上线</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default function BookLibrary({ isOpen, onClose }: BookLibraryProps) {
  const [selectedBook, setSelectedBook] = useState<SelectedBook | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const allHistory: HistoryItem[] = [];
    BOOKS_DATA.forEach((book) => {
      const raw = localStorage.getItem(`${HISTORY_KEY}_${book.id}`);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw) as ReaderMeta;
        allHistory.push({ ...book, ...parsed });
      } catch {
        // ignore broken history
      }
    });

    allHistory.sort(
      (a, b) => new Date(b.lastRead ?? 0).getTime() - new Date(a.lastRead ?? 0).getTime()
    );
    setHistory(allHistory);
  }, [isOpen, selectedBook]);

  const continueBook = useMemo<HistoryItem | undefined>(
    () => history.find((x) => !!x.pdfUrl),
    [history]
  );

  if (!isOpen) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[3px]"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
        className="relative ml-auto flex h-full w-full flex-col overflow-hidden bg-slate-50 shadow-2xl sm:max-w-md"
      >
        <div className="relative h-36 shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
              className="h-full w-full scale-110 object-cover opacity-50 mix-blend-overlay"
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-between px-5 pt-5 pb-2">
            <div className="flex items-center justify-between">
              <button onClick={onClose} className="rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-md">
                <ChevronLeft size={24} />
              </button>
              <button className="rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-md">
                <Search size={18} />
              </button>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-3xl font-black tracking-tight text-slate-800 drop-shadow-sm">
                Library <span className="text-2xl text-yellow-500">✨</span>
              </h2>
              <p className="pl-0.5 text-xs font-medium text-slate-500 opacity-80">Discover your next journey</p>
            </div>
          </div>
        </div>

        <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto p-4 pb-24">
          {continueBook && (
            <section>
              <div className="mb-3 flex items-center gap-2 px-1">
                <Clock size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Continue Reading</span>
              </div>

              <button
                onClick={() => continueBook.pdfUrl && setSelectedBook(continueBook)}
                type="button"
                className="relative w-full aspect-[2.6/1] overflow-hidden rounded-2xl bg-white text-left shadow-xl shadow-blue-500/10"
              >
                <div className="absolute inset-0 scale-125 bg-cover bg-center opacity-20 blur-md" style={{ backgroundImage: `url(${continueBook.cover})` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/40" />

                <div className="absolute inset-0 flex items-center gap-4 p-4">
                  <div className="relative h-full aspect-[3/4.2] overflow-hidden rounded-sm border border-white/10 shadow-lg">
                    <img src={continueBook.cover} className="h-full w-full object-cover" alt="" />
                  </div>

                  <div className="flex h-full min-w-0 flex-1 flex-col justify-center py-1 text-white">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded border border-yellow-500/30 bg-yellow-500/20 px-1.5 py-0.5 text-[9px] font-bold text-yellow-300">
                        READING
                      </span>
                    </div>
                    <h3 className="truncate text-base font-bold leading-tight text-slate-100">{continueBook.subTitle}</h3>
                    <p className="mt-0.5 truncate text-[10px] text-slate-400">{continueBook.title}</p>

                    <div className="mt-auto">
                      <div className="mb-1 flex justify-between font-mono text-[9px] text-slate-400">
                        <span>Progress</span>
                        <span>{toProgress(continueBook.page, continueBook.numPages)}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${toProgress(continueBook.page, continueBook.numPages)}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md">
                    <PlayCircle size={20} className="ml-0.5 text-white" />
                  </div>
                </div>
              </button>
            </section>
          )}

          <section>
            <div className="mb-5 flex items-center gap-2 px-1">
              <BookOpen size={14} className="text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Collections</span>
            </div>

            <div className="rounded-2xl border border-slate-100/50 bg-white p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                {BOOKS_DATA.map((book) => (
                  <div key={book.id} className="flex flex-col items-center">
                    <ThreeDBook
                      cover={book.cover}
                      title={book.title}
                      disabled={!book.pdfUrl}
                      onClick={() => setSelectedBook(book)}
                    />
                    <div className="mt-3 w-full px-0.5 text-center">
                      <h3 className="line-clamp-2 flex h-[2.8em] items-start justify-center overflow-hidden pb-0.5 text-xs font-bold leading-relaxed text-slate-700">
                        {book.subTitle}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedBook?.pdfUrl && (
          <PremiumReader
            url={selectedBook.pdfUrl}
            title={selectedBook.title}
            bookId={selectedBook.id}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
