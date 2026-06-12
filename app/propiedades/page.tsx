'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PropertyCard from '@/app/components/PropertyCard';
import { mockProperties, Property } from '@/app/data/properties';
import { Search, MapPin, Building, DollarSign, Filter, RotateCcw, BedDouble } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load initial filter states from URL search params
  const initialType = searchParams.get('type') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialPriceRange = searchParams.get('price') || '';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedBeds, setSelectedBeds] = useState<number | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  // Synchronize with URL search params changes if there are any
  useEffect(() => {
    if (initialType) setSelectedType(initialType);
    if (initialLocation) setSelectedLocation(initialLocation);
    if (initialSearch) setSearchTerm(initialSearch);
    
    if (initialPriceRange) {
      if (initialPriceRange === '0-200000') setMaxPrice(200000);
      else if (initialPriceRange === '200000-500000') setMaxPrice(500000);
      else if (initialPriceRange === '500000-1000000') setMaxPrice(1000000);
    }
  }, [initialType, initialLocation, initialPriceRange, initialSearch]);

  // Filter Logic
  const filteredProperties = mockProperties.filter((property) => {
    // 1. Text Search (title, description, neighborhood)
    const matchesSearch =
      searchTerm === '' ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Property Type
    const matchesType = selectedType === '' || property.type === selectedType;

    // 3. Location/Neighborhood
    const matchesLocation =
      selectedLocation === '' ||
      property.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
      property.neighborhood.toLowerCase().includes(selectedLocation.toLowerCase());

    // 4. Bedrooms
    const matchesBeds =
      selectedBeds === 'all' ||
      (selectedBeds === 4 ? property.beds >= 4 : property.beds === selectedBeds);

    // 5. Price
    const matchesPrice = property.price <= maxPrice;

    return matchesSearch && matchesType && matchesLocation && matchesBeds && matchesPrice;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLocation('');
    setSelectedBeds('all');
    setMaxPrice(1000000);
    router.push('/propiedades'); // Clear URL params
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-28 pb-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Catálogo de Propiedades
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Propiedades directas publicadas por sus dueños. Ahorrá comisiones intermediarias.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Filter Sidebar */}
            <aside className="lg:col-span-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                <span className="font-bold text-white flex items-center gap-2">
                  <Filter className="h-4.5 w-4.5 text-emerald-400" />
                  Filtros Activos
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reiniciar
                </button>
              </div>

              {/* Keyword Search */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Buscar por Palabra Clave</label>
                <div className="relative rounded-2xl shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ej. Terraza, Cochera, Belgrano..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full rounded-2xl bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none pl-10 pr-4 py-2.5 text-white text-sm"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 text-emerald-400" />
                  Tipo de Propiedad
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-3 py-2.5 text-sm text-white transition-colors"
                >
                  <option value="" className="bg-slate-950">Todos los tipos</option>
                  <option value="departamento" className="bg-slate-950">Departamento</option>
                  <option value="casa" className="bg-slate-950">Casa</option>
                  <option value="ph" className="bg-slate-950">PH</option>
                  <option value="loft" className="bg-slate-950">Loft</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  Barrio o Zona
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-2xl px-3 py-2.5 text-sm text-white transition-colors"
                >
                  <option value="" className="bg-slate-950">Cualquier zona</option>
                  <option value="Escazú" className="bg-slate-950">Escazú, San José</option>
                  <option value="Santa Ana" className="bg-slate-950">Santa Ana, San José</option>
                  <option value="Barrio Amón" className="bg-slate-950">Barrio Amón, San José</option>
                  <option value="Tamarindo" className="bg-slate-950">Tamarindo, Guanacaste</option>
                  <option value="Cariari" className="bg-slate-950">Cariari, Heredia</option>
                  <option value="Tres Ríos" className="bg-slate-950">Tres Ríos, Cartago</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <BedDouble className="h-3.5 w-3.5 text-emerald-400" />
                  Dormitorios
                </label>
                <div className="grid grid-cols-5 gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
                  {(['all', 1, 2, 3, 4] as const).map((bedsOption) => {
                    const isSelected = selectedBeds === bedsOption;
                    return (
                      <button
                        key={bedsOption}
                        onClick={() => setSelectedBeds(bedsOption)}
                        className={`py-1.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {bedsOption === 'all' ? 'Todo' : bedsOption === 4 ? '4+' : bedsOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                    Precio Máximo
                  </span>
                  <span className="text-white normal-case font-bold text-sm">
                    USD {new Intl.NumberFormat('en-US').format(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="25000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>USD 100k</span>
                  <span>USD 1M</span>
                </div>
              </div>
            </aside>

            {/* Properties Grid */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Info Bar */}
              <div className="flex items-center justify-between text-xs text-slate-450 font-semibold px-2">
                <span>
                  Mostrando <strong className="text-white">{filteredProperties.length}</strong> propiedades
                </span>
                <span>Filtro en tiempo real</span>
              </div>

              {/* Grid List */}
              <AnimatePresence mode="popLayout">
                {filteredProperties.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {filteredProperties.map((property) => (
                      <motion.div
                        key={property.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PropertyCard property={property} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel text-center py-20 px-4 rounded-3xl border border-slate-800/80 space-y-4"
                  >
                    <p className="text-slate-400 text-lg font-semibold">No encontramos propiedades con estos filtros</p>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      Intentá reiniciar los filtros o buscar palabras clave más generales para encontrar propiedades publicadas por sus dueños.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="bg-slate-900 border border-slate-800 text-emerald-400 font-bold px-6 py-2.5 rounded-2xl text-xs hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors"
                    >
                      Restablecer Filtros
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-semibold text-lg">
          Cargando propiedades directas...
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
