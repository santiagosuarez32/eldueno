'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PropertyCard from '@/app/components/PropertyCard';
import { Property, CURRENCY_CONFIG } from '@/app/data/properties';
import { Search, RotateCcw } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function CatalogContent({ initialProperties }: { initialProperties: Property[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialType = searchParams.get('type') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialPriceRange = searchParams.get('price') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialPage = Number(searchParams.get('page')) || 1;

  const isAlwaysDollar = CURRENCY_CONFIG.mode === 'always-dollar';
  const defaultMaxPrice = isAlwaysDollar ? 1000000 : 700000000;
  const minPrice = isAlwaysDollar ? 100000 : 5000000;
  const maxPriceLimit = isAlwaysDollar ? 1000000 : 700000000;
  const priceStep = isAlwaysDollar ? 25000 : 5000000;

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedBeds, setSelectedBeds] = useState<number | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(defaultMaxPrice);
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const itemsPerPage = 9;
  const properties = initialProperties;

  useEffect(() => {
    if (initialType) setSelectedType(initialType);
    if (initialLocation) setSelectedLocation(initialLocation);
    if (initialSearch) setSearchTerm(initialSearch);
    if (initialPriceRange) {
      const multiplier = isAlwaysDollar ? 1 : 550;
      if (initialPriceRange === '0-200000') setMaxPrice(200000 * multiplier);
      else if (initialPriceRange === '200000-500000') setMaxPrice(500000 * multiplier);
      else if (initialPriceRange === '500000-1000000') setMaxPrice(1000000 * multiplier);
    }
  }, [initialType, initialLocation, initialPriceRange, initialSearch, isAlwaysDollar]);

  useEffect(() => {
    document.body.classList.add('bg-white', 'text-slate-900');
    document.body.classList.remove('bg-slate-950', 'text-slate-100');
    return () => {
      document.body.classList.remove('bg-white', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    };
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = searchTerm === '' || property.title.toLowerCase().includes(searchTerm.toLowerCase()) || property.description.toLowerCase().includes(searchTerm.toLowerCase()) || property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || property.type === selectedType;
    const matchesLocation = selectedLocation === '' || property.location.toLowerCase().includes(selectedLocation.toLowerCase()) || property.neighborhood.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesBeds = selectedBeds === 'all' || (property.beds && (selectedBeds === 4 ? property.beds >= 4 : property.beds === selectedBeds));
    const matchesPrice = property.price <= maxPrice;
    return matchesSearch && matchesType && matchesLocation && (property.type === 'terreno' ? true : matchesBeds) && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLocation('');
    setSelectedBeds('all');
    setMaxPrice(defaultMaxPrice);
    setCurrentPage(1);
    router.push(pathname || '/propiedades', { scroll: false }); 
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    window.location.href = `${pathname || '/propiedades'}?${params.toString()}`;
  };

  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (gridRef.current && filteredProperties.length > 0) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [paginatedProperties, filteredProperties.length]);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-24 bg-white text-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-2">
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight">Catálogo de Propiedades</h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">Propiedades directas publicadas por sus dueños. Ahorrá comisiones intermediarias.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-3 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 space-y-6 lg:sticky lg:top-24 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <span className="font-bold text-slate-955 flex items-center gap-2"><img src="/icons-filters/filter.png" className="h-5 w-5 object-contain" alt="" /> Filtros Activos</span>
                <button onClick={resetFilters} className="text-xs font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"><RotateCcw className="h-3.5 w-3.5" /> Reiniciar</button>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-[13px] font-medium text-slate-700">Buscar por palabra clave</label>
                <div className="relative rounded-2xl shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Search className="h-4 w-4 text-slate-400" /></div>
                  <input type="text" placeholder="Ej. Terraza, Cochera, Belgrano..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:outline-none pl-10 pr-4 py-2.5 text-slate-900 text-sm shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-[13px] font-medium text-slate-700 flex items-center gap-1.5"><img src="/icons-filters/property.png" className="h-4 w-4 object-contain" alt="" /> Tipo de propiedad</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-2xl px-3 py-2.5 text-sm text-slate-900 shadow-sm cursor-pointer transition-colors">
                  <option value="">Todos los tipos</option>
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa</option>
                  <option value="terreno">Terreno</option>
                  <option value="comercial">Local / Edificación Comercial</option>
                  <option value="ph">PH</option>
                  <option value="loft">Loft</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-[13px] font-medium text-slate-700 flex items-center gap-1.5"><img src="/icons-filters/ubication.png" className="h-4 w-4 object-contain" alt="" /> Barrio o zona</label>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-2xl px-3 py-2.5 text-sm text-slate-900 shadow-sm cursor-pointer transition-colors">
                  <option value="">Cualquier zona</option>
                  <option value="Escazú">Escazú (San José)</option>
                  <option value="Santa Ana">Santa Ana (San José)</option>
                  <option value="Barrio Amón">Barrio Amón (San José)</option>
                  <option value="Tamarindo">Tamarindo (Guanacaste)</option>
                  <option value="Cariari">Cariari (Heredia)</option>
                  <option value="Tres Ríos">Tres Ríos (Cartago)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-[13px] font-medium text-slate-700 flex items-center gap-1.5"><img src="/icons-filters/bedrooms.png" className="h-4 w-4 object-contain" alt="" /> Dormitorios</label>
                <div className="grid grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  {(['all', 1, 2, 3, 4] as const).map((bedsOption) => (
                    <button key={bedsOption} onClick={() => setSelectedBeds(bedsOption)} className={`py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${selectedBeds === bedsOption ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-950'}`}>{bedsOption === 'all' ? 'Todo' : bedsOption === 4 ? '4+' : bedsOption}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-[13px] font-medium text-slate-700">
                  <span className="flex items-center gap-1.5"><img src="/icons-filters/price.png" className="h-4 w-4 object-contain" alt="" /> Precio máximo</span>
                  <span className="text-slate-955 normal-case font-bold text-sm">{CURRENCY_CONFIG.mode === 'always-dollar' ? 'USD' : '₡'} {new Intl.NumberFormat('en-US').format(maxPrice)}</span>
                </div>
                <input type="range" min={minPrice} max={maxPriceLimit} step={priceStep} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>{isAlwaysDollar ? 'USD 100k' : '₡ 5M'}</span>
                  <span>{isAlwaysDollar ? 'USD 1M' : '₡ 700M'}</span>
                </div>
              </div>
            </aside>
            <div className="lg:col-span-9 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
                <span>Mostrando <strong className="text-slate-950">{filteredProperties.length}</strong> propiedades</span>
                <span>Filtro en tiempo real</span>
              </div>
              <div ref={gridRef}>
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProperties.map((property, index) => (
                      <div key={property.id}>
                        <PropertyCard property={property} priority={index < 4} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200/60 text-center py-20 px-4 rounded-3xl space-y-4 shadow-sm">
                    <p className="text-slate-950 text-lg font-semibold">No encontramos propiedades con estos filtros</p>
                    <button onClick={resetFilters} className="bg-white border border-slate-200 text-slate-800 font-bold px-6 py-2.5 rounded-2xl text-xs hover:border-emerald-500/30 hover:text-emerald-600 transition-colors shadow-sm cursor-pointer">Restablecer Filtros</button>
                  </div>
                )}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-8 pb-4">
                  <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Anterior</button>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
                      return <button key={page} onClick={() => handlePageChange(page)} className={`w-9 h-9 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-200 ${page === currentPage ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>{page}</button>;
                    })}
                  </div>
                  <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Siguiente</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CatalogClient({ initialProperties }: { initialProperties: Property[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-slate-900 flex items-center justify-center font-semibold text-lg">Cargando propiedades directas...</div>}>
      <CatalogContent initialProperties={initialProperties} />
    </Suspense>
  );
}
