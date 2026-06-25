import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { mockProperties, Property, mapDbToProperty } from '@/app/data/properties';
import { AlertTriangle } from 'lucide-react';
import PropertyDetailClient from './PropertyDetailClient';
import { supabase } from '@/lib/supabase';

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  
  let property: Property | undefined = undefined;
  try {
    const { data } = await supabase.from('properties').select('*').eq('id', id).single();
    if (data) {
      property = mapDbToProperty(data);
    }
  } catch (err) {
    console.warn("Error fetching metadata from Supabase:", err);
  }

  if (!property) {
    property = mockProperties.find((p) => p.id === id);
  }

  if (!property) {
    return {
      title: 'Propiedad No Encontrada | El Dueño Vende',
    };
  }

  const title = `${property.title} | El Dueño Vende`;
  const description = `${property.description.slice(0, 155)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://elduenovende.com/propiedades/${id}`,
      images: [
        {
          url: property.image,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [property.image],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  
  let property: Property | undefined = undefined;
  try {
    const { data } = await supabase.from('properties').select('*').eq('id', id).single();
    if (data) {
      property = mapDbToProperty(data);
    }
  } catch (err) {
    console.warn("Error fetching property details from Supabase:", err);
  }

  if (!property) {
    property = mockProperties.find((p) => p.id === id);
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-6 pt-24 px-4">
          <AlertTriangle className="h-16 w-16 text-amber-500 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl font-bold">Propiedad No Encontrada</h1>
          <p className="text-slate-400 text-center max-w-md">
            Lo sentimos, el inmueble que estás buscando no existe o fue dado de baja por su propietario.
          </p>
          <Link
            href="/propiedades"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-2xl transition-colors text-sm"
          >
            Volver al Catálogo
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Get related properties (excluding current one)
  let relatedProperties: Property[] = [];
  try {
    const { data } = await supabase.from('properties').select('*').limit(6);
    if (data && data.length > 0) {
      relatedProperties = data.map(mapDbToProperty).filter((p) => p.id !== property!.id);
    }
  } catch (err) {
    console.warn("Error fetching related properties from Supabase:", err);
  }

  if (relatedProperties.length === 0) {
    relatedProperties = mockProperties.filter((p) => p.id !== property.id);
  }

  return (
    <>
      <Navbar />
      <PropertyDetailClient property={property} relatedProperties={relatedProperties} />
      <Footer />
    </>
  );
}
