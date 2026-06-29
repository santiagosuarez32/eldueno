'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Building2, TreePine, X, Users, Award } from 'lucide-react';
import { FlowButton } from './FlowButton';
import { mockProperties, Property, mapDbToProperty } from '@/app/data/properties';
import PropertyCard from './PropertyCard';
import { supabase } from '@/lib/supabase';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Helper to remove accents / diacritics for search normalization
const normalizeString = (str: string): string => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export default function Hero() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const lenis = useLenis();
  const container = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial hero animations
    gsap.from(".hero-badge", { opacity: 0, y: -15, duration: 0.6 });
    gsap.from(".hero-title", { opacity: 0, y: 20, duration: 0.8, delay: 0.1 });
    gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
    gsap.from(".hero-buttons", { opacity: 0, y: 15, duration: 0.8, delay: 0.3 });
    gsap.from(".hero-search", { opacity: 0, y: 25, duration: 0.8, delay: 0.3 });
    gsap.from(".hero-stats", { opacity: 0, duration: 0.5, delay: 0.5 });
  }, { scope: container });

  useGSAP(() => {
    if (isOpenModal && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(".modal-content", { y: -25, scale: 0.96 }, { y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" });
    }
  }, [isOpenModal]);

  const handleCloseModal = () => {
    if (!modalRef.current) return;
    setIsClosingModal(true);
    gsap.to(".modal-content", { y: -25, scale: 0.96, duration: 0.3, ease: "power2.in" });
    gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
      setIsOpenModal(false);
      setIsClosingModal(false);
    } });
  };

  // Fetch properties from Supabase on mount
  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase.from('properties').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          setProperties(data.map(mapDbToProperty));
        } else {
          setProperties(mockProperties);
        }
      } catch (err) {
        console.warn("Error loading properties for search in Hero. Falling back to local mocks:", err);
        setProperties(mockProperties);
      }
    }
    load();
  }, []);

  // Esc key listener to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpenModal) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpenModal]);

  // Prevent body scroll when search modal is open
  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add('overflow-hidden');
      lenis?.stop();
    } else {
      document.body.classList.remove('overflow-hidden');
      lenis?.start();
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      lenis?.start();
    };
  }, [isOpenModal, lenis]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsSearching(true);
    setIsOpenModal(true);

    const query = searchValue.toLowerCase().trim();
    const queryNorm = normalizeString(query);
    const matches = properties.filter((property) => {
      const titleNorm = normalizeString(property.title);
      const locationNorm = normalizeString(property.location);
      const neighborhoodNorm = normalizeString(property.neighborhood);
      const typeNorm = normalizeString(property.type);
      const descNorm = normalizeString(property.description);

      return (
        titleNorm.includes(queryNorm) ||
        locationNorm.includes(queryNorm) ||
        neighborhoodNorm.includes(queryNorm) ||
        typeNorm.includes(queryNorm) ||
        descNorm.includes(queryNorm)
      );
    });

    setSearchResults(matches);

    // Latency simulator
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    const query = val.toLowerCase().trim();
    const queryNorm = normalizeString(query);
    const matches = properties.filter((property) => {
      const titleNorm = normalizeString(property.title);
      const locationNorm = normalizeString(property.location);
      const neighborhoodNorm = normalizeString(property.neighborhood);
      const typeNorm = normalizeString(property.type);
      const descNorm = normalizeString(property.description);

      return (
        titleNorm.includes(queryNorm) ||
        locationNorm.includes(queryNorm) ||
        neighborhoodNorm.includes(queryNorm) ||
        typeNorm.includes(queryNorm) ||
        descNorm.includes(queryNorm)
      );
    });

    setSearchResults(matches);
  };

  const triggerQuickSearch = (tag: string) => {
    setSearchValue(tag);
    setIsSearching(true);
    setIsOpenModal(true);

    const queryNorm = normalizeString(tag);
    const matches = properties.filter((property) => {
      const titleNorm = normalizeString(property.title);
      const locationNorm = normalizeString(property.location);
      const neighborhoodNorm = normalizeString(property.neighborhood);
      const typeNorm = normalizeString(property.type);
      const descNorm = normalizeString(property.description);

      return (
        titleNorm.includes(queryNorm) ||
        locationNorm.includes(queryNorm) ||
        neighborhoodNorm.includes(queryNorm) ||
        typeNorm.includes(queryNorm) ||
        descNorm.includes(queryNorm)
      );
    });

    setSearchResults(matches);

    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  return (
    <section ref={container} className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-slate-950">
      {/* Background Image with Centered Easing Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.webp"
          alt="Modern House"
          className="w-full h-full object-cover"
        />
        {/* Subtle radial dark overlay with easing */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.55) 60%, rgba(0, 0, 0, 0.75) 100%)'
          }}
        />
        {/* Subtle bottom vignette to blend with the container */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.32) 35%, rgba(0, 0, 0, 0) 80%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Top Centered: Title & Subtitle */}
        <div className="text-center max-w-3xl space-y-4 sm:space-y-5 mb-6 sm:mb-8 flex flex-col items-center">
          <div
            className="hero-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-xs font-semibold"
          >
            <MapPin className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
            El Dueño Vende * Costa Rica
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h1
              className="hero-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] font-sans"
            >
              Encontrá el hogar <br />
              <span className="text-emerald-400">de tus sueños</span>
            </h1>

            <p
              className="hero-desc text-slate-200 text-sm sm:text-lg max-w-2xl leading-normal mx-auto"
            >
              Empresa costarricense con más de 35 años de trayectoria, especializada en la Compra, Venta, Alquiler, Arquitectura y Préstamos hipotecarios en el Gran Área Metropolitana.
            </p>
          </div>

          {/* Actions Buttons (single line on mobile) */}
          <div
            className="hero-buttons flex flex-row items-center justify-center gap-2 sm:gap-4 pt-2 w-full"
          >
            <Link href="/propiedades" className="flex-shrink-0">
              <FlowButton text="Ver Propiedades" variant="primary" />
            </Link>
            <Link href="/contacto" className="flex-shrink-0">
              <FlowButton text="Contactar Asesor" variant="secondary" />
            </Link>
          </div>
        </div>

        {/* Bottom Centered: Wide Single Search Input */}
        <div
          className="hero-search w-full max-w-[88%] sm:max-w-xl md:max-w-2xl mx-auto"
        >
          <div 
            onClick={() => {
              setIsOpenModal(true);
              if (searchValue.trim()) {
                const query = searchValue.toLowerCase().trim();
                const queryNorm = normalizeString(query);
                const matches = properties.filter((property) => {
                  const titleNorm = normalizeString(property.title);
                  const locationNorm = normalizeString(property.location);
                  const neighborhoodNorm = normalizeString(property.neighborhood);
                  const typeNorm = normalizeString(property.type);
                  const descNorm = normalizeString(property.description);

                  return (
                    titleNorm.includes(queryNorm) ||
                    locationNorm.includes(queryNorm) ||
                    neighborhoodNorm.includes(queryNorm) ||
                    typeNorm.includes(queryNorm) ||
                    descNorm.includes(queryNorm)
                  );
                });
                setSearchResults(matches);
              }
            }}
            className="bg-white rounded-full p-1 sm:p-1.5 shadow-2xl flex flex-row items-center border border-slate-100 cursor-pointer"
          >
            <div className="flex-1 flex items-center pl-4 sm:pl-6 pr-2 py-2 sm:py-2.5">
              <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-slate-400 mr-2 sm:mr-3 shrink-0" />
              <input
                type="text"
                readOnly
                value={searchValue}
                placeholder="Escribe ubicación, tipo de propiedad, distrito..."
                className="w-full bg-transparent border-0 p-0 text-slate-900 text-xs sm:text-sm md:text-base font-semibold placeholder-slate-400 focus:ring-0 focus:outline-none cursor-pointer truncate"
              />
            </div>
            <button
              type="button"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-2.5 sm:px-6 sm:py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 shrink-0 mr-0.5 cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Buscar</span>
            </button>
          </div>

          {/* Search Overlay Modal */}
          {(isOpenModal || isClosingModal) && (
            <div
              ref={modalRef}
              data-lenis-prevent
              className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-start justify-center pt-24 md:pt-32 px-4 overflow-y-auto"
              onClick={handleCloseModal}
            >
              <div
                className="modal-content w-full max-w-6xl xl:max-w-7xl bg-white rounded-[32px] shadow-2xl p-6 sm:p-8 flex flex-col relative text-left"
                onClick={(e) => e.stopPropagation()}
              >
                  {/* Modal Search Form */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full p-2 pl-5 pr-3 shadow-inner mb-6">
                    <Search className="h-5 w-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      autoFocus
                      value={searchValue}
                      onChange={handleInputChange}
                      placeholder="Escribe ubicación, tipo de propiedad, distrito..."
                      className="flex-grow bg-transparent border-0 p-0 text-slate-900 text-sm sm:text-base font-semibold placeholder-slate-450 focus:ring-0 focus:outline-none"
                    />
                    {searchValue && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchValue('');
                          setSearchResults([]);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-655 rounded-full cursor-pointer hover:bg-slate-200 transition-colors mr-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-slate-950 text-white font-bold px-5 py-2.5 rounded-full text-xs hover:bg-slate-900 transition-all cursor-pointer shrink-0"
                    >
                      Cerrar
                    </button>
                  </div>

                  {/* Header */}
                  {searchValue.trim() !== '' && (
                    <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4 px-2">
                      <span className="text-xs font-medium text-slate-500">
                        {isSearching ? 'Buscando propiedades directas...' : `Resultados para "${searchValue}"`}
                      </span>
                    </div>
                  )}

                  {/* Results panel */}
                  <div className="flex-grow min-h-0">
                    {isSearching ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
                        <p className="text-slate-550 text-xs font-bold animate-pulse">
                          Consultando listados directos del dueño...
                        </p>
                      </div>
                    ) : (
                      <>
                        {searchValue.trim() === '' ? (
                          <div className="py-12 text-center text-slate-400 space-y-5">
                            <p className="text-xs font-medium text-slate-500 font-medium">Escribe tu búsqueda para empezar o selecciona un tag rápido:</p>
                            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                              {['San José', 'Santa Ana', 'Escazú', 'Casa', 'Terreno', 'Comercial'].map((tag) => (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => triggerQuickSearch(tag)}
                                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full cursor-pointer transition-colors"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <>
                            <div 
                              data-lenis-prevent
                              className="max-h-[550px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar pb-2"
                            >
                              {searchResults.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                              ))}
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-center">
                              <Link
                                href={`/propiedades?search=${encodeURIComponent(searchValue.trim())}`}
                                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                              >
                                Ver todos los resultados en el catálogo completo ({searchResults.length})
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-12 space-y-2">
                            <p className="text-slate-900 text-sm font-bold">No se encontraron propiedades</p>
                            <p className="text-slate-500 text-xs max-w-sm mx-auto font-medium">
                              No encontramos propiedades para &quot;{searchValue}&quot;. Intentá buscar con otros términos como &quot;San José&quot;, &quot;casa&quot; o &quot;terreno&quot;.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* Statistics / Badges row */}
          <div 
            className="hero-stats mt-6 flex flex-wrap items-center justify-center gap-3 text-xs"
          >
            <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
              <Building2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              <span className="font-extrabold text-white">1,500+</span>
              <span className="font-normal text-slate-300">Propiedades vendidas</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
              <Users className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              <span className="font-extrabold text-white">3,000+</span>
              <span className="font-normal text-slate-300">Clientes Satisfechos</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
              <Award className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              <span className="font-extrabold text-white">35+</span>
              <span className="font-normal text-slate-300">de Experiencia</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
