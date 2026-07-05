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

export default function PrestamosPage() {
  // Force body background to white for light theme feel
  useEffect(() => {
    document.body.classList.add('bg-white', 'text-slate-900');
    document.body.classList.remove('bg-slate-955', 'text-slate-100');
    return () => {
      document.body.classList.remove('bg-white', 'text-slate-900');
      document.body.classList.add('bg-slate-955', 'text-slate-100');
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
      <main ref={container} className="flex-grow bg-white text-slate-900">

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
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-normal">
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
                      <span className="font-bold text-slate-900 text-lg">Gestión de Bono-Credito</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="/prestamos-hipotecarios/financiamiento.png" alt="Icono Financiamiento" className="w-10 h-10 object-contain flex-shrink-0" />
                      <span className="font-bold text-slate-900 text-lg">Gestión de Financiamiento - Compra de Vivienda normal</span>
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

        {/* CRM Form Section - Full Viewport Width */}
        <section id="formulario-prestamo" className="w-full bg-slate-950 scroll-mt-24 mt-20 lg:mt-32">
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left Side (Santiago's area) */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center text-left relative overflow-hidden">
              {/* Background Image */}
              <img
                src="/techo.png"
                alt="Fondo Techo"
                className="absolute inset-0 w-full h-full object-contain opacity-40 mix-blend-luminosity z-0 pointer-events-none"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-slate-950/70 z-0 pointer-events-none" />

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
              
              <div className="max-w-xl ml-auto mr-0 lg:mr-8 xl:mr-12 relative z-10">
                <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#FFFF33] text-slate-950 text-base font-bold rounded-full mb-6 w-max">
                  Asesoría experta • Respaldo real
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                  Reciba asesoría personalizada
                </h3>
                <p className="text-slate-200 text-xl lg:text-2xl leading-relaxed mb-10">
                  Déjenos sus datos y nuestro equipo se comunicará con usted a la brevedad para brindarle un acompañamiento integral durante todo el proceso.
                </p>
                <ul className="space-y-6 mb-8">
                  <li className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFFF33] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-white font-medium text-lg lg:text-xl">Respuesta rápida, sin compromiso.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFFF33] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-white font-medium text-lg lg:text-xl">Acompañamiento experto en cada paso.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFFF33] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-white font-medium text-lg lg:text-xl">Total confidencialidad y seguridad.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side (CRM Form) */}
            <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 lg:p-12 relative z-20 rounded-t-[40px] lg:rounded-t-none lg:rounded-l-[40px] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col justify-center">
              <div className="w-full max-w-lg mx-auto lg:ml-8 xl:ml-12">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-8 text-center">
                    Interés en Préstamo
                  </h3>
                  <div className="w-full min-h-[1077px]">
                    <iframe
                      src="https://crm.elduenovende.com/widget/form/S6iHSWHXhpO9XeNZHIIW"
                      style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                      id="inline-S6iHSWHXhpO9XeNZHIIW" 
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="Interés en préstamo"
                      data-height="1077"
                      data-layout-iframe-id="inline-S6iHSWHXhpO9XeNZHIIW"
                      data-form-id="S6iHSWHXhpO9XeNZHIIW"
                      title="Interés en préstamo"
                    >
                    </iframe>
                    <Script src="https://crm.elduenovende.com/js/form_embed.js" strategy="lazyOnload" />
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
