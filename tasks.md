# Overthinker.ai - Geliştirme Görev Listesi (MVP)

Bu dosya, `prd.md` içerisindeki gereksinimlere dayanılarak oluşturulmuştur ve projenin adım adım geliştirilmesi için bir yol haritasıdır.

## 📦 Aşama 1: Proje Kurulumu ve Yapılandırma
- [ ] Next.js 14+ (App Router) projesi oluştur (`npx create-next-app@latest`).
- [ ] Tailwind CSS yapılandırmasını kur ve ayarla.
- [ ] Google Fontları entegre et: Başlıklar için **Poppins (700)**, Body için **Inter (400/500)**.
- [ ] PRD'de belirtilen Tasarım Sistemi renklerini (Token listesini) `tailwind.config.ts` veya `globals.css` içine CSS değişkenleri (`--color-primary` vb.) olarak ekle.
- [ ] Karanlık mod (Dark mode) arkaplanlarını (`#0F172A`) varsayılan yap.

## 🎨 Aşama 2: Temel Landing Page ve UI Geliştirme
- [ ] **Navbar:** Logoyu (`Overthinker.ai`) UI Spec'e uygun (beyaz + mor `.ai` soneki) şekilde kodla.
- [ ] **Hero Section (Bölüm 1):** Ana başlık ve "Think clearer, not harder." alt başlığını yerleştir.
- [ ] **Feature Section (Bölüm 2):** 3 temel özellik için ikonlu bilgi kartlarını (Desktop için yan yana, Mobil için alt alta) kodla.
- [ ] **Ethical Disclaimer (F-04):** Feragatname ("This tool does not diagnose...") bileşenini oluştur ve formun altına/en alta yerleştir.

## ✍️ Aşama 3: Girdi Alanı ve Demo Bölümü (Frontend)
- [ ] **Kullanıcı Girdi Alanı (F-01):** Minimum karanlık arka planı olan (`#1E293B`) bir Textarea elementi oluştur. Focus durumunda mor border animasyonları ekle.
- [ ] **Karakter Sayacı:** Textarea'ya (Min 10 / Max 800) canlı karakter sayacı entegre et ve validasyon kurallarını yaz.
- [ ] **Analyze Butonu:** Gradient tasarımlı, hover efekti olan analiz butonunu yerleştir.
- [ ] **Sonuç Kartı Bileşeni (F-03):** API'den dönecek veriyi gösterecek kart şablonunu oluştur (Mor trap etiketi, gri Insight bloğu ve yeşil Reframe bloğu).
- [ ] **Hardcoded Demo (Bölüm 3 & 7):** PRD'deki 3 örnek vakayı barındıran "Try an example" demo butonunu ekle. Tıklanınca API çağrısı yapmadan statik sonuç kartını göster.

## 🧠 Aşama 4: AI Entegrasyonu (Backend & Logic)
- [ ] **API Route Oluşumu:** Next.js Route Handlers kullanarak `/api/analyze` uç noktasını (endpoint) oluştur.
- [ ] **OpenAI Bağlantısı:** `openai` paketini yükle ve API anahtarını `.env.local`'e bağla.
- [ ] **Sistem Promptunun Ayarlanması:** Modelin kesinlikle teşhis koymaması, klinik dil kullanmaması ve sonucu zorunlu bir JSON ({trap_name, insight, reframe}) formatında (`temperature: 0.4`) döndürmesi için Sistem Prompt'unu yaz.
- [ ] **Frontend - API İletişimi:** Kullanıcı Analyze butonuna tıkladığında Textarea verisini API'ye gönderen `fetch` isteğini kodla.
- [ ] **Yükleme Ekranı:** API cevabı beklenirken Analyze butonu içi veya altında Loading/Spinner stateleri kur.

## 🛠️ Aşama 5: Hata Yönetimi, Cila ve Kullanıcı Deneyimi
- [ ] **Veri Temizleme:** Kullanıcı bir analizi bitirdikten sonra Textarea'yı temizlemek ve başa dönmek için "Analyze another thought" butonu ekle.
- [ ] **Hata Yakalama:** Textarea çok kısayken veya API hata fırlattığında kullanıcıya dostane hata/uyarı mesajları göster.
- [ ] **Mobil Responsive Testi:** Tüm UI tasarımını iOS Safari ve Android Chrome ekranları için kontrol et.
- [ ] **MVP Başarı Kontrolü:** AI cevaplarının ~3 saniyede gelip gelmediği ve PRD içerisindeki "Success Criteria" listesinin testlerini gerçekleştir.

## 🚀 Aşama 6: Dağıtım (Deployment)
- [ ] Kodları Github'a push'la (`git push`).
- [ ] Vercel hesabı oluştur/bağla.
- [ ] Projeyi Vercel'e deploy et ve `.env` (OpenAI Key vs.) değişkenlerini Vercel Dashboard'a girerek projeyi canlıya al.
