import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "700",
});

export const metadata = {
  title: "Overthinker.ai",
  description: "Düşüncelerini netleştir, bilişsel çarpıtmalarını fark et.",
  manifest: "/manifest.json", // Manifest dosyasını bağlar
  themeColor: "#a78bfa",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Overthinker",
  },
  icons: {
    apple: "/icon-192.png", // iOS için ikon
  },
};

export const viewport = {
  themeColor: "#a78bfa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className={`font-body bg-bg text-text min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
