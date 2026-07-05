"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bed, Bath, Square, MapPin } from 'lucide-react';
import { TbBed, TbBath, TbRuler2 } from 'react-icons/tb';
import { getOptimizedImageUrl, supabaseImageLoader } from '@/lib/utils';
import { mockProperties, Property, mapDbToProperty, formatPropertyPrice } from '@/app/data/properties';
import { FeaturedCardSkeleton } from '@/app/components/PropertyCardSkeleton';
import PropertyCard from '@/app/components/PropertyCard';
import { supabase } from '@/lib/supabase';

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    if (loading) return;
    
    // Give DOM a tick to paint the new cards before animating
    setTimeout(() => {
      ScrollTrigger.refresh();
      gsap.fromTo(".featured-card", 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".featured-grid",
            start: "top bottom-=50px",
            once: true
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }, 50);
  }, { scope: sectionRef, dependencies: [loading] });

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          const featuredData = data.filter(d => d.owner?.bestChoice === true);
          setProperties(featuredData.map(mapDbToProperty).slice(0, 8));
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.warn("Error loading featured properties from Supabase:", err);
        setProperties([]);
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
    <section id="featured-properties" ref={sectionRef} className="bg-white py-24 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-none">
              Propiedades <span className="underline decoration-emerald-500 decoration-[3px] underline-offset-[5px]">Destacadas</span>
            </h2>
            <p className="text-slate-500 text-lg sm:text-2xl leading-snug">
              Inversiones seguras y hogares excepcionales pensados para cada estilo de vida.
            </p>
            
            {/* View Listings Button */}
            <div className="pt-2">
              <Link href="/propiedades" onClick={() => window.history.replaceState(null, '', '#featured-properties')}>
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
          className="featured-grid flex gap-4 lg:gap-5 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar w-screen -mx-4 sm:-mx-6 lg:w-full lg:mx-0 px-4"
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
            properties.map((property, index) => {
              return (
                <div
                  key={property.id}
                  onClick={() => window.history.replaceState(null, '', '#featured-properties')}
                  className="w-[85vw] sm:w-[75vw] shrink-0 snap-center lg:w-[calc(25%-15px)] lg:shrink-0 lg:snap-start block h-full featured-card"
                >
                  <PropertyCard property={property} priority={index < 4} />
                </div>
              );
            })
          )}
          </div>
      </div>
    </section>
  );
}
