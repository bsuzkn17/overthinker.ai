"use client";

import { forwardRef } from "react";

interface SharingCardProps {
  trapName: string;
  reframe: string;
  variant: "square" | "story";
}

const SharingCard = forwardRef<HTMLDivElement, SharingCardProps>(
  ({ trapName, reframe, variant }, ref) => {
    const isSquare = variant === "square";
    
    return (
      <div
        ref={ref}
        className={`absolute -left-[9999px] top-0 flex flex-col justify-center items-center p-12 bg-bg text-text text-center font-sans
          ${isSquare ? "w-[1080px] h-[1080px]" : "w-[1080px] h-[1920px]"}
        `}
        style={{
          background: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.1), transparent), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.1), transparent), #050510",
        }}
      >
        {/* Branding */}
        <div className="absolute top-16 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-2xl">🧠</span>
          </div>
          <span className="text-3xl font-bold tracking-tight text-white/90">Overthinker.ai</span>
        </div>

        {/* Content */}
        <div className="max-w-4xl space-y-12">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-2xl font-semibold tracking-wide">
              🧠 I caught myself {trapName} today.
            </span>
          </div>

          <div className="relative">
            <span className="absolute -top-12 -left-12 text-9xl text-white/5 font-serif italic">&#34;</span>
            <h2 className={`font-bold leading-tight bg-gradient-to-r from-success-light via-success to-success-dark bg-clip-text text-transparent px-8
              ${reframe.length > 100 ? "text-5xl" : "text-7xl"}
            `}>
              {reframe}
            </h2>
          </div>
          
          <p className="text-3xl text-muted/60 font-medium tracking-wide italic">
             — New perspective — 
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-16 space-y-4">
          <div className="flex items-center gap-3 text-2xl text-muted/40 font-semibold tracking-widest uppercase italic">
             Better thoughts • Better life 
          </div>
        </div>
      </div>
    );
  }
);

SharingCard.displayName = "SharingCard";

export default SharingCard;
