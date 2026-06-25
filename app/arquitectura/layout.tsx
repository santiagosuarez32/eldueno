import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Servicios de Arquitectura | El Dueño Vende",
  description: "Diseño, planificación y remodelación de espacios residenciales, comerciales e industriales en Costa Rica. Elaboración de planos y asesoría personalizada sin comisiones.",
  openGraph: {
    title: "Servicios de Arquitectura | El Dueño Vende",
    description: "Diseño, planificación y remodelación de espacios residenciales, comerciales e industriales en Costa Rica. Elaboración de planos y asesoría personalizada.",
    url: "https://elduenovende.com/arquitectura",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Arquitectura",
      },
    ],
  },
};

export default function ArquitecturaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
