'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Percent, TrendingDown, Coins, HelpCircle } from 'lucide-react';

export default function Calculator() {
  const [propertyValue, setPropertyValue] = useState(180000); // Default USD value
  const commissionPercentage = 4; // 4% is typical (3% from seller, 1.5% to 3% from buyer. Let's use 4% overall for the calculation)

  const traditionalCommission = (propertyValue * commissionPercentage) / 100;
  const savings = traditionalCommission;

  // Format currency
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Dynamic savings equivalence text
  const getEquivalence = (savedAmount: number) => {
    if (savedAmount < 5000) {
      return "🛋️ Amoblar por completo tu living con sillones de diseño y una TV OLED de 75 pulgadas.";
    } else if (savedAmount < 10000) {
      return "✈️ Un viaje de 3 semanas por Europa para dos personas con pasajes y hoteles premium incluidos.";
    } else if (savedAmount < 20000) {
      return "🚗 Comprar un auto usado en excelente estado o adquirir una cochera privada en una zona de alta demanda.";
    } else if (savedAmount < 35000) {
      return "🔨 Una remodelación total a nuevo de tu cocina y dos baños con materiales de primera categoría.";
    } else {
      return "🏢 Financiar la seña o el anticipo de una segunda propiedad de inversión.";
    }
  };

  return (
    <section className="py-24 bg-slate-900/40 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Coins className="h-4 w-4 flex-shrink-0" />
            Simulador de Ahorro
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Calculá cuánto te ahorrás sin inmobiliaria
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Las comisiones tradicionales de agentes (incluso de un 4%) se quedan con miles de dólares que te corresponden a vos. Comprobá el impacto real en tu bolsillo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Slider & Input Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-400">Valor Estimado de la Propiedad</span>
                <span className="text-2xl font-bold text-white tracking-tight">{formatUSD(propertyValue)}</span>
              </div>

              {/* Range Slider */}
              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="5000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-500 font-semibold pt-1">
                  <span>USD 50k</span>
                  <span>USD 500k</span>
                  <span>USD 1M</span>
                </div>
              </div>
            </div>

            {/* Direct Input (optional for precise input) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 block">Ingresá el valor exacto (USD)</label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-slate-500 text-sm">USD</span>
                </div>
                <input
                  type="number"
                  name="price-input"
                  id="price-input"
                  min="1000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="block w-full rounded-2xl bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:outline-none pl-12 pr-4 py-3 text-white text-sm"
                />
              </div>
            </div>

            {/* Detail Breakdowns */}
            <div className="pt-6 border-t border-slate-800/60 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
              <div className="space-y-1">
                <p>Comisión Inmobiliaria Típica</p>
                <p className="text-white text-sm">4.0% total</p>
              </div>
              <div className="space-y-1">
                <p>Costo en El Dueño Vende</p>
                <p className="text-emerald-400 text-sm">0% Gratis</p>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 border border-emerald-500/25 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Visual shine effect */}
            <div className="absolute -top-1/2 -right-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <TrendingDown className="h-5 w-5" />
                TU AHORRO NETO
              </div>
              
              <div className="space-y-1">
                <motion.div
                  key={savings}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-gradient-emerald"
                >
                  {formatUSD(savings)}
                </motion.div>
                <p className="text-xs font-medium text-slate-400">
                  Dinero libre que conservás al vender directo.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/20 space-y-4 flex-grow flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ¿Qué podés hacer con este dinero?
              </p>
              <motion.p
                key={savings}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-slate-200 text-sm font-semibold leading-relaxed"
              >
                {getEquivalence(savings)}
              </motion.p>
            </div>

            <div className="mt-8">
              <a
                href="/publicar"
                className="w-full text-center block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-emerald-500/20 hover:-translate-y-0.5 text-sm"
              >
                Publicá tu Inmueble y Ahorrá
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
