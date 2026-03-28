"use client";

import { useEffect, useState } from "react";
import { X, Trash2, Clock, ChevronRight } from "lucide-react";

interface HistoryItem {
  id: number;
  thought: string;
  trap: string;
  reframe: string;
  date: string;
}

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  labels: {
    historyTitle: string;
    clearHistory: string;
    noHistory: string;
  };
}

export default function HistoryDrawer({ isOpen, onClose, labels }: HistoryDrawerProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem("ot_history") || "[]");
      setHistory(stored);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const clearHistory = () => {
    localStorage.removeItem("ot_history");
    setHistory([]);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-bg/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-[60] shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {labels.historyTitle}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-white/5 hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {history.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-muted gap-2 opacity-50">
                <Clock className="w-10 h-10" />
                <p>{labels.noHistory}</p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 group hover:border-primary/20 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-muted/60 font-bold">
                      {formatDate(item.date)}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {item.trap}
                    </span>
                  </div>
                  <p className="text-sm text-text/70 line-clamp-2 italic italic-quote">
                    &#34;{item.thought}&#34;
                  </p>
                  <div className="flex items-center gap-2 text-success/90">
                    <ChevronRight className="w-4 h-4" />
                    <p className="text-sm font-medium line-clamp-2">{item.reframe}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {history.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
              <button
                onClick={clearHistory}
                className="w-full py-3 rounded-xl border border-red-500/20 text-red-400 text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                {labels.clearHistory}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
