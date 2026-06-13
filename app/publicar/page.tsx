'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, Building, MapPin, DollarSign, Image, User, CheckCircle, UploadCloud } from 'lucide-react';

export default function PublishPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    type: 'departamento',
    location: 'Buenos Aires, CABA',
    neighborhood: 'Palermo Soho',
    beds: 2,
    baths: 1,
    area: 60,
    price: '',
    expenses: '',
    age: '',
    parking: 'no',
    description: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const stepsList = [
    { number: 1, name: 'Información' },
    { number: 2, name: 'Precio y Fotos' },
    { number: 3, name: 'Contacto' },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-24 bg-slate-950 flex flex-col justify-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Publicá tu Propiedad
            </h1>
            <p className="text-slate-400 text-sm">
              Completá los datos y empezá a recibir consultas directas. 100% gratis, sin intermediarios.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          {!isSubmitted && (
            <div className="flex justify-between items-center mb-10 max-w-md mx-auto relative">
              {/* background progress line */}
              <div className="absolute left-[8%] right-[8%] top-1/2 h-0.5 bg-slate-800 -translate-y-1/2 pointer-events-none z-0" />
              {/* active progress line */}
              <div
                className="absolute left-[8%] top-1/2 h-0.5 bg-emerald-500 -translate-y-1/2 pointer-events-none z-0 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 84}%` }}
              />

              {stepsList.map((s) => {
                const isCompleted = step > s.number;
                const isActive = step === s.number;
                return (
                  <div key={s.number} className="flex flex-col items-center relative z-10 space-y-1">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : isActive
                          ? 'bg-slate-950 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : s.number}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold ${
                        isActive || isCompleted ? 'text-emerald-400' : 'text-slate-550'
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Wizard Card */}
          <div className="glass-panel rounded-3xl border border-slate-800/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 space-y-6 flex flex-col items-center"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">¡Propiedad Publicada Exitosamente!</h2>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      Tu aviso ya está activo en nuestro catálogo. Los compradores interesados te contactarán directamente a tu número de WhatsApp.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="w-full max-w-md bg-slate-950/60 border border-slate-900 rounded-2xl p-6 text-left text-sm space-y-3">
                    <h3 className="font-bold text-white border-b border-slate-900 pb-2">{formData.title || 'Inmueble sin título'}</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-400">
                      <div>
                        <span className="block text-[10px] text-slate-550">PRECIO</span>
                        <span className="text-emerald-400 text-sm font-bold">USD {Number(formData.price || 0).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-550">UBICACIÓN</span>
                        <span className="text-white text-sm">{formData.neighborhood}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-550">SUPERFICIE</span>
                        <span className="text-white text-sm">{formData.area} m²</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-550">COMISIÓN ESTIMADA</span>
                        <span className="text-emerald-400 text-sm font-bold">0% (Comisión Cero)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                        setFormData({
                          title: '',
                          type: 'departamento',
                          location: 'Buenos Aires, CABA',
                          neighborhood: 'Palermo Soho',
                          beds: 2,
                          baths: 1,
                          area: 60,
                          price: '',
                          expenses: '',
                          age: '',
                          parking: 'no',
                          description: '',
                          ownerName: '',
                          ownerPhone: '',
                          ownerEmail: '',
                        });
                      }}
                      className="bg-slate-900 border border-slate-800 text-slate-350 font-bold py-3 px-6 rounded-2xl text-sm hover:text-white transition-colors"
                    >
                      Publicar Otra Propiedad
                    </button>
                    <a
                      href="/propiedades"
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-2xl text-sm transition-colors block text-center"
                    >
                      Ir al Catálogo
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Form Steps */
                <motion.form
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  {/* STEP 1: Basic Info */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white border-b border-slate-850 pb-2 flex items-center gap-2">
                        <Building className="h-5 w-5 text-emerald-400" />
                        1. Información Básica del Inmueble
                      </h3>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Título del Aviso</label>
                        <input
                          type="text"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Ej. Duplex luminoso con terraza propia en Palermo"
                          className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tipo de Propiedad</label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-3 py-3 text-white text-sm transition-colors"
                          >
                            <option value="departamento">Departamento</option>
                            <option value="casa">Casa</option>
                            <option value="ph">PH</option>
                            <option value="loft">Loft</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Barrio / Localidad</label>
                          <select
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-3 py-3 text-white text-sm transition-colors"
                          >
                            <option value="Palermo Soho">Palermo Soho, CABA</option>
                            <option value="Belgrano">Belgrano, CABA</option>
                            <option value="Recoleta">Recoleta, CABA</option>
                            <option value="San Telmo">San Telmo, CABA</option>
                            <option value="San Isidro">San Isidro, GBA Norte</option>
                            <option value="Nordelta">Nordelta, GBA Norte</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Dormitorios</label>
                          <input
                            type="number"
                            name="beds"
                            required
                            min="1"
                            value={formData.beds}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Baños</label>
                          <input
                            type="number"
                            name="baths"
                            required
                            min="1"
                            value={formData.baths}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Superficie (m²)</label>
                          <input
                            type="number"
                            name="area"
                            required
                            min="10"
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Price and Description */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white border-b border-slate-850 pb-2 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-400" />
                        2. Precio, Detalles y Fotos
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Precio de Venta (USD)</label>
                          <input
                            type="number"
                            name="price"
                            required
                            min="1000"
                            placeholder="Ej. 185000"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Expensas Mensuales (ARS)</label>
                          <input
                            type="number"
                            name="expenses"
                            placeholder="Ej. 30000 (Opcional)"
                            value={formData.expenses}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Antigüedad (Años)</label>
                          <input
                            type="number"
                            name="age"
                            required
                            min="0"
                            placeholder="Ej. 5 (0 = A estrenar)"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">¿Tiene Cochera?</label>
                          <select
                            name="parking"
                            value={formData.parking}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-3 py-3 text-white text-sm transition-colors"
                          >
                            <option value="no">No</option>
                            <option value="yes">Sí, cubierta</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Descripción Detallada</label>
                        <textarea
                          name="description"
                          required
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Contale a los compradores sobre los puntos fuertes de tu propiedad: iluminación, distribución, reformas, etc."
                          className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm resize-none"
                        />
                      </div>

                      {/* Photo Upload Simulator */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                          <Image className="h-4 w-4 text-emerald-400" />
                          Subir Fotos
                        </label>
                        <div className="border border-dashed border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-500/2 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                          <UploadCloud className="h-8 w-8 text-slate-500 group-hover:text-emerald-400 transition-colors mb-2" />
                          <span className="text-xs font-bold text-white">Arrastrá tus fotos acá o buscá archivos</span>
                          <span className="text-[10px] text-slate-500 mt-1">Soportado: JPG, PNG (máx. 10MB por foto)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Contact Info */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white border-b border-slate-850 pb-2 flex items-center gap-2">
                        <User className="h-5 w-5 text-emerald-400" />
                        3. Datos de Contacto del Propietario
                      </h3>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nombre Completo</label>
                        <input
                          type="text"
                          name="ownerName"
                          required
                          value={formData.ownerName}
                          onChange={handleChange}
                          placeholder="Ej. Juan Pérez"
                          className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Teléfono de Contacto (WhatsApp)</label>
                          <input
                            type="tel"
                            name="ownerPhone"
                            required
                            placeholder="Ej. +54 9 11 1234-5678"
                            value={formData.ownerPhone}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Correo Electrónico</label>
                          <input
                            type="email"
                            name="ownerEmail"
                            required
                            placeholder="Ej. juanperez@gmail.com"
                            value={formData.ownerEmail}
                            onChange={handleChange}
                            className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-4 py-3 text-white text-sm"
                          />
                        </div>
                      </div>

                      {/* Info / Terms block */}
                      <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-2xl text-[10px] sm:text-xs text-slate-500 leading-relaxed">
                        *Al publicar tu propiedad, confirmás que sos el propietario legítimo o tenés autorización legal de venta del inmueble. DueñoDirecto no intervendrá en las conversaciones, ofertas o firmas contractuales, operando únicamente como nexo de comunicación directa.
                      </div>
                    </div>
                  )}

                  {/* Actions Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-850 mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white font-bold py-2.5 px-6 rounded-2xl text-xs sm:text-sm transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Atrás
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-6 rounded-2xl text-xs sm:text-sm transition-all duration-200 shadow-md shadow-emerald-500/10 hover:-translate-y-0.5"
                    >
                      {step === 3 ? 'Publicar Ahora' : 'Continuar'}
                      {step < 3 && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
