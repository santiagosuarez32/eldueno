'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-white text-slate-900">
        
        {/* HERO SECTION - Dark premium style matching "Nosotros" */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16 sm:pb-24 overflow-hidden bg-slate-950">
          {/* Background image & overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/about-villa-balcony.webp"
              alt="Luxury minimalist balcony"
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
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]"
                >
                  Tipos de Financiamiento
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-slate-350 text-base sm:text-lg max-w-3xl leading-relaxed"
                >
                  Nuestro equipo analiza cada caso de forma individual para ofrecer soluciones adaptadas a sus necesidades, facilitando el acceso a las mejores condiciones y soluciones de financiamiento.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* LOAN OPTIONS SECTION - Bento Grid style matching architecture page */}
        <section className="py-24 bg-slate-50/30">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Side: Large Image Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-4 relative rounded-[24px] overflow-hidden min-h-[350px] lg:min-h-[600px] shadow-[0_2px_8px_rgba(0,0,0,0.015)] border border-slate-200/60 group bg-slate-100"
              >
                <img
                  src="/services/creditos.webp"
                  alt="Financiamiento y préstamos"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Right Side: Bento container with all 3 loan option cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-8 bg-white border border-slate-200/60 rounded-[24px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-10 shadow-[0_2px_8px_rgba(0,0,0,0.015)]"
              >
                {/* Header */}
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.1]">
                    Nuestros servicios
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                    Conozca los tipos de financiamiento y soluciones de crédito diseñados para ayudarle a alcanzar sus metas inmobiliarias con total claridad y seguridad.
                  </p>
                </div>

                {/* List of all 3 cards stacked vertically in a single column */}
                <div className="grid grid-cols-1 gap-4 pt-8 border-t border-slate-100">
                  
                  {/* Card 1 */}
                  <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.005)] hover:border-emerald-500/20 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-5 flex-grow">
                      <div className="text-xs font-semibold text-slate-400 tracking-widest font-mono pt-1">
                        01
                      </div>
                      <div className="space-y-2 max-w-xl">
                        <h4 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-600 transition-colors duration-200 leading-tight">
                          Préstamos para compra de propiedades
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                          Evaluamos distintas alternativas con Bancos públicos como privados, ayudando a identificar la opción más conveniente en términos de cuotas, plazos y condiciones. Acompañamos al cliente desde la solicitud hasta la aprobación del crédito, garantizando un proceso claro, ágil y seguro.
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto">
                      <Link
                        href="/contacto?servicio=prestamos"
                        className="inline-flex items-center justify-center w-full md:w-auto px-6 h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-200 text-xs shadow-sm"
                      >
                        Más información
                      </Link>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.005)] hover:border-emerald-500/20 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-5 flex-grow">
                      <div className="text-xs font-semibold text-slate-400 tracking-widest font-mono pt-1">
                        02
                      </div>
                      <div className="space-y-2 max-w-xl">
                        <h4 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-600 transition-colors duration-200 leading-tight">
                          Préstamos sobre garantía inmobiliaria
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                          El Dueño Vende también ofrece préstamos privados, con requisitos accesibles y pre-aprobación en 24 horas, sobre propiedades dentro del Gran Área Metropolitana.
                        </p>
                        
                        {/* Metrics details */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100 mt-3 text-[11px] sm:text-xs">
                          <div><span className="text-slate-400 block">Costo de avalúo</span><span className="font-bold text-slate-800">0%</span></div>
                          <div><span className="text-slate-400 block">Comisión formalización</span><span className="font-bold text-slate-800">5%</span></div>
                          <div><span className="text-slate-400 block">Pre-aprobación</span><span className="font-bold text-slate-800">24 hrs</span></div>
                          <div><span className="text-slate-400 block">Máx. a financiar</span><span className="font-bold text-slate-800">50%</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto">
                      <Link
                        href="/contacto?servicio=prestamos"
                        className="inline-flex items-center justify-center w-full md:w-auto px-6 h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-200 text-xs shadow-sm"
                      >
                        Más información
                      </Link>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.005)] hover:border-emerald-500/20 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-5 flex-grow">
                      <div className="text-xs font-semibold text-slate-400 tracking-widest font-mono pt-1">
                        03
                      </div>
                      <div className="space-y-2 max-w-xl">
                        <h4 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-600 transition-colors duration-200 leading-tight">
                          Reunificación de Deudas
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                          Ofrecemos el servicio de unificación de deudas como una solución financiera que permite consolidar múltiples obligaciones en un solo pago mensual. Este proceso facilita la organización de las finanzas personales, reduce la carga administrativa y brinda mayor control sobre el presupuesto. Nuestro objetivo es ayudarle a mejorar su liquidez y estabilidad financiera mediante condiciones más ordenadas y accesibles, adaptadas a su situación económica.
                        </p>

                        {/* Metrics details */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100 mt-3 text-[11px] sm:text-xs">
                          <div><span className="text-slate-400 block">Costo de avalúo</span><span className="font-bold text-slate-800">0%</span></div>
                          <div><span className="text-slate-400 block">Comisión formalización</span><span className="font-bold text-slate-800">5%</span></div>
                          <div><span className="text-slate-400 block">Pre-aprobación</span><span className="font-bold text-slate-800">24 hrs</span></div>
                          <div><span className="text-slate-400 block">Máx. a financiar</span><span className="font-bold text-slate-800">50%</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto">
                      <Link
                        href="/contacto?servicio=prestamos"
                        className="inline-flex items-center justify-center w-full md:w-auto px-6 h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-200 text-xs shadow-sm"
                      >
                        Más información
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer showCTA={false} />
    </>
  );
}
