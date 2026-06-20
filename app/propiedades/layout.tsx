import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Catálogo de Propiedades | El Dueño Vende",
  description: "Explorá todas las propiedades disponibles directamente de su dueño. Encontrá casas, departamentos, PHs y lofts en Costa Rica sin pagar comisiones inmobiliarias.",
  openGraph: {
    title: "Catálogo de Propiedades | El Dueño Vende",
    description: "Explorá todas las propiedades disponibles directamente de su dueño. Encontrá casas, departamentos, PHs y lofts sin pagar comisiones.",
    url: "https://elduenovende.com/propiedades",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Catálogo de Propiedades",
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
