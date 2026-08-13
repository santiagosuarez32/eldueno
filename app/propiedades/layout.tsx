import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Buscar Propiedades",
  description: "Encontrá tu casa, propiedad de inversión, apartamento, terreno y...",
  openGraph: {
    title: "EL DUEÑO VENDE | Buscar Propiedades",
    description: "Encontrá tu casa, propiedad de inversión, apartamento, terreno y...",
    url: "https://elduenovende.com/propiedades",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "EL DUEÑO VENDE | Buscar Propiedades",
      },
    ],
  },
};

export default function PropiedadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
