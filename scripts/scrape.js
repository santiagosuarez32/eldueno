const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase config
const supabaseUrl = 'https://cenvyabnflzrygiengzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbnZ5YWJuZmx6cnlnaWVuZ3pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjIwNTAzNCwiZXhwIjoyMDk3NzgxMDM0fQ.SbhjOjukMlocmOfxhUqhKXvwhIBApVy7mUkk88eA7Iw';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&nbsp;/g, " ");
}

function getNeighborhood(title, location) {
  const parts = title.split(',').map(p => p.trim());
  if (parts.length > 2) {
    return parts[parts.length - 1]; // e.g. "Desamparados"
  }
  if (parts.length === 2) {
    return parts[1];
  }
  return location || 'Costa Rica';
}

async function scrapeProperty(url) {
  console.log(`\nScraping detail page: ${url}`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch detail page, status: ${res.status}`);
  }
  const html = await res.text();

  // Extract Slug
  const slug = url.replace('https://www.elduenovende.com/properties/', '').replace(/\/$/, '');
  const id = 'prop-' + slug;

  // Extract Title
  const titleMatch = html.match(/<h1 class="property__title">([\s\S]*?)<\/h1>/i);
  if (!titleMatch) {
    console.log(`Could not find title for ${url}. Skipping.`);
    return null;
  }
  let title = titleMatch[1].replace(/<span[\s\S]*?<\/span>/i, '').replace(/<[^>]+>/g, '').trim();
  title = decodeHtml(title);

  // Extract Location (City)
  const cityMatch = html.match(/<span class="property__city">([\s\S]*?)<\/span>/i);
  let location = cityMatch ? cityMatch[1].replace(/<[^>]+>/g, '').trim() : 'San José';
  location = decodeHtml(location);

  // Extract Neighborhood
  const neighborhood = getNeighborhood(title, location);

  // Extract Price & Currency
  const priceContainerMatch = html.match(/<div class="property__price">([\s\S]*?)<\/div>/i);
  let priceStr = '';
  if (priceContainerMatch) {
    const strongMatch = priceContainerMatch[1].match(/<strong>([\s\S]*?)<\/strong>/i);
    if (strongMatch) {
      priceStr = strongMatch[1].replace(/<[^>]+>/g, '').trim();
    }
  }
  if (!priceStr) {
    const fallbackPrice = html.match(/class=["']property__price["'][^>]*>([\s\S]*?)<\//i);
    if (fallbackPrice) {
      priceStr = fallbackPrice[1].replace(/<[^>]+>/g, '').trim();
    }
  }

  let price = 0;
  let moneda = 'CRC';
  if (priceStr) {
    if (priceStr.includes('$') || priceStr.toUpperCase().includes('USD')) {
      moneda = 'USD';
    }
    const digits = priceStr.replace(/\D/g, '');
    price = parseFloat(digits) || 0;
  }

  // Extract Description
  const descMatch = html.match(/<div class="property__description js-unhide-block">([\s\S]*?)<\/div>/i);
  let description = '';
  if (descMatch) {
    description = descMatch[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<p>/gi, '')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .trim();
  }
  description = decodeHtml(description) || 'Sin descripción';

  // Extract Property Type
  const infoItemMatch = html.match(/<div class="property__info-item">Property type:<strong>([\s\S]*?)<\/strong>/i);
  let rawType = infoItemMatch ? infoItemMatch[1].replace(/<[^>]+>/g, '').trim().toLowerCase() : 'casa';
  let type = 'casa';
  if (rawType.includes('casa')) type = 'casa';
  else if (rawType.includes('departamento') || rawType.includes('apartamento') || rawType.includes('depto') || rawType.includes('apto') || rawType.includes('condominio')) type = 'departamento';
  else if (rawType.includes('terreno') || rawType.includes('lote')) type = 'terreno';
  else if (rawType.includes('comercial') || rawType.includes('local') || rawType.includes('oficina') || rawType.includes('edificio')) type = 'comercial';
  else if (rawType.includes('ph')) type = 'ph';
  else if (rawType.includes('loft')) type = 'loft';

  // Extract Gallery & Main Image
  const imgUrls = [];
  const aTags = html.match(/<a[^>]+>/gi) || [];
  aTags.forEach(tag => {
    if (tag.includes('slider__img')) {
      const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) {
        imgUrls.push(hrefMatch[1]);
      }
    }
  });
  const gallery = [...new Set(imgUrls)];
  const image = gallery[0] || 'https://www.elduenovende.com/wp-content/uploads/2023/09/Picture20.png';

  // Extract Land Size (landArea)
  const landMatch = html.match(/<li>Land Size:\s*<strong>([^<]+)<\/strong>/i);
  let landArea = null;
  if (landMatch) {
    const cleanLand = landMatch[1].replace(/[^0-9.]/g, '');
    landArea = parseFloat(cleanLand) || null;
  }

  // Regex specs heuristics from Description
  let beds = null;
  const bedsMatch = description.match(/(\d+)\s*(?:dormitorio|habitaci|cuarto|habs\b)/i);
  if (bedsMatch) {
    beds = parseInt(bedsMatch[1]) || null;
  }

  let baths = null;
  const bathsMatch = description.match(/(\d+(?:\.5)?)\s*(?:baño|bano)/i);
  if (bathsMatch) {
    baths = Math.round(parseFloat(bathsMatch[1])) || null;
  }

  let parkingSpaces = null;
  const parkingMatch = description.match(/(\d+)\s*(?:estacionamiento|cochera|garaje|parqueo|vehículo)/i);
  if (parkingMatch) {
    parkingSpaces = parseInt(parkingMatch[1]) || null;
  }

  let area = null;
  const areaMatch = description.match(/(\d+(?:\.\d+)?)\s*(?:m2|m²)\s*de\s*(?:construc|área\s+constru)/i);
  if (areaMatch) {
    area = parseFloat(areaMatch[1]) || null;
  }

  // Extract Agent/Owner Info
  const agentLinkMatch = html.match(/<a[^>]+href=["']https:\/\/www\.elduenovende\.com\/agents\/[^"']+["'][^>]*>([^<]+)<\/a>/i);
  let ownerName = agentLinkMatch ? agentLinkMatch[1].trim() : 'Dueño Directo';
  ownerName = decodeHtml(ownerName);

  const telMatches = html.match(/href=["']tel:([^"']+)["']/gi) || [];
  let phone = '+506 8888-8888';
  const telNums = telMatches.map(m => m.match(/tel:([^"']+)/)[1].trim());
  const agentTel = telNums.find(num => !num.includes('22806665') && !num.includes('2280-6665'));
  if (agentTel) {
    phone = agentTel;
  } else if (telNums.length > 0) {
    phone = telNums[0];
  }

  const cleanPhone = phone.replace(/\D/g, '');
  let whatsappPhone = cleanPhone;
  if (!whatsappPhone.startsWith('506') && whatsappPhone.length === 8) {
    whatsappPhone = '506' + whatsappPhone;
  }
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=Hola%20${encodeURIComponent(ownerName)},%20estoy%20interesado%20en%20la%20propiedad%20"${encodeURIComponent(title)}"%20que%20vi%20en%20El%20Due%C3%B1o%20Vende.`;

  // Sold / Rented heuristics
  const vendido = description.toUpperCase().includes('VENDIDO') || description.toUpperCase().includes('VENDIDA');
  const alquilado = description.toUpperCase().includes('ALQUILADO') || description.toUpperCase().includes('ALQUILADA');

  // Extract Post ID for Code
  const postIdMatch = html.match(/-p(\d+)-o/i);
  const code = postIdMatch ? 'EDV-' + postIdMatch[1] : 'EDV-' + slug.substring(0, 5).toUpperCase();

  const finalProperty = {
    id,
    title,
    description,
    price,
    location,
    neighborhood,
    beds: beds || undefined,
    baths: baths || undefined,
    area: area || landArea || 0,
    landArea: landArea || 0,
    constructionArea: area || landArea || 0,
    parkingSpaces: parkingSpaces || undefined,
    image,
    type,
    featured: true,
    owner: {
      name: ownerName,
      phone,
      whatsappUrl,
      moneda,
      vendido,
      alquilado
    },
    gallery: gallery.length > 0 ? gallery : [image],
    views: Math.floor(Math.random() * 100) + 10,
    saves: Math.floor(Math.random() * 15),
    code
  };

  console.log(`Scraped: "${title}" | Price: ${moneda} ${price} | Location: ${location} | Neighborhood: ${neighborhood} | Code: ${code}`);
  return finalProperty;
}

async function run() {
  const listingUrls = [
    'https://www.elduenovende.com/properties/?contract_type%5B%5D=175&contract_type%5B%5D=80&contract_type%5B%5D=82&limit=18&sort=date_desc',
    'https://www.elduenovende.com/properties/page/2/?limit=18&sort=date_desc',
    'https://www.elduenovende.com/properties/page/3/?limit=18&sort=date_desc'
  ];
  
  const allUniqueLinks = new Set();
  
  for (const listingUrl of listingUrls) {
    console.log(`Fetching listing page: ${listingUrl}`);
    try {
      const res = await fetch(listingUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.error(`Failed to fetch listing page ${listingUrl}, status: ${res.status}`);
        continue;
      }
      const html = await res.text();

      // Extract all property detail links
      const linkRegex = /href=["'](https:\/\/www\.elduenovende\.com\/properties\/[^"'\s>]+)\/?["']/gi;
      let match;
      while ((match = linkRegex.exec(html)) !== null) {
        const link = match[1];
        if (!link.includes('/feed/') && !link.includes('?')) {
          const normalized = link.endsWith('/') ? link : link + '/';
          allUniqueLinks.add(normalized);
        }
      }
    } catch (err) {
      console.error(`Error fetching listing page ${listingUrl}:`, err.message);
    }
  }

  const uniqueLinks = [...allUniqueLinks];
  console.log(`Found a total of ${uniqueLinks.length} unique properties to scrape across all pages.`);

  let insertedCount = 0;
  for (const link of uniqueLinks) {
    try {
      const prop = await scrapeProperty(link);
      if (prop) {
        // Upsert into Supabase
        const { error } = await supabase.from('properties').upsert(prop);
        if (error) {
          console.error(`Error saving property "${prop.title}" to DB:`, error);
        } else {
          console.log(`Successfully saved "${prop.title}" to DB.`);
          insertedCount++;
        }
      }
    } catch (err) {
      console.error(`Error processing ${link}:`, err.message);
    }
  }

  console.log(`\nScraping complete. Saved/updated ${insertedCount} properties in the database.`);
  process.exit(0);
}

run();
