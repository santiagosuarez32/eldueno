'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { 
  Send, 
  Check, 
  Loader2, 
  Building,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function ContactoPage() {
  // Force light body background to match this page's design
  useEffect(() => {
    document.body.classList.add('bg-white', 'text-slate-900');
    document.body.classList.remove('bg-slate-950', 'text-slate-100');
    return () => {
      document.body.classList.remove('bg-white', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    };
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Comprar una propiedad',
    message: '',
    agree: false
  });

  // Pre-select service based on URL search query parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const servicioParam = params.get('servicio');
      if (servicioParam === 'arquitectura') {
        setFormData(prev => ({ ...prev, service: 'Otras consultas' }));
      } else if (servicioParam === 'prestamos') {
        setFormData(prev => ({ ...prev, service: 'Opciones de financiación' }));
      } else if (servicioParam === 'compra') {
        setFormData(prev => ({ ...prev, service: 'Comprar una propiedad' }));
      } else if (servicioParam === 'correduria') {
        setFormData(prev => ({ ...prev, service: 'Vender mi propiedad' }));
      }
    }
  }, []);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Input Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Por favor, acepta el procesamiento de datos personales.');
      return;
    }
    setStatus('submitting');

    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Comprar una propiedad',
        message: '',
        agree: false
      });
    }, 1800);
  };

  return (
    <>
      <Navbar />
      
      {/* 1. HERO SECTION (Dark Blue Theme with Background Image) */}
      <section 
        className="text-white pt-28 pb-14 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/contacto-hero.webp')" }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
              Contactános
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Para consultas generales, publicaciones de propiedades o asesoramiento especializado para comprar y vender sin intermediarios, por favor completá tus datos a continuación.
            </p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[11px] font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Respuesta en menos de 24hs
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>Trato 100% Directo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM & INFO SECTION (Light Theme) */}
      <section className="bg-white py-16 sm:py-24 text-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Direct Communication details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 block">Comunicate</span>
                <h2 className="text-3xl sm:text-4.5xl font-bold tracking-tight text-slate-950 leading-tight">
                  Escribinos y hablemos de tu próxima propiedad
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  En El Dueño Vende estamos listos para asesorarte. Atendemos cada consulta de forma personalizada para brindarte soluciones ágiles, información clara y el acompañamiento profesional que necesitás para tomar las mejores decisiones seguras.
                </p>
              </div>

              {/* Physical Contact Details */}
              <div className="space-y-5 border-y border-slate-100 py-8">
                <div className="flex gap-4 items-center">
                  <img src="/contact/1.webp" className="w-8 h-8 object-contain flex-shrink-0" alt="Teléfono" />
                  <div>
                    <p className="text-[13px] sm:text-[14px] font-bold text-slate-800">Teléfono / WhatsApp</p>
                    <p className="text-[11px] sm:text-[12px] font-medium text-slate-700 hover:text-emerald-700 transition-colors mt-0.5">
                      <a href="https://wa.me/50688888888" target="_blank" rel="noopener noreferrer">+506 8888-8888</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <img src="/contact/email.webp" className="w-8 h-8 object-contain flex-shrink-0" alt="Correo electrónico" />
                  <div>
                    <p className="text-[13px] sm:text-[14px] font-bold text-slate-800">Correo electrónico</p>
                    <p className="text-[11px] sm:text-[12px] font-medium text-slate-700 hover:text-emerald-700 transition-colors mt-0.5">
                      <a href="mailto:info@elduenovende.com">info@elduenovende.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <img src="/icons-filters/ubication.png" className="w-8 h-8 object-contain flex-shrink-0" alt="Ubicación" />
                  <div>
                    <p className="text-[13px] sm:text-[14px] font-bold text-slate-800">Dirección física</p>
                    <p className="text-[11px] sm:text-[12px] font-medium text-slate-700 mt-0.5">
                      Belén, Heredia Province, Costa Rica
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Link Section */}
              <div className="flex items-center space-x-4">
                <span className="text-[13px] sm:text-[14px] font-bold text-slate-800">Seguinos:</span>
                <div className="flex items-center space-x-2">
                  <a href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:border-slate-450 hover:bg-slate-50 transition-all duration-300">
                    <FaFacebookF className="h-4 w-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:border-slate-450 hover:bg-slate-50 transition-all duration-300">
                    <FaInstagram className="h-4 w-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:border-slate-450 hover:bg-slate-50 transition-all duration-300">
                    <FaTwitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Custom High-Fidelity Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-8 shadow-xl shadow-slate-100/50">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-5"
                    >
                      <div className="h-16 w-16 rounded-full bg-[#ffe600]/10 text-slate-950 flex items-center justify-center border border-[#ffe600]/30 shadow-md">
                        <Check className="h-8 w-8 stroke-[2.5]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-extrabold text-slate-950">¡Mensaje Enviado con Éxito!</h3>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed mx-auto">
                          Tu consulta ha sido procesada de manera directa. Un miembro de nuestro equipo se pondrá en contacto con vos en las próximas horas.
                        </p>
                      </div>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="mt-4 px-6 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        Enviar otro mensaje
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                    >
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] sm:text-[14px] font-bold text-slate-800 block">Nombre completo*</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ej. Juan Pérez"
                          className="w-full rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:bg-white focus:outline-none px-4 py-2.5 text-slate-900 text-sm transition-all duration-200 placeholder:text-slate-400 font-medium shadow-sm"
                        />
                      </div>

                      {/* Grid for Email and Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Email Address */}
                        <div className="space-y-1.5">
                          <label className="text-[13px] sm:text-[14px] font-bold text-slate-800 block">Correo electrónico*</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@correo.com"
                            className="w-full rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:bg-white focus:outline-none px-4 py-2.5 text-slate-900 text-sm transition-all duration-200 placeholder:text-slate-400 font-medium shadow-sm"
                          />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                          <label className="text-[13px] sm:text-[14px] font-bold text-slate-800 block">Teléfono (WhatsApp)*</label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ej. +506 8888-8888"
                            className="w-full rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:bg-white focus:outline-none px-4 py-2.5 text-slate-900 text-sm transition-all duration-200 placeholder:text-slate-400 font-medium shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Services interested in dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] sm:text-[14px] font-bold text-slate-800 block">¿En qué servicio estás interesado?*</label>
                        <div className="relative">
                          <select 
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:bg-white focus:outline-none px-4 py-2.5 text-slate-900 text-sm transition-all duration-200 cursor-pointer appearance-none font-medium shadow-sm pr-10"
                          >
                            <option value="Comprar una propiedad">Comprar una propiedad</option>
                            <option value="Vender mi propiedad">Vender mi propiedad</option>
                            <option value="Opciones de financiación">Opciones de financiación</option>
                            <option value="Alquilar propiedad">Alquilar propiedad</option>
                            <option value="Otras consultas">Otras consultas</option>
                          </select>
                          {/* Chevron Icon */}
                          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-450">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Message / Describe */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] sm:text-[14px] font-bold text-slate-800 block">Detalle de tu consulta*</label>
                        <textarea 
                          name="message"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Contanos detalladamente en qué podemos ayudarte..."
                          className="w-full rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:bg-white focus:outline-none px-4 py-2.5 text-slate-900 text-sm transition-all duration-200 resize-none placeholder:text-slate-400 font-medium shadow-sm"
                        />
                      </div>

                      {/* Terms Acceptance Checkbox */}
                      <div className="flex items-start gap-3 pt-1">
                        <input 
                          type="checkbox" 
                          id="agree"
                          name="agree"
                          required
                          checked={formData.agree}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 rounded text-slate-950 focus:ring-slate-950 border-slate-350 cursor-pointer accent-slate-950"
                        />
                        <label htmlFor="agree" className="text-xs text-slate-500 select-none leading-relaxed font-medium">
                          Al hacer clic en enviar, acepto el procesamiento de mis datos personales de acuerdo con las políticas de privacidad.
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto relative flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 py-3 text-xs font-bold text-white uppercase tracking-wider hover:bg-slate-900 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-slate-950/15"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <span>Enviar Consulta</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}
