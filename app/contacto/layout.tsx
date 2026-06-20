import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contactanos | El Dueño Vende",
  description: "Contactate de forma directa con el equipo de El Dueño Vende. Consultá sobre publicaciones de casas, departamentos, terrenos y locales sin comisiones en Costa Rica.",
  openGraph: {
    title: "Contactanos | El Dueño Vende",
    description: "Contactate de forma directa con el equipo de El Dueño Vende. Consultá sobre publicaciones de casas, departamentos, terrenos y locales sin comisiones.",
    url: "https://elduenovende.com/contacto",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "El Dueño Vende - Contacto",
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
