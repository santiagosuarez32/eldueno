const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');

const supabaseUrl = 'https://cenvyabnflzrygiengzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbnZ5YWJuZmx6cnlnaWVuZ3pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjIwNTAzNCwiZXhwIjoyMDk3NzgxMDM0fQ.SbhjOjukMlocmOfxhUqhKXvwhIBApVy7mUkk88eA7Iw';
const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

const BUCKET = 'property-images';
const STORAGE_BASE = `${supabaseUrl}/storage/v1/object/public/${BUCKET}`;

async function downloadImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  } catch (err) {
    console.error(`  ❌ Failed to download: ${url}`);
    return null;
  }
}

async function compressImage(buffer) {
  try {
    return await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true }) // Max width 1200px for web
      .webp({ quality: 60, effort: 5 }) // Good compression
      .toBuffer();
  } catch (err) {
    console.error(`  ⚠️ Compression failed`);
    return buffer;
  }
}

async function uploadToStorage(buffer, storagePath) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: 'image/webp', upsert: true });
  if (error) throw new Error(error.message);
  return `${STORAGE_BASE}/${storagePath}`;
}

async function run() {
  console.log('Fetching properties from Supabase...');
  const { data: properties, error } = await supabase.from('properties').select('id, title, image, gallery');
  if (error) {
    console.error('Failed to fetch properties:', error.message);
    process.exit(1);
  }

  for (const prop of properties) {
    console.log(`\nProcessing: ${prop.title} (${prop.id})`);
    let updated = false;
    const urlMap = {};
    const allUrls = [prop.image, ...(prop.gallery || [])].filter(Boolean);
    const uniqueUrls = [...new Set(allUrls)];

    let imgIdx = 0;
    for (const url of uniqueUrls) {
      if (url.includes('supabase.co/storage') && !url.includes('_opt.webp')) {
        imgIdx++;
        console.log(`  Downloading ${url.split('/').pop().substring(0, 20)}...`);
        const buffer = await downloadImage(url);
        if (!buffer) {
           urlMap[url] = url;
           continue;
        }

        console.log(`  Compressing... (Original: ${(buffer.length/1024).toFixed(1)} KB)`);
        const compressedBuffer = await compressImage(buffer);
        console.log(`  Compressed: ${(compressedBuffer.length/1024).toFixed(1)} KB`);

        // We append _opt to denote highly optimized
        const cleanPropId = prop.id.toString().replace(/[^a-zA-Z0-9_-]/g, '_');
        const storagePath = `${cleanPropId}/img_${imgIdx}_opt.webp`;
        try {
          const newUrl = await uploadToStorage(compressedBuffer, storagePath);
          urlMap[url] = newUrl;
          updated = true;
          console.log(`  ✅ Uploaded compressed image!`);
        } catch (err) {
          console.error(`  ❌ Upload failed: ${err.message}`);
          urlMap[url] = url;
        }
      } else {
         urlMap[url] = url;
      }
    }

    if (updated) {
      const newImage = urlMap[prop.image] || prop.image;
      const newGallery = (prop.gallery || []).map(u => urlMap[u] || u);
      
      const { error: updateErr } = await supabase
        .from('properties')
        .update({ image: newImage, gallery: newGallery })
        .eq('id', prop.id);

      if (updateErr) {
        console.error(`  ❌ DB update failed: ${updateErr.message}`);
      } else {
        console.log(`  ✅ Database updated with optimized URLs!`);
      }
    } else {
      console.log(`  ℹ️ No compression needed or skipped.`);
    }
  }
  console.log('\nAll done compressing images!');
}

run();
