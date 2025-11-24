import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "bartop - Encuentra a tu barbero ideal",
  description: "Descubre los mejores barberos y barberías cerca de ti. Reserva tu cita fácilmente y disfruta de un servicio de calidad.",
  keywords: ["barbería", "barbero", "cita", "reserva", "corte de cabello", "barba", "bartop"],
  authors: [{ name: "bartop" }],
  openGraph: {
    title: "bartop - Encuentra a tu barbero ideal",
    description: "Descubre los mejores barberos y barberías cerca de ti. Reserva tu cita fácilmente y disfruta de un servicio de calidad.",
    type: "website",
    locale: "es_ES",
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={inter.className}>
        <AnalyticsProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}

