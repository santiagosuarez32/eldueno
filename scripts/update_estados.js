require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log("Fetching properties...");
  const { data: properties, error } = await supabase.from('properties').select('*');
  
  if (error) {
    console.error("Error fetching properties:", error);
    return;
  }
  
  let updatedCount = 0;

  for (const prop of properties) {
    const title = (prop.title || "").toLowerCase();
    const description = (prop.description || "").toLowerCase();
    
    let newEstado = null;
    
    // Check keywords in order of priority
    if (title.includes('reservada') || description.includes('reservada')) {
      newEstado = 'reservada';
    } else if (title.includes('vendida') || description.includes('vendida')) {
      newEstado = 'vendida';
    } else if (title.includes('alquilada') || description.includes('alquilada')) {
      newEstado = 'alquilada';
    } else if (title.includes('remate') || description.includes('remate')) {
      newEstado = 'remate';
    } else if (title.includes('rebajada') || description.includes('rebajada')) {
      newEstado = 'rebajada';
    } else if (title.includes('a remodelar') || description.includes('a remodelar') || title.includes('para remodelar') || description.includes('para remodelar')) {
      newEstado = 'para remodelar';
    }

    if (newEstado) {
      const currentOwner = prop.owner || {};
      const currentEstado = prop.estado || currentOwner.estado;
      
      if (currentEstado !== newEstado) {
        console.log(`Updating "${prop.title}" from "${currentEstado}" to "${newEstado}"`);
        
        // Update both the `estado` column (if it exists) and `owner.estado` to be safe
        const nextOwner = { ...currentOwner, estado: newEstado };
        
        // Update
        const { error: updateError } = await supabase
          .from('properties')
          .update({ 
             owner: nextOwner
          })
          .eq('id', prop.id);
          
        if (updateError) {
          console.error(`Error updating property ${prop.id}:`, updateError);
        } else {
          updatedCount++;
        }
      }
    }
  }
  
  console.log(`Finished checking properties. Updated: ${updatedCount}`);
}

main().catch(console.error);
