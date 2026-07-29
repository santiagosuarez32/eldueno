'use client';

import Link from 'next/link';
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
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function ContactoPage() {
  const crmFormUrl = useCrmFormUrl('contacto');

  useEffect(() => {
    document.body.classList.add('bg-slate-800', 'text-slate-900');
    document.body.classList.remove('bg-slate-950', 'text-slate-100');
    return () => {
      document.body.classList.remove('bg-slate-800', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    };
  }, []);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-text", {
      opacity: 0,
      x: -50,
      duration: 0.8
    });

    gsap.from(".contact-info-col", {
      opacity: 0,
      x: -50,
      duration: 0.8,
      delay: 0.2
    });

    gsap.from(".contact-form-col", {
      opacity: 0,
      x: -50,
      duration: 0.8,
      delay: 0.4
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-gradient-to-b from-white via-slate-400 to-slate-800 text-slate-900 min-h-screen relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFFF33]/25 rounded-full blur-[130px] -translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-slate-400/20 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />
      <Navbar />
      
      {/* 1. HERO TYPOGRAPHY HEADER */}
      <section className="pt-24 pb-6 sm:pt-28 sm:pb-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="hero-text max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-3">
              Hablemos de tu <span className="text-slate-950 underline decoration-[#FFFF33] decoration-[6px] underline-offset-4">próximo paso.</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Nuestro equipo está listo para asesorarte de manera personalizada y directa. Completá el formulario o contáctanos por cualquiera de nuestros canales oficiales.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM */}
      <section className="pb-24 relative z-10">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Bold Yellow Info Card */}
            <div className="order-2 lg:order-1 lg:col-span-5 contact-info-col">
              <div className="bg-[#FFFF33] rounded-[32px] p-8 sm:p-10 flex flex-col relative overflow-hidden shadow-md border border-yellow-300/40">
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FFFF33]/60 rounded-full blur-[100px]" />
                
                <h3 className="text-xl font-bold text-slate-950 mb-1 relative z-10">Información de Contacto</h3>
                <p className="text-slate-900/80 mb-6 relative z-10 text-xs font-medium">Respuesta en menos de 24 horas hábiles.</p>
                
                <div className="space-y-4 relative z-10 flex-grow">
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-extrabold text-black mb-0.5">Central telefónica / WhatsApp</p>
                      <a href="tel:+50622806665" className="text-base font-bold text-slate-950 hover:opacity-70 transition-opacity block">+506 2280-6665</a>
                      <a href="https://wa.me/50686208287" className="text-base font-bold text-slate-950 hover:opacity-70 transition-opacity block">+506 8620-8287</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-extrabold text-black mb-0.5">Correo electrónico</p>
                      <a href="mailto:bienesraices@elduenovende.com" className="text-base font-bold text-slate-950 hover:opacity-70 transition-opacity">bienesraices@elduenovende.com</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#FFFF33] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-extrabold text-black mb-0.5">Ubicación física</p>
                      <a href="https://maps.app.goo.gl/bXBuQFYZQaJPcEzr5?g_st=iwb" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-slate-950 hover:opacity-70 transition-opacity block">Belén, Heredia<br/>Costa Rica</a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 relative z-10">
                  <p className="text-sm font-extrabold text-black mb-4">Nuestras redes</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.facebook.com/elduenovende/?locale=ga_IE" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <FaFacebookF className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/elduenovendecr/?hl=es-la" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/company/el-due%C3%B1o-vende-s-r/?lipi=urn%3Ali%3Apage%3Ap_mwlite_search_srp_all%3BTxULh84CSu2Kh79Q6ZWZqg%3D%3D" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <FaLinkedinIn className="w-5 h-5" />
                    </a>
                    <a href="https://www.youtube.com/@duenovendecr3368" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <FaYoutube className="w-5 h-5" />
                    </a>
                    <a href="https://www.tiktok.com/@el.duenovende.cr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-950 text-[#FFFF33] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <FaTiktok className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct CRM Form Iframe */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex justify-start contact-form-col w-full">
              <div className="w-full rounded-3xl overflow-hidden">
                <iframe
                  src={crmFormUrl}
                  style={{ width: '100%', height: '670px', border: '0', outline: 'none', borderRadius: '24px', background: 'transparent' }}
                  className="w-full h-[670px] block border-0 outline-none"
                  id="inline-gnolY2xzWsk8vN2HW0Lc" 
                  title="Consultas"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
