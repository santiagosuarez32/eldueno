'use client';

import { useEffect, useRef } from 'react';
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

export default function PrestamosPage() {
  const crmFormUrl = useCrmFormUrl('prestamos');
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
              src="/images/prestamos_hero.png"
              alt="Tipos de Financiamiento"
              className="w-full h-full object-cover object-center"
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
                  Tipos de Financiamiento
                </h1>

                <p
                  className="hero-subtitle text-slate-350 text-base sm:text-lg max-w-3xl leading-relaxed"
                >
                  Nuestro equipo analiza cada caso de forma individual para ofrecer soluciones adaptadas a sus necesidades, facilitando el acceso a las mejores condiciones y soluciones de financiamiento.
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
                Conozca los tipos de financiamiento y soluciones de crédito diseñados para ayudarle a alcanzar sus metas inmobiliarias con total claridad y seguridad.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    document.getElementById('formulario-prestamo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-10 h-14 bg-[#FFFF33] hover:bg-yellow-400 text-slate-950 font-extrabold rounded-full transition-all duration-300 text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  Consultar Préstamos
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
                    Préstamos para compra de propiedades
                  </h3>
                  <p className="text-slate-600 text-xl leading-relaxed">
                    Evaluamos distintas alternativas con Bancos públicos como privados, ayudando a identificar la opción más conveniente en términos de cuotas, plazos y condiciones. Acompañamos al cliente desde la solicitud hasta la aprobación del crédito, garantizando un proceso claro, ágil y seguro.
                  </p>
                  <ul className="space-y-4 pt-2">
                    <li className="flex items-center gap-3">
                      <img src="/prestamos-hipotecarios/gestion-bonocredito.png" alt="Icono Bono-Credito" className="w-10 h-10 object-contain flex-shrink-0" />
                      <span className="font-bold text-slate-900 text-xl">Gestión de Bono-Credito</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="/prestamos-hipotecarios/financiamiento.png" alt="Icono Financiamiento" className="w-10 h-10 object-contain flex-shrink-0" />
                      <span className="font-bold text-slate-900 text-xl">Gestión de Financiamiento - Compra de Vivienda normal</span>
                    </li>
                  </ul>
                </div>
                <div
                  className="service-right order-1 lg:order-2"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="Compra de propiedades"
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
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="Garantía inmobiliaria"
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
                    Préstamos sobre garantía inmobiliaria
                  </h3>
                  <p className="text-slate-600 text-xl leading-relaxed">
                    El Dueño Vende también ofrece préstamos privados, con requisitos accesibles y pre-aprobación en 24 horas, sobre propiedades dentro del Gran Área Metropolitana. <span className="text-slate-950 font-bold underline decoration-[#FFFF33] decoration-[3px] underline-offset-[4px]">Préstamos en colones y dólares</span>
                  </p>

                  {/* Metrics details */}
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 mt-6">
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Costo de avalúo</span>
                      <span className="font-bold text-2xl text-slate-900">0%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Comisión formalización</span>
                      <span className="font-bold text-2xl text-slate-900">5%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Pre-aprobación</span>
                      <span className="font-bold text-2xl text-slate-900">24 hrs</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Máx. a financiar</span>
                      <span className="font-bold text-2xl text-slate-900">50%</span>
                    </div>
                  </div>
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
                    Reunificación de Deudas
                  </h3>
                  <p className="text-slate-600 text-xl leading-relaxed">
                    Ofrecemos el servicio de unificación de deudas con garantía hipotecaria dentro del Gran Área Metropolitana, como una solución financiera que permite consolidar múltiples obligaciones en un solo pago mensual. Este proceso facilita la organización de las finanzas personales, reduce la carga administrativa y brinda mayor control sobre el presupuesto. Nuestro objetivo es ayudarle a mejorar su liquidez y estabilidad financiera mediante condiciones más ordenadas y accesibles, adaptadas a su situación económica.
                  </p>

                  {/* Metrics details */}
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 mt-6">
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Costo de avalúo</span>
                      <span className="font-bold text-2xl text-slate-900">0%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Comisión formalización</span>
                      <span className="font-bold text-2xl text-slate-900">5%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Pre-aprobación</span>
                      <span className="font-bold text-2xl text-slate-900">24 hrs</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-sm mb-1 font-medium">Máx. a financiar</span>
                      <span className="font-bold text-2xl text-slate-900">50%</span>
                    </div>
                  </div>
                </div>
                <div
                  className="service-right order-1 lg:order-2"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="Reunificación de Deudas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grey Divider Line */}
        <div className="w-full border-t border-slate-700/80" />

        {/* CRM Form Section - Fits inside Viewport */}
        <section id="formulario-prestamo" className="w-full bg-slate-950 min-h-[calc(100vh-80px)] flex items-center py-8 lg:py-12 relative overflow-hidden">
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

                {/* Soft directional glow from bottom-right corner towards center */}
                <div className="absolute -bottom-10 -right-10 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] bg-[#FFFF33]/18 rounded-full blur-[110px] pointer-events-none z-0" />
                
                <div className="max-w-2xl relative z-10">
                  <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#FFFF33] text-slate-950 text-base font-bold rounded-full mb-6 w-max">
                    Asesoría experta • Respaldo real
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
                    Te ayudamos a encontrar la solución financiera que mejor se adapta a vos.
                  </h3>
                  <p className="text-slate-200 text-base lg:text-lg leading-relaxed mb-6">
                    Solicitá una asesoría sin compromiso. Completá tus datos y uno de nuestros asesores se pondrá en contacto con vos para conocer tu situación, resolver tus dudas y ayudarte a encontrar la opción de financiamiento que mejor se adapte a tus necesidades.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-[#FFFF33] border border-slate-700/80 flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className="text-slate-200 font-medium text-sm lg:text-base">Evaluación personalizada de tu caso.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-[#FFFF33] border border-slate-700/80 flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className="text-slate-200 font-medium text-sm lg:text-base">Opciones de financiamiento para mejorar tu liquidez.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-[#FFFF33] border border-slate-700/80 flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className="text-slate-200 font-medium text-sm lg:text-base">Atención confidencial y acompañamiento durante todo el proceso.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side (CRM Form Card with Viewport-constrained height + internal scrollbar) */}
              <div className="lg:col-span-6 relative z-20 flex flex-col justify-center items-center lg:items-end w-full">
                <div className="w-full max-w-[580px] bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  {/* Top helper indicator bar */}
                  <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800/80 px-5 py-2.5 text-xs text-slate-300 font-semibold">
                    <span className="flex items-center gap-2 text-[#FFFF33] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#FFFF33] animate-ping inline-block" />
                      Formulario de Asesoría
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
                    id="inline-S6iHSWHXhpO9XeNZHIIW" 
                    title="Interés en préstamo"
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
