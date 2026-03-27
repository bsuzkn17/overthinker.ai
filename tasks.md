# Overthinker.ai - Geliştirme Görev Listesi (MVP)

Bu dosya, güncellenmiş `prd.md` içerisindeki gereksinimlere (Pitch Deck ve Gelecek Roadmap hariç) dayanılarak oluşturulmuştur ve projenin canlıya alınmasına kadar olan süreci adım adım kapsar.

## 📦 Aşama 1: Proje Kurulumu ve Yapılandırma
- [ ] Next.js 14+ (App Router) projesi oluştur.
- [ ] Tailwind CSS yapılandırmasını kur, Google Fontlarını (Poppins, Inter) entegre et.
- [ ] PRD'de belirtilen Tasarım Sistemi renklerini (Token listesini) CSS değişkenleri olarak ekle.
- [ ] Karanlık mod (Dark mode) arkaplanlarını (`#0F172A`) varsayılan yap.

## 🎨 Aşama 2: Landing Page ve UI Geliştirme
- [ ] **Navbar & Hero Section:** Logoyu ve ana/alt başlıkları yerleştir.
- [ ] **Feature Section:** 3 temel özellik için ikonlu bilgi kartlarını oluştur.
- [ ] **Ethical Disclaimer:** Feragatname bileşenini proforma olarak sayfanın en altına yerleştir.

## ✍️ Aşama 3: Girdi Alanı ve Demo Bölümü
- [ ] **Kullanıcı Girdi Alanı:** Karakter sayacı olan TextArea elementini kodla (Min 10 / Max 800) ve validasyon kurallarını yaz.
- [ ] **Sonuç Kartı Bileşeni:** API verisini gösterecek kart şablonunu oluştur (Mor trap etiketi, Insight ve Reframe blokları).
- [ ] **Statik Demo Bölümü:** 3 örnek vakayı barındıran "Try an example" butonunu ve statik sonuç kartlarını kodla.

## 🧠 Aşama 4: AI Entegrasyonu (Backend & Logic)
- [ ] **API Route:** `/api/analyze` uç noktasını (endpoint) oluştur.
- [ ] **OpenAI İletişimi:** `openai` paketini yükle, API anahtarını bağla ve System Prompt'u zorunlu JSON objesi (`trap_name`, `insight`, `reframe`) dönecek şekilde ayarla.
- [ ] **Zaman Tüneli İletişimi:** TextArea üzerinden girilen metin için API isteği (fetch) atılmasını ve bekleme anında Loading animasyonu çıkmasını sağla.

## 🛠️ Aşama 5: Cila ve Kullanıcı Deneyimi
- [ ] Formu temizleyen ve yeni giriş için sıfırlayan butonu ekle.
- [ ] TextArea boşluğu veya API hata durumları için hata/uyarı mesajı göster.
- [ ] Son mobil Responsive ve Lighthouse testlerini yap.

## 🚀 Aşama 6: Dağıtım (Deployment)
- [ ] Tamamlanmış kodları Github'a push'la, Vercel hesabını bağlayıp Environment değişkenleriyle (`.env`) yayına al.
