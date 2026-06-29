'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-text", {
      opacity: 0,
      y: 30,
      duration: 0.8
    });
  }, { scope: container });

  useGSAP(() => {
    if (status === 'success') {
      gsap.from(".success-state", { opacity: 0, scale: 0.95, duration: 0.4 });
    } else {
      gsap.from(".form-state", { opacity: 0, scale: 0.95, duration: 0.4 });
    }
  }, { scope: container, dependencies: [status] });

  return (
    <div ref={container}>
      <Navbar />
      
      {/* 1. HERO TYPOGRAPHY HEADER */}
      <section className="pt-24 pb-6 sm:pt-28 sm:pb-8 bg-white">
        <div className="max-w-6xl mx-auto px-12">
          <div
            className="hero-text max-w-4xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 leading-[1.1] mb-3">
              Hablemos de tu <span className="text-[#ffe600]">próxima propiedad.</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Nuestro equipo está listo para asesorarte de manera personalizada y directa. Completá el formulario o contactanos por cualquiera de nuestros canales oficiales.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM */}
      <section className="bg-white pb-24 text-slate-900">
        <div className="max-w-6xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Bold Yellow Info Card */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="bg-[#ffe600] rounded-[32px] p-8 sm:p-10 flex flex-col relative overflow-hidden shadow-sm">
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-yellow-300/50 rounded-full blur-3xl" />
                
                <h3 className="text-xl font-bold text-slate-950 mb-1 relative z-10">Información de Contacto</h3>
                <p className="text-slate-900/80 mb-6 relative z-10 text-xs font-medium">Respuesta en menos de 24 horas hábiles.</p>
                
                <div className="space-y-4 relative z-10 flex-grow">
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#ffe600] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-extrabold text-black mb-0.5">WhatsApp / Teléfono</p>
                      <a href="https://wa.me/50688888888" className="text-base font-bold text-slate-950 hover:opacity-70 transition-opacity">+506 8888-8888</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#ffe600] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-extrabold text-black mb-0.5">Correo electrónico</p>
                      <a href="mailto:info@elduenovende.com" className="text-base font-bold text-slate-950 hover:opacity-70 transition-opacity">info@elduenovende.com</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-[#ffe600] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-extrabold text-black mb-0.5">Ubicación física</p>
                      <p className="text-base font-bold text-slate-950">Belén, Heredia<br/>Costa Rica</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 relative z-10">
                  <p className="text-sm font-extrabold text-black mb-4">Nuestras redes</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-12 h-12 rounded-full bg-slate-950 text-[#ffe600] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <FaFacebookF className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-slate-950 text-[#ffe600] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Minimalist Form */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex justify-start lg:pl-12">
              <div className="bg-white py-2 sm:py-4 lg:py-6 w-full max-w-xl">
                  {status === 'success' ? (
                    <div 
                      className="success-state py-12 flex flex-col items-center justify-center text-center space-y-5 h-full"
                    >
                      <div className="h-20 w-20 rounded-full bg-[#ffe600] text-slate-950 flex items-center justify-center shadow-lg shadow-[#ffe600]/30">
                        <Check className="h-10 w-10 stroke-[3]" />
                      </div>
                      <div className="space-y-3 pt-4">
                        <h3 className="text-3xl font-extrabold text-slate-950">¡Mensaje Enviado!</h3>
                        <p className="text-slate-500 text-base max-w-sm leading-relaxed mx-auto">
                          Hemos recibido tu consulta exitosamente. Un asesor se comunicará contigo lo antes posible.
                        </p>
                      </div>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="mt-6 px-8 py-3 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-slate-800 transition-colors cursor-pointer uppercase tracking-wider shadow-md"
                      >
                        Enviar nuevo mensaje
                      </button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={handleSubmit} 
                      className="form-state space-y-4"
                    >
                      {/* Full Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-950 block">Nombre completo*</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ej. Juan Pérez"
                          className="w-full rounded-[16px] bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:ring-4 focus:ring-[#ffe600]/20 focus:bg-white outline-none px-4 py-3 text-slate-900 text-sm transition-all duration-300 placeholder:text-slate-400 font-medium"
                        />
                      </div>

                      {/* Grid for Email and Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Email Address */}
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-950 block">Correo electrónico*</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@correo.com"
                            className="w-full rounded-[16px] bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:ring-4 focus:ring-[#ffe600]/20 focus:bg-white outline-none px-4 py-3 text-slate-900 text-sm transition-all duration-300 placeholder:text-slate-400 font-medium"
                          />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-950 block">Teléfono (WhatsApp)*</label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ej. +506 8888-8888"
                            className="w-full rounded-[16px] bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:ring-4 focus:ring-[#ffe600]/20 focus:bg-white outline-none px-4 py-3 text-slate-900 text-sm transition-all duration-300 placeholder:text-slate-400 font-medium"
                          />
                        </div>
                      </div>

                      {/* Services interested in dropdown */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-950 block">¿En qué servicio estás interesado?*</label>
                        <div className="relative">
                          <select 
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full rounded-[16px] bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:ring-4 focus:ring-[#ffe600]/20 focus:bg-white outline-none px-4 py-3 text-slate-900 text-sm transition-all duration-300 cursor-pointer appearance-none font-medium pr-12"
                          >
                            <option value="Comprar una propiedad">Comprar una propiedad</option>
                            <option value="Vender mi propiedad">Vender mi propiedad</option>
                            <option value="Opciones de financiación">Opciones de financiación</option>
                            <option value="Alquilar propiedad">Alquilar propiedad</option>
                            <option value="Otras consultas">Otras consultas</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-slate-400">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Message / Describe */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-950 block">Detalle de tu consulta*</label>
                        <textarea 
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Contanos detalladamente en qué podemos ayudarte..."
                          className="w-full rounded-[16px] bg-slate-50 border border-slate-200 focus:border-[#ffe600] focus:ring-4 focus:ring-[#ffe600]/20 focus:bg-white outline-none px-4 py-3 text-slate-900 text-sm transition-all duration-300 resize-none placeholder:text-slate-400 font-medium"
                        />
                      </div>

                      {/* Terms Acceptance Checkbox */}
                      <div className="flex items-start gap-3 pt-2">
                        <input 
                          type="checkbox" 
                          id="agree"
                          name="agree"
                          required
                          checked={formData.agree}
                          onChange={handleChange}
                          className="mt-1.5 w-4 h-4 rounded text-[#ffe600] focus:ring-[#ffe600] border-slate-300 cursor-pointer"
                        />
                        <label htmlFor="agree" className="text-sm text-slate-500 select-none leading-relaxed font-medium">
                          Al hacer clic en enviar, acepto el procesamiento de mis datos personales de acuerdo con las políticas de privacidad.
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto relative flex items-center justify-center gap-3 rounded-full bg-slate-950 px-10 py-4 text-sm font-bold text-white uppercase tracking-wider hover:bg-slate-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-950/20 mt-4 group"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin text-[#ffe600]" />
                            <span>Enviando Mensaje...</span>
                          </>
                        ) : (
                          <>
                            <span>Enviar Consulta</span>
                            <ArrowRight className="h-5 w-5 text-[#ffe600] transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                    </form>
                  )}
              </div>
            </div>

          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
