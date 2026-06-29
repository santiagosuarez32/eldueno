'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutFeatures() {
  const features = [
    {
      title: 'Ubicación Estratégica',
      description: 'Nuestras propiedades destacadas se encuentran en zonas de fácil acceso desde diferentes puntos. Podés llegar al centro, zonas comerciales y lugares importantes de la ciudad de manera rápida y cómoda.'
    },
    {
      title: 'Diseño Moderno',
      description: 'Seleccionamos casas y departamentos con diseños modernos y elegantes. Podés elegir el estilo de propiedad que mejor se adapte a tus gustos y necesidades, desde lofts industriales hasta amplias casas familiares.'
    },
    {
      title: 'Seguridad Garantizada',
      description: 'Priorizamos propiedades en barrios seguros o complejos cerrados con sistemas de seguridad integrados. Muchas cuentan con cercos perimetrales, portones automáticos, y sistemas de monitoreo para tu tranquilidad.'
    }
  ];

  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".about-feat-img", {
      scrollTrigger: {
        trigger: ".about-feat-img",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      x: -30,
      duration: 0.8
    });

    gsap.from(".about-feat-content", {
      scrollTrigger: {
        trigger: ".about-feat-content",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.2
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-white text-slate-900 relative overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left: Image (smaller width, full height) */}
        <div
          className="about-feat-img w-full lg:w-5/12 flex"
        >
          <img 
            src="/about.png" 
            alt="Sobre nosotros" 
            className="w-full h-[300px] sm:h-[400px] lg:h-auto object-cover rounded-b-[32px] lg:rounded-r-[32px] lg:rounded-bl-none"
          />
        </div>

        {/* Right: Features List */}
        <div
          className="about-feat-content w-full lg:w-7/12 py-16 lg:py-24 px-6 sm:px-12 lg:px-16 xl:px-24 flex flex-col justify-center gap-10 sm:gap-12"
        >
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
    </section>
  );
}
