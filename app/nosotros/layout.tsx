import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Propiedades en Costa Rica",
  description: "Encuentra propiedades en venta y alquiler en las principales zonas de Costa Rica.",
  openGraph: {
    title: "EL DUEÑO VENDE | Propiedades en Costa Rica",
    description: "Encuentra propiedades en venta y alquiler en las principales zonas de Costa Rica.",
    url: "https://elduenovende.com/nosotros",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "EL DUEÑO VENDE | Propiedades en Costa Rica",
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
