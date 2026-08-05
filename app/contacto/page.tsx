'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useCrmFormUrl } from '@/lib/crmForms';
import { 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function ContactoPage() {
  const crmFormUrl = useCrmFormUrl('contacto');

  useEffect(() => {
    document.body.classList.add('bg-slate-950', 'text-slate-100');
    return () => {
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
    };
  }, []);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-text", {
      opacity: 0,
      y: 30,
      duration: 0.8
    });

    gsap.from(".contact-info-col", {
      opacity: 0,
      x: -40,
      duration: 0.8,
      delay: 0.2
    });

    gsap.from(".contact-form-col", {
      opacity: 0,
      x: 40,
      duration: 0.8,
      delay: 0.3
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-slate-950 text-white min-h-screen relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      {/* Hero Container with Full Team Background Image */}
      <div className="relative w-full flex-grow pt-24 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
        
        {/* Team Background Image & Dark Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/contactanos.webp"
            alt="Equipo El Dueño Vende"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950 z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-slate-950/60 z-0 pointer-events-none" />
          {/* Radial Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFFF33]/20 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFFF33]/15 rounded-full blur-[130px] translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* 1. HERO HEADER */}
          <div className="hero-text text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
              Hablemos de tu <span className="text-[#FFFF33]">próximo paso</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
              Nuestro equipo está listo para asesorarte de manera personalizada y directa. Completá el formulario o contáctanos por cualquiera de nuestros canales oficiales.
            </p>
          </div>

          {/* 2. CONTACT INFO & FORM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center max-w-[1400px] mx-auto">
            
            {/* Left Column: Bold Yellow Info Card */}
            <div className="order-2 lg:order-1 lg:col-span-5 contact-info-col">
              <div className="bg-[#FFFF33] text-slate-950 rounded-[32px] p-8 sm:p-10 flex flex-col relative overflow-hidden shadow-2xl border border-yellow-300/40">
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FFFF33]/60 rounded-full blur-[100px]" />
                
                <h3 className="text-2xl font-extrabold text-slate-950 mb-1 relative z-10">Información de Contacto</h3>
                <p className="text-slate-900/80 mb-6 relative z-10 text-xs font-semibold">Respuesta en menos de 24 horas hábiles.</p>
                
                <div className="space-y-5 relative z-10 flex-grow">
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900/70 mb-0.5">Central telefónica</p>
                      <a href="tel:+50622806665" className="text-base font-extrabold text-slate-950 hover:opacity-70 transition-opacity block">+506 2280-6665</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaWhatsapp className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900/70 mb-0.5">WhatsApp</p>
                      <a href="https://wa.me/50686208287" target="_blank" rel="noopener noreferrer" className="text-base font-extrabold text-slate-950 hover:opacity-70 transition-opacity block">+506 8620-8287</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900/70 mb-0.5">Correo electrónico</p>
                      <a href="mailto:bienesraices@elduenovende.com" className="text-base font-extrabold text-slate-950 hover:opacity-70 transition-opacity break-all block">bienesraices@elduenovende.com</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900/70 mb-0.5">Ubicación física</p>
                      <p className="text-base font-extrabold text-slate-950 leading-snug">
                        Belén, Heredia<br/>
                        Costa Rica{' '}
                        <a href="https://maps.app.goo.gl/bXBuQFYZQaJPcEzr5?g_st=iwb" target="_blank" rel="noopener noreferrer" className="text-slate-950 underline font-black hover:opacity-70 transition-opacity ml-1">
                          ir
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-950/20 relative z-10">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900/80 mb-3">Nuestras redes</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.facebook.com/elduenovende/?locale=ga_IE" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                    <a href="https://www.instagram.com/elduenovendecr/?hl=es-la" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaInstagram className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/company/el-due%C3%B1o-vende-s-r/?lipi=urn%3Ali%3Apage%3Ap_mwlite_search_srp_all%3BTxULh84CSu2Kh79Q6ZWZqg%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                    <a href="https://www.youtube.com/@duenovendecr3368" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-11 h-11 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaYoutube className="w-4 h-4" />
                    </a>
                    <a href="https://www.tiktok.com/@el.duenovende.cr" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-11 h-11 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaTiktok className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Direct CRM Form Iframe shifted right */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex justify-start lg:justify-end contact-form-col w-full">
              <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src={crmFormUrl}
                  style={{ width: '100%', height: '580px', border: '0', outline: 'none', background: 'transparent' }}
                  className="w-full h-[540px] sm:h-[560px] lg:h-[580px] block border-0 outline-none rounded-3xl"
                  scrolling="yes"
                  id="inline-gnolY2xzWsk8vN2HW0Lc" 
                  title="Consultas"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer showCTA={false} />
    </div>
  );
}

