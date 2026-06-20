import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sobre Nosotros | El Dueño Vende",
  description: "Conocé la trayectoria, valores y propuesta de El Dueño Vende. Facilitamos la conexión directa entre compradores y dueños de inmuebles, eliminando las comisiones inmobiliarias en Costa Rica.",
  openGraph: {
    title: "Sobre Nosotros | El Dueño Vende",
    description: "Conocé la trayectoria, valores y propuesta de El Dueño Vende. Facilitamos la conexión directa entre compradores y dueños de inmuebles, eliminando las comisiones inmobiliarias.",
    url: "https://elduenovende.com/nosotros",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Nosotros",
      },
    ],
  },
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
