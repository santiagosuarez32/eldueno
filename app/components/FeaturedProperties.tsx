'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bed, Bath, Square, MapPin } from 'lucide-react';
import { TbBed, TbBath, TbRuler2 } from 'react-icons/tb';
import { mockProperties } from '@/app/data/properties';

export default function FeaturedProperties() {
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

  return (
    <section className="bg-white py-24 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-4 lg:px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-none">
              Propiedades <span className="underline decoration-emerald-500 decoration-[3px] underline-offset-[5px]">Destacadas</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-snug">
              Propiedades exclusivas seleccionadas a mano, con ubicaciones privilegiadas y diseño destacado. Directo con el dueño.
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
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar -mx-4 px-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
          }}
        >
            {mockProperties.filter(property => property.featured).map((property) => {
              const formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(property.price);

              return (
                <Link
                  key={property.id}
                  href={`/propiedades/${property.id}`}
                  className="w-[300px] sm:w-[500px] md:w-[580px] lg:w-[670px] flex-shrink-0 snap-start block cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-white border border-slate-200/60 rounded-[32px] overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      {/* Floating Action Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                        <div 
                          className="bg-yellow-400 text-slate-955 font-light text-[12px] tracking-wider w-20 h-20 rounded-full flex flex-col items-center justify-center text-center p-2 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl"
                        >
                          <span>Ver</span>
                          <span>detalle</span>
                        </div>
                      </div>

                      {/* Dueño Directo Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-[10px] font-semibold shadow-sm">
                          <MapPin className="h-3 w-3 text-white flex-shrink-0" />
                          Costa Rica
                        </span>
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
                          <h3 className="text-base sm:text-xl font-semibold text-slate-950 group-hover:text-emerald-500 transition-colors line-clamp-1 leading-snug">
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
                        <div className="flex items-center gap-2">
                          <img src="/icons-property/dormitorios.png" className="h-5 w-5 object-contain flex-shrink-0" alt="" />
                          <span>{property.beds} Dorms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="/icons-property/baños.png" className="h-5 w-5 object-contain flex-shrink-0" alt="" />
                          <span>{property.baths} Baños</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="/icons-property/m2.png" className="h-5 w-5 object-contain flex-shrink-0" alt="" />
                          <span>{property.area} m²</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

      </div>
    </section>
  );
}
