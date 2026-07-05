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
      title: 'Atención cercana y personalizada',
      description: 'Cada cliente y cada propiedad son únicos. Escuchamos tus necesidades y te brindamos soluciones a la medida, con una atención ágil y transparente.'
    },
    {
      title: 'Soluciones integrales',
      description: 'Te acompañamos en todo el proceso, desde la compra, venta o alquiler hasta el financiamiento, asesoría legal y servicios técnicos, para que encuentres todo en un solo lugar.'
    },
    {
      title: 'Transparencia en cada paso',
      description: 'Actuamos con honestidad, claridad y profesionalismo, manteniéndote informado durante todo el proceso para que tomes decisiones con tranquilidad y confianza.'
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
            src="/images/valores.png" 
            alt="Nuestros Valores" 
            className="w-full h-[300px] sm:h-[400px] lg:h-auto object-cover rounded-b-[32px] lg:rounded-r-[32px] lg:rounded-bl-none"
          />
        </div>

        {/* Right: Features List */}
        <div
          className="about-feat-content w-full lg:w-7/12 py-16 lg:py-24 px-6 sm:px-12 lg:px-16 xl:px-24 flex flex-col justify-center gap-8 sm:gap-10"
        >
            <div className="space-y-4 mb-2">
              <h2 className="inline-block text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight border-b-4 border-[#FFFF33] pb-2 mb-2">
                Nuestros Valores
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mt-4">
                En El Dueño Vende, creemos que cada cliente merece una experiencia basada en la confianza, el compromiso y un acompañamiento cercano. Estos son los valores que nos distinguen:
              </p>
            </div>
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight flex items-center gap-3">
                  <span className="flex-shrink-0 text-[#FFFF33]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </span>
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
