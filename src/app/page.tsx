"use client";

import { useState, useEffect } from "react";
import ThoughtAnalyzer from "@/components/ThoughtAnalyzer";
import HistoryDrawer from "@/components/HistoryDrawer";
import WeeklyReport from "@/components/WeeklyReport";
import Onboarding from "@/components/Onboarding";
import { translations, type Locale } from "@/lib/i18n";
import { Clock } from "lucide-react";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  const t = translations[locale];

  useEffect(() => {
    setIsClient(true);
    const isDone = localStorage.getItem("ot_onboarded") === "true";
    setOnboarded(isDone);
  }, []);

  if (!isClient || onboarded === null) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30">
      {!onboarded && (
        <Onboarding 
          onComplete={() => setOnboarded(true)} 
          labels={{
            onboarding1: t.onboarding1,
            onboarding2: t.onboarding2,
          }}
        />
      )}

      <HistoryDrawer 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        labels={{
          historyTitle: t.historyTitle,
          clearHistory: t.clearHistory,
          noHistory: t.noHistory,
        }}
      />

      {/* Navbar */}
      <nav className="w-full max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="text-2xl font-heading font-bold tracking-tight select-none">
          <span className="text-text">Overthinker</span>
          <span className="text-primary font-light">.ai</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* History Button */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="hidden sm:flex px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase
                       bg-white/5 border border-white/5 text-muted
                       hover:bg-white/10 hover:text-text hover:border-white/20
                       transition-all duration-200 items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            {t.myThoughts}
          </button>

          {/* Language Toggle */}
          <button
            id="lang-toggle"
            onClick={() => setLocale((prev) => (prev === "tr" ? "en" : "tr"))}
            className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase
                       bg-surface border border-white/10 text-muted
                       hover:bg-white/5 hover:text-text hover:border-white/20
                       transition-all duration-200 flex items-center gap-2"
          >
            🌐 {locale === "tr" ? "English" : "Türkçe"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-12 pb-24 flex flex-col items-center text-center">

        {/* Hero Section */}
        <div className="mb-14">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
            <span className="text-text">Overthinker</span>
            <span className="text-primary font-light">.ai</span>
          </h1>

          <h2 className="text-xl sm:text-2xl text-muted italic font-light mb-6">
            {t.subtitle}
          </h2>

          <p className="text-lg text-muted/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Weekly Report (if data exists) */}
        <WeeklyReport labels={{
          weeklyReportTitle: t.weeklyReportTitle,
          mostCommonTrap: t.mostCommonTrap,
          totalReframes: t.totalReframes,
          growthNote: t.growthNote,
          noHistory: t.noHistory,
        }} />

        {/* Thought Analyzer (Textarea + Demo + Result) */}
        <ThoughtAnalyzer locale={locale} />

        {/* Mobile History Button (Fixed Bottom) */}
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="sm:hidden fixed bottom-24 right-6 z-40 p-4 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 animate-bounce active:scale-90 transition-transform"
        >
          <Clock className="w-6 h-6" />
        </button>

        {/* Demo Section Label */}
        <div className="w-full max-w-3xl mt-24 mb-8">
          <h2 className="text-2xl font-heading font-bold text-text text-center mb-2">
            {t.seeInAction}
          </h2>
          <p className="text-muted text-sm text-center">
            {t.seeInActionDesc}
          </p>
        </div>

        {/* Features Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left mt-12">
          <div className="p-8 bg-surface rounded-3xl border border-white/5 shadow-xl shadow-black/20 hover:-translate-y-1 transition-transform duration-300">
            <div className="text-4xl mb-6">🔍</div>
            <h3 className="text-xl font-heading font-bold mb-3 text-text">{t.featureDetectTitle}</h3>
            <p className="text-muted text-sm leading-relaxed">{t.featureDetectDesc}</p>
          </div>

          <div className="p-8 bg-surface rounded-3xl border border-white/5 shadow-xl shadow-black/20 hover:-translate-y-1 transition-transform duration-300">
            <div className="text-4xl mb-6">💬</div>
            <h3 className="text-xl font-heading font-bold mb-3 text-text">{t.featureExplainTitle}</h3>
            <p className="text-muted text-sm leading-relaxed">{t.featureExplainDesc}</p>
          </div>

          <div className="p-8 bg-surface rounded-3xl border border-white/5 shadow-xl shadow-black/20 hover:-translate-y-1 transition-transform duration-300">
            <div className="text-4xl mb-6">🔄</div>
            <h3 className="text-xl font-heading font-bold mb-3 text-text">{t.featureReframeTitle}</h3>
            <p className="text-muted text-sm leading-relaxed">{t.featureReframeDesc}</p>
          </div>
        </div>
      </main>

      {/* Ethical Disclaimer (Footer) */}
      <footer className="w-full text-center py-10 border-t border-white/5 px-6 mt-auto bg-surface/30">
        <p className="text-sm text-muted/70 max-w-xl mx-auto leading-relaxed">
          {t.disclaimer}
        </p>
      </footer>
    </div>
  );
}
