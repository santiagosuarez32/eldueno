import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compra y Venta Directa | El Dueño Vende",
  description: "Publicá o comprá tu inmueble directamente con el dueño sin pagar comisiones ni intermediarios en Costa Rica. Asesoría integral y trato directo.",
  openGraph: {
    title: "Compra y Venta Directa | El Dueño Vende",
    description: "Publicá o comprá tu inmueble directamente con el dueño sin pagar comisiones ni intermediarios en Costa Rica. Asesoría integral y trato directo.",
    url: "https://www.elduenovende.com/compra-y-venta",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Compra y Venta",
      },
    ],
  },
};

export default function CompraVentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
