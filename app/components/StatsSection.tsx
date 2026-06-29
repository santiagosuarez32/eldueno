'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalDuration = duration * 1000;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // Easing out cubic for premium smooth feel
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeOutCubic * (end - start) + start));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const blogPosts = [
    {
      slug: 'como-vender-sin-comisiones',
      category: 'Guía Práctica',
      date: '12 de Junio, 2026',
      title: 'Cómo vender tu propiedad sin comisiones inmobiliarias',
      excerpt: 'Descubrí los pasos clave para publicar, promocionar y negociar tu inmueble de forma directa y segura ahorrando miles de dólares.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'documentos-compra-directa',
      category: 'Legal',
      date: '8 de Junio, 2026',
      title: 'Documentos necesarios para comprar directo al dueño',
      excerpt: 'Todo lo que necesitás saber sobre boletos de compraventa, escrituras y trámites legales para operar de forma transparente y protegida.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'zonas-crecimiento-costa-rica',
      category: 'Tendencias',
      date: '3 de Junio, 2026',
      title: 'Zonas con mayor crecimiento y retorno en Costa Rica',
      excerpt: 'Analizamos los barrios y distritos que están experimentando el mayor auge inmobiliario, ideales para invertir o mudarte.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'consejos-negociacion-directa',
      category: 'Negociación',
      date: '1 de Junio, 2026',
      title: 'Consejos para negociar el precio cara a cara con el dueño',
      excerpt: 'Aprendé las mejores técnicas para pactar el valor de tu futura casa de forma transparente, logrando un acuerdo justo para ambas partes.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="bg-white py-24 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-start">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Recursos y Guías útiles
            </h2>
          </motion.div>
 
          {/* Right: Description & Arrows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-lg">
              Información de valor, guías prácticas y tendencias del mercado inmobiliario. Consejos prácticos de expertos para comprar, vender o alquilar propiedades de forma directa, segura.
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
          </motion.div>
        </div>
 
        {/* Bottom Cards Grid / Carousel */}
        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex lg:grid gap-0 lg:gap-6 overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 snap-x snap-mandatory scroll-smooth hide-scrollbar w-screen -mx-4 sm:-mx-6 lg:w-full lg:mx-0 px-4 lg:px-0 lg:grid-cols-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {blogPosts.map((post, idx) => (
            <Link
              key={idx}
              href={`/blog/${post.slug}`}
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
                  
                  <h3 className="text-[22px] sm:text-[24px] font-bold text-slate-950 tracking-tight group-hover:text-amber-500 transition-colors leading-[1.3] mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-6 font-normal line-clamp-3">
                    {post.excerpt}
                  </p>
  
                  {/* Bottom link line */}
                  <div className="mt-auto inline-flex items-center gap-2 text-[15px] font-normal text-slate-700 pb-1 border-b border-slate-300 w-fit group-hover:border-amber-500 group-hover:text-amber-500 transition-colors">
                    Consultar
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-amber-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
