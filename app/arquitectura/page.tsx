'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { FlowButton } from '@/app/components/FlowButton';

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
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-transparent border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Arquitectura Profesional
              </div>

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

        {/* SERVICES SECTION - Clean Typographic List (No cards, no color icon boxes) */}
        <section className="py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                Especialidades y Soluciones
              </h2>
              <p className="text-slate-500 text-base sm:text-lg">
                Desarrollamos proyectos inmobiliarios bajo altos estándares estéticos y funcionales en toda el Área Metropolitana.
              </p>
            </div>

            {/* Typography Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="space-y-4 border-t border-slate-100 pt-6"
                >
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-500/20 tracking-tight">
                    {service.number}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER - Minimalist dark layout matching "Nosotros" */}
        <section className="bg-slate-950 py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
          
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-transparent border border-white/25 text-white/80 text-xs font-bold uppercase tracking-wider">
                <ClipboardCheck className="h-3.5 w-3.5" />
                Asesoría Gratuita
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                ¿Listo para planificar tu próxima construcción o remodelación?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Ponete en contacto con nuestro equipo de arquitectura y obtené soluciones personalizadas para tus espacios. Estudiamos cada caso para ofrecerte la mayor eficiencia.
              </p>
              
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/contacto?servicio=arquitectura">
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
