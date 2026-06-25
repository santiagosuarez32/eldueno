import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/app/components/SmoothScroll";
import FloatingWhatsApp from "@/app/components/FloatingWhatsApp";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elduenovende.com"),
  title: "El Dueño Vende | Propiedades Directas Sin Intermediarios",
  description: "La plataforma premium para comprar y vender propiedades directamente entre particulares en Costa Rica. Ahorrá miles de dólares en comisiones inmobiliarias. Trato directo y verificado con el dueño.",
  keywords: "dueño vende, trato directo, sin inmobiliaria, sin comisiones, comprar casa costa rica, vender departamento, alquiler directo, propiedades costa rica",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "El Dueño Vende | Propiedades Directas Sin Intermediarios",
    description: "La plataforma premium para comprar y vender propiedades directamente entre particulares. Ahorrá miles de dólares en comisiones inmobiliarias. Trato directo y verificado con el dueño.",
    url: "https://elduenovende.com",
    siteName: "El Dueño Vende",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Propiedades Directas Sin Intermediarios",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Dueño Vende | Propiedades Directas Sin Intermediarios",
    description: "La plataforma premium para comprar y vender propiedades directamente entre particulares. Ahorrá miles de dólares en comisiones inmobiliarias. Trato directo y verificado con el dueño.",
    images: ["/og.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full", "antialiased", satoshi.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <body className={`${satoshi.className} min-h-full flex flex-col bg-slate-950 text-slate-100`}>
        <SmoothScroll>
          {children}
          <FloatingWhatsApp />
        </SmoothScroll>
      </body>
    </html>
  );
}
