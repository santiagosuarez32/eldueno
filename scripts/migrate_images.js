/**
 * Script to migrate property images from external URLs to Supabase Storage.
 * 
 * Steps:
 * 1. Fetch all properties from Supabase
 * 2. For each property, download all gallery images + main image
 * 3. Convert to WebP using sharp (if available) or upload as-is
 * 4. Upload to Supabase Storage bucket 'property-images'
 * 5. Update the property record with the new Supabase Storage URLs
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Supabase config (service role for storage access)
const supabaseUrl = 'https://cenvyabnflzrygiengzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbnZ5YWJuZmx6cnlnaWVuZ3pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjIwNTAzNCwiZXhwIjoyMDk3NzgxMDM0fQ.SbhjOjukMlocmOfxhUqhKXvwhIBApVy7mUkk88eA7Iw';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const BUCKET = 'property-images';
const STORAGE_BASE = `${supabaseUrl}/storage/v1/object/public/${BUCKET}`;

// Try to load sharp for webp conversion
let sharp = null;
try {
  sharp = require('sharp');
  console.log('✅ sharp is available — images will be converted to WebP');
} catch (e) {
  console.log('⚠️  sharp not found — images will be uploaded in their original format');
  console.log('   Install with: npm install sharp');
}

async function ensureBucketExists() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error) {
      console.error('Error creating bucket:', error.message);
      // Bucket might already exist
    } else {
      console.log(`✅ Created storage bucket: ${BUCKET}`);
    }
  } else {
    console.log(`✅ Bucket "${BUCKET}" already exists`);
  }
}

function isExternalUrl(url) {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}

function isAlreadyMigrated(url) {
  if (!url) return false;
  return url.includes('supabase.co/storage');
}

async function downloadImage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*',
        'Referer': 'https://www.elduenovende.com/'
      },
      signal: AbortSignal.timeout(30000) // 30s timeout
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return { buffer, contentType };
  } catch (err) {
    console.error(`  ❌ Failed to download: ${url} — ${err.message}`);
    return null;
  }
}

async function convertToWebp(buffer) {
  if (!sharp) return { buffer, ext: 'jpg' };
  try {
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();
    return { buffer: webpBuffer, ext: 'webp' };
  } catch (err) {
    console.error(`  ⚠️  WebP conversion failed, using original: ${err.message}`);
    return { buffer, ext: 'jpg' };
  }
}

async function uploadToStorage(buffer, storagePath, contentType) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType,
      upsert: true
    });
  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
  return `${STORAGE_BASE}/${storagePath}`;
}

async function migrateProperty(property) {
  const propId = property.id;
  console.log(`\n━━━ Processing: "${property.title}" (${propId}) ━━━`);

  // Collect all unique image URLs (main image + gallery)
  const allUrls = new Set();
  if (property.image) allUrls.add(property.image);
  if (property.gallery && Array.isArray(property.gallery)) {
    property.gallery.forEach(url => allUrls.add(url));
  }

  // Map old URL -> new URL
  const urlMap = {};
  let imgIndex = 0;

  for (const url of allUrls) {
    if (!isExternalUrl(url)) {
      console.log(`  ⏭️  Skipping non-external URL: ${url}`);
      continue;
    }
    if (isAlreadyMigrated(url)) {
      console.log(`  ✅ Already migrated: ${url.substring(0, 80)}...`);
      urlMap[url] = url;
      continue;
    }

    imgIndex++;
    console.log(`  📥 Downloading image ${imgIndex}: ${url.substring(0, 80)}...`);

    const downloaded = await downloadImage(url);
    if (!downloaded) {
      urlMap[url] = url; // Keep original if download fails
      continue;
    }

    // Convert to WebP
    const { buffer: finalBuffer, ext } = await convertToWebp(downloaded.buffer);
    const contentType = ext === 'webp' ? 'image/webp' : 'image/jpeg';

    // Create storage path: property-images/{propId}/{index}.webp
    const cleanPropId = propId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const storagePath = `${cleanPropId}/img_${String(imgIndex).padStart(2, '0')}.${ext}`;

    try {
      const publicUrl = await uploadToStorage(finalBuffer, storagePath, contentType);
      console.log(`  ✅ Uploaded: ${storagePath} (${Math.round(finalBuffer.length / 1024)}KB)`);
      urlMap[url] = publicUrl;
    } catch (err) {
      console.error(`  ❌ Upload failed for ${storagePath}: ${err.message}`);
      urlMap[url] = url; // Keep original if upload fails
    }

    // Small delay between downloads
    await new Promise(r => setTimeout(r, 300));
  }

  // Build updated property data
  const newImage = urlMap[property.image] || property.image;
  const newGallery = (property.gallery || []).map(url => urlMap[url] || url);

  // Check if anything changed
  const imageChanged = newImage !== property.image;
  const galleryChanged = JSON.stringify(newGallery) !== JSON.stringify(property.gallery);

  if (!imageChanged && !galleryChanged) {
    console.log(`  ℹ️  No changes needed for this property.`);
    return { changed: false };
  }

  // Update property in database
  const updateData = {};
  if (imageChanged) updateData.image = newImage;
  if (galleryChanged) updateData.gallery = newGallery;

  const { error } = await supabase
    .from('properties')
    .update(updateData)
    .eq('id', propId);

  if (error) {
    console.error(`  ❌ DB update failed: ${error.message}`);
    return { changed: false };
  }

  console.log(`  ✅ Database updated! image: ${imageChanged ? '✓' : '—'}, gallery: ${galleryChanged ? '✓' : '—'}`);
  return { changed: true, urlMap };
}

async function run() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   Property Image Migration to Supabase Storage  ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  // Ensure bucket exists
  await ensureBucketExists();

  // Fetch all properties
  const { data: properties, error } = await supabase
    .from('properties')
    .select('id, title, image, gallery')
    .order('id');

  if (error) {
    console.error('Failed to fetch properties:', error.message);
    process.exit(1);
  }

  console.log(`\nFound ${properties.length} properties to process.\n`);

  let migratedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  for (const prop of properties) {
    try {
      const result = await migrateProperty(prop);
      if (result.changed) {
        migratedCount++;
      } else {
        skippedCount++;
      }
    } catch (err) {
      console.error(`  ❌ Error processing ${prop.id}: ${err.message}`);
      failedCount++;
    }
  }

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log(`║  Migration Complete!                             ║`);
  console.log(`║  ✅ Migrated: ${String(migratedCount).padEnd(4)} properties                  ║`);
  console.log(`║  ⏭️  Skipped:  ${String(skippedCount).padEnd(4)} properties                  ║`);
  console.log(`║  ❌ Failed:   ${String(failedCount).padEnd(4)} properties                  ║`);
  console.log('╚══════════════════════════════════════════════════╝');

  process.exit(0);
}

run();
