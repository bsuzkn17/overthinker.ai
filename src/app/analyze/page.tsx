"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [thought, setThought] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Bir hata oluştu, lütfen tekrar dene.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const t = encodeURIComponent(thought.substring(0, 100));
    const r = encodeURIComponent(result.reframe);
    // Yeni sekmede görseli açar, Vercel'de bu kusursuz çalışacak
    window.open(`/api/og?thought=${t}&reframe=${r}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center italic">overthinker.ai</h1>
        <textarea
          className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl h-40 focus:border-violet-500 outline-none text-white placeholder-gray-400"
          placeholder="Şu an aklından neler geçiyor?"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />
        <button
          onClick={analyze}
          disabled={loading || !thought.trim()}
          className="w-full bg-violet-600 py-4 rounded-2xl font-bold text-xl hover:bg-violet-500 transition-all disabled:opacity-50"
        >
          {loading ? "Analiz ediliyor..." : "Netleştir"}
        </button>
        {result && (
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center mt-4">
            <p className="text-2xl font-bold mb-6">{result.reframe}</p>
            <button
              onClick={handleDownload}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase hover:bg-gray-200 transition-colors"
            >
              Görseli İndir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}