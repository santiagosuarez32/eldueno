'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: 'Servicios de Correduría',
      description: 'Vende tu propiedad con el respaldo de expertos en bienes raíces.',
      link: '/contacto?servicio=correduria',
      buttonText: 'Más información',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89fd11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      counters: [
        { value: '1500+', label: 'Transacciones' },
        { value: '0%', label: 'de avalúo' }
      ]
    },
    {
      title: 'Compra de propiedades',
      description: 'Le acompañamos en cada paso hacia la compra de la propiedad que se ajuste a su presupuesto y necesidades.',
      link: '/contacto?servicio=compra',
      buttonText: 'Más información',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      counters: [
        { value: '3,000+', label: 'Clientes Satisfechos' },
        { value: 'CHECK', label: 'Asesoría personalizada' }
      ]
    },
    {
      title: 'Préstamos hipotecarios',
      description: 'Accedé a financiamiento y opciones de crédito hipotecario adaptadas a tus necesidades para adquirir tu propiedad rápidamente.',
      link: '/prestamos',
      buttonText: 'Consultar Préstamo',
      image: '/services/creditos.webp',
      counters: [
        { value: '95%', label: 'Tasa de Aprobación' },
        { value: '24 hs', label: 'Pre-aprobación' }
      ]
    },
    {
      title: 'Servicios de arquitectura',
      description: 'Dale vida a tus ideas. Consultá por remodelaciones, diseño arquitectónico, planos y asesoría técnica profesional.',
      link: '/arquitectura',
      buttonText: 'Solicitar Asesoría',
      image: '/services/arquitectura.webp',
      counters: [
        { value: '150+', label: 'Proyectos Entregados' },
        { value: 'CHECK', label: 'Diseño personalizado' }
      ]
    }
  ];

  return (
    <section id="servicios" className="bg-white py-24 text-slate-900 relative overflow-hidden">
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
              Hacemos realidad tus proyectos inmobiliarios. Desde la compra o venta de propiedades hasta el diseño y financiamiento personalizado, te brindamos el respaldo que necesitas para avanzar con seguridad.
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
                        <div className="pl-0 sm:pl-14 pt-4 pb-2 space-y-6">
                          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                            {feature.description}
                          </p>
                          
                          {/* Dynamic Counters Row */}
                          <div className="grid grid-cols-2 gap-4">
                            {feature.counters.map((counter, cIdx) => {
                              const isCheck = counter.value === 'CHECK';
                              return (
                                <div key={cIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left h-full flex flex-col justify-center">
                                  {isCheck ? (
                                    <div className="flex items-center gap-2">
                                      <svg className="h-5 w-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ strokeWidth: 4 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                      </svg>
                                      <span className="block text-sm font-bold text-slate-950 leading-snug">{counter.label}</span>
                                    </div>
                                  ) : (
                                    <>
                                      <span className="block text-2xl sm:text-3xl font-extrabold text-slate-950">{counter.value}</span>
                                      <span className="block text-xs text-slate-500 font-normal mt-1">{counter.label}</span>
                                    </>
                                  )}
                                </div>
                              );
                            })}
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
            className="lg:col-span-6 relative h-[180px] sm:h-[250px] lg:h-auto lg:aspect-[4/3] rounded-[32px] overflow-hidden shadow-md bg-slate-100"
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
