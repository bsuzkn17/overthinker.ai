"use client";

import { useState } from "react";
import ThoughtAnalyzer from "@/components/ThoughtAnalyzer";
import { translations, type Locale } from "@/lib/i18n";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("tr");
  const t = translations[locale];

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30">
      {/* Navbar */}
      <nav className="w-full max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="text-2xl font-heading font-bold tracking-tight select-none">
          <span className="text-text">Overthinker</span>
          <span className="text-primary font-light">.ai</span>
        </div>
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

        {/* Thought Analyzer (Textarea + Demo + Result) */}
        <ThoughtAnalyzer locale={locale} />

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
