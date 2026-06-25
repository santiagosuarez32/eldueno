'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Coins } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { FlowButton } from '@/app/components/FlowButton';

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

  const metrics = [
    { label: "Costo de avalúo", value: "0%" },
    { label: "Comisión de formalización", value: "5%" },
    { label: "Pre-aprobación rápida", value: "24 hrs" },
    { label: "Monto máximo financiable", value: "50%" }
  ];

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
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-transparent border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Coins className="h-3.5 w-3.5 shrink-0" />
                Financiamiento Flexible
              </div>

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

        {/* LOAN OPTIONS SECTION - Clean dividers, no cards, no icon boxes */}
        <section className="py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24 max-w-6xl mx-auto">
              
              {/* Option 1: Compra de Propiedades */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="space-y-6 border-t border-slate-100 pt-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider block mb-2">Opción 01</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                      Préstamos para compra de propiedades
                    </h2>
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
                      Evaluamos distintas alternativas con Bancos públicos como privados, ayudando a identificar la opción más conveniente en términos de cuotas, plazos y condiciones. Acompañamos al cliente desde la solicitud hasta la aprobación del crédito, garantizando un proceso claro, ágil y seguro.
                    </p>
                    <div>
                      <Link href="/contacto?servicio=prestamos">
                        <FlowButton text="Más información" variant="secondary" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Option 2: Garantía Inmobiliaria */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="space-y-12 border-t border-slate-100 pt-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider block mb-2">Opción 02</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                      Préstamos sobre garantía inmobiliaria
                    </h2>
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
                      El Dueño Vende también ofrece préstamos privados con requisitos accesibles y pre-aprobación en 24 horas, sobre propiedades dentro de la Gran Área Metropolitana (GAM).
                    </p>
                    
                    {/* Typographic metric grid (No boxes, no cards, no icons) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
                      {metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1 border-l border-slate-100 pl-4">
                          <div className="text-3xl sm:text-4xl font-extrabold text-slate-955 tracking-tight">
                            {metric.value}
                          </div>
                          <div className="text-xs text-slate-500 font-medium leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Link href="/contacto?servicio=prestamos">
                        <FlowButton text="Más información" variant="secondary" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Option 3: Reunificación de Deudas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="space-y-12 border-t border-slate-100 pt-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider block mb-2">Opción 03</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                      Reunificación de Deudas
                    </h2>
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
                      Ofrecemos el servicio de unificación de deudas como una solución financiera que permite consolidar múltiples obligaciones en un solo pago mensual. Este proceso facilita la organización de las finanzas personales, reduce la carga administrativa y brinda mayor control sobre el presupuesto. Nuestro objetivo es ayudarle a mejorar su liquidez y estabilidad financiera mediante condiciones más ordenadas y accesibles, adaptadas a su situación económica.
                    </p>

                    {/* Typographic metric grid (No boxes, no cards, no icons) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
                      {metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1 border-l border-slate-100 pl-4">
                          <div className="text-3xl sm:text-4xl font-extrabold text-slate-955 tracking-tight">
                            {metric.value}
                          </div>
                          <div className="text-xs text-slate-500 font-medium leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Link href="/contacto?servicio=prestamos">
                        <FlowButton text="Más información" variant="secondary" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* CTA BANNER - Minimalist dark layout matching "Nosotros" */}
        <section className="bg-slate-950 py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
          
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl space-y-6">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block">Asesoría de Financiamiento</span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                ¿Querés conocer tus opciones de crédito?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Comunicate hoy mismo con nuestros asesores financieros para obtener una pre-aprobación o recibir orientación sobre préstamos bancarios o privados.
              </p>
              
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/contacto?servicio=prestamos">
                  <FlowButton text="Más información" variant="primary" />
                </Link>
                <Link href="/contacto" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-colors text-sm px-6 h-12">
                  Contactar Asesor
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
