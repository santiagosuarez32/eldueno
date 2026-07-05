'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Share,
  CheckCircle,
  Film,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Property, formatPropertyPrice } from '@/app/data/properties';
import { FaWhatsapp } from 'react-icons/fa';
import LightboxGallery from '@/app/components/LightboxGallery';
import Image from 'next/image';
import { getOptimizedImageUrl, supabaseImageLoader } from '@/lib/utils';
import ReactDOM from 'react-dom';

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

  // Preload gallery images to prevent delay when opening lightbox or navigating
  useEffect(() => {
    if (property.gallery && property.gallery.length > 0) {
      property.gallery.slice(0, 5).forEach((url) => {
        ReactDOM.preload(getOptimizedImageUrl(url, 1200), { as: 'image' });
      });
    }
  }, [property.gallery]);

  // Gallery State
  const [activeImage, setActiveImage] = useState(0);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleNextMobile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileImageIndex((prev) => (prev + 1) % (property.gallery?.length || 1));
  };

  const getEmbedUrl = (url?: string) => {
    if (!url) return undefined;
    try {
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        const id = urlObj.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    } catch (e) {
      console.warn("Error parsing video URL", e);
    }
    return url;
  };

  const handlePrevMobile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileImageIndex((prev) => (prev - 1 + (property.gallery?.length || 1)) % (property.gallery?.length || 1));
  };

  // Description Read More State
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Form logic uses the CRM iframe


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
              <span className="bg-slate-50 text-slate-500 text-sm sm:text-base font-medium px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-slate-500" />
                {property.neighborhood}, {property.location}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
              {property.title}
            </h1>
        
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <div className="text-slate-500 text-xs font-medium w-full text-left md:text-right">Precio publicado</div>
            <div className="flex flex-col items-start md:items-end">
              {((property.precio_original && property.precio_original > property.price) || 
                ((property.estado === 'rebajada' || property.estado === 'remate') && !property.precio_original)) ? (
                <span className="text-red-500 line-through text-lg sm:text-xl font-bold mb-0.5">
                  {formatPropertyPrice(property.precio_original && property.precio_original > property.price ? property.precio_original : property.price * 1.15, property.moneda)}
                </span>
              ) : null}
              <span className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight leading-tight">
                {formatPropertyPrice(property.price, property.moneda)}
              </span>
              {property.precio_usd && (
                <span className="text-sm text-slate-500 font-semibold mt-0.5">
                  US$ {property.precio_usd.toLocaleString('es-AR')}
                </span>
              )}
              {property.moneda === 'USD' && (
                <span className="text-xs text-slate-500 font-medium mt-1">
                  (precio fijado en dólares)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Gallery (Carousel) */}
        <div className="md:hidden w-full relative aspect-[4/3] sm:aspect-video mb-8 rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/40">
          {/* Main Image */}
          <div 
            className="w-full h-full relative cursor-zoom-in"
            onClick={() => {
              setActiveImage(mobileImageIndex);
              setIsLightboxOpen(true);
            }}
          >
            <Image
              src={getOptimizedImageUrl(property.gallery?.[mobileImageIndex] || property.image, 800)}
              alt={`${property.title} - Imagen ${mobileImageIndex + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            
            {/* Sold/Rented Overlay */}
            {(property.vendido || property.alquilado) && (
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-3xl">
                <div className={`absolute top-8 -left-16 w-64 text-center py-2 font-black text-sm tracking-widest text-white transform -rotate-45 shadow-2xl ${property.vendido ? 'bg-red-600' : 'bg-blue-600'}`}>
                  {property.vendido ? 'VENDIDA' : 'ALQUILADA'}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {property.gallery && property.gallery.length > 1 && (
            <>
              <button
                onClick={handlePrevMobile}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-800 shadow-md border border-slate-200 z-20 hover:bg-white transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextMobile}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-800 shadow-md border border-slate-200 z-20 hover:bg-white transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {property.gallery && property.gallery.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 px-4 overflow-hidden">
              <div className="flex justify-center gap-1.5 flex-wrap max-h-6 overflow-hidden">
                {property.gallery.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === mobileImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Top floating badges (Share & Date) */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-slate-800/20 shadow-md">
              Publicado: {formattedDate || '—'}{property.age !== undefined && property.age !== null ? ` • ${property.age === 0 ? 'A estrenar' : `${property.age} años`}` : ''}
            </span>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="p-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md cursor-pointer"
                aria-label="Compartir propiedad"
              >
                <Share className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Gallery Bento Grid (Matching Reference Screenshot Layout) */}
        <div className="hidden md:grid grid-cols-12 gap-4 w-full mb-10">
          
          {/* Main Photo (Left side, takes 8/12 grid-cols) */}
          <div 
            onClick={() => {
              setActiveImage(0);
              setIsLightboxOpen(true);
            }}
            className="col-span-1 md:col-span-8 relative aspect-video md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden cursor-zoom-in group bg-slate-100 shadow-sm border border-slate-200/40"
          >
            <Image
              src={getOptimizedImageUrl(property.gallery[0], 1200)}
              alt={`${property.title} - Principal`}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transform group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            
            {/* Sold/Rented Overlay */}
            {(property.vendido || property.alquilado) && (
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-3xl">
                {/* Banner Diagonal */}
                <div className={`absolute top-10 -left-16 w-64 text-center py-2 font-black text-sm sm:text-base tracking-widest text-white transform -rotate-45 shadow-2xl ${property.vendido ? 'bg-red-600' : 'bg-blue-600'}`}>
                  {property.vendido ? 'VENDIDA' : 'ALQUILADA'}
                </div>
              </div>
            )}
            
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
                <div
                  className={`absolute right-0 bottom-full mb-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400 whitespace-nowrap shadow-xl flex items-center gap-1 z-30 transition-all duration-300 origin-bottom-right ${
                    showShareToast ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'
                  }`}
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  ¡Enlace copiado!
                </div>
              </div>
            </div>
          </div>

          {/* Right Stacked Photos (Right side, takes 4/12 grid-cols) */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4 h-auto md:h-[500px]">
            
            {/* Top Right Photo */}
            <div 
              onClick={() => {
                setActiveImage(1);
                setIsLightboxOpen(true);
              }}
              className="flex-1 relative aspect-video md:aspect-auto md:h-[calc(50%-8px)] rounded-3xl overflow-hidden cursor-zoom-in group bg-slate-100 shadow-sm border border-slate-200/40"
            >
              <Image
                src={getOptimizedImageUrl(property.gallery[1] || property.image, 600)}
                alt={`${property.title} - Detalle 1`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transform group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                priority
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
              <Image
                src={getOptimizedImageUrl(property.gallery[2] || property.image, 600)}
                alt={`${property.title} - Detalle 2`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transform group-hover:scale-[1.015] transition-transform duration-500 ease-out group-hover:brightness-[0.35]"
                priority
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
            {property.hasVideo && (
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
                    src={getEmbedUrl(property.videoUrl) || "https://www.youtube.com/embed/Pj15bLqT40A"}
                    title="Video de la propiedad"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Solicitar Información Form, Owner Box, and Related Properties */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Solicitar Información Form (CRM Embed) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 leading-tight">
                Solicitar Información
              </h3>
              <div className="w-full min-h-[674px]">
                <iframe
                  src="https://crm.elduenovende.com/widget/form/gnolY2xzWsk8vN2HW0Lc"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                  id="inline-gnolY2xzWsk8vN2HW0Lc" 
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Consultas"
                  data-height="674"
                  data-layout-iframe-id="inline-gnolY2xzWsk8vN2HW0Lc"
                  data-form-id="gnolY2xzWsk8vN2HW0Lc"
                  title="Consultas"
                >
                </iframe>
                <Script id="crm-url-params" strategy="afterInteractive">
                  {`
                    (function () {
                        const url = new URL(window.location.href);

                        // Asignamos la variable exacta de la propiedad
                        const propertyTitle = ${JSON.stringify(property.title)};

                        let changed = false;
                        if (url.searchParams.get("nombre_de_propiedad") !== propertyTitle) {
                            url.searchParams.set("nombre_de_propiedad", propertyTitle);
                            changed = true;
                        }

                        if (!url.searchParams.has("url_de_propiedad")) {
                            url.searchParams.set("url_de_propiedad", window.location.href.split('?')[0]);
                            changed = true;
                        }

                        if (changed) {
                            window.history.replaceState(null, '', url.toString());
                        }
                    })();
                  `}
                </Script>
                <Script src="https://crm.elduenovende.com/js/form_embed.js" strategy="lazyOnload" />
              </div>
            </div>

            {/* Owner contact box */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-5">
                 <div className="space-y-3 mt-2">
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
                    href="tel:+50622806665"
                    className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Phone className="h-4 w-4 text-slate-500" />
                    Llamar al +50622806665
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Recommended Properties list */}
        <div className="space-y-6 mt-16 pt-2">
          <h3 className="text-lg font-bold text-slate-900">
            Propiedades Similares a tu búsqueda
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
                  <Image
                    src={getOptimizedImageUrl(relProp.image, 400)}
                    alt={relProp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                    {Number(relProp.beds) > 0 ? (
                      <span className="flex items-center gap-1">
                        <img src="/icons-property/dormitorios.png" className="h-3.5 w-3.5 object-contain" alt="" />
                        {relProp.beds} Dorms
                      </span>
                    ) : null}
                    {Number(relProp.baths) > 0 ? (
                      <span className="flex items-center gap-1">
                        <img src="/icons-property/baños.png" className="h-3.5 w-3.5 object-contain" alt="" />
                        {relProp.baths} Baños
                      </span>
                    ) : null}
                    {Number(relProp.area) > 0 ? (
                      <span className="flex items-center gap-1">
                        <img src="/icons-property/m2.png" className="h-3.5 w-3.5 object-contain" alt="" />
                        {relProp.area} m²
                      </span>
                    ) : null}
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
      {isLightboxOpen && (
        <LightboxGallery
          gallery={property.gallery}
          title={property.title}
          activeIndex={activeImage}
          onClose={() => setIsLightboxOpen(false)}
          onChangeIndex={(idx) => setActiveImage(idx)}
        />
      )}
    </main>
  );
}
