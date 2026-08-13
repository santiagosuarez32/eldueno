import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para recibir asesoría personalizada...",
  openGraph: {
    title: "EL DUEÑO VENDE | Contacto",
    description: "Contáctanos para recibir asesoría personalizada...",
    url: "https://elduenovende.com/contacto",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "EL DUEÑO VENDE | Contacto",
      },
    ],
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
