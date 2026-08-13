import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog & Recursos",
  description: "Leé las mejores guías y consejos inmobiliarios escritos por expertos. Aprendé cómo comprar, vender y negociar tu propiedad de forma directa y 100% segura sin pagar comisiones.",
  openGraph: {
    title: "EL DUEÑO VENDE | Blog & Recursos",
    description: "Leé las mejores guías y consejos inmobiliarios escritos por expertos. Aprendé cómo comprar, vender y negociar tu propiedad de forma directa.",
    url: "https://elduenovende.com/blog",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "EL DUEÑO VENDE | Blog & Recursos",
      },
    ],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
