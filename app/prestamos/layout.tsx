import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Préstamos y Financiamiento | El Dueño Vende",
  description: "Encuentra opciones de financiamiento para comprar casa, préstamos con garantía hipotecaria y reunificación de deudas en el Gran Área Metropolitana de Costa Rica.",
  openGraph: {
    title: "Préstamos y Financiamiento | El Dueño Vende",
    description: "Encuentra opciones de financiamiento para comprar casa, préstamos con garantía hipotecaria y reunificación de deudas en Costa Rica.",
    url: "https://elduenovende.com/prestamos",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Préstamos",
      },
    ],
  },
};

export default function PrestamosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
