"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bed, Bath, Square, MapPin } from 'lucide-react';
import { TbBed, TbBath, TbRuler2 } from 'react-icons/tb';
import { getOptimizedImageUrl } from '@/lib/utils';
import { mockProperties, Property, mapDbToProperty, formatPropertyPrice } from '@/app/data/properties';
import { FeaturedCardSkeleton } from '@/app/components/PropertyCardSkeleton';
import { supabase } from '@/lib/supabase';

export default function FeaturedProperties() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('featured', true);
        if (error) throw error;
        if (data && data.length > 0) {
          setProperties(data.map(mapDbToProperty));
        } else {
          setProperties(mockProperties.filter(p => p.featured));
        }
      } catch (err) {
        console.warn("Error loading featured properties from Supabase. Falling back to local mocks:", err);
        setProperties(mockProperties.filter(p => p.featured));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

  return (
    <section className="bg-white py-24 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-none">
              Nuestra Mejor <span className="underline decoration-emerald-500 decoration-[3px] underline-offset-[5px]">Selección</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-snug">
              Inversiones inteligentes seguras y hogares excepcionales pensados para cada estilo de vida.
            </p>
            
            {/* View Listings Button */}
            <div className="pt-2">
              <Link href="/propiedades">
                <button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer flex items-center justify-center bg-emerald-500 text-slate-950 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  <span className="relative z-10 transition-all duration-500">
                    Ver Catálogo
                  </span>
                  <div className="absolute right-1 w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
              aria-label="Anterior"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full bg-slate-950 text-white hover:bg-slate-900 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md"
              aria-label="Siguiente"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex gap-4 lg:gap-5 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar w-screen -mx-4 sm:-mx-6 lg:w-full lg:mx-0 px-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
          }}
        >
          {loading ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <FeaturedCardSkeleton key={i} />
              ))}
            </>
          ) : (
            properties.map((property) => {
              const formattedPrice = formatPropertyPrice(property.price, property.moneda);

              return (
                <Link
                  key={property.id}
                  href={`/propiedades/${property.id}`}
                  className="w-[85vw] sm:w-[75vw] shrink-0 snap-center lg:w-[calc(25%-15px)] lg:shrink-0 lg:snap-start block cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
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

                      {/* Dueño Directo Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-[10px] font-semibold">
                          <MapPin className="h-3 w-3 text-white flex-shrink-0" />
                          Costa Rica
                        </span>
                      </div>

                      {/* Price Tag Overlay (like catalog cards) */}
                      <div className="absolute bottom-4 right-4 z-10 bg-slate-950 text-white font-bold px-4 py-2 rounded-2xl shadow-md text-sm">
                        {formattedPrice}
                      </div>

                      <img
                        src={getOptimizedImageUrl(property.image || '/images/placeholder.webp', 600)}
                        alt={property.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
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
                        {property.beds != null && (
                          <div className="flex items-center gap-1.5">
                            <img src="/icons-property/dormitorios.png" className="h-4.5 w-4.5 object-contain flex-shrink-0" alt="" />
                            <span className="font-semibold text-slate-700">{property.beds} Dorms</span>
                          </div>
                        )}
                        {property.baths != null && (
                          <div className="flex items-center gap-1.5">
                            <img src="/icons-property/baños.png" className="h-4.5 w-4.5 object-contain flex-shrink-0" alt="" />
                            <span className="font-semibold text-slate-700">{property.baths} Baños</span>
                          </div>
                        )}
                        {property.area != null && (
                          <div className="flex items-center gap-1.5">
                            <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain flex-shrink-0" alt="" />
                            <span className="font-semibold text-slate-700">{property.area} m²</span>
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                </Link>
              );
            })
          )}
          </div>
      </div>
    </section>
  );
}
