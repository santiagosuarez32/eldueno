'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { supabase } from '@/lib/supabase';
import { BlogPost, mapDbToBlogPost } from '@/app/data/blog';

export default function StatsSection() {
  const container = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (data && data.length > 0) {
          setBlogPosts(data.map(mapDbToBlogPost));
        }
      } catch (err) {
        console.warn("Error loading blogs for StatsSection:", err);
      }
    }
    loadBlogs();
  }, []);

  useGSAP(() => {
    gsap.from(".stats-head", {
      scrollTrigger: {
        trigger: ".stats-head",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    gsap.from(".stats-desc", {
      scrollTrigger: {
        trigger: ".stats-desc",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.2
    });

    gsap.from(".stats-grid", {
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: 0.4
    });
  }, { scope: container });

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const firstChild = carouselRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 320;
      const offset = direction === 'left' ? -cardWidth : cardWidth;
      
      carouselRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  };



  return (
    <section id="recursos-blog" ref={container} className="bg-white py-24 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-start">
          {/* Left: Heading */}
          <div
            className="stats-head"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Recursos y Guías útiles
            </h2>
          </div>
 
          {/* Right: Description & Arrows */}
          <div
            className="stats-desc flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-lg">
              Información de valor, guías prácticas y tendencias del mercado inmobiliario. Consejos prácticos de expertos para comprar, vender o alquilar propiedades de forma segura.
            </p>

            {/* Carousel Arrows (Mobile/Tablet only) */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto lg:hidden">
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
        </div>
 
        {/* Bottom Cards Grid / Carousel */}
        <div
          ref={carouselRef}
          className="stats-grid flex lg:grid gap-0 lg:gap-6 overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 snap-x snap-mandatory scroll-smooth hide-scrollbar w-screen -mx-4 sm:-mx-6 lg:w-full lg:mx-0 px-4 lg:px-0 lg:grid-cols-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {blogPosts.map((post, idx) => (
            <Link
              key={idx}
              href={`/blog/${post.slug}`}
              onClick={() => window.history.replaceState(null, '', '#recursos-blog')}
              className="w-[85vw] sm:w-[320px] lg:w-auto shrink-0 snap-center px-4 lg:shrink lg:snap-align-none lg:px-0 block cursor-pointer flex flex-col group"
            >
              <div className="w-full bg-white flex flex-col transition-all duration-300 h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100 rounded-[24px]">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm rounded-full">
                    {post.category}
                  </div>
                </div>
                
                {/* Content Box (No side padding, aligns with image) */}
                <div className="pt-5 flex flex-col flex-grow bg-white">
                  <div className="text-[14px] text-[#538792] font-normal mb-3">
                    {post.date}
                  </div>
                  
                  <h3 className="text-[22px] sm:text-[24px] font-bold text-slate-950 tracking-tight group-hover:text-[#FFFF33] transition-colors leading-[1.3] mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-6 font-normal line-clamp-3">
                    {post.excerpt}
                  </p>
  
                  {/* Bottom link line */}
                  <div className="mt-auto inline-flex items-center gap-2 text-[15px] font-normal text-slate-700 pb-1 border-b border-slate-300 w-fit group-hover:border-[#FFFF33] group-hover:text-[#FFFF33] transition-colors">
                    Consultar
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#FFFF33]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
