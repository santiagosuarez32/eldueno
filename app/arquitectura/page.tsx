'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
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
      number: "1",
      title: "Construcción desde cero",
      description: "Materializamos tus proyectos de vivienda, comercio u oficinas desde los cimientos con rigurosos estándares de calidad y eficiencia.",
      image: "/services/arquitectura.webp"
    },
    {
      number: "2",
      title: "Remodelación",
      description: "Transformamos y revalorizamos tus espacios actuales mediante diseños modernos, funcionales y optimización de la distribución.",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      number: "3",
      title: "Diseño",
      description: "Modelado 3D, arquitectura conceptual y desarrollo integral de planos a la medida de tus necesidades y gustos estéticos.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      number: "4",
      title: "Tramitología",
      description: "Gestión ágil de permisos municipales, visados de planos, cartas de agua y todos los requisitos legales para iniciar tu obra sin demoras.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      number: "5",
      title: "Inspección de sitio",
      description: "Evaluaciones técnicas del estado actual de terrenos o estructuras previas a compras, remodelaciones o etapas constructivas.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      number: "6",
      title: "Dirección de Obra",
      description: "Supervisión profesional en sitio para garantizar el cumplimiento de los planos, presupuestos fijados y tiempos de entrega.",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  ];

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
      const isEven = section.dataset.iseven === "true";
      const content = section.querySelector('.service-content');
      const img = section.querySelector('.service-img');

      if (content) {
        gsap.from(content, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50px",
            once: true
          },
          opacity: 0,
          x: isEven ? -30 : 30,
          duration: 0.6
        });
      }

      if (img) {
        gsap.from(img, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50px",
            once: true
          },
          opacity: 0,
          x: isEven ? 30 : -30,
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
                <h1
                  className="hero-title text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]"
                >
                  Servicios de Arquitectura
                </h1>

                <p
                  className="hero-subtitle text-slate-350 text-base sm:text-lg max-w-3xl leading-relaxed"
                >
                  Ofrecemos servicios de arquitectura enfocados en el diseño, planificación y remodelación de espacios residenciales, comerciales e industriales. Brindamos asesoría personalizada y elaboración de planos, creando soluciones funcionales, estéticas y adaptadas a cada necesidad. Nuestro objetivo es optimizar cada espacio, garantizando calidad, eficiencia y mayor valor para su propiedad.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION - Redesigned Centered Grid */}
        <section className="py-24 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Section: Title & Description */}
            <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-slate-900 leading-[1.1]">
                Nuestros servicios
              </h2>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-normal">
                Aseguramos la máxima calidad y legalidad en cada fase de la obra, desde la valoración del terreno hasta la entrega llave en mano.
              </p>
              <div className="pt-4">
                <Link
                  href="/contacto?servicio=arquitectura"
                  className="inline-flex items-center justify-center px-8 h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                >
                  Iniciar Consulta
                </Link>
              </div>
            </div>

            {/* Distinct Service Sections */}
            <div className="space-y-24 lg:space-y-32 mt-20 max-w-6xl mx-auto">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} data-iseven={isEven.toString()} className="service-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div
                      className={`service-content space-y-6 ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}
                    >
                      <div className="w-12 h-12 bg-[#ffe600] rounded-full flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm">
                        {service.number}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div
                      className={`service-img ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}
                    >
                      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


      </main>
      <Footer showCTA={false} />
    </>
  );
}
