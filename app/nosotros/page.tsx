'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { FlowButton } from '@/app/components/FlowButton';
import AboutFeatures from '@/app/components/AboutFeatures';

// Stats counter sub-component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (ref.current) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom-=50px",
        once: true,
        onEnter: () => {
          let obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: duration,
            ease: "power3.out",
            onUpdate: () => setCount(Math.floor(obj.val))
          });
        }
      });
    }
  }, { scope: ref });

  return (
    <span ref={ref} className="inline-block tabular-nums font-extrabold text-4xl sm:text-5xl lg:text-6xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function NosotrosPage() {
  const stats = [
    { value: 1500, prefix: '', suffix: '+', label: 'Propiedades vendidas', desc: 'Casas, apartamentos y terrenos que han encontrado su dueño ideal.' },
    { value: 3000, prefix: '', suffix: '+', label: 'Clientes Satisfechos', desc: 'Nuestro mayor respaldo.' },
    { value: 35, prefix: '', suffix: '+ Años', label: 'Trayectoria en el mercado', desc: 'Acompañando a miles de familias y dueños directos a concretar sus objetivos.' },
    { value: 100, prefix: '', suffix: '%', label: 'Listados verificados', desc: 'Validamos detalladamente cada publicación para garantizar la veracidad de los datos.' }
  ];

  const mainRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".hero-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.1
    });
    gsap.from(".hero-desc", {
      opacity: 0,
      y: 25,
      duration: 0.8,
      delay: 0.2
    });
    gsap.from(".hero-actions", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3
    });

    gsap.fromTo(".stat-card", 
      { opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: "#stats",
          start: "top bottom-=50px",
          once: true
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1
      }
    );

    gsap.from(".hist-img-main", {
      scrollTrigger: {
        trigger: ".hist-img-main",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.8
    });

    gsap.from(".hist-img-sub1", {
      scrollTrigger: {
        trigger: ".hist-img-sub1",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.6
    });

    gsap.from(".hist-img-sub2", {
      scrollTrigger: {
        trigger: ".hist-img-sub2",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      delay: 0.15
    });

    gsap.from(".hist-headline", {
      scrollTrigger: {
        trigger: ".hist-headline",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 20,
      duration: 0.8
    });
  }, { scope: mainRef });

  return (
    <>
      <Navbar />
      <main ref={mainRef} className="flex-grow bg-slate-950 text-slate-100">
        
        {/* HERO SECTION - Ref. Dribbble "Poperty" style */}
        <section className="relative h-screen flex items-end pb-16 sm:pb-24 overflow-hidden bg-slate-950">
          {/* Background image & overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Luxury minimalist interior architecture with tall arches"
              className="w-full h-full object-cover object-center"
            />
            {/* Left-aligned dark gradient to match Dribbble design */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(15, 15, 15, 0.95) 0%, rgba(15, 15, 15, 0.7) 40%, rgba(15, 15, 15, 0) 100%)'
              }}
            />
            {/* Subtle bottom gradient for text legibility */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(15, 15, 15, 0.6) 0%, transparent 30%)'
              }}
            />
          </div>

          {/* Hero Content aligned bottom-left */}
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-4xl space-y-6">

              <div className="space-y-4">
                <h1
                  className="hero-title text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]"
                >
                  De Sueño a Dueño.
                </h1>

                <p
                  className="hero-desc text-slate-300 text-lg sm:text-xl lg:text-2xl max-w-2xl leading-relaxed"
                >
                  En El Dueño Vende, le acompañamos durante todo el proceso de compra, venta o alquiler de su propiedad, brindándole asesoría profesional, transparencia y seguridad en cada etapa.
                </p>
              </div>

              {/* Action and Scroll Button */}
              <div
                className="hero-actions flex flex-wrap items-center gap-4 pt-2"
              >
                <Link href="/propiedades">
                  <FlowButton text="Explorar Propiedades" variant="primary" />
                </Link>
                <a href="#stats">
                  <button className="h-12 px-6 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-slate-950 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                    Conocer Más
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECOND SECTION - STATS SECTION (Light styled) */}
        <section id="stats" className="bg-white text-slate-900 py-16 sm:py-20 relative overflow-hidden border-t border-slate-100 border-b border-slate-100">
          
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">Nuestra trayectoria marca la diferencia</h2>
              <p className="text-slate-500 text-base sm:text-lg">
                El Dueño Vende, se distingue por su sólida presencia en el mercado inmobiliario costarricense y por la confianza que ha construido a lo largo de los años. Nos caracterizamos por brindar un servicio transparente, responsable y orientado a resultados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="stat-card bg-[#ffe600] rounded-2xl p-6 hover:bg-[#e6cf00] transition-all duration-300 flex flex-col space-y-3 shadow-sm"
                >
                  <div className="text-black flex items-baseline gap-0.5">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-black leading-snug">{stat.label}</h4>
                    <p className="text-xs sm:text-sm text-slate-900 leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THIRD SECTION - Dribbble "Trusted Partner" style */}
        <section id="historia" className="bg-white text-slate-900 py-14 sm:py-20 relative">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* Left Column (5/12 width) */}
              <div className="lg:col-span-5 flex flex-col">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1] mb-10">
                  Somos una empresa <br />
                  con historia <br />
                  y resultados
                </h2>
                
                <div 
                  className="hist-img-main rounded-[32px] overflow-hidden shadow-xl h-[360px] sm:h-[460px] w-full bg-slate-100"
                >
                  <img
                    src="/images/about-living-room.webp"
                    alt="Interior de sala de estar moderna"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column (7/12 width) */}
              <div className="lg:col-span-7 flex flex-col space-y-12 lg:pt-8">
                {/* Two side-by-side images */}
                <div className="grid grid-cols-2 gap-6">
                  <div 
                    className="hist-img-sub1 rounded-[32px] overflow-hidden shadow-md h-[170px] sm:h-[220px] w-full bg-slate-100"
                  >
                    <img
                      src="/images/about-villa-concrete.webp"
                      alt="Exterior de casa de hormigón moderna"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div 
                    className="hist-img-sub2 rounded-[32px] overflow-hidden shadow-md h-[170px] sm:h-[220px] w-full bg-slate-100"
                  >
                    <img
                      src="/images/about-villa-balcony.webp"
                      alt="Apartamento moderno con balcón y árboles"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* About Us Title and 2 Column Description */}
                <div className="space-y-4">
                  <span className="text-base text-slate-500 block">Sobre nosotros</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                    <p className="text-slate-650 text-base leading-relaxed">
                      <strong>El Dueño Vende</strong> es una compañía especializada en bienes raíces, brindamos la mejor asesoría en compra, venta y renta de propiedades dentro del área metropolitana. También, brindamos oportunidades de inversión y soluciones de crédito.
                    </p>
                    <p className="text-slate-555 text-base leading-relaxed">
                      Con más de 35 años de experiencia nos desenvolvemos con agilidad en el mercado de bienes raíces; cientos de personas y empresas que han confiado sus inversiones a El Dueño Vende dan respaldo de nuestra trayectoria.
                    </p>
                  </div>
                </div>

                {/* Highlight Headline */}
                <div
                  className="hist-headline pt-6 border-t border-slate-100"
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight leading-tight mb-3">
                    Más de tres décadas asesorando con transparencia, agilidad y resultados.
                  </h3>
                  <p className="text-slate-500 text-base sm:text-lg">
                    Experiencia real, soluciones integrales y un acompañamiento que genera confianza.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOURTH SECTION - Características Adicionales */}
        <AboutFeatures />

      </main>

      <Footer showCTA={false} />
    </>
  );
}
