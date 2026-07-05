import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data: properties, error } = await supabase.from('properties').select('*');
  if (error) {
    console.error("Error fetching properties:", error);
    return;
  }

  let updatedCount = 0;

  for (const prop of properties) {
    if (!prop.area && !prop.landArea) {
      // Look for square meters in title or description
      const regex = /([\d,.]+)\s*(?:m2|m²|metros cuadrados|hectareas|ha\b)/i;
      const textToSearch = `${prop.title} ${prop.description}`;
      const match = textToSearch.match(regex);

      if (match) {
        let areaValue = match[1];
        
        // If it says hectareas or ha, maybe multiply? Let's assume m2 for now or just string.
        // Actually, the DB probably stores a number or string. Let's store the exact string or parsed number.
        // If it contains a dot, it could be thousands separator or decimal. 
        // Example: "90.019" might be 90,019 m2.
        
        // Let's just store the string as `area` if it's a string field, or a number if it's a number field.
        // The DB might have `area` as numeric. We'll strip dots and commas if we want to store it as a number,
        // or just keep it. "90.019" -> 90019? Wait, in Costa Rica, dots are often used for thousands or decimals?
        // Let's just extract the raw text and replace ',' with '.' if it's decimal, or just remove dots if it's thousands.
        // A safer bet: just extract all digits.
        const rawNum = areaValue.replace(/[^\d.,]/g, '');
        // If it's something like 90.019 (90 thousand), parsing it in JS `parseFloat` gives 90.019. 
        // We'll store it as is, or remove dots.
        // Let's see what type `area` is.
        
        let parsedArea = parseFloat(rawNum.replace(',', '.'));
        // But if it's 90.019 as 90019, `parseFloat` gives 90.019. 
        // Let's just write the raw value to `area` if it's a text field.
        // Wait, I can inspect the properties table schema.
        
        console.log(`Property [${prop.id}] ${prop.title} -> Found area: ${areaValue}`);
        
        // Update database
        const { error: updateError } = await supabase.from('properties').update({ area: rawNum }).eq('id', prop.id);
        if (updateError) {
           console.error(`Error updating property ${prop.id}:`, updateError);
        } else {
           updatedCount++;
           console.log(`Updated property ${prop.id} with area ${rawNum}`);
        }
      }
    }
  }

  console.log(`Finished updating ${updatedCount} properties.`);
}

run();
