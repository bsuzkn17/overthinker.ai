"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThoughtAnalyzer from "@/components/ThoughtAnalyzer";
import HistoryDrawer from "@/components/HistoryDrawer";
import WeeklyReport from "@/components/WeeklyReport";
import Onboarding from "@/components/Onboarding";
import { translations, type Locale } from "@/lib/i18n";
import { Clock, ArrowRight, Sparkles, Brain, CheckCircle2 } from "lucide-react";

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
    <div className="flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      {!onboarded && (

        <Onboarding
          onComplete={() => setOnboarded(true)}
          labels={{
            onboarding1: t.onboarding1,
            onboarding2: t.onboarding2,
            getStarted: (t as any).getStarted,
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

      {/* Navbar - Keep standard navbar */}
      <nav className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between relative z-10 border-b border-white/5 bg-bg/50 backdrop-blur-md">
        <div className="text-2xl font-heading font-bold tracking-tight select-none flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-text">Overthinker</span>
          <span className="text-primary font-light">.ai</span>
        </div>

        <div className="flex items-center gap-3">
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
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center relative z-10">

        {/* Hero Section */}
        <motion.div
          className="mb-14 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            {locale === 'tr' ? 'Zihnini Özgürleştir' : 'Free Your Mind'}
          </motion.div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold mb-6 tracking-tight leading-[1.1]">
            {(t as any).heroTitle || "Kafan mı karıştı? Düşünceni yaz, netleştir."}
          </h1>

          <p className="text-lg md:text-xl text-muted/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Thought Analyzer (Main CTA) */}
        <motion.div
          className="w-full relative z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <ThoughtAnalyzer locale={locale} />
        </motion.div>

        {/* Weekly Report (if data exists) */}
        <div className="mt-16 w-full max-w-3xl">
          <WeeklyReport labels={{
            weeklyReportTitle: t.weeklyReportTitle,
            mostCommonTrap: t.mostCommonTrap,
            totalReframes: t.totalReframes,
            growthNote: t.growthNote,
            noHistory: t.noHistory,
          }} />
        </div>

        {/* Mobile History Button (Fixed Bottom) */}
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="sm:hidden fixed bottom-24 right-6 z-40 p-4 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(167,139,250,0.5)] active:scale-90 transition-transform"
        >
          <Clock className="w-6 h-6" />
        </button>

        {/* 3 Step Animated Flow */}
        <motion.div
          className="w-full mt-32 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
              {locale === 'tr' ? 'Nasıl Çalışır?' : 'How does it work?'}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 z-0" />

            <motion.div
              className="relative z-10 flex flex-col items-center text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-xl shadow-black/40 text-primary relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                📝
              </div>
              <h3 className="text-xl font-bold text-text mb-3">1. {(t as any).howItWorksStep1}</h3>
              <p className="text-muted leading-relaxed">{(t as any).howItWorksStep1Desc}</p>
            </motion.div>

            <motion.div
              className="relative z-10 flex flex-col items-center text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-xl shadow-black/40 text-secondary relative group">
                <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">2. {(t as any).howItWorksStep2}</h3>
              <p className="text-muted leading-relaxed">{(t as any).howItWorksStep2Desc}</p>
            </motion.div>

            <motion.div
              className="relative z-10 flex flex-col items-center text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-xl shadow-black/40 text-success relative group">
                <div className="absolute inset-0 bg-success/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">3. {(t as any).howItWorksStep3}</h3>
              <p className="text-muted leading-relaxed">{(t as any).howItWorksStep3Desc}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Example Transformation Card */}
        <motion.div
          className="w-full max-w-4xl mt-16 mb-24"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-[1px] rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-surface/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex-1 w-full bg-bg/50 border border-red-500/20 rounded-2xl p-6 shadow-inner relative">
                <span className="absolute -top-3 left-4 bg-bg px-2 text-xs font-semibold text-red-400 uppercase tracking-widest border border-red-500/20 rounded-full">
                  {locale === 'tr' ? 'Önce' : 'Before'}
                </span>
                <p className="text-lg md:text-xl text-muted italic">"{(t as any).exampleBeforeCard}"</p>
              </div>

              <div className="flex items-center justify-center -my-4 md:my-0 md:-mx-4 z-10 bg-surface rounded-full p-2 border border-white/5">
                <ArrowRight className="w-8 h-8 text-primary rotate-90 md:rotate-0" />
              </div>

              <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl md:blur-2xl rounded-2xl" />
                <div className="bg-surface border border-primary/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.15)] relative z-10">
                  <span className="absolute -top-3 left-4 bg-primary text-bg px-2 text-xs font-bold uppercase tracking-widest rounded-full">
                    {locale === 'tr' ? 'Sonra' : 'After'}
                  </span>
                  <p className="text-lg md:text-xl text-text font-medium leading-relaxed">
                    "{(t as any).exampleAfterCard}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </main>

      {/* Ethical Disclaimer (Footer) */}
      <footer className="w-full text-center py-10 border-t border-white/5 px-6 mt-auto bg-surface/30 relative z-10">
        <p className="text-sm text-muted/70 max-w-xl mx-auto leading-relaxed">
          {t.disclaimer}
        </p>
      </footer>
    </div>
  );
}
