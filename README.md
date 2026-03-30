<div align="center">

# Overthinker**.ai**

**Think clearer, not harder.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-overthinker--ai.vercel.app-7C3AED?style=for-the-badge)](https://overthinker-ai-jmiq.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-98%25-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

Yapay zeka destekli bilişsel çarpıtma tespit aracı. Düşüncelerindeki tuzakları gör, zihnini daha net anla.

</div>

---

## 🧠 Nedir?

**Overthinker.ai**, kullanıcıların kendi düşüncelerindeki **bilişsel çarpıtmaları** (cognitive distortions) fark etmelerine yardımcı olan Türkçe bir web uygulamasıdır. BDT (Bilişsel Davranışçı Terapi) çerçevesine dayanan bu araç, yapay zeka ile düşünce kalıplarını analiz eder ve yargılamadan, baskı olmadan netlik sunar.

> Kullanıcı bir düşünce yazar → Yapay zeka düşünce tuzağını tespit eder → Nazikçe açıklar → Dengeli bir yeniden çerçeveleme sunar.

**Teşhis yok. Yargı yok. Sadece netlik.**

---

## ✨ Özellikler

- 🔍 **Bilişsel Çarpıtma Tespiti** — Felaketleştirme, aşırı genelleme, zihin okuma gibi 10+ düşünce tuzağını tanır
- 💬 **Yargısız Açıklama** — Kliniğe kaçmayan, insan gibi bir dille anlat
- 🔄 **Düşünce Yeniden Çerçeveleme** — Çarpık düşünceyi dengeli bir perspektife dönüştür
- 📜 **Düşünce Geçmişi** — Önceki analizlerin localStorage'da saklanır
- 📤 **Paylaşım & İndirme** — Sonuç kartını PNG olarak indir veya paylaş
- 🆘 **Kriz Tespiti** — Hassas içeriklerde otomatik yönlendirme ve destek
- 📱 **PWA Desteği** — Mobil cihazlara yüklenebilir, offline-ready
- 🌙 **Dark Mode** — Göz yormayan koyu tema

---

## 🚀 Demo

Uygulamayı hemen deneyin: **[overthinker-ai-jmiq.vercel.app](https://overthinker-ai-jmiq.vercel.app/)**

### Örnek Kullanım

| Düşünce | Tespit | Yeniden Çerçeveleme |
|---|---|---|
| *"Bu sınavı geçemedim, aptalın tekiyim."* | Felaketleştirme | "Bu sınav kötü gitti ama zekamı tanımlamaz." |
| *"Kimse beni hiç dinlemiyor."* | Aşırı Genelleme | "Bazı konuşmalarda duyulmadığımı hissediyorum, ama bu herkes için geçerli değil." |
| *"Onlar beni garip bulduğunu biliyorum."* | Zihin Okuma | "Sormadan başkalarının ne düşündüğünü bilemem." |

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| **Frontend** | Next.js 15 + TypeScript |
| **Stil** | Tailwind CSS |
| **AI** | Groq API (Llama 3.3 70B) |
| **API Katmanı** | Next.js API Routes |
| **Yerel Depolama** | localStorage (düşünce geçmişi) |
| **Paylaşım** | Canvas API + `@vercel/og` |
| **Deploy** | Vercel |

---

## 📦 Kurulum

### Gereksinimler

- Node.js 18+
- [Groq API anahtarı](https://console.groq.com/)

### Adımlar

```bash
# 1. Repoyu klonla
git clone https://github.com/bsuzkn17/overthinker.ai.git
cd overthinker.ai

# 2. Bağımlılıkları yükle
npm install

# 3. Ortam değişkenlerini ayarla
cp .env.example .env.local
# .env.local dosyasına GROQ_API_KEY değerini ekle

# 4. Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

### Ortam Değişkenleri

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

## 📁 Proje Yapısı

```
overthinker.ai/
├── src/
│   ├── app/
│   │   ├── api/          # Next.js API Routes (AI analiz endpoint'i)
│   │   ├── page.tsx      # Ana sayfa
│   │   └── layout.tsx    # Uygulama layout'u
│   └── components/       # UI bileşenleri
├── features/             # Özellik bazlı modüller
├── public/               # Statik dosyalar (PWA manifest, ikonlar)
├── assets/               # Görseller ve medya
├── prd.md                # Ürün gereksinimleri dokümanı
└── tech-stack.md         # Teknik karar kayıtları
```

---

## 🧪 Nasıl Çalışır?

1. Kullanıcı bir düşünce yazar (min 10 / max 800 karakter)
2. İstek Next.js API Route üzerinden Groq API'sine iletilir
3. Llama 3.3 70B modeli şu üç alanı döndürür:
   - `trap_name` — Tespit edilen bilişsel çarpıtma
   - `insight` — Nazik, yargısız açıklama
   - `reframe` — Birinci şahıs ağzından dengeli bir alternatif
4. Sonuçlar arayüzde kart olarak gösterilir ve geçmişe kaydedilir

---

## ⚠️ Etik Çerçeve

Bu araç bir **farkındalık aracıdır**, bir terapi uygulaması değildir.

- ❌ Teşhis koymaz
- ❌ Profesyonel psikolojik desteğin yerini almaz
- ✅ Düşünce kalıplarını görünür kılar
- ✅ Sonuçları her zaman bir "perspektif" olarak çerçeveler
- ✅ Kriz durumlarında profesyonel yardıma yönlendirir

> Bu araç, bir terapistin ofisine gitmeden düşüncelerini daha net görmek isteyen herkese yöneliktir.

---

## 📄 Lisans

MIT © [bsuzkn17](https://github.com/bsuzkn17)

---

<div align="center">

**Overthinker.ai** · *Think clearer, not harder.*

[🌐 Demo](https://overthinker-ai-jmiq.vercel.app/) · [🐛 Issues](https://github.com/bsuzkn17/overthinker.ai/issues) · [⭐ Star](https://github.com/bsuzkn17/overthinker.ai)

</div>
