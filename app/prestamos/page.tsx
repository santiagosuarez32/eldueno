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
                <Link
                  href="/contacto?servicio=prestamos"
                  className="inline-flex items-center justify-center px-8 h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                >
                  Iniciar Consulta
                </Link>
              </div>
            </div>

            {/* 3 Distinct Service Sections */}
            <div className="space-y-24 lg:space-y-32 mt-20 max-w-6xl mx-auto">
              
              {/* Section 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="order-2 lg:order-1 space-y-6"
                >
                  <div className="w-12 h-12 bg-[#ffe600] rounded-full flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm">
                    1
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                    Préstamos para compra de propiedades
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Evaluamos distintas alternativas con Bancos públicos como privados, ayudando a identificar la opción más conveniente en términos de cuotas, plazos y condiciones. Acompañamos al cliente desde la solicitud hasta la aprobación del crédito, garantizando un proceso claro, ágil y seguro.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="order-1 lg:order-2"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="Compra de propiedades" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </motion.div>
              </div>

              {/* Section 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="order-1 lg:order-1"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="Garantía inmobiliaria" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="order-2 lg:order-2 space-y-6"
                >
                  <div className="w-12 h-12 bg-[#ffe600] rounded-full flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm">
                    2
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                    Préstamos sobre garantía inmobiliaria
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    El Dueño Vende también ofrece préstamos privados, con requisitos accesibles y pre-aprobación en 24 horas, sobre propiedades dentro del Gran Área Metropolitana.
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
                </motion.div>
              </div>

              {/* Section 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="order-2 lg:order-1 space-y-6"
                >
                  <div className="w-12 h-12 bg-[#ffe600] rounded-full flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm">
                    3
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                    Reunificación de Deudas
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Ofrecemos el servicio de unificación de deudas como una solución financiera que permite consolidar múltiples obligaciones en un solo pago mensual. Este proceso facilita la organización de las finanzas personales, reduce la carga administrativa y brinda mayor control sobre el presupuesto. Nuestro objetivo es ayudarle a mejorar su liquidez y estabilidad financiera mediante condiciones más ordenadas y accesibles, adaptadas a su situación económica.
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="order-1 lg:order-2"
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="Reunificación de Deudas" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer showCTA={false} />
    </>
  );
}
