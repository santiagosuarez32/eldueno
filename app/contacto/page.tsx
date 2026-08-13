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
            className="object-cover object-[center_35%] opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950 z-0 pointer-events-none" />
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-[1400px] mx-auto">
            
            {/* Left Column: Clean White Info (No Yellow Box) */}
            <div className="order-2 lg:order-1 lg:col-span-5 contact-info-col py-4 px-2 sm:px-4">
              <h3 className="text-3xl font-extrabold text-white mb-2">Información de Contacto</h3>
              <p className="text-slate-300 mb-8 text-sm font-medium">Respuesta en menos de 24 horas hábiles.</p>
              
              <div className="space-y-6 flex-grow">
                <div className="flex gap-4 items-center group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 group-hover:bg-[#FFFF33] group-hover:text-slate-950 transition-all duration-300 shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm font-medium mb-0.5">Central telefónica</p>
                    <a href="tel:+50622806665" className="text-lg font-bold text-white hover:text-[#FFFF33] transition-colors block">+506 2280-6665</a>
                  </div>
                </div>

                <div className="flex gap-4 items-center group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 group-hover:bg-[#FFFF33] group-hover:text-slate-950 transition-all duration-300 shadow-md">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm font-medium mb-0.5">WhatsApp</p>
                    <a href="https://wa.me/50686208287" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-[#FFFF33] transition-colors block">+506 8620-8287</a>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 group-hover:bg-[#FFFF33] group-hover:text-slate-950 transition-all duration-300 shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm font-medium mb-0.5">Correo electrónico</p>
                    <a href="mailto:bienesraices@elduenovende.com" className="text-lg font-bold text-white hover:text-[#FFFF33] transition-colors break-all block">bienesraices@elduenovende.com</a>
                  </div>
                </div>

                <div className="flex gap-4 items-center group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 group-hover:bg-[#FFFF33] group-hover:text-slate-950 transition-all duration-300 shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm font-medium mb-0.5">Ubicación física</p>
                    <p className="text-lg font-bold text-white leading-snug">
                      Belén, Heredia, Costa Rica{' '}
                      <a href="https://maps.app.goo.gl/bXBuQFYZQaJPcEzr5?g_st=iwb" target="_blank" rel="noopener noreferrer" className="text-[#FFFF33] underline font-bold hover:opacity-80 transition-opacity ml-1">
                        Ver mapa
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-800/80">
                <p className="text-slate-300 text-sm font-medium mb-4">Nuestras redes</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.facebook.com/elduenovende/?locale=ga_IE" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center hover:bg-[#FFFF33] hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-md">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/elduenovendecr/?hl=es-la" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center hover:bg-[#FFFF33] hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-md">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/company/el-due%C3%B1o-vende-s-r/?lipi=urn%3Ali%3Apage%3Ap_mwlite_search_srp_all%3BTxULh84CSu2Kh79Q6ZWZqg%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center hover:bg-[#FFFF33] hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-md">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a href="https://www.youtube.com/@duenovendecr3368" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center hover:bg-[#FFFF33] hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-md">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                  <a href="https://www.tiktok.com/@el.duenovende.cr" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center hover:bg-[#FFFF33] hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-md">
                    <FaTiktok className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Direct CRM Form Iframe with relaxed padding */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex justify-center lg:justify-end contact-form-col w-full px-2 sm:px-6">
              <div className="w-full max-w-[700px] bg-slate-900/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl p-1 sm:p-2">
                <iframe
                  src={crmFormUrl}
                  style={{ width: '100%', height: '580px', border: '0', outline: 'none', background: 'transparent' }}
                  className="w-full h-[540px] sm:h-[560px] lg:h-[580px] block border-0 outline-none rounded-2xl"
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

