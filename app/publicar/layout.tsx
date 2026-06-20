import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Publicá tu Propiedad | El Dueño Vende",
  description: "Publicá tu casa, departamento, terreno o local de forma 100% gratuita y directa en Costa Rica. Recibí consultas en tu WhatsApp sin comisiones inmobiliarias.",
  openGraph: {
    title: "Publicá tu Propiedad | El Dueño Vende",
    description: "Publicá tu casa, departamento, terreno o local de forma 100% gratuita y directa. Recibí consultas en tu WhatsApp sin comisiones inmobiliarias.",
    url: "https://elduenovende.com/publicar",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Publicá tu Propiedad",
      },
    ],
  },
};

export default function PublicarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
