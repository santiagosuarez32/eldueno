import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Servicios de Arquitectura",
  description: "Diseño, planos, remodelaciones y dirección de obra profesional...",
  openGraph: {
    title: "EL DUEÑO VENDE | Servicios de Arquitectura",
    description: "Diseño, planos, remodelaciones y dirección de obra profesional...",
    url: "https://elduenovende.com/arquitectura",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "EL DUEÑO VENDE | Servicios de Arquitectura",
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
