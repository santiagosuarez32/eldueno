'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Property, formatPropertyPrice } from '@/app/data/properties';
import { getOptimizedImageUrl, supabaseImageLoader } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current) {
      setTimeout(() => {
        ScrollTrigger.refresh();
        gsap.fromTo(cardRef.current, 
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top bottom-=50px",
              once: true
            },
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out"
          }
        );
      }, 50);
    }
  }, { scope: cardRef });
  // Format price nicely
  const formattedPrice = formatPropertyPrice(property.price, property.moneda);

  const typeLabels: Record<string, string> = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    comercial: 'Local Comercial',
    ph: 'PH',
    loft: 'Loft'
  };
  const typeLabel = typeLabels[property.type] || property.type;

  return (
    <Link href={`/propiedades/${property.id}`} className="block h-full cursor-pointer">
      <div
        ref={cardRef}
        className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 flex flex-col group h-full shadow-md hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 hover:-translate-y-1.5"
      >
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <div className="absolute inset-0 bg-slate-955/5 group-hover:bg-transparent transition-colors duration-300 z-10" />
          

          
          {/* Badges */}
          <div className="absolute top-3 left-3 z-40 flex flex-wrap items-center gap-1.5 max-w-[calc(100%-24px)] min-w-0">
            {/* Property Type Badge */}
            <span className="bg-[#FFFF33] text-slate-950 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm shrink-0">
              {typeLabel}
            </span>
            {/* Status Badge */}
            {property.estado && (
              <span className={`text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm shrink-0 ${
                property.estado === 'vendida' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-[#FFFF33] text-slate-950'
              }`}>
                {property.estado.charAt(0).toUpperCase() + property.estado.slice(1).toLowerCase()}
              </span>
            )}
          </div>

          {/* Property Image */}
          <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out bg-slate-100">
            <Image
              src={getOptimizedImageUrl(property.image || '/images/placeholder.webp', 500)}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover relative z-10"
              priority={priority}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-4 right-4 z-40 flex flex-col items-end">
            {(property.precio_original && property.precio_original > property.price) ? (
              <span className="text-[#FFFF33] line-through text-xs sm:text-[13px] font-bold mb-0.5 drop-shadow-md bg-black/60 px-2 rounded-md border border-yellow-500/30">
                {formatPropertyPrice(property.precio_original, property.moneda)}
              </span>
            ) : (
              /* Fallback para rebajadas/remate sin precio original explícito */
              (property.estado === 'rebajada' || property.estado === 'remate') && (
                <span className="text-white/90 line-through text-xs sm:text-[13px] font-bold mb-0.5 drop-shadow-md bg-black/40 px-2 rounded-md">
                  {formatPropertyPrice(property.price * 1.15, property.moneda)}
                </span>
              )
            )}
            <div className={`flex flex-col items-end px-4 py-2 rounded-2xl shadow-md ${
              (property.estado === 'rebajada' || property.estado === 'remate' || (property.precio_original && property.precio_original > property.price)) ? 'bg-red-600 text-white' : 'bg-slate-950 text-white'
            }`}>
              <span className="font-bold leading-tight">{formattedPrice}</span>
              {property.precio_usd && (
                <span className="text-[10px] sm:text-[11px] opacity-90 font-semibold mt-0.5 leading-none">
                  US$ {property.precio_usd.toLocaleString('es-AR')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Neighborhood & Location */}
          <div className="flex items-center text-sm text-slate-500 mb-2 gap-1.5 font-medium">
            <img src="/icons-filters/ubication.png" className="h-4 w-4 object-contain shrink-0" alt="" />
            <span>{property.neighborhood}, {property.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-950 mb-2 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed font-normal">
            {property.description}
          </p>

          {/* Property Specs */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 py-4 border-t border-slate-100 text-slate-650 text-xs">
            {property.type === 'terreno' ? (
              (property.landArea || property.area) ? (
                <div className="flex items-center justify-center gap-2">
                  <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain" alt="" />
                  <span className="font-semibold text-slate-700">Terreno de {property.landArea || property.area} m²</span>
                </div>
              ) : null
            ) : property.type === 'comercial' ? (
              <>
                {Boolean(property.aposentos) && Number(property.aposentos) > 0 && (
                  <div className="flex flex-col items-center justify-center gap-1 text-center relative after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[15px] after:h-8 after:w-[1px] after:bg-slate-200 last:after:hidden">
                    <img src="/icons-property/dormitorios.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    <span className="font-semibold text-slate-700">{property.aposentos} Apos.</span>
                  </div>
                )}
                {Boolean(property.parkingSpaces) && Number(property.parkingSpaces) > 0 && (
                  <div className="flex flex-col items-center justify-center gap-1 text-center relative after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[15px] after:h-8 after:w-[1px] after:bg-slate-200 last:after:hidden">
                    <img src="/icons-property/cochera.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    <span className="font-semibold text-slate-700">{property.parkingSpaces} Estac.</span>
                  </div>
                )}
                {Boolean(property.area) && Number(property.area) > 0 && (
                  <div className="flex flex-col items-center justify-center gap-1 text-center relative after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[15px] after:h-8 after:w-[1px] after:bg-slate-200 last:after:hidden">
                    <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    <span className="font-semibold text-slate-700">{property.area} m²</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {Boolean(property.beds) && Number(property.beds) > 0 && (
                  <div className="flex flex-col items-center justify-center gap-1 text-center relative after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[15px] after:h-8 after:w-[1px] after:bg-slate-200 last:after:hidden">
                    <img src="/icons-property/dormitorios.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    <span className="font-semibold text-slate-700">{property.beds} Dorms</span>
                  </div>
                )}
                {Boolean(property.baths) && Number(property.baths) > 0 && (
                  <div className="flex flex-col items-center justify-center gap-1 text-center relative after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[15px] after:h-8 after:w-[1px] after:bg-slate-200 last:after:hidden">
                    <img src="/icons-property/baños.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    <span className="font-semibold text-slate-700">{property.baths} Baños</span>
                  </div>
                )}
                {Boolean(property.parkingSpaces) && Number(property.parkingSpaces) > 0 && (
                  <div className="flex flex-col items-center justify-center gap-1 text-center relative after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[15px] after:h-8 after:w-[1px] after:bg-slate-200 last:after:hidden">
                    <img src="/icons-property/cochera.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    <span className="font-semibold text-slate-700">{property.parkingSpaces} Estac.</span>
                  </div>
                )}
                {Boolean(property.constructionArea || property.area) && Number(property.constructionArea || property.area) > 0 && (
                  <div className="flex flex-col items-center justify-center gap-1 text-center relative after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[15px] after:h-8 after:w-[1px] after:bg-slate-200 last:after:hidden">
                    <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    <span className="font-semibold text-slate-700">{(property.constructionArea || property.area)} m²</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
