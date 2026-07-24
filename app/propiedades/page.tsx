import { supabase } from '@/lib/supabase';
import { Property, mapDbToProperty } from '@/app/data/properties';
import CatalogClient from '@/app/components/CatalogClient';

export const revalidate = 60; // ISR cache every 60 seconds

export default async function PropertiesPage() {
  let initialProperties: Property[] = [];
  let customTypes: string[] = [];
  let exchangeRateUSD: number = 510;
  
  try {
    const [propsRes, settingsRes] = await Promise.all([
      supabase.from('properties').select('*').eq('featured', true).order('id'),
      supabase.from('properties').select('owner').eq('id', 'prop-site-settings').single()
    ]);
    
    if (!propsRes.error && propsRes.data && propsRes.data.length > 0) {
      initialProperties = propsRes.data.filter(p => p.id !== 'prop-site-settings').map(mapDbToProperty);
    }
    
    if (settingsRes.data?.owner?.customTypes && Array.isArray(settingsRes.data.owner.customTypes)) {
      customTypes = settingsRes.data.owner.customTypes;
    } else {
      customTypes = ["Casa", "Departamento", "PH", "Loft", "Terreno", "Local Comercial", "Alquiler"];
    }
    
    if (settingsRes.data?.owner?.exchangeRate && typeof settingsRes.data.owner.exchangeRate === 'number') {
      exchangeRateUSD = settingsRes.data.owner.exchangeRate;
    }
  } catch (err) {
    console.warn("Error loading properties from Supabase on server:", err);
  }

  // Pass the pre-fetched data directly to the client component.
  // This completely eliminates the loading skeleton delay!
  return <CatalogClient initialProperties={initialProperties} customTypes={customTypes} exchangeRate={exchangeRateUSD} />;
}
