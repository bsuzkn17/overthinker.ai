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
      alert("Bir hata olustu, lutfen tekrar dene.");
    } finally {
      setLoading(false);
    }
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  };

  const handleDownload = () => {
    if (!result) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Arka plan
    ctx.fillStyle = "#0d0d1a";
    ctx.fillRect(0, 0, 1080, 1080);

    // Mor kutu
    ctx.fillStyle = "rgba(139, 92, 246, 0.15)";
    roundRect(ctx, 60, 280, 960, 500, 40);
    ctx.fill();

    // Kutu border
    ctx.strokeStyle = "rgba(167, 139, 250, 0.3)";
    ctx.lineWidth = 2;
    roundRect(ctx, 60, 280, 960, 500, 40);
    ctx.stroke();

    // Logo
    ctx.fillStyle = "#a78bfa";
    ctx.font = "bold italic 64px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("overthinker.ai", 540, 180);

    // Reframe metni - satır satır
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px sans-serif";
    ctx.textAlign = "center";
    const words = result.reframe.split(" ");
    let line = "";
    let y = 420;
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > 860 && line !== "") {
        ctx.fillText(line.trim(), 540, y);
        line = word + " ";
        y += 64;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), 540, y);

    // Alt yazı
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.font = "30px sans-serif";
    ctx.fillText("Daha dengeli dusun", 540, 920);

    // İndir
    const link = document.createElement("a");
    link.download = "overthinker-analiz.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center italic">overthinker.ai</h1>
        <textarea
          className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl h-40 focus:border-violet-500 outline-none text-white placeholder-gray-400"
          placeholder="Su an aklından neler geciyor?"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />
        <button
          onClick={analyze}
          disabled={loading || !thought.trim()}
          className="w-full bg-violet-600 py-4 rounded-2xl font-bold text-xl hover:bg-violet-500 transition-all disabled:opacity-50"
        >
          {loading ? "Analiz ediliyor..." : "Netlestir"}
        </button>
        {result && (
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center mt-4">
            <p className="text-2xl font-bold mb-6">{result.reframe}</p>
            <button
              onClick={handleDownload}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase hover:bg-gray-200 transition-colors"
            >
              Gorseli Indir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}