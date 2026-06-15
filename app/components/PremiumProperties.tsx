'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, ArrowLeft, Bed, Bath, Square } from 'lucide-react';
import { mockProperties } from '@/app/data/properties';

export default function PremiumProperties() {
  // Select 4 specific premium/featured properties for the section
  const premiumIds = ['prop-4', 'prop-2', 'prop-1', 'prop-3'];
  const premiumProperties = mockProperties.filter((p) => premiumIds.includes(p.id));

  // State to track the currently active (expanded) property index
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Navigation handlers to cycle activeIndex
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : premiumProperties.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < premiumProperties.length - 1 ? prev + 1 : 0));
  };

  // Automatically scroll container to center the active card (only relevant on mobile/tablet scroll)
  useEffect(() => {
    if (carouselRef.current && window.innerWidth < 1024) {
      const activeChild = carouselRef.current.children[activeIndex] as HTMLElement;
      if (activeChild) {
        const containerWidth = carouselRef.current.offsetWidth;
        const childOffset = activeChild.offsetLeft;
        const childWidth = activeChild.offsetWidth;
        
        carouselRef.current.scrollTo({
          left: childOffset - (containerWidth / 2) + (childWidth / 2),
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  // Currency formatter
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
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
        
        {/* Section Header (matching Nuestros Servicios layout: title left, text & arrows right) */}
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
                onClick={handlePrev}
                className="h-12 w-12 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                aria-label="Anterior"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-slate-950 text-white hover:bg-slate-900 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
                aria-label="Siguiente"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Accordion / Expandable Row inside a scrollable container with vertical padding to prevent clipping */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto lg:overflow-x-visible py-6 snap-x snap-mandatory scroll-smooth hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 w-full"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {premiumProperties.map((property, idx) => {
            const isActive = idx === activeIndex;
            const typeLabel = typeLabels[property.type] || property.type;

            return (
              <div
                key={property.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between flex-shrink-0 lg:flex-shrink snap-start h-[450px] lg:h-[460px] ${
                  isActive 
                    ? 'w-[320px] sm:w-[480px] lg:w-auto lg:flex-[1.6] bg-white border border-slate-100/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] p-3.5 rounded-[32px]' 
                    : 'w-[280px] lg:w-auto lg:flex-[1] bg-slate-200 hover:scale-[1.005] p-0 rounded-[32px] shadow-sm'
                }`}
              >
                {/* Image Wrapper (fluidly changes height and rounded corners without visual jumps) */}
                <div className={`relative w-full overflow-hidden transition-all duration-500 ease-out ${
                  isActive ? 'h-[220px] rounded-[20px]' : 'h-full rounded-[32px]'
                }`}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Dark overlay for inactive text readability, fades out when active */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`} />

                  {/* Badges in the top-left, matching main properties catalog card badges */}
                  <div className={`absolute top-3 left-3 z-20 flex flex-row items-center gap-1.5 max-w-[calc(100%-24px)] min-w-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    {/* Property Type Badge */}
                    <span className="bg-white/95 backdrop-blur-sm text-slate-700 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200/40 shadow-sm shrink-0">
                      {typeLabel}
                    </span>
                    {/* Location Badge */}
                    <span className="bg-white/95 backdrop-blur-sm text-slate-700 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 border border-slate-200/40 shadow-sm min-w-0">
                      <img src="/icons-filters/ubication.png" className="h-3 w-3 object-contain flex-shrink-0" alt="" />
                      <span className="truncate text-slate-700">{property.neighborhood}</span>
                    </span>
                  </div>

                  {/* Premium Tag on Top Right */}
                  <div className={`absolute top-3 right-3 z-20 bg-yellow-400 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow-md transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    Premium
                  </div>
                </div>

                {/* INACTIVE STATE TEXT OVERLAY */}
                <div className={`absolute bottom-6 left-6 right-6 z-10 transition-all duration-500 ease-out ${
                  isActive ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="text-amber-400 text-[10px] font-bold tracking-wider">
                    {property.neighborhood}
                  </div>
                  <h3 className="text-white text-sm font-bold leading-snug line-clamp-2">
                    {property.title}
                  </h3>
                </div>

                {/* ACTIVE STATE DETAILS (fades in and takes height only when active) */}
                <div className={`transition-all duration-500 ease-out flex flex-col justify-between flex-grow ${
                  isActive ? 'opacity-100 h-auto pt-4 px-2 pb-1' : 'opacity-0 h-0 overflow-hidden pointer-events-none'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                        {typeLabel}
                      </span>
                      <span className="text-base font-extrabold text-slate-900">
                        {formatUSD(property.price)}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-950 leading-snug line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 font-normal">
                      {property.description}
                    </p>
                  </div>

                  {/* Specs and Action Link */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-655">
                      {property.beds && (
                        <span className="flex items-center gap-1">
                          <img src="/icons-property/dormitorios.png" className="h-3.5 w-3.5 object-contain" alt="" />
                          {property.beds} Dorms
                        </span>
                      )}
                      {property.baths && (
                        <span className="flex items-center gap-1">
                          <img src="/icons-property/baños.png" className="h-3.5 w-3.5 object-contain" alt="" />
                          {property.baths} Baños
                        </span>
                      )}
                      {property.area && (
                        <span className="flex items-center gap-1">
                          <img src="/icons-property/m2.png" className="h-3.5 w-3.5 object-contain" alt="" />
                          {property.area} m²
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/propiedades/${property.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Ver detalle
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
