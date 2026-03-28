"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
  labels: {
    onboarding1: string;
    onboarding2: string;
  };
}

export default function Onboarding({ onComplete, labels }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem("ot_onboarded", "true");
      onComplete();
    }, 500);
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-bg flex items-center justify-center p-6 transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <div className="max-w-md w-full space-y-12 text-center">
        {step === 1 && (
          <div className="animate-fade-in-up space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              {labels.onboarding1}
            </h2>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tighter">
                Overthinker<span className="text-primary">.ai</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                {labels.onboarding2}
              </p>
            </div>
            
            <button
              onClick={handleFinish}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-all active:scale-95"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
