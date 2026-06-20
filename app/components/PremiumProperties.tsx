'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { mockProperties } from '@/app/data/properties';

export default function PremiumProperties() {
  // Select 4 specific premium/featured properties for the section
  const premiumIds = ['prop-4', 'prop-2', 'prop-1', 'prop-3'];
  const premiumProperties = mockProperties.filter((p) => premiumIds.includes(p.id));

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler for the carousel
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const firstChild = carouselRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 24 : 694;
      const offset = direction === 'left' ? -cardWidth : cardWidth;
      
      carouselRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  };

  const typeLabels: Record<string, string> = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    comercial: 'Local Comercial',
    ph: 'PH',
    loft: 'Loft'
  };

  return (
    <section className="bg-white py-24 text-slate-900 overflow-hidden border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Propiedades premium
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:pt-8">
            <p className="text-slate-655 text-lg sm:text-xl leading-relaxed max-w-md">
              Una selección exclusiva de residencias singulares, diseñadas para superar toda expectativa. Directo con sus dueños.
            </p>
            
            {/* Carousel Arrows */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
              <button
                onClick={() => scroll('left')}
                className="h-12 w-12 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                aria-label="Anterior"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="h-12 w-12 rounded-full bg-slate-955 text-white hover:bg-slate-900 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
                aria-label="Siguiente"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex gap-0 lg:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar w-screen -mx-4 sm:-mx-6 lg:w-full lg:mx-0 px-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
          }}
        >
          {premiumProperties.map((property) => {
            const formattedPrice = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(property.price);
            const typeLabel = typeLabels[property.type] || property.type;

            return (
              <Link
                key={property.id}
                href={`/propiedades/${property.id}`}
                className="w-screen shrink-0 snap-center px-4 sm:px-6 lg:w-[670px] lg:shrink lg:snap-start lg:px-0 block cursor-pointer"
              >
                <div
                  className="w-full bg-white border border-slate-200/60 rounded-[32px] overflow-hidden flex flex-col group transition-all duration-300 h-full shadow-none"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {/* Floating Action Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                      <div 
                        className="bg-yellow-400 text-slate-955 font-light text-[12px] tracking-wider w-20 h-20 rounded-full flex flex-col items-center justify-center text-center p-2 transform scale-90 group-hover:scale-100 transition-all duration-300"
                      >
                        <span>Ver</span>
                        <span>detalle</span>
                      </div>
                    </div>

                    {/* Badges in the top-left */}
                    <div className="absolute top-4 left-4 z-20 flex flex-row items-center gap-1.5 max-w-[calc(100%-24px)] min-w-0">
                      {/* Property Type Badge */}
                      <span className="bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-semibold px-3 py-1.5 rounded-full border border-slate-200/40 shadow-sm shrink-0">
                        {typeLabel}
                      </span>
                      {/* Location Badge */}
                      <span className="bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 border border-slate-200/40 shadow-sm min-w-0">
                        <img src="/icons-filters/ubication.png" className="h-3.5 w-3.5 object-contain flex-shrink-0" alt="" />
                        <span className="truncate text-slate-700">{property.neighborhood}</span>
                      </span>
                    </div>

                    {/* Premium Tag on Top Right */}
                    <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-slate-955 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider shadow-md">
                      Premium
                    </div>

                    {/* Property Image */}
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Fallback pattern */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-200 -z-10 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                      <span className="text-xs text-slate-455 font-semibold">Imágenes de la propiedad</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-6 pt-5 pb-5 sm:px-10 sm:pt-6 sm:pb-6 flex flex-col flex-grow bg-white">
                    
                    {/* Title & Price Header */}
                    <div className="flex justify-between items-start gap-6 mb-2">
                      <div className="space-y-1.5 flex-grow">
                        <h3 className="text-base sm:text-xl font-semibold text-slate-955 group-hover:text-emerald-500 transition-colors line-clamp-1 leading-snug">
                          {property.title}
                        </h3>
                        <p className="text-xs sm:text-base text-slate-500 font-normal">
                          {property.neighborhood}, {property.location}
                        </p>
                      </div>

                      <div className="text-left shrink-0">
                        <span className="text-[10px] sm:text-xs text-slate-400 font-normal block">Precio:</span>
                        <span className="text-lg sm:text-2xl font-bold text-slate-955 block">{formattedPrice}</span>
                      </div>
                    </div>

                    {/* Property Specs */}
                    <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-base text-slate-605 font-normal mt-2.5">
                      {property.beds && (
                        <div className="flex items-center gap-2">
                          <img src="/icons-property/dormitorios.png" className="h-5 w-5 object-contain flex-shrink-0" alt="" />
                          <span>{property.beds} Dorms</span>
                        </div>
                      )}
                      {property.baths && (
                        <div className="flex items-center gap-2">
                          <img src="/icons-property/baños.png" className="h-5 w-5 object-contain flex-shrink-0" alt="" />
                          <span>{property.baths} Baños</span>
                        </div>
                      )}
                      {property.area && (
                        <div className="flex items-center gap-2">
                          <img src="/icons-property/m2.png" className="h-5 w-5 object-contain flex-shrink-0" alt="" />
                          <span>{property.area} m²</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
