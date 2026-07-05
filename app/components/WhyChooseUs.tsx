'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { FiPhone } from 'react-icons/fi';

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const features = [
    {
      title: 'Venta de propiedades',
      description: 'Vende tu propiedad con el respaldo de expertos en bienes raíces.',
      link: '/contacto',
      buttonText: 'Contáctenos',
      secondaryButtonText: 'Más información',
      secondaryButtonLink: '/compra-y-venta',
      image: '/services/venta-propiedades.webp',
      counters: [
        { value: '1502+', label: 'Transacciones' },
        { value: '0%', label: 'de avalúo' }
      ]
    },
    {
      title: 'Compra de propiedades',
      description: 'Le acompañamos en cada paso hacia la compra de la propiedad que se ajuste a su presupuesto y necesidades.',
      link: '/contacto',
      buttonText: 'Contáctenos',
      secondaryButtonText: 'Más información',
      secondaryButtonLink: '/propiedades',
      image: '/services/correduria.webp',
      counters: [
        { value: '3,200+', label: 'Clientes Satisfechos' },
        { value: 'CHECK', label: 'Asesoría personalizada' }
      ]
    },
    {
      title: 'Préstamos hipotecarios',
      description: 'Accede a financiamiento y opciones de crédito hipotecario adaptadas a tus necesidades para adquirir tu propiedad rápidamente.',
      link: '/contacto',
      buttonText: 'Contáctenos',
      secondaryButtonText: 'Más información',
      secondaryButtonLink: '/prestamos',
      image: '/services/creditos.webp',
      counters: [
        { value: '90%', label: 'Financiamiento bancario' },
        { value: '24 hrs', label: 'Pre-aprobación' }
      ]
    },
    {
      title: 'Servicios de arquitectura',
      description: 'Dale vida a tus ideas. Consultá por remodelaciones, diseño arquitectónico, planos y dirección de obra profesional.',
      link: '/contacto',
      buttonText: 'Contáctenos',
      secondaryButtonText: 'Más información',
      secondaryButtonLink: '/arquitectura',
      image: '/services/arquitectura.webp',
      counters: [
        { value: '150+', label: 'Proyectos Entregados' },
        { value: '15.802', label: 'M2 construidos' }
      ]
    }
  ];

  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".why-head", {
      scrollTrigger: {
        trigger: ".why-head",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    gsap.from(".why-desc", {
      scrollTrigger: {
        trigger: ".why-desc",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.2
    });

    gsap.from(".why-list", {
      scrollTrigger: {
        trigger: ".why-list",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      x: -30,
      duration: 0.8
    });

    gsap.from(".why-img", {
      scrollTrigger: {
        trigger: ".why-img",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      x: 30,
      duration: 0.8
    });
  }, { scope: container });

  return (
    <section id="servicios" ref={container} className="bg-white py-12 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-8 items-start">
          <div
            className="why-head"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Nuestros servicios
            </h2>
          </div>

          <div
            className="why-desc flex flex-col justify-center space-y-6 lg:pt-8"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
              Hacemos realidad tus proyectos inmobiliarios. Desde la compra o venta de propiedades hasta el diseño y financiamiento personalizado, te brindamos el respaldo que necesitas para avanzar con seguridad.
            </p>
          </div>
        </div>

        {/* Bottom Accordion & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Accordion List */}
          <div
            className="why-list lg:col-span-6 divide-y divide-slate-100"
          >
            {features.map((feature, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div key={idx} className="py-6 first:pt-0 last:pb-0">
                  <button 
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    className="w-full flex items-center gap-4 text-left font-bold text-slate-950 text-xl sm:text-2xl hover:text-emerald-600 transition-colors py-2"
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200/60'}`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                    <span>{feature.title}</span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-0 sm:pl-14 pt-4 pb-2 space-y-6">
                        <p className="text-slate-500 text-xl sm:text-2xl leading-relaxed">
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

                        {/* Premium Sliding Buttons */}
                        <div className="pt-2 flex flex-wrap gap-4 items-center">
                          <Link href={feature.link} onClick={() => window.history.replaceState(null, '', '#servicios')}>
                            <button className="relative text-sm font-semibold rounded-full h-12 p-1 ps-6 pr-14 group transition-all duration-500 hover:ps-14 hover:pr-6 w-fit overflow-hidden cursor-pointer flex items-center justify-center bg-[#FFFF33] text-slate-950 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                              <span className="relative z-10 transition-all duration-500">
                                {feature.buttonText}
                              </span>
                              <div className="absolute right-1 w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)]">
                                <FiPhone size={18} />
                              </div>
                            </button>
                          </Link>

                          {/* Secondary Button */}
                          {'secondaryButtonText' in feature && 'secondaryButtonLink' in feature && (
                            <Link href={feature.secondaryButtonLink as string} onClick={() => window.history.replaceState(null, '', '#servicios')}>
                               <button className="h-12 px-6 rounded-full text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                                 {feature.secondaryButtonText as string}
                               </button>
                            </Link>
                          )}
                        </div>

                        {/* Mobile Image */}
                        <div className="mt-6 block lg:hidden w-full h-[180px] sm:h-[250px] rounded-[24px] overflow-hidden shadow-sm bg-slate-100">
                          <img 
                            src={feature.image} 
                            alt={feature.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Modern Image Display */}
          <div
            className="why-img hidden lg:block lg:col-span-6 relative h-[600px] rounded-[32px] overflow-hidden shadow-md bg-slate-100 lg:sticky lg:top-32"
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
          </div>

        </div>
      </div>
    </section>
  );
}
