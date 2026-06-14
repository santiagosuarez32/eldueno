'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
              Disfrutá de la mejor calidad de vida
            </h2>
          </motion.div>

          {/* Right: Description & Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-10">
              Encontrá la propiedad de tus sueños sin comisiones inmobiliarias. Conectamos directamente a dueños y compradores para una experiencia transparente, ágil y segura.
            </p>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-2">
                  <AnimatedCounter value={100} prefix="+" />
                </h3>
                <p className="text-sm sm:text-base text-slate-500 font-medium">Propiedades</p>
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-2">
                  <AnimatedCounter value={60} prefix="+" suffix="K" />
                </h3>
                <p className="text-sm sm:text-base text-slate-500 font-medium">Usuarios</p>
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-2">
                  <AnimatedCounter value={70} prefix="+" suffix="K" />
                </h3>
                <p className="text-sm sm:text-base text-slate-500 font-medium">Visitas</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          {/* Main Large Image */}
          <div className="md:col-span-2 relative rounded-[32px] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80" 
              alt="Casa de lujo exterior" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          
          {/* Two Smaller Stacked Images */}
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="flex-1 relative rounded-[32px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Interior moderno" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="flex-1 relative rounded-[32px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Sala de estar" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
