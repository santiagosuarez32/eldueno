'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Script from 'next/script';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useCrmFormUrl } from '@/lib/crmForms';

export default function CompraVentaPage() {
  const crmFormUrl = useCrmFormUrl('venta');
  const [activeForm, setActiveForm] = useState<'venta' | 'compra'>('venta');

  // Force body background to white for light theme feel
  useEffect(() => {
    document.body.classList.add('bg-slate-950');
    return () => {
      document.body.classList.remove('bg-slate-950');
    };
  }, []);

  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".hero-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.1
    });

    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: 25,
      duration: 0.8,
      delay: 0.2
    });

    const sections = gsap.utils.toArray<HTMLElement>('.service-section');
    sections.forEach((section) => {
      const left = section.querySelector('.service-left');
      const right = section.querySelector('.service-right');

      if (left) {
        gsap.from(left, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50px",
            once: true
          },
          opacity: 0,
          x: -30,
          duration: 0.6
        });
      }

      if (right) {
        gsap.from(right, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50px",
            once: true
          },
          opacity: 0,
          x: 30,
          duration: 0.6
        });
      }
    });

  }, { scope: container });

  return (
    <>
      <Navbar />
      <main ref={container} className="flex-grow bg-slate-950 text-slate-900">

        {/* HERO SECTION - Dark premium style matching "Nosotros" */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16 sm:pb-24 overflow-hidden bg-slate-950">
          {/* Background image & overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src="/sell-home.jpg"
              alt="Compra y Venta de Propiedades"
              className="w-full h-full object-cover object-[center_60%]"
            />
            {/* Dark gradient mapping */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.75) 100%)'
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.08) 100%)'
              }}
            />
          </div>

          {/* Hero Content */}
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-4xl space-y-6">
              <div className="space-y-4">
                <h1
                  className="hero-title text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]"
                >
                  Vender o Alquilar tu propiedad nunca fue tan fácil
                </h1>

                <p
                  className="hero-subtitle text-slate-350 text-base sm:text-lg max-w-3xl leading-relaxed"
                >
                  En El Dueño Vende te acompañamos durante todo el proceso para que logrés una venta segura, rápida y al mejor precio del mercado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LOAN OPTIONS SECTION - Redesigned Centered Grid */}
        <section className="py-24 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Top Section: Title & Description */}
            <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-slate-900 leading-[1.1]">
                Nuestros servicios
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed font-normal">
                Conozca los servicios y soluciones diseñadas para ayudarle a vender, alquilar o comprar su propiedad ideal con total claridad y seguridad.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    document.getElementById('formulario-compra-venta')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-10 h-14 bg-[#FFFF33] hover:bg-yellow-400 text-slate-950 font-extrabold rounded-full transition-all duration-300 text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  Consultar Compra / Venta
                </button>
              </div>
            </div>

            {/* 3 Distinct Service Sections */}
            <div className="space-y-24 lg:space-y-32 mt-20 max-w-6xl mx-auto">

              {/* Section 1 */}
              <div className="service-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div
                  className="service-left order-2 lg:order-1 space-y-6"
                >
                  <div className="w-12 h-12 bg-[#FFFF33] rounded-full flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm">
                    1
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                    Venta y Alquiler
                  </h3>
                  <p className="text-slate-600 text-xl leading-relaxed">
                    Te brindamos la tranquilidad y seguridad de contar con profesionales que te acompañarán en cada etapa del proceso. Te ofrecemos:
                  </p>
                  <ul className="space-y-4 pt-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Visita y avalúo sin costo, realizados por un profesional con base en el valor real del mercado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Precalificación de compradores, para recibir únicamente clientes con verdadero interés y capacidad de compra.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Asesoría legal integral, incluyendo traspasos, opciones de compra-venta y gestión de documentos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Publicidad digital estratégica, con presencia en los principales medios y plataformas inmobiliarias.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Respaldo de una empresa inmobiliaria con amplia experiencia, compromiso y atención personalizada.</span>
                    </li>
                  </ul>
                </div>
                <div
                  className="service-right order-1 lg:order-2"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="Servicios de Venta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="service-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div
                  className="service-left order-1 lg:order-1"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img
                      src="/imagen-5.jpg"
                      alt="Proceso de venta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div
                  className="service-right order-2 lg:order-2 space-y-6"
                >
                  <div className="w-12 h-12 bg-[#FFFF33] rounded-full flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm">
                    2
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                    6 sencillos pasos para vender o alquilar tu propiedad
                  </h3>


                  <ul className="space-y-4 pt-2">
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-[#FFFF33] flex items-center justify-center font-bold text-slate-900 flex-shrink-0 mt-0.5">1</div>
                      <span className="text-slate-600 text-xl">Propiedades dentro del GAM, Estudio registral, Plano catastro, Dirección física y digital, Impuestos municipales al día, Servicios públicos al día.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-[#FFFF33] flex items-center justify-center font-bold text-slate-900 flex-shrink-0 mt-0.5">2</div>
                      <span className="text-slate-600 text-xl">Coordinación de visita del perito. Avalúo sin costo.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-[#FFFF33] flex items-center justify-center font-bold text-slate-900 flex-shrink-0 mt-0.5">3</div>
                      <span className="text-slate-600 text-xl">Contrato de exclusividad por un periodo de 6 meses.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-[#FFFF33] flex items-center justify-center font-bold text-slate-900 flex-shrink-0 mt-0.5">4</div>
                      <span className="text-slate-600 text-xl">Visita de nuestro equipo de ventas para toma de fotografías.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-[#FFFF33] flex items-center justify-center font-bold text-slate-900 flex-shrink-0 mt-0.5">5</div>
                      <span className="text-slate-600 text-xl">Promoción de tu propiedad en medios y plataformas digitales, mediante campañas de publicidad pagada, sin costo adicional para el cliente.</span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-[#FFFF33] flex items-center justify-center font-bold text-slate-900 flex-shrink-0 mt-0.5">6</div>
                      <span className="text-slate-600 text-xl">Venta finiquitada. Propiedades: costo de honorarios 5% más I.V.A. Alquileres: costo de la primera mensualidad más I.V.A.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div className="service-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div
                  className="service-left order-2 lg:order-1 space-y-6"
                >
                  <div className="w-12 h-12 bg-[#FFFF33] rounded-full flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm">
                    3
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                    Comprá tu propiedad y hacé realidad tu sueño hoy mismo
                  </h3>
                  <p className="text-slate-600 text-xl leading-relaxed">
                    Encontrar la propiedad ideal es más sencillo cuando contás con el acompañamiento de profesionales. En El Dueño Vende te asesoramos durante todo el proceso para que tomés la mejor decisión con seguridad y confianza.
                  </p>
                  
                  <ul className="space-y-4 pt-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Asesoría personalizada, para ayudarte a encontrar la propiedad que mejor se adapte a tus necesidades y presupuesto.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Amplio portafolio de propiedades, con opciones de casas, apartamentos, lotes y locales comerciales.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Precalificación financiera, para conocer tu capacidad de compra y facilitar el proceso de adquisición de tu propiedad.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">Acompañamiento legal integral, incluyendo revisión de documentos, opciones de compra-venta y gestión de traspasos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFFF33] flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <span className="text-slate-600 text-xl">El respaldo de una empresa inmobiliaria con amplia experiencia, compromiso y atención personalizada.</span>
                    </li>
                  </ul>

                </div>
                <div
                  className="service-right order-1 lg:order-2"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img
                      src="/familia-casa.jpg"
                      alt="Familia feliz en su nueva casa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-10 flex justify-center w-full">
                <Link
                  href="/propiedades"
                  className="inline-flex items-center justify-center px-10 h-14 bg-[#FFFF33] hover:bg-slate-900 text-slate-950 hover:text-white font-bold rounded-full transition-all duration-300 text-base shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Explorar todas las propiedades
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Grey Divider Line */}
        <div className="w-full border-t border-slate-700/80" />

        {/* CRM Form Section - Fits inside Viewport */}
        <section id="formulario-compra-venta" className="w-full bg-slate-950 min-h-[calc(100vh-80px)] flex items-center py-8 lg:py-12 relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Side (Text & Info) */}
              <div className="lg:col-span-6 p-2 sm:p-4 lg:p-6 flex flex-col justify-center text-left relative">
                {/* Background Image */}
                <img
                  src="/techo.png"
                  alt="Fondo Techo"
                  className="absolute inset-0 w-full h-full object-contain opacity-40 mix-blend-luminosity z-0 pointer-events-none"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-slate-950/70 z-0 pointer-events-none" />

                {/* Decorative element (Top Right Glow) */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFFF33]/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
                {/* Bottom Right Yellow & White Glow */}
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FFFF33]/30 rounded-full blur-[140px] translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
                
                <div className="max-w-2xl relative z-10">
                  <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#FFFF33] text-slate-950 text-base font-bold rounded-full mb-6 w-max">
                    Asesoría experta • Respaldo real
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
                    Vende o alquila tu propiedad con el respaldo de expertos.
                  </h3>
                  <p className="text-slate-200 text-base lg:text-lg leading-relaxed mb-6">
                    Déjanos tus datos y uno de nuestros asesores se pondrá en contacto con vos para conocer tu caso y brindarte una asesoría personalizada. Te acompañaremos en cada etapa del proceso, para vender o alquilar tu propiedad de forma segura, ágil y al mejor precio posible.
                  </p>
                  <p className="text-white font-bold text-base mb-3">
                    ¿Qué podés esperar de nuestro servicio?
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFFF33] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-slate-200 font-medium text-sm lg:text-base">Valoración profesional de tu propiedad.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFFF33] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-slate-200 font-medium text-sm lg:text-base">Promoción estratégica para maximizar su visibilidad.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFFF33] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-slate-200 font-medium text-sm lg:text-base">Acompañamiento personalizado hasta el cierre de la negociación.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side (CRM Form Card with Viewport-constrained height + internal scrollbar) */}
              <div className="lg:col-span-6 relative z-20 flex flex-col justify-center items-center lg:items-end w-full">
                <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  {/* Top helper indicator bar */}
                  <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800/80 px-5 py-2.5 text-xs text-slate-300 font-semibold">
                    <span className="flex items-center gap-2 text-[#FFFF33] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#FFFF33] animate-ping inline-block" />
                      Formulario de Venta / Alquiler
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-200 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700/60 shadow-sm">
                      Desliza para ver más campos
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#FFFF33] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </div>

                  <iframe
                    src={crmFormUrl}
                    style={{ width: '100%', height: '580px', border: '0', outline: 'none', background: 'transparent' }}
                    className="w-full h-[540px] sm:h-[560px] lg:h-[580px] block border-0 outline-none"
                    scrolling="yes"
                    id="inline-u3QrthKIOTQruMw3nQYm" 
                    title="Interés en venta o alquiler de mi propiedad"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer showCTA={false} />
    </>
  );
}
