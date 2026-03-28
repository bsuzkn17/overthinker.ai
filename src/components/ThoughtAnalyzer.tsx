"use client";

import { useState, useRef, useEffect } from "react";
import ResultCard from "./ResultCard";
import { translations, demoExamples, type Locale } from "@/lib/i18n";

interface AnalysisResult {
  trapName: string | null;
  insight?: string;
  reframe?: string;
  suggestions?: string[];
  message?: string;
  crisisDetected?: boolean;
  confidence?: "high" | "medium" | "low";
}

interface ThoughtAnalyzerProps {
  locale: Locale;
}

export default function ThoughtAnalyzer({ locale }: ThoughtAnalyzerProps) {
  const [thought, setThought] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [error, setError] = useState("");
  const [demoIndex, setDemoIndex] = useState(0);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const t = translations[locale];
  const demos = demoExamples[locale];
  const charCount = thought.length;
  const isValid = charCount >= 10 && charCount <= 800;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingMsgIdx(0);
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => {
          const matchArr = (t as any).loadingMessages;
          return (prev + 1) % (matchArr?.length || 1);
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading, t]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleAnalyze = async () => {
    if (!isValid) return;
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t.genericError);
      }

      const data = await res.json();
      const newResult = {
        trapName: data.trap_name,
        insight: data.insight,
        reframe: data.reframe,
        suggestions: data.suggestions || [],
        message: data.message,
        crisisDetected: data.crisis_detected,
        confidence: data.confidence,
      };
      
      setResult(newResult);

      // Save to History (if it's a valid trap analysis)
      if (data.trap_name) {
        const history = JSON.parse(localStorage.getItem('ot_history') || '[]');
        const historyEntry = {
          id: Date.now(),
          thought,
          trap: data.trap_name,
          reframe: data.reframe,
          date: new Date().toISOString()
        };
        const updatedHistory = [historyEntry, ...history].slice(0, 20);
        localStorage.setItem('ot_history', JSON.stringify(updatedHistory));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.genericError);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    const example = demos[demoIndex];
    setThought(example.input);
    setResult({
      trapName: example.trapName,
      insight: example.insight,
      reframe: example.reframe,
      suggestions: example.suggestions,
    });
    setError("");
    setDemoIndex((prev) => (prev + 1) % demos.length);
  };

  const handleReset = () => {
    setThought("");
    setResult(null);
    setError("");
    setShowLearnMore(false);
    setShowSimilar(false);
    setTimeout(() => document.getElementById("thought-input")?.focus(), 50);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      {/* Textarea */}
      <div className={`relative w-full group transition-all duration-500 ${loading ? 'animate-pulse-subtle' : ''}`}>
        <textarea
          id="thought-input"
          value={thought}
          disabled={loading}
          onChange={(e) => {
            if (e.target.value.length <= 800) {
              setThought(e.target.value);
            }
          }}
          placeholder={t.placeholder}
          rows={4}
          className={`w-full p-6 bg-surface rounded-2xl border transition-all duration-300
                     text-text placeholder:text-muted/50 resize-none outline-none
                     text-[16px] leading-relaxed
                     ${loading ? 'border-primary/30 opacity-70 cursor-not-allowed' : 'border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/5'}
                     `}
        />
        <div className="absolute bottom-4 right-5 flex items-center gap-2">
          <span
            className={`text-xs font-mono transition-colors duration-300 ${
              charCount < 600
                ? "text-muted/40"
                : charCount < 750
                  ? "text-yellow-400 font-bold"
                  : "text-red-400 font-bold"
            }`}
          >
            {charCount}/800
          </span>
        </div>
      </div>

      {charCount > 0 && charCount < 10 && (
        <p className="text-xs text-red-400/80 -mt-3 self-start ml-2 animate-in fade-in duration-300">
          {t.minCharsError}
        </p>
      )}

      {/* Action Buttons - Sticky for Mobile */}
      <div className="sticky bottom-0 sm:static w-screen sm:w-full bg-bg/80 sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none p-4 sm:p-0 -mx-4 sm:mx-0 z-40 flex flex-col sm:flex-row gap-3 border-t sm:border-t-0 border-white/5 sm:border-none">
        <button
          id="analyze-button"
          onClick={handleAnalyze}
          disabled={!isValid || loading}
          className="flex-[2] py-4 px-8 rounded-2xl font-semibold text-base
                     bg-gradient-to-r from-primary to-secondary
                     text-white shadow-lg shadow-primary/20
                     hover:brightness-110 hover:shadow-xl hover:shadow-primary/30
                     active:scale-[0.98]
                     transition-all duration-200
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-lg
                     flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {((t as any).loadingMessages)?.[loadingMsgIdx] || t.analyzingButton}
            </>
          ) : (
            t.analyzeButton
          )}
        </button>

        {!result && (
          <button
            id="demo-button"
            onClick={handleDemo}
            className="flex-1 py-4 px-6 rounded-2xl font-medium text-sm
                       bg-surface border border-white/10 text-muted
                       hover:bg-white/5 hover:text-text hover:border-white/20
                       active:scale-[0.98]
                       transition-all duration-200
                       flex items-center justify-center gap-2"
          >
            ⚡ {t.tryExample}
          </button>
        )}
      </div>

      {error && (
        <div className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in duration-300">
          {error}
        </div>
      )}

      <p className="text-xs text-muted/50 text-center leading-relaxed max-w-md">
        {t.disclaimer}
      </p>

      {result && (
        <div ref={resultRef} className="w-full mt-4 flex flex-col items-center gap-4 scroll-mt-20">
          <ResultCard
            trapName={result.trapName}
            insight={result.insight}
            reframe={result.reframe}
            suggestions={result.suggestions}
            message={result.message}
            crisisDetected={result.crisisDetected}
            labels={{
              detected: t.detected,
              insight: t.insight,
              reframe: t.reframe,
              suggestions: t.suggestions,
              feedbackQuestion: t.feedbackQuestion,
              feedbackThankYou: t.feedbackThankYou,
              confidenceHigh: t.confidenceHigh,
              confidenceMedium: t.confidenceMedium,
              confidenceLow: t.confidenceLow,
              shareReframe: (t as any).shareReframe || "Share",
              copySuccess: (t as any).copySuccess || "Copied!",
              downloadSquare: (t as any).downloadSquare || "Square",
              downloadStory: (t as any).downloadStory || "Story",
            }}
            confidence={result.confidence}
          />
          
          {/* Post-Analysis Retention Actions */}
          <div className="w-full flex flex-col gap-3 mt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-[2] py-3.5 px-6 rounded-2xl font-semibold text-sm
                           bg-surface border border-white/10 text-text
                           hover:bg-white/5 hover:border-white/20 transition-all duration-200"
              >
                ✏️ {(t as any).tryAnother}
              </button>
              
              {result.trapName && (
                <>
                  <button
                    onClick={() => {
                        setShowSimilar(!showSimilar);
                        setShowLearnMore(false);
                    }}
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-medium text-sm transition-all duration-200
                               ${showSimilar ? "bg-white/10 border-white/30 text-text" : "bg-surface border-white/10 text-muted hover:text-text hover:bg-white/5"}`}
                  >
                    🔍 {(t as any).seeSimilar}
                  </button>
                  <button
                    onClick={() => {
                        setShowLearnMore(!showLearnMore);
                        setShowSimilar(false);
                    }}
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-medium text-sm transition-all duration-200
                               ${showLearnMore ? "bg-white/10 border-white/30 text-text" : "bg-surface border-white/10 text-muted hover:text-text hover:bg-white/5"}`}
                  >
                    📖 {(t as any).learnAbout.replace("{trap}", result.trapName)}
                  </button>
                </>
              )}
            </div>

            {/* Expanded Views */}
            {showLearnMore && result.trapName && (
              <div className="p-6 rounded-2xl bg-surface border border-primary/20 animate-fade-in-up text-left mt-2">
                <h4 className="font-heading font-bold text-lg mb-2 text-primary">{result.trapName}</h4>
                <p className="text-muted text-sm leading-relaxed">
                  {((t as any).trapDescriptions)[result.trapName] || "This is a common cognitive distortion that can negatively affect your emotional well-being."}
                </p>
              </div>
            )}
            
            {showSimilar && result.trapName && (
              <div className="p-6 rounded-2xl bg-surface border border-white/10 animate-fade-in-up text-left flex flex-col gap-4 mt-2">
                <h4 className="font-heading font-bold text-lg text-primary mb-1">
                  {locale === 'tr' ? 'Benzer Örnekler' : 'Similar Examples'}: {result.trapName}
                </h4>
                {demos.filter(d => d.trapName === result.trapName).slice(0, 2).map((demo, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="italic text-text/80 text-sm mb-3">&#34;{demo.input}&#34;</p>
                        <div className="flex gap-2 items-start text-success/80">
                            <span className="text-xs mt-0.5">🔄</span>
                            <p className="text-sm font-medium">{demo.reframe}</p>
                        </div>
                    </div>
                ))}
                {demos.filter(d => d.trapName === result.trapName).length === 0 && (
                    <p className="text-muted text-sm italic">
                      {locale === 'tr' ? 'Hiç benzer örnek bulunamadı.' : 'No similar examples found.'}
                    </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
