"use client";

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { mockProperties, Property, mapDbToProperty, formatPropertyPrice } from '@/app/data/properties';
import { getOptimizedImageUrl, supabaseImageLoader } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

export default function PremiumProperties() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*');
          
        if (error) throw error;
        if (data && data.length > 0) {
          const premiumData = data.filter(d => d.owner?.premium === true);
          const shuffled = premiumData.sort(() => 0.5 - Math.random());
          const random8 = shuffled.slice(0, 8).map(mapDbToProperty);
          setProperties(random8);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.warn("Error loading premium properties from Supabase:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : properties.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < properties.length - 1 ? prev + 1 : 0));
  };

  // Scroll logic for responsive screen sizes
  useEffect(() => {
    if (carouselRef.current && properties.length > 0) {
      // Use setTimeout to allow the CSS width transition to start before calculating offsets
      setTimeout(() => {
        if (!carouselRef.current) return;
        const activeCard = carouselRef.current.children[activeIndex] as HTMLElement;
        if (activeCard) {
          const containerWidth = carouselRef.current.offsetWidth;
          const cardWidth = activeCard.offsetWidth;
          const cardLeft = activeCard.offsetLeft;
          const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
          
          carouselRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth',
          });
        }
      }, 50);
    }
  }, [activeIndex, properties]);

  const typeLabels: Record<string, string> = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    comercial: 'Local Comercial',
    ph: 'PH',
    loft: 'Loft'
  };



  return (
    <section className="bg-gradient-to-br from-[#ffe600] via-[#ffcc00] to-[#ffaa00] py-12 text-slate-900 overflow-hidden rounded-[40px] mx-4 sm:mx-6 lg:mx-8 my-12 shadow-2xl">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-8 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Propiedades premium
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:pt-8">
            <p className="text-slate-800 text-lg sm:text-xl leading-relaxed max-w-md">
              Una selección exclusiva de propiedades singulares, diseñadas para superar toda expectativa.
            </p>
            
            {/* Carousel Arrows */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
              <button
                onClick={handlePrev}
                className="h-12 w-12 rounded-full border border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Anterior"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-slate-950 text-white hover:bg-slate-800 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
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
          className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-6 hide-scrollbar -mx-4 px-4 snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:snap-none lg:-mx-8 lg:px-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
          }}
        >
          {loading ? (
            <>
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="flex-shrink-0 snap-center lg:snap-align-none">
                  {/* Mobile Skeleton */}
                  <div className="block lg:hidden w-[85vw] sm:w-[75vw] h-[400px] bg-slate-100 rounded-[32px] overflow-hidden relative">
                    <div className="absolute inset-0 skeleton-shimmer rounded-[32px]" />
                  </div>
                  {/* Desktop Skeleton */}
                  <div
                    className={`hidden lg:block relative h-[420px] rounded-[32px] overflow-hidden ${
                      idx === 0
                        ? 'w-[480px] bg-slate-100 p-3.5'
                        : 'w-[320px] bg-slate-200 p-0'
                    }`}
                  >
                    <div className="absolute inset-0 skeleton-shimmer rounded-[32px]" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            properties.map((property, idx) => {
              const isActive = idx === activeIndex;
              const typeLabel = typeLabels[property.type] || property.type;

              return (
                <div key={property.id} className="flex-shrink-0 snap-center lg:snap-align-none flex">
                  {/* MOBILE CARD (Matches FeaturedProperties) */}
                  <Link
                    href={`/propiedades/${property.id}`}
                    className="block lg:hidden w-[85vw] sm:w-[75vw] h-auto cursor-pointer"
                  >
                    <div className="w-full bg-white border border-slate-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 rounded-[32px] overflow-hidden flex flex-col group transition-all duration-300 h-full">
                      {/* Image Container */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        {/* Floating Action Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                          <div 
                            className="bg-yellow-400 text-slate-955 font-bold text-sm px-6 py-2.5 rounded-full flex items-center justify-center text-center transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl"
                          >
                            <span className="whitespace-nowrap">Ver detalle</span>
                          </div>
                        </div>

                        {/* Sold/Rented Overlay */}
                        {(property.vendido || property.alquilado) && (
                          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                            {/* Banner Diagonal */}
                            <div className={`absolute top-6 -right-12 w-48 text-center py-1.5 font-black text-[10px] sm:text-xs tracking-widest text-white transform rotate-45 shadow-lg ${property.vendido ? 'bg-red-600' : 'bg-blue-600'}`}>
                              {property.vendido ? 'VENDIDA' : 'ALQUILADA'}
                            </div>
                            {/* Overlay Semitransparente */}
                            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px]" />
                          </div>
                        )}

                        {/* Tags */}
                        <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-slate-955 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow-md">
                          Premium
                        </div>
                        <div className="absolute top-4 right-4 z-10">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-[10px] font-semibold">
                            Costa Rica
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 z-10 bg-slate-950 text-white font-bold px-4 py-2 rounded-2xl shadow-md text-sm">
                          {formatPropertyPrice(property.price, property.moneda)}
                        </div>
                        <Image
                          src={getOptimizedImageUrl(property.image || '/images/placeholder.webp', 500)}
                          alt={property.title}
                          fill
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 75vw, 25vw"
                          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          priority={idx < 2}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div className="px-6 pt-5 pb-5 sm:px-8 sm:pt-5 sm:pb-5 flex flex-col flex-grow bg-white">
                        
                        {/* Location */}
                        <div className="flex items-center text-xs text-slate-500 mb-2 gap-1.5 font-medium">
                          <img src="/icons-filters/ubication.png" className="h-4 w-4 object-contain shrink-0" alt="" />
                          <span>{property.neighborhood}, {property.location}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-emerald-500 transition-colors line-clamp-1 leading-snug mb-4">
                          {property.title}
                        </h3>

                        {/* Property Specs */}
                        <div className="flex items-center gap-5 sm:gap-6 text-xs text-slate-600 font-medium pt-3 border-t border-slate-100 mt-auto">
                          {Boolean(property.beds) && Number(property.beds) > 0 && (
                            <div className="flex items-center gap-1.5">
                              <img src="/icons-property/dormitorios.png" className="h-4.5 w-4.5 object-contain flex-shrink-0" alt="" />
                              <span className="font-semibold text-slate-700">{property.beds} Dorms</span>
                            </div>
                          )}
                          {Boolean(property.baths) && Number(property.baths) > 0 && (
                            <div className="flex items-center gap-1.5">
                              <img src="/icons-property/baños.png" className="h-4.5 w-4.5 object-contain flex-shrink-0" alt="" />
                              <span className="font-semibold text-slate-700">{property.baths} Baños</span>
                            </div>
                          )}
                          {Boolean(property.area) && Number(property.area) > 0 && (
                            <div className="flex items-center gap-1.5">
                              <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain flex-shrink-0" alt="" />
                              <span className="font-semibold text-slate-700">{property.area} m²</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* DESKTOP CARD (Original code wrapped to hide on mobile) */}
                  <div
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      if (isActive) {
                        router.push(`/propiedades/${property.id}`);
                      } else {
                        setActiveIndex(idx);
                      }
                    }}
                    className={`hidden lg:flex relative transition-all duration-500 ease-out cursor-pointer flex-col justify-between flex-shrink-0 h-[420px] ${
                      isActive 
                        ? 'w-[480px] bg-white border border-slate-100/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] p-3.5 rounded-[32px]' 
                        : 'w-[320px] bg-slate-200 hover:scale-[1.02] p-0 rounded-[32px] shadow-sm'
                    }`}
                  >
                  {/* Image Wrapper (fluidly changes height and rounded corners without visual jumps) */}
                  <div className={`relative w-full overflow-hidden transition-all duration-500 ease-out ${
                    isActive ? 'h-[200px] rounded-[20px]' : 'h-full rounded-[32px]'
                  }`}>
                    <Image
                      src={getOptimizedImageUrl(property.image || '/images/placeholder.webp', 600)}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={true}
                    />
                    {/* Dark overlay for inactive text readability, fades out when active */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent transition-opacity duration-500 ${
                      isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`} />

                    {/* Sold/Rented Overlay */}
                    {(property.vendido || property.alquilado) && (
                      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                        {/* Banner Diagonal */}
                        <div className={`absolute top-6 -right-12 w-48 text-center py-1.5 font-black text-[10px] sm:text-xs tracking-widest text-white transform rotate-45 shadow-lg ${property.vendido ? 'bg-red-600' : 'bg-blue-600'}`}>
                          {property.vendido ? 'VENDIDA' : 'ALQUILADA'}
                        </div>
                        {/* Overlay Semitransparente */}
                        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px]" />
                      </div>
                    )}

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
                    <div className={`absolute top-3 right-3 z-20 bg-yellow-400 text-slate-955 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow-md transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                      Premium
                    </div>

                    {/* Price Tag Overlay (Bottom Right) */}
                    <div className={`absolute bottom-3 right-3 z-20 bg-slate-950 text-white font-bold px-4 py-1.5 rounded-2xl shadow-md text-sm transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                      {formatPropertyPrice(property.price, property.moneda)}
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
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-slate-955 leading-snug line-clamp-1 mt-1">
                        {property.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 font-normal">
                        {property.description}
                      </p>
                    </div>

                    {/* Specs and Action Link */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-655">
                        {Boolean(property.beds) && Number(property.beds) > 0 && (
                          <span className="flex items-center gap-1">
                            <img src="/icons-property/dormitorios.png" className="h-3.5 w-3.5 object-contain" alt="" />
                            {property.beds} Dorms
                          </span>
                        )}
                        {Boolean(property.baths) && Number(property.baths) > 0 && (
                          <span className="flex items-center gap-1">
                            <img src="/icons-property/baños.png" className="h-3.5 w-3.5 object-contain" alt="" />
                            {property.baths} Baños
                          </span>
                        )}
                        {Boolean(property.area) && Number(property.area) > 0 && (
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
                </div>
              );
            })
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-4 pb-4">
          <Link href="/propiedades">
            <button className="relative text-sm font-bold rounded-full h-14 px-8 group transition-all duration-500 hover:-translate-y-1 w-fit overflow-hidden cursor-pointer flex items-center justify-center bg-slate-950 text-white shadow-xl hover:shadow-2xl">
              <span className="relative z-10 flex items-center gap-2">
                Ver todas las propiedades
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
