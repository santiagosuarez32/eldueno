import { supabase } from '@/lib/supabase';
import { Property, mapDbToProperty } from '@/app/data/properties';
import CatalogClient from '@/app/components/CatalogClient';

export const revalidate = 60; // ISR cache every 60 seconds

export default async function PropertiesPage() {
  let initialProperties: Property[] = [];
  
  try {
    const { data, error } = await supabase.from('properties').select('*').order('id');
    if (!error && data && data.length > 0) {
      initialProperties = data.map(mapDbToProperty);
    }
  } catch (err) {
    console.warn("Error loading properties from Supabase on server:", err);
  }

  // Pass the pre-fetched data directly to the client component.
  // This completely eliminates the loading skeleton delay!
  return <CatalogClient initialProperties={initialProperties} />;
}
