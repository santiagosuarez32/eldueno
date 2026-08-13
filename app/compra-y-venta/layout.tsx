import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compra y Venta de Propiedades",
  description: "Asesoría profesional para comprar o vender tu propiedad de forma segura...",
  openGraph: {
    title: "EL DUEÑO VENDE | Compra y Venta de Propiedades",
    description: "Asesoría profesional para comprar o vender tu propiedad de forma segura...",
    url: "https://www.elduenovende.com/compra-y-venta",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "EL DUEÑO VENDE | Compra y Venta de Propiedades",
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
