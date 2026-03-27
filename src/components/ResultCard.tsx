"use client";

import { useState } from "react";

interface ResultCardProps {
  trapName: string | null;
  insight?: string;
  reframe?: string;
  suggestions?: string[];
  message?: string;
  crisisDetected?: boolean;
  labels: {
    detected: string;
    insight: string;
    reframe: string;
    suggestions: string;
    feedbackQuestion: string;
    feedbackThankYou: string;
    confidenceHigh: string;
    confidenceMedium: string;
    confidenceLow: string;
  };
  confidence?: "high" | "medium" | "low";
}

export default function ResultCard({
  trapName,
  insight,
  reframe,
  suggestions,
  message,
  crisisDetected,
  labels,
  confidence,
}: ResultCardProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(type);
    // Save to local storage for future optimization
    const existingFeedback = JSON.parse(localStorage.getItem("overthinker_feedback") || "[]");
    existingFeedback.push({
      timestamp: new Date().toISOString(),
      trapName,
      type,
      insight,
      reframe
    });
    localStorage.setItem("overthinker_feedback", JSON.stringify(existingFeedback));
  };
  if (crisisDetected) {
    return (
      <div className="w-full rounded-3xl overflow-hidden border border-red-500/30 bg-red-500/5 shadow-2xl shadow-red-500/10 animate-in fade-in slide-in-from-bottom-6 duration-700 animate-glow-emergency">
        <div className="p-8 flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
            <span className="text-3xl">🆘</span>
          </div>
          <div>
            <h3 className="text-red-400 font-bold text-xl mb-2 tracking-tight">İhtiyacınız Olan Desteği Alın / Get Support</h3>
            <p className="text-red-200/90 leading-relaxed text-lg font-medium">
              {message}
            </p>
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300/80 italic">
              Türkiye için: 182 (MHRS) veya 112 (Acil Çağrı Merkezi). <br />
              For Global resources: reach out to your local emergency services or a local crisis hotline.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!trapName) {
    return (
      <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="p-8 flex items-start gap-4 bg-white/[0.03]">
          <span className="text-3xl shrink-0">👋</span>
          <div>
            <p className="text-text/90 leading-relaxed text-lg">
              {message || "I work best with thoughts or feelings — try writing something like 'I always mess things up'."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5">
      {/* Trap Badge & Confidence */}
      <div className="px-8 pt-8 pb-4 flex flex-wrap items-center gap-3 animate-slide-in-left">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-semibold tracking-wide">
          🧠 {labels.detected}: {trapName}
        </span>
        
        {confidence && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium tracking-wide">
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              confidence === 'high' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 
              confidence === 'medium' ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 
              'bg-muted/40'
            }`} />
            <span className="text-text/60 uppercase">
              {confidence === 'high' ? labels.confidenceHigh : 
               confidence === 'medium' ? labels.confidenceMedium : 
               labels.confidenceLow}
            </span>
          </div>
        )}
      </div>

      {/* Insight Block */}
      <div className="px-8 pb-4 animate-fade-in-up delay-100">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5 shrink-0">💬</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted/60 font-semibold mb-2">{labels.insight}</p>
              <p className="text-text/90 leading-relaxed">{insight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reframe Block */}
      <div className="px-8 pb-4 animate-fade-in-up delay-200">
        <div className="p-6 rounded-2xl bg-success/[0.06] border border-success/15 relative">
          <div className="flex items-start gap-3 mb-6">
            <span className="text-xl mt-0.5 shrink-0">🔄</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-success/60 font-semibold mb-2">{labels.reframe}</p>
              <p className="text-success/90 leading-relaxed font-medium">&#34;{reframe}&#34;</p>
            </div>
          </div>
          
          {/* Feedback UI */}
          <div className="pt-4 border-t border-success/10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-success/70 italic">
              {feedback ? labels.feedbackThankYou : labels.feedbackQuestion}
            </p>
            {!feedback && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleFeedback('up')}
                  className="p-2 rounded-lg bg-success/10 hover:bg-success/20 text-success/80 transition-colors"
                  aria-label="Helpful"
                >
                  👍
                </button>
                <button 
                  onClick={() => handleFeedback('down')}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500/80 transition-colors"
                  aria-label="Not helpful"
                >
                  👎
                </button>
              </div>
            )}
            {feedback && (
              <div className="text-xl opacity-80">
                {feedback === 'up' ? '✨' : '📝'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggestions Block */}
      {suggestions && suggestions.length > 0 && (
        <div className="px-8 pb-8 animate-fade-in-up delay-300">
          <div className="p-6 rounded-2xl bg-secondary/[0.06] border border-secondary/15">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5 shrink-0">💡</span>
              <div className="w-full">
                <p className="text-xs uppercase tracking-widest text-secondary/60 font-semibold mb-3">{labels.suggestions}</p>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-text/80 leading-relaxed">
                      <span className="text-secondary/50 mt-1 shrink-0">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
