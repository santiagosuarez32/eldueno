'use client';

import { useRef } from 'react';
import Image from 'next/image';
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
    <section ref={container} className="bg-white text-slate-900 py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image (matching rounded card style of other sections) */}
          <div
            className="about-feat-img lg:col-span-5 relative rounded-[32px] overflow-hidden shadow-xl border border-slate-100 h-[380px] sm:h-[480px] lg:h-[550px] w-full bg-slate-100"
          >
            <Image 
              src="/images/valores.png" 
              alt="Nuestros Valores" 
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right: Features List */}
          <div
            className="about-feat-content lg:col-span-7 flex flex-col justify-center gap-8 sm:gap-10"
          >
            <div className="space-y-4 mb-2">
              <h2 className="inline-block text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight border-b-4 border-[#FFFF33] pb-2 mb-2">
                Nuestros Valores
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed mt-4">
                En El Dueño Vende, creemos que cada cliente merece una experiencia basada en la confianza, el compromiso y un acompañamiento cercano. Estos son los valores que nos distinguen:
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-xl leading-relaxed pl-11">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
