'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, MapPin, Building2, TreePine } from 'lucide-react';
import { FlowButton } from './FlowButton';

export default function Hero() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    }
    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-slate-950">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpeg"
          alt="Modern House"
          className="w-full h-full object-cover filter brightness-[0.45]"
        />
        {/* Soft bottom vignette vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-300 text-xs font-semibold"
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              Dueño Directo • Costa Rica
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[0.9] font-sans"
              >
                Encontrá el hogar <br />
                <span className="text-emerald-400">de tus sueños</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-200 text-base sm:text-lg max-w-xl leading-snug"
              >
                Propiedades exclusivas publicadas directamente por sus dueños. Sin intermediarios, sin comisiones inmobiliarias. Operaciones transparentes y seguras.
              </motion.p>
            </div>

            {/* Actions Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/propiedades">
                <FlowButton text="Ver Propiedades" variant="primary" />
              </Link>
              <Link href="/contacto">
                <FlowButton text="Contactar con un asesor" variant="secondary" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Floating Search Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Busca tu propiedad ideal</h3>
              </div>

              {/* Intuitive Single Search Form */}
              <form onSubmit={handleSearchSubmit}>
                <div className="relative rounded-2xl shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Escribe ubicación, tipo de propiedad..."
                    className="block w-full rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all"
                  />
                </div>
              </form>

              {/* Statistics / Badges row */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                <span className="flex items-center justify-center gap-1 bg-slate-50 border border-slate-100 px-2 sm:px-3 py-1.5 rounded-full flex-shrink-0">
                  <Building2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                  <span className="font-extrabold text-black">7,000+</span>
                  <span className="font-normal text-slate-700">Propiedades</span>
                </span>
                <span className="flex items-center justify-center gap-1 bg-slate-50 border border-slate-100 px-2 sm:px-3 py-1.5 rounded-full flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-black flex-shrink-0" />
                  <span className="font-extrabold text-black">7</span>
                  <span className="font-normal text-slate-700">Provincias</span>
                </span>
                <span className="flex items-center justify-center gap-1 bg-slate-50 border border-slate-100 px-2 sm:px-3 py-1.5 rounded-full flex-shrink-0">
                  <TreePine className="h-3.5 w-3.5 text-black flex-shrink-0" />
                  <span className="font-extrabold text-black">18+</span>
                  <span className="font-normal text-slate-700">Años</span>
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
