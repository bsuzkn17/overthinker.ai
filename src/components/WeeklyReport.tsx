"use client";

import { useEffect, useState } from "react";
import { TrendingUp, BarChart3, Star, AlertCircle } from "lucide-react";

interface HistoryItem {
  id: number;
  thought: string;
  trap: string;
  reframe: string;
  date: string;
}

interface WeeklyReportProps {
  labels: {
    weeklyReportTitle: string;
    mostCommonTrap: string;
    totalReframes: string;
    growthNote: string;
    noHistory: string;
  };
}

export default function WeeklyReport({ labels }: WeeklyReportProps) {
  const [stats, setStats] = useState<{
    mostCommonTrap: string;
    totalCount: number;
    show: boolean;
  } | null>(null);

  useEffect(() => {
    const history: HistoryItem[] = JSON.parse(
      localStorage.getItem("ot_history") || "[]"
    );

    if (history.length === 0) {
      setStats({ mostCommonTrap: "", totalCount: 0, show: false });
      return;
    }

    // Filter last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const lastWeek = history.filter(
      (item) => new Date(item.date) >= sevenDaysAgo
    );

    if (lastWeek.length === 0) {
      setStats({ mostCommonTrap: "", totalCount: 0, show: false });
      return;
    }

    // Calculate most common trap
    const counts: Record<string, number> = {};
    lastWeek.forEach((item) => {
      counts[item.trap] = (counts[item.trap] || 0) + 1;
    });

    const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    setStats({
      mostCommonTrap: mostCommon,
      totalCount: lastWeek.length,
      show: true,
    });
  }, []);

  if (!stats || !stats.show) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 animate-fade-in-up">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            {/* Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-10 h-10 text-primary animate-pulse" />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
                {labels.weeklyReportTitle}
              </h3>
              <p className="text-muted text-sm leading-relaxed max-w-md">
                {labels.growthNote.replace("{count}", stats.totalCount.toString())}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-text/80">
                    {labels.totalReframes}: {stats.totalCount}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="text-xs font-semibold text-text/80">
                    {labels.mostCommonTrap}: {stats.mostCommonTrap}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
