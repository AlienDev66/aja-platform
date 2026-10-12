import type { Metadata } from "next";
import { Sora, Syne } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import { SettingsProvider } from "@/lib/settings";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AJA Digital — Associação dos Juízes de Angola",
  description:
    "Plataforma oficial da AJA: associados, organigrama, formação, ética, comunicação e coexistência com WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${sora.variable} ${syne.variable}`}>
      <body className="min-h-screen bg-navy font-[family-name:var(--font-sora)] text-cream antialiased">
        <AuthProvider>
          <StoreProvider>
            <SettingsProvider>{children}</SettingsProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
