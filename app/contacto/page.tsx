'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Loader2, 
  MessageSquare,
  Building,
  ArrowRight
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function ContactoPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'Comprar una propiedad',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Input Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate high-fidelity network request
    setTimeout(() => {
      setStatus('success');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: 'Comprar una propiedad',
        message: ''
      });
    }, 1800);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-12 overflow-hidden relative">
        {/* Decorative background gradients (Dribbble dark theme style) */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="max-w-4xl mb-16 space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider"
            >
              Comunicate con nosotros
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              Estamos aquí para <br />
              <span className="text-emerald-400">asesorarte de forma directa</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              ¿Tenés dudas sobre cómo comprar o vender sin pagar comisiones? Completá el formulario o contactanos por cualquiera de nuestros canales.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            {/* Left Side: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* WhatsApp Card */}
              <motion.a 
                href="https://wa.me/50686208287"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group flex items-start gap-5 p-6 bg-slate-900/40 rounded-[24px] border border-slate-800/80 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all duration-300 shadow-lg cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">WhatsApp Directo</span>
                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-[#ffe600] transition-colors">+506 8620-8287</p>
                  <p className="text-xs sm:text-sm text-slate-400">Escribinos y chateá con un asesor inmobiliario en tiempo real.</p>
                </div>
              </motion.a>

              {/* Call Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group flex items-start gap-5 p-6 bg-slate-900/40 rounded-[24px] border border-slate-800/80 hover:border-[#ffe600]/30 hover:bg-slate-900/60 transition-all duration-300 shadow-lg"
              >
                <div className="p-4 rounded-2xl bg-[#ffe600]/10 text-[#ffe600] group-hover:bg-[#ffe600] group-hover:text-slate-950 transition-all duration-300">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-2 flex-grow">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Teléfonos de Oficina</span>
                  <div className="space-y-1">
                    <a href="tel:+50622806665" className="text-base sm:text-lg font-bold text-white hover:text-[#ffe600] transition-colors block">+506 2280-6665</a>
                    <a href="tel:+50686208287" className="text-base sm:text-lg font-bold text-white hover:text-[#ffe600] transition-colors block">+506 8620-8287</a>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 pt-1 border-t border-slate-800/60">Llamanos de Lunes a Viernes de 8:00 AM a 6:00 PM.</p>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.a 
                href="mailto:bienesraices@elduenovende.com"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group flex items-start gap-5 p-6 bg-slate-900/40 rounded-[24px] border border-slate-800/80 hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 shadow-lg cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-all duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Correo Electrónico</span>
                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-[#ffe600] transition-colors">bienesraices@elduenovende.com</p>
                  <p className="text-xs sm:text-sm text-slate-400">Respondemos en menos de 24 horas hábiles.</p>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="group flex items-start gap-5 p-6 bg-slate-900/40 rounded-[24px] border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 shadow-lg"
              >
                <div className="p-4 rounded-2xl bg-slate-800 text-slate-350 group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Ubicación Física</span>
                  <p className="text-base font-bold text-white">Heredia, Costa Rica</p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Asunción de Belén, diagonal a la plaza de deportes.</p>
                </div>
              </motion.div>

              {/* Social Media Link section */}
              <div className="flex items-center space-x-4 pt-4 px-2">
                <span className="text-sm text-slate-500 font-medium">Seguinos:</span>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#ffe600] hover:bg-slate-900 transition-all duration-300">
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#ffe600] hover:bg-slate-900 transition-all duration-300">
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#ffe600] hover:bg-slate-900 transition-all duration-300">
                  <FaTwitter className="h-4 w-4" />
                </a>
              </div>

            </div>

            {/* Right Side: Contact Form Card */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 rounded-[32px] p-8 sm:p-10 shadow-2xl relative"
              >
                {/* Form header */}
                <div className="mb-8 space-y-1">
                  <h2 className="text-2xl font-bold text-white">Envianos un mensaje</h2>
                  <p className="text-sm text-slate-400">Completá los campos y te contactaremos a la brevedad.</p>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-5"
                    >
                      <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                        <Check className="h-8 w-8 stroke-[2.5]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">¡Mensaje Enviado!</h3>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                          Gracias por ponerte en contacto. Un miembro de nuestro equipo revisará tu consulta y te responderá lo antes posible.
                        </p>
                      </div>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="mt-4 px-6 py-2.5 rounded-2xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Enviar otro mensaje
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      {/* Grid for Name and Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-400 tracking-wide block">Nombre Completo</label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej. Juan Pérez"
                            className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none px-4 py-3 text-white text-sm transition-colors duration-200 placeholder:text-slate-650"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-400 tracking-wide block">Correo Electrónico</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@correo.com"
                            className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none px-4 py-3 text-white text-sm transition-colors duration-200 placeholder:text-slate-650"
                          />
                        </div>
                      </div>

                      {/* Phone and Reason */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-400 tracking-wide block">Teléfono (WhatsApp)</label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ej. +506 8888-8888"
                            className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none px-4 py-3 text-white text-sm transition-colors duration-200 placeholder:text-slate-650"
                          />
                        </div>

                        {/* Reason select */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-400 tracking-wide block">Motivo de Consulta</label>
                          <div className="relative">
                            <select 
                              name="reason"
                              value={formData.reason}
                              onChange={handleChange}
                              className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none px-4 py-3 text-white text-sm transition-colors duration-200 appearance-none cursor-pointer"
                            >
                              <option value="Comprar una propiedad">Comprar una propiedad</option>
                              <option value="Vender mi propiedad">Vender mi propiedad</option>
                              <option value="Opciones de financiación">Opciones de financiación</option>
                              <option value="Alquilar propiedad">Alquilar propiedad</option>
                              <option value="Otras consultas">Otras consultas</option>
                            </select>
                            {/* Down arrow icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 tracking-wide block">Mensaje / Detalle de la Consulta</label>
                        <textarea 
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Contanos detalladamente qué estás buscando o cómo podemos ayudarte..."
                          className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none px-4 py-3 text-white text-sm transition-colors duration-200 resize-none placeholder:text-slate-650"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full group relative flex items-center justify-center gap-2 overflow-hidden rounded-[100px] border-[1.5px] border-[#ffe600]/40 hover:border-transparent bg-[#ffe600] px-8 py-3.5 text-sm font-bold text-slate-950 hover:bg-[#ffe600] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="h-4.5 w-4.5 animate-spin" />
                            <span>Enviando mensaje...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                            <span>Enviar Mensaje</span>
                          </>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Interactive Google Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="w-full rounded-[32px] overflow-hidden border border-slate-800/80 shadow-2xl relative bg-slate-900/20"
          >
            {/* Header info overlays inside map container */}
            <div className="p-8 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white">
                  <Building className="h-4.5 w-4.5 text-emerald-400" />
                  <h3 className="font-bold text-lg">Nuestra Oficina Central</h3>
                </div>
                <p className="text-sm text-slate-400">Vení a visitarnos y conversá directamente con nuestro equipo directivo.</p>
              </div>
              <a 
                href="https://maps.google.com/?q=Heredia,Asuncion+de+Belen,Costa+Rica"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#ffe600] hover:text-white transition-colors group"
              >
                Abrir en Google Maps
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Embedded Google Maps with premium feel */}
            <div className="h-[400px] w-full relative grayscale opacity-75 hover:grayscale-0 hover:opacity-90 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m10!1m3!1d15719.645511037599!2d-84.1812975971485!3d9.940507204907994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fa1e5d8eaab1%3A0x6b6fa35607bd4bf6!2sBel%C3%A9n%2C%20Heredia%20Province%2C%20Costa%20Rica!5e0!3m2!1sen!2s!4v1718828000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
