'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  MapPin,
  Shield,
  Calendar,
  DollarSign,
  Phone,
  MessageCircle,
  AlertTriangle,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Navigation,
  X,
  Compass,
  CheckCircle
} from 'lucide-react';
import { Property } from '@/app/data/properties';
import { FaWhatsapp } from 'react-icons/fa';

interface PropertyDetailClientProps {
  property: Property;
  relatedProperties: Property[];
}

export default function PropertyDetailClient({ property, relatedProperties }: PropertyDetailClientProps) {
  // Gallery State
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);

  // Description Read More State
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Currency Formatter (USD)
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Commission Savings (4%)
  const savings = (property.price * 4) / 100;

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
            <span>Inicio</span>
            <span>/</span>
            <span>Propiedades</span>
            <span>/</span>
            <span className="line-clamp-1 max-w-[300px]">{property.title}</span>
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
            
            <p className="text-slate-500 text-xs font-medium flex items-center gap-2">
              <span>{property.beds} Dormitorios</span>
              <span className="text-slate-350">•</span>
              <span>{property.baths} Baños</span>
              <span className="text-slate-350">•</span>
              <span>{property.area} m² superficie</span>
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <div className="text-slate-500 text-xs font-medium">Precio publicado</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatUSD(property.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-md mb-10 group bg-slate-200">
          {/* Main Display Image */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-video sm:aspect-[2.2/1] w-full overflow-hidden cursor-zoom-in"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={activeImage}
                src={property.gallery[activeImage]}
                alt={`${property.title} - Foto ${activeImage + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />

            {/* Overlays */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex justify-end items-center">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-slate-800/20 shadow-md">
                  Publicado: Octubre 2022
                </span>
                
                {/* Share button */}
                <div className="relative">
                  <button
                    onClick={handleShare}
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

            {/* Left & Right navigation chevrons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-800 transition-all opacity-0 group-hover:opacity-100 duration-300 shadow-lg cursor-pointer z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-800 transition-all opacity-0 group-hover:opacity-100 duration-300 shadow-lg cursor-pointer z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots indicators overlaid on the bottom of the image */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-slate-950/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-md">
              {property.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeImage ? 'w-1.5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir a foto ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Property info, interior, exterior, map */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview & description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <h2>Información General</h2>
              </div>
              
              <div className="space-y-3">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {isDescriptionExpanded
                    ? property.description
                    : `${property.description.slice(0, 240)}...`}
                </p>
                {property.description.length > 240 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-amber-600 hover:text-amber-700 font-bold text-sm transition-colors focus:outline-none cursor-pointer"
                  >
                    {isDescriptionExpanded ? 'Mostrar menos' : 'Leer descripción completa'}
                  </button>
                )}
              </div>

              {/* Grid specification cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                <div className="bg-slate-50/75 border border-slate-100 p-4 rounded-2xl text-center space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <img src="/icons-property/dormitorios.png" className="h-6 w-6 mx-auto object-contain" alt="Dormitorios" />
                    <p className="text-xs text-slate-600">Dormitorios</p>
                  </div>
                  <p className="text-base font-extrabold text-slate-900">{property.beds}</p>
                </div>
                
                <div className="bg-slate-50/75 border border-slate-100 p-4 rounded-2xl text-center space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <img src="/icons-property/baños.png" className="h-6 w-6 mx-auto object-contain" alt="Baños" />
                    <p className="text-xs text-slate-600">Baños</p>
                  </div>
                  <p className="text-base font-extrabold text-slate-900">{property.baths}</p>
                </div>
                
                <div className="bg-slate-50/75 border border-slate-100 p-4 rounded-2xl text-center space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <img src="/icons-property/m2.png" className="h-6 w-6 mx-auto object-contain" alt="Superficie total" />
                    <p className="text-xs text-slate-600">Sup. total</p>
                  </div>
                  <p className="text-base font-extrabold text-slate-900">{property.area} m²</p>
                </div>
                
                <div className="bg-slate-50/75 border border-slate-100 p-4 rounded-2xl text-center space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <img src="/icons-property/fecha.png" className="h-6 w-6 mx-auto object-contain" alt="Antigüedad" />
                    <p className="text-xs text-slate-600">Antigüedad</p>
                  </div>
                  <p className="text-base font-extrabold text-slate-900">
                    {property.age === 0 ? 'A estrenar' : `${property.age} años`}
                  </p>
                </div>
              </div>
            </div>

            {/* Interior Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Distribución e Interior
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm font-semibold">
                <div className="flex justify-between py-2.5 border-b border-slate-100 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Superficie Cubierta
                  </span>
                  <span className="text-slate-900 font-bold">{Math.round(property.area * 0.9)} m²</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/dormitorios.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Dormitorios
                  </span>
                  <span className="text-slate-900 font-bold">{property.beds}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100 sm:border-0 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/baños.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Baños Completos
                  </span>
                  <span className="text-slate-900 font-bold">{Math.floor(property.baths)}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100 sm:border-0 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/baños.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Toilette / Auxiliares
                  </span>
                  <span className="text-slate-900 font-bold">
                    {property.baths % 1 !== 0 ? '1' : 'No tiene'}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 sm:border-0 border-b border-slate-100 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/muebles.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Amoblado
                  </span>
                  <span className="text-slate-900 font-bold">{property.furnished}</span>
                </div>
                <div className="flex justify-between py-2.5 sm:border-0 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/cocina.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Cocina Integrada
                  </span>
                  <span className="text-slate-900 font-bold">Sí, equipada</span>
                </div>
              </div>
            </div>

            {/* Exterior Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Exterior y Servicios
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm font-semibold">
                <div className="flex justify-between py-2.5 border-b border-slate-100 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/luz.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Conexión de Luz y Agua
                  </span>
                  <span className="text-slate-900 font-bold">Sí, subterránea</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/cochera.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Cochera Cubierta
                  </span>
                  <span className="text-slate-900 font-bold">{property.parking ? '1 cochera' : 'No'}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100 sm:border-0 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/terraza.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Superficie Terraza
                  </span>
                  <span className="text-slate-900 font-bold">
                    {property.terraceArea ? `${property.terraceArea} m²` : 'No tiene'}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100 sm:border-0 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/jardin.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Jardín Privado
                  </span>
                  <span className="text-slate-900 font-bold">
                    {property.gardenArea ? `${property.gardenArea} m²` : 'No tiene'}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 sm:border-0 border-b border-slate-100 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/agua.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Agua Caliente / Termotanque
                  </span>
                  <span className="text-slate-900 font-bold">Sí, solar / gas</span>
                </div>
                <div className="flex justify-between py-2.5 sm:border-0 items-center">
                  <span className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                    <img src="/icons-property/parrilla.png" className="h-4.5 w-4.5 object-contain" alt="" />
                    Parrilla / BBQ
                  </span>
                  <span className="text-slate-900 font-bold">
                    {property.description.toLowerCase().includes('parrilla') ? 'Sí, propia' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Location & Styled Radar Map */}
            <div id="map-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-slate-700" />
                  Ubicación en el Mapa
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {property.neighborhood}, Costa Rica
                </span>
              </div>

              {/* Styled Mock Radar Map (Light edition) */}
              <div className="w-full aspect-[2.2/1] rounded-2xl border border-slate-150 relative overflow-hidden bg-slate-50 flex flex-col items-center justify-center">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:32px_32px]" />
                
                {/* Radial radar ring ripples */}
                <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-350 animate-ping opacity-30" />
                <div className="absolute w-[350px] h-[350px] rounded-full border border-slate-300 opacity-20" />

                {/* Pin Point */}
                <div className="relative z-10 flex flex-col items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-md">
                  <div className="h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center border border-white animate-pulse">
                    <div className="h-1.5 w-1.5 bg-white rounded-full" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-800 text-center">
                    <div>{property.neighborhood}</div>
                    <div className="text-emerald-600">Inmueble Ubicado</div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 z-10 bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-500 flex items-center gap-1.5 shadow-sm">
                  <Compass className="h-4.5 w-4.5 text-slate-450" />
                  <span>Zona Premium de Alta Demanda</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Owner Box, Savings highlight, and Related Properties */}
          <div className="lg:col-span-4 space-y-8">
            
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

            {/* Recommended Properties list */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Inmuebles Sugeridos
              </h3>
              
              <div className="space-y-5">
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
                      <p className="text-sm font-extrabold text-slate-900 pt-1">
                        {formatUSD(relProp.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 p-4 select-none">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between z-10 px-4 py-2">
              <span className="text-white text-xs sm:text-sm font-medium truncate max-w-[50vw]">
                {property.title}
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                  className="text-white hover:text-slate-300 text-xs font-semibold px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
                >
                  {lightboxZoom ? 'Ajustar tamaño' : 'Zoom 1.5x'}
                </button>
                <button
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setLightboxZoom(false);
                  }}
                  className="text-white hover:text-slate-300 p-2 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
                  aria-label="Cerrar galería"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Image Viewport */}
            <div className="relative flex-grow w-full flex items-center justify-center overflow-hidden">
              {/* Navigation chevrons inside lightbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-white z-20 cursor-pointer"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-white z-20 cursor-pointer"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Lightbox Image Container */}
              <div 
                className={`w-full h-full flex items-center justify-center overflow-auto p-4 md:p-8 select-none transition-colors duration-300 ${
                  lightboxZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setLightboxZoom(!lightboxZoom)}
              >
                <motion.img
                  key={activeImage}
                  src={property.gallery[activeImage]}
                  alt={`${property.title} - Foto ${activeImage + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={`transition-all duration-300 ease-in-out shadow-2xl ${
                    lightboxZoom 
                      ? 'max-w-none max-h-none w-[150%] md:w-[130%] h-auto m-auto rounded-none' 
                      : 'object-contain max-w-[85vw] max-h-[75vh] rounded-xl'
                  }`}
                />
              </div>
            </div>

            {/* Bottom Bar info */}
            <div className="w-full flex flex-col items-center gap-4 z-10 py-2">
              <span className="text-white/60 text-xs font-semibold">
                Foto {activeImage + 1} de {property.gallery.length}
              </span>
              
              {/* Dots navigation */}
              <div className="flex gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-850">
                {property.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeImage ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Ir a foto ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
