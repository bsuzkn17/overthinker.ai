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
  const [error, setError] = useState("");
  const [demoIndex, setDemoIndex] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const t = translations[locale];
  const demos = demoExamples[locale];
  const charCount = thought.length;
  const isValid = charCount >= 10 && charCount <= 800;

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
              {t.analyzingButton}
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
            }}
            confidence={result.confidence}
          />
          <button
            id="reset-button"
            onClick={handleReset}
            className="py-3 px-6 rounded-xl text-sm font-medium
                       text-muted hover:text-text border border-white/10
                       hover:bg-white/5 transition-all duration-200"
          >
            🔄 {t.resetButton}
          </button>
        </div>
      )}
    </div>
  );
}
