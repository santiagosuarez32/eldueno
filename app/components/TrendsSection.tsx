'use client';

import { motion } from 'framer-motion';
import { MapPin, TrendingUp } from 'lucide-react';

export default function TrendsSection() {
  const zones = [
    {
      title: 'Escazú y Santa Ana',
      region: 'San José',
      description: 'Siguen siendo los centros urbanos premium por excelencia. Con una oferta inigualable de oficinas corporativas de alto nivel, centros comerciales, gastronomía y escuelas privadas. Su conectividad con la Ruta 27 y su alta demanda de alquileres de ejecutivos multinacionales aseguran un retorno sólido del 6% al 8% anual en dólares.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: '6% - 8% Retorno Anual'
    },
    {
      title: 'Tamarindo y Nosara',
      region: 'Guanacaste',
      description: 'El auge del turismo ecológico y el teletrabajo ha convertido a Guanacaste en la meca inmobiliaria. Propiedades con cercanía a la playa o vistas al mar en Nosara o Tamarindo registran las tasas de revalorización más altas del país. La demanda de alquiler vacacional en plataformas digitales mantiene ocupaciones promedio muy altas durante todo el año.',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'Alta Revalorización'
    },
    {
      title: 'Tres Ríos y Curridabat',
      region: 'San José Este',
      description: 'El este del Gran Área Metropolitana está experimentando un desarrollo comercial y residencial espectacular. Es una zona muy buscada por familias jóvenes gracias a su clima fresco, excelente oferta académica y un desarrollo de condominios modernos con amenities de primer nivel.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'Desarrollo Familiar'
    },
    {
      title: 'Cariari y Belén',
      region: 'Heredia',
      description: 'Favorecidos por la concentración de zonas francas industriales y de tecnología. El alquiler residencial corporativo en estas ubicaciones cuenta con demanda constante de empleados calificados, lo que reduce las tasas de desocupación a mínimos históricos.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'Alquiler Corporativo'
    }
  ];

  return (
    <section className="bg-white pb-24 pt-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Article Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Zonas con mayor crecimiento y retorno en Costa Rica
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 lg:pt-2"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
              Costa Rica se consolida como uno de los destinos más atractivos para la inversión en bienes raíces, tanto para residentes locales como para inversores extranjeros y nómadas digitales. La combinación de calidad de vida, seguridad y desarrollo de infraestructura ha impulsado el dinamismo de mercados clave. Analizamos los distritos y zonas con mayor proyección de revalorización en el país:
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 font-medium">
              <span className="text-[#538792] font-bold">Tendencias</span>
              <span className="hidden sm:inline">•</span>
              <span>Dpto. de Análisis Dueño Directo</span>
              <span className="hidden sm:inline">•</span>
              <span>3 de Junio, 2026</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><TrendingUp size={16}/> 4 min de lectura</span>
            </div>
          </motion.div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {zones.map((zone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="flex flex-col group cursor-default"
            >
              <div className="w-full bg-transparent flex flex-col transition-all duration-300 h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100 rounded-[24px]">
                  <img 
                    src={zone.image} 
                    alt={zone.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm rounded-full">
                    {zone.region}
                  </div>
                </div>
                
                {/* Content Box (No side padding, aligns with image) */}
                <div className="pt-5 flex flex-col flex-grow">
                  <div className="text-[14px] text-[#538792] font-normal mb-3">
                    {zone.tag}
                  </div>
                  
                  <h3 className="text-[22px] sm:text-[24px] font-bold text-slate-950 tracking-tight group-hover:text-amber-500 transition-colors leading-[1.3] mb-3">
                    {zone.title}
                  </h3>
                  
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-6 font-normal">
                    {zone.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
