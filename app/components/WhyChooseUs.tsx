'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: 'Compra y venta de propiedades',
      description: 'Buscá y negociá directamente con el dueño de la propiedad. Sin intermediarios, sin comisiones y con comunicación directa desde el primer día.',
      link: '/propiedades',
      buttonText: 'Ver Catálogo',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      counters: [
        { value: '1,200+', label: 'Transacciones' },
        { value: '0%', label: 'Comisión Inmobiliaria' }
      ]
    },
    {
      title: 'Préstamos hipotecarios',
      description: 'Accedé a financiamiento y opciones de crédito hipotecario adaptadas a tus necesidades para adquirir tu propiedad rápidamente.',
      link: '/contacto',
      buttonText: 'Consultar Préstamo',
      image: '/services/creditos.jpeg',
      counters: [
        { value: '95%', label: 'Tasa de Aprobación' },
        { value: '24 hs', label: 'Pre-aprobación' }
      ]
    },
    {
      title: 'Servicios de arquitectura',
      description: 'Consultá por remodelaciones, planos y asesoría técnica de diseño para transformar tu nuevo espacio con profesionales.',
      link: '/contacto',
      buttonText: 'Solicitar Asesoría',
      image: '/services/arquitectura.jpeg',
      counters: [
        { value: '150+', label: 'Proyectos Entregados' },
        { value: '15+', label: 'Arquitectos Asociados' }
      ]
    }
  ];

  return (
    <section className="bg-white py-24 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Nuestros servicios
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 lg:pt-8"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
              Desde la compra-venta directa hasta el diseño de tu próximo espacio y opciones de financiamiento a tu medida, te acompañamos para que operes con total confianza.
            </p>
          </motion.div>
        </div>

        {/* Bottom Accordion & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Accordion List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 divide-y divide-slate-100"
          >
            {features.map((feature, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div key={idx} className="py-6 first:pt-0 last:pb-0">
                  <button 
                    onClick={() => setActiveIndex(idx)}
                    className="w-full flex items-center gap-4 text-left font-bold text-slate-950 text-xl sm:text-2xl hover:text-emerald-600 transition-colors py-2"
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200/60'}`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                    <span>{feature.title}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-14 pt-4 pb-2 space-y-6">
                          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                            {feature.description}
                          </p>
                          
                          {/* Dynamic Counters Row */}
                          <div className="grid grid-cols-2 gap-4">
                            {feature.counters.map((counter, cIdx) => (
                              <div key={cIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left">
                                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-950">{counter.value}</span>
                                <span className="block text-xs text-slate-500 font-normal mt-1">{counter.label}</span>
                              </div>
                            ))}
                          </div>

                          {/* Premium Sliding Button */}
                          <div className="pt-2">
                            <Link href={feature.link}>
                              <button className="relative text-sm font-semibold rounded-full h-12 p-1 ps-6 pr-14 group transition-all duration-500 hover:ps-14 hover:pr-6 w-fit overflow-hidden cursor-pointer flex items-center justify-center bg-emerald-500 text-slate-950 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                <span className="relative z-10 transition-all duration-500">
                                  {feature.buttonText}
                                </span>
                                <div className="absolute right-1 w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                                  <ArrowUpRight size={16} />
                                </div>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Right: Modern Image Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl bg-slate-100 min-h-[300px] lg:min-h-0"
          >
            {features.map((feature, idx) => (
              <img
                key={idx}
                src={feature.image}
                alt={feature.title}
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/5 pointer-events-none z-20"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
