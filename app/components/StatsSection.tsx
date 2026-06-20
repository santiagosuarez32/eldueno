'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
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
 
          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
              Información de valor, guías prácticas y tendencias del mercado inmobiliario. Consejos prácticos de expertos para comprar, vender o alquilar propiedades de forma directa, segura y libre de intermediarios.
            </p>
          </motion.div>
        </div>
 
        {/* Bottom Cards Grid / Carousel */}
        <motion.div
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
              className="w-screen shrink-0 snap-center px-4 sm:px-6 lg:w-auto lg:shrink lg:snap-align-none lg:px-0 block cursor-pointer flex flex-col"
            >
              <div
                className="w-full bg-white border border-slate-200/60 rounded-[32px] overflow-hidden flex flex-col group transition-all duration-300 h-full shadow-none hover:shadow-xl hover:border-slate-200"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                {/* Content Box */}
                <div className="px-6 pt-5 pb-5 sm:px-10 sm:pt-6 sm:pb-6 flex flex-col flex-grow space-y-3 bg-white">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="text-emerald-600 font-bold">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
  
                  {/* Bottom link line */}
                  <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-slate-955 group-hover:text-emerald-500 transition-colors">
                    <span>Leer Artículo</span>
                    <div className="h-7 w-7 rounded-full bg-slate-950 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-slate-955 group-hover:rotate-45 shadow-sm">
                      <ArrowUpRight size={12} />
                    </div>
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
