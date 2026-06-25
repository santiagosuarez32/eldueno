'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function ArquitecturaPage() {
  // Force body background to white for light theme feel
  useEffect(() => {
    document.body.classList.add('bg-white', 'text-slate-900');
    document.body.classList.remove('bg-slate-955', 'text-slate-100');
    return () => {
      document.body.classList.remove('bg-white', 'text-slate-900');
      document.body.classList.add('bg-slate-955', 'text-slate-100');
    };
  }, []);

  const services = [
    {
      number: "01",
      title: "Construcción desde cero",
      description: "Materializamos tus proyectos de vivienda, comercio u oficinas desde los cimientos con rigurosos estándares de calidad y eficiencia."
    },
    {
      number: "02",
      title: "Remodelación",
      description: "Transformamos y revalorizamos tus espacios actuales mediante diseños modernos, funcionales y optimización de la distribución."
    },
    {
      number: "03",
      title: "Diseño",
      description: "Modelado 3D, arquitectura conceptual y desarrollo integral de planos a la medida de tus necesidades y gustos estéticos."
    },
    {
      number: "04",
      title: "Tramitología",
      description: "Gestión ágil de permisos municipales, visados de planos, cartas de agua y todos los requisitos legales para iniciar tu obra sin demoras."
    },
    {
      number: "05",
      title: "Inspección de sitio",
      description: "Evaluaciones técnicas del estado actual de terrenos o estructuras previas a compras, remodelaciones o etapas constructivas."
    },
    {
      number: "06",
      title: "Dirección de Obra",
      description: "Supervisión profesional en sitio para garantizar el cumplimiento de los planos, presupuestos fijados y tiempos de entrega."
    }
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
              src="/about.png"
              alt="Premium architectural design"
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
                  Servicios de Arquitectura
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-slate-350 text-base sm:text-lg max-w-3xl leading-relaxed"
                >
                  Ofrecemos servicios de arquitectura enfocados en el diseño, planificación y remodelación de espacios residenciales, comerciales e industriales. Brindamos asesoría personalizada y elaboración de planos, creando soluciones funcionales, estéticas y adaptadas a cada necesidad. Nuestro objetivo es optimizar cada espacio, garantizando calidad, eficiencia y mayor valor para su propiedad.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION - Bento Grid style matching the reference image */}
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
                  src="/services/arquitectura.webp"
                  alt="Diseño y planificación arquitectónica"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Right Side: Content card containing Title, Paragraph, Button and all 6 Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-8 bg-white border border-slate-200/60 rounded-[24px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-10 shadow-[0_2px_8px_rgba(0,0,0,0.015)]"
              >
                {/* Title & Description */}
                <div className="space-y-5">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                      <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.1]">
                        Nuestros servicios
                      </h2>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                        Aseguramos la máxima calidad y legalidad en cada fase de la obra, desde la valoración del terreno hasta la entrega llave en mano.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        href="/contacto?servicio=arquitectura"
                        className="inline-flex items-center justify-center px-6 h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-200 text-sm shadow-sm hover:shadow"
                      >
                        Iniciar Consulta
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Grid of all 6 cards inside */}
                {/* List of all 6 cards stacked vertically in a single column */}
                <div className="grid grid-cols-1 gap-4 pt-8 border-t border-slate-100">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="group p-5 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.005)] hover:border-emerald-500/20 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 flex items-start gap-5"
                    >
                      <div className="text-xs font-semibold text-slate-400 tracking-widest font-mono pt-1">
                        {service.number}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-600 transition-colors duration-200">
                          {service.title}
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
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
