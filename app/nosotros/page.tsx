'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { FlowButton } from '@/app/components/FlowButton';

// Stats counter sub-component
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
    <span ref={ref} className="inline-block tabular-nums font-extrabold text-4xl sm:text-5xl lg:text-6xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function NosotrosPage() {
  const stats = [
    { value: 0, prefix: '', suffix: '%', label: 'Comisiones de intermediarios', desc: 'No cobramos ningún tipo de comisión, lo que permite un trato directo y transparente.' },
    { value: 7000, prefix: '+', suffix: '', label: 'Propiedades directas', desc: 'Un catálogo amplio y en crecimiento constante a lo largo de todo el país.' },
    { value: 18, prefix: '+', suffix: ' Años', label: 'Trayectoria en el mercado', desc: 'Acompañando a miles de familias y dueños directos a concretar sus operaciones.' },
    { value: 100, prefix: '', suffix: '%', label: 'Listados verificados', desc: 'Validamos detalladamente cada publicación para garantizar la veracidad de los datos.' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-slate-950 text-slate-100">
        
        {/* HERO SECTION - Ref. Dribbble "Poperty" style */}
        <section className="relative h-screen flex items-end pb-16 sm:pb-24 overflow-hidden bg-slate-950">
          {/* Background image & overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/about-hero.webp"
              alt="Luxury minimalist interior architecture with tall arches"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark gradient mapping (Dribbble dark look) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.55) 60%, rgba(0, 0, 0, 0.75) 100%)'
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.08) 100%)'
              }}
            />
          </div>

          {/* Hero Content aligned bottom-left */}
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-4xl space-y-6">

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl sm:text-6xl lg:text-7.5xl font-bold tracking-tight text-white leading-[1.05]"
                >
                  Descubrí tu espacio ideal. <br />
                  <span className="text-emerald-400">Sin intermediarios.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed"
                >
                  Propiedades exclusivas, precios reales y trato directo. Hacemos posible una experiencia de compra y venta transparente, ágil y libre de comisiones inmobiliarias.
                </motion.p>
              </div>

              {/* Action and Scroll Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Link href="/propiedades">
                  <FlowButton text="Explorar Propiedades" variant="primary" />
                </Link>
                <a href="#stats">
                  <button className="h-12 px-6 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-slate-950 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                    Conocer Más
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECOND SECTION - STATS SECTION (Light styled) */}
        <section id="stats" className="bg-white text-slate-900 py-16 sm:py-20 relative overflow-hidden border-t border-slate-100 border-b border-slate-100">
          
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">Nuestra presencia y confiabilidad</h2>
              <p className="text-slate-500 text-base sm:text-lg">
                La solidez de una plataforma diseñada para conectar personas y simplificar negociaciones a escala nacional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 flex flex-col space-y-3 shadow-sm"
                >
                  <div className="text-emerald-600 flex items-baseline gap-0.5">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{stat.label}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THIRD SECTION - Dribbble "Trusted Partner" style */}
        <section id="historia" className="bg-white text-slate-900 py-14 sm:py-20 relative">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* Left Column (5/12 width) */}
              <div className="lg:col-span-5 flex flex-col">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1] mb-10">
                  Tu socio de confianza <br />
                  en bienes raíces
                </h2>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="rounded-[32px] overflow-hidden shadow-xl h-[360px] sm:h-[460px] w-full bg-slate-100"
                >
                  <img
                    src="/images/about-living-room.webp"
                    alt="Interior de sala de estar moderna"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Right Column (7/12 width) */}
              <div className="lg:col-span-7 flex flex-col space-y-12 lg:pt-8">
                {/* Two side-by-side images */}
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-[32px] overflow-hidden shadow-md h-[170px] sm:h-[220px] w-full bg-slate-100"
                  >
                    <img
                      src="/images/about-villa-concrete.webp"
                      alt="Exterior de casa de hormigón moderna"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="rounded-[32px] overflow-hidden shadow-md h-[170px] sm:h-[220px] w-full bg-slate-100"
                  >
                    <img
                      src="/images/about-villa-balcony.webp"
                      alt="Apartamento moderno con balcón y árboles"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* About Us Title and 2 Column Description */}
                <div className="space-y-4">
                  <span className="text-base text-slate-500 block">Sobre nosotros</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                    <p className="text-slate-650 text-base leading-relaxed">
                      <strong>El Dueño Vende</strong> es una compañía especializada en bienes raíces, brindamos la mejor asesoría en compra, venta y renta de propiedades dentro del área metropolitana. También, brindamos oportunidades de inversión y soluciones de crédito.
                    </p>
                    <p className="text-slate-555 text-base leading-relaxed">
                      Con más de 30 años de experiencia nos desenvolvemos con agilidad en el mercado de bienes raíces; cientos de personas y empresas que han confiado sus inversiones a El Dueño Vende dan respaldo de nuestra trayectoria.
                    </p>
                  </div>
                </div>

                {/* Highlight Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="pt-6"
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight leading-tight">
                    Propiedades exclusivas, precios competitivos y trato directo — todo en un solo lugar.
                  </h3>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
