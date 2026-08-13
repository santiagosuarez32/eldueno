import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Préstamos Hipotecarios",
  description: "Opciones de reunificación de deudas y crédito hipotecario adaptadas a tus necesidades...",
  openGraph: {
    title: "EL DUEÑO VENDE | Préstamos Hipotecarios",
    description: "Opciones de reunificación de deudas y crédito hipotecario adaptadas a tus necesidades...",
    url: "https://elduenovende.com/prestamos",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "EL DUEÑO VENDE | Préstamos Hipotecarios",
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
