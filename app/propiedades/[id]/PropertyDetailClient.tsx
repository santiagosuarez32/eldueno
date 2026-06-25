'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Share,
  CheckCircle,
  Film,
  Send
} from 'lucide-react';
import { Property, formatPropertyPrice } from '@/app/data/properties';
import { FaWhatsapp } from 'react-icons/fa';
import LightboxGallery from '@/app/components/LightboxGallery';

interface PropertyDetailClientProps {
  property: Property;
  relatedProperties: Property[];
}

export default function PropertyDetailClient({ property, relatedProperties }: PropertyDetailClientProps) {
  // Dynamics to force body background to white for light theme feel
  useEffect(() => {
    document.body.classList.add('bg-white', 'text-slate-900');
    document.body.classList.remove('bg-slate-950', 'text-slate-100');
    return () => {
      document.body.classList.remove('bg-white', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    };
  }, []);

  // Gallery State
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Description Read More State
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Solicitar Información Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState(
    `Me interesa la propiedad ${property.title} en ${property.neighborhood}, ${property.location}. Por favor contáctenme.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
    }, 1200);
  };



  // Commission Savings (4%)
  const savings = (property.price * 4) / 100;

  // Metadata items array for description header
  const metadataItems: string[] = [];
  const specCards: { label: string; value: string | number; icon: string }[] = [];

  const landAreaVal = property.landArea || property.area;
  if (landAreaVal) {
    metadataItems.push(`${landAreaVal} Metros cuadrados de terreno`);
    specCards.push({
      label: 'm² Terreno',
      value: `${landAreaVal} m²`,
      icon: '/icons-property/terraza.png'
    });
  }
  const constArea = property.constructionArea || (property.type !== 'terreno' ? property.area : undefined);
  if (constArea) {
    metadataItems.push(`${constArea} Metros cuadrados de construcción`);
    specCards.push({
      label: 'm² Construcción',
      value: `${constArea} m²`,
      icon: '/icons-property/m2.png'
    });
  }
  if (property.parkingSpaces) {
    metadataItems.push(`${property.parkingSpaces} Estacionamientos`);
    specCards.push({
      label: 'Estacionamientos',
      value: property.parkingSpaces,
      icon: '/icons-property/cochera.png'
    });
  } else if (property.parking) {
    metadataItems.push(`1 Estacionamientos`);
    specCards.push({
      label: 'Estacionamientos',
      value: '1',
      icon: '/icons-property/cochera.png'
    });
  }
  if (property.beds) {
    metadataItems.push(`${property.beds} Dormitorios`);
    specCards.push({
      label: 'Dormitorios',
      value: property.beds,
      icon: '/icons-property/dormitorios.png'
    });
  } else if (property.aposentos) {
    metadataItems.push(`${property.aposentos} Aposentos`);
    specCards.push({
      label: 'Aposentos',
      value: property.aposentos,
      icon: '/icons-property/dormitorios.png'
    });
  }
  if (property.baths) {
    metadataItems.push(`${property.baths} Baños`);
    specCards.push({
      label: 'Baños',
      value: property.baths,
      icon: '/icons-property/baños.png'
    });
  }

  // Next / Prev Gallery Navigation
  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % property.gallery.length);
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
  };

  // Share action (Copy link)
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const formattedDate = property.created_at
    ? new Date(property.created_at).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : '';

  return (
    <main className="min-h-screen pt-28 pb-24 bg-white text-slate-900 relative">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-slate-50 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex flex-col items-start gap-1.5 mb-8">
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors text-xs group"
          >
            <ArrowLeft className="h-4 w-4 text-slate-500 transform group-hover:-translate-x-1 transition-transform" />
            Volver a la búsqueda
          </Link>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/propiedades" className="hover:text-slate-900 transition-colors">
              Propiedades
            </Link>
            <span>/</span>
            <span className="line-clamp-1 max-w-[300px] text-slate-700 font-semibold">{property.title}</span>
          </div>
        </div>

        {/* Property Main Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-slate-100 text-slate-500 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                {property.type === 'departamento'
                  ? 'Departamento'
                  : property.type === 'casa'
                  ? 'Casa'
                  : property.type === 'ph'
                  ? 'PH'
                  : 'Loft'}
              </span>
              <span className="bg-slate-50 text-slate-500 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                {property.neighborhood}, {property.location}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {property.title}
            </h1>
        
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <div className="text-slate-500 text-xs font-medium">Precio publicado</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatPropertyPrice(property.price, property.moneda)}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Bento Grid (Matching Reference Screenshot Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full mb-10">
          
          {/* Main Photo (Left side, takes 8/12 grid-cols) */}
          <div 
            onClick={() => {
              setActiveImage(0);
              setIsLightboxOpen(true);
            }}
            className="col-span-1 md:col-span-8 relative aspect-video md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden cursor-zoom-in group bg-slate-100 shadow-sm border border-slate-200/40"
          >
            <img
              src={property.gallery[0]}
              alt={`${property.title} - Principal`}
              className="w-full h-full absolute inset-0 object-cover transform group-hover:scale-[1.015] transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            
            {/* Share and Metadata Floating Badges */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-slate-800/20 shadow-md">
                Publicado: {formattedDate || '—'}{property.age !== undefined && property.age !== null ? ` • ${property.age === 0 ? 'A estrenar' : `Antigüedad: ${property.age} años`}` : ''}
              </span>
              
              {/* Share button */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white transition-all duration-300 shadow-md cursor-pointer"
                  aria-label="Compartir propiedad"
                >
                  <Share className="h-4.5 w-4.5" />
                </button>
                {/* Share Toast */}
                <AnimatePresence>
                  {showShareToast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 bottom-full mb-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400 whitespace-nowrap shadow-xl flex items-center gap-1 z-30"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      ¡Enlace copiado!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Stacked Photos (Right side, takes 4/12 grid-cols) */}
          <div className="col-span-1 md:col-span-4 flex flex-row md:flex-col gap-4 h-auto md:h-[500px]">
            
            {/* Top Right Photo */}
            <div 
              onClick={() => {
                setActiveImage(1);
                setIsLightboxOpen(true);
              }}
              className="flex-1 relative aspect-video md:aspect-auto md:h-[calc(50%-8px)] rounded-3xl overflow-hidden cursor-zoom-in group bg-slate-100 shadow-sm border border-slate-200/40"
            >
              <img
                src={property.gallery[1] || property.image}
                alt={`${property.title} - Detalle 1`}
                className="w-full h-full absolute inset-0 object-cover transform group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Bottom Right Photo (with "+N" overlay for remaining gallery items) */}
            <div 
              onClick={() => {
                setActiveImage(2);
                setIsLightboxOpen(true);
              }}
              className="flex-1 relative aspect-video md:aspect-auto md:h-[calc(50%-8px)] rounded-3xl overflow-hidden cursor-zoom-in group bg-slate-100 shadow-sm border border-slate-200/40"
            >
              <img
                src={property.gallery[2] || property.image}
                alt={`${property.title} - Detalle 2`}
                className="w-full h-full absolute inset-0 object-cover transform group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
              
              {/* "+N" Overlay */}
              {property.gallery.length > 3 && (
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center text-white transition-colors duration-300 group-hover:bg-slate-950/50">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-wide">
                    +{property.gallery.length - 2}
                  </span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Property info, interior, exterior, map */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview & description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              
              {/* Características Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Características
                </h3>
                {/* Grid specification cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {specCards.map((card, idx) => (
                    <div key={idx} className="bg-slate-50/75 border border-slate-100 p-4 rounded-2xl text-center space-y-2 flex flex-col justify-between">
                      <div className="space-y-2">
                        <img src={card.icon} className="h-6 w-6 mx-auto object-contain" alt={card.label} />
                        <p className="text-xs text-slate-500 font-medium">{card.label}</p>
                      </div>
                      <p className="text-base font-extrabold text-slate-900">{card.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descripción Section */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Descripción
                </h3>
                <div className="space-y-3">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {isDescriptionExpanded
                      ? property.description
                      : `${property.description.slice(0, 240)}...`}
                  </p>
                  {property.description.length > 240 && (
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-yellow-600 hover:text-yellow-700 font-bold text-sm transition-colors focus:outline-none cursor-pointer"
                    >
                      {isDescriptionExpanded ? 'Mostrar menos' : 'Leer descripción completa'}
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Property Video (YouTube Embed) */}
            <div id="video-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Film className="h-5 w-5 text-slate-700" />
                  Video de la Propiedad
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {property.neighborhood}, Costa Rica
                </span>
              </div>

              {/* YouTube Iframe container */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 relative shadow-inner border border-slate-200">
                <iframe
                  className="w-full h-full absolute inset-0 border-0"
                  src={property.videoUrl || "https://www.youtube.com/embed/Pj15bLqT40A"}
                  title="Video de la propiedad"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Solicitar Información Form, Owner Box, and Related Properties */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Solicitar Información Form */}
            <form onSubmit={handleFormSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 leading-tight">
                Solicitar Información
              </h3>

              {submitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200/60 p-5 rounded-2xl text-emerald-800 text-sm font-semibold text-center space-y-1 animate-fadeIn">
                  <div>¡Consulta enviada con éxito!</div>
                  <div className="text-xs font-normal text-emerald-600">El dueño se pondrá en contacto pronto.</div>
                </div>
              ) : (
                <>
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-800">
                      Nombre <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e4db] focus:border-yellow-400 focus:ring-1 focus:ring-yellow-450/20 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Email & Tel side-by-side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-800">
                        Email <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-[#fbf9f6] border border-[#e8e4db] focus:border-yellow-400 focus:ring-1 focus:ring-yellow-450/20 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-800">
                        Tel <span className="text-slate-500 font-normal">(opc.)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="8888-8888"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-[#fbf9f6] border border-[#e8e4db] focus:border-yellow-400 focus:ring-1 focus:ring-yellow-450/20 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-800">
                      Mensaje <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e4db] focus:border-yellow-400 focus:ring-1 focus:ring-yellow-450/20 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none placeholder:text-slate-400 leading-relaxed"
                    />
                  </div>

                  {/* Enviar Consulta Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-200 text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 group hover:-translate-y-0.5 text-sm cursor-pointer shadow-md shadow-yellow-405/10"
                  >
                    <Send className="h-4 w-4 text-slate-950 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
                  </button>
                </>
              )}
            </form>

            {/* Owner contact box */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-5">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Al contactar a este propietario directo, no pagás honorarios a inmobiliarias. Coordiná visitas físicas, solicitá planos de catastro o evacuá dudas técnicas directamente.
                </p>

                 <div className="space-y-3">
                  <a
                    href={property.owner.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-green-600/10 flex items-center justify-center gap-2 group hover:-translate-y-0.5 text-sm cursor-pointer"
                  >
                    <FaWhatsapp className="h-5 w-5 text-white shrink-0" />
                    Enviar mensaje directo
                  </a>

                  <a
                    href={`tel:${property.owner.phone}`}
                    className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Phone className="h-4 w-4 text-slate-500" />
                    Llamar al {property.owner.phone}
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Recommended Properties list */}
        <div className="space-y-6 mt-16 pt-2">
          <h3 className="text-lg font-bold text-slate-900">
            Inmuebles Sugeridos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProperties.slice(0, 3).map((relProp) => (
              <Link
                key={relProp.id}
                href={`/propiedades/${relProp.id}`}
                className="flex flex-col bg-white hover:bg-slate-50 border border-slate-100 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md group overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="aspect-[1.5/1] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={relProp.image}
                    alt={relProp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Description details */}
                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-slate-950 transition-colors line-clamp-1 leading-snug">
                    {relProp.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{relProp.neighborhood}</span>
                  </p>
                  
                  {/* Property Specs Row */}
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    {relProp.beds && (
                      <span className="flex items-center gap-1">
                        <img src="/icons-property/dormitorios.png" className="h-3.5 w-3.5 object-contain" alt="" />
                        {relProp.beds} Dorms
                      </span>
                    )}
                    {relProp.baths && (
                      <span className="flex items-center gap-1">
                        <img src="/icons-property/baños.png" className="h-3.5 w-3.5 object-contain" alt="" />
                        {relProp.baths} Baños
                      </span>
                    )}
                    {relProp.area && (
                      <span className="flex items-center gap-1">
                        <img src="/icons-property/m2.png" className="h-3.5 w-3.5 object-contain" alt="" />
                        {relProp.area} m²
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm font-extrabold text-slate-900 pt-1">
                    {formatPropertyPrice(relProp.price, relProp.moneda)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL with Zoom + Pan */}
      <AnimatePresence>
        {isLightboxOpen && (
          <LightboxGallery
            gallery={property.gallery}
            title={property.title}
            activeIndex={activeImage}
            onClose={() => setIsLightboxOpen(false)}
            onChangeIndex={(idx) => setActiveImage(idx)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
