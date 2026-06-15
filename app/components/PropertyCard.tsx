'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Property } from '@/app/data/properties';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Format price nicely
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const typeLabels: Record<string, string> = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    comercial: 'Local Comercial',
    ph: 'PH',
    loft: 'Loft'
  };
  const typeLabel = typeLabels[property.type] || property.type;

  return (
    <Link href={`/propiedades/${property.id}`} className="block h-full cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 flex flex-col group h-full shadow-md hover:shadow-xl hover:border-slate-300/80 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <div className="absolute inset-0 bg-slate-955/5 group-hover:bg-transparent transition-colors duration-300 z-10" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-row items-center gap-1.5 max-w-[calc(100%-24px)] min-w-0">
            {/* Property Type Badge */}
            <span className="bg-white/95 backdrop-blur-sm text-slate-700 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200/40 shadow-sm shrink-0">
              {typeLabel}
            </span>
            {/* Location Badge */}
            <span className="bg-white/95 backdrop-blur-sm text-slate-700 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 border border-slate-200/40 shadow-sm min-w-0">
              <img src="/icons-filters/ubication.png" className="h-3 w-3 object-contain flex-shrink-0" alt="" />
              <span className="truncate text-slate-700">{property.neighborhood}, {property.location}</span>
            </span>
          </div>

          {/* Property Image / Gradient Mock */}
          <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
            {/* Fallback elegant gradient background if image isn't loaded */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 via-slate-50 to-slate-200 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
              <span className="text-xs text-slate-400">Imágenes de la propiedad</span>
            </div>
            
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-4 right-4 z-20 bg-slate-950 text-white font-bold px-4 py-2 rounded-2xl shadow-md">
            {formattedPrice}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Neighborhood & Location */}
          <div className="flex items-center text-xs text-slate-500 mb-2 gap-1.5 font-medium">
            <img src="/icons-filters/ubication.png" className="h-4 w-4 object-contain shrink-0" alt="" />
            <span>{property.neighborhood}, {property.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-950 mb-2 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed font-normal">
            {property.description}
          </p>

          {/* Property Specs */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 text-slate-650 text-xs">
            {property.type === 'terreno' ? (
              <div className="col-span-3 flex items-center justify-center gap-2">
                <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain" alt="" />
                <span className="font-semibold text-slate-700">Terreno de {property.landArea || property.area} m²</span>
              </div>
            ) : property.type === 'comercial' ? (
              <>
                <div className="flex flex-col items-center justify-center gap-1 text-center">
                  <img src="/icons-property/dormitorios.png" className="h-4.5 w-4.5 object-contain" alt="" />
                  <span className="font-semibold text-slate-700">{property.aposentos} Apos.</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-center border-l border-r border-slate-150">
                  <img src="/icons-property/cochera.png" className="h-4.5 w-4.5 object-contain" alt="" />
                  <span className="font-semibold text-slate-700">{property.parkingSpaces} Estac.</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-center">
                  <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain" alt="" />
                  <span className="font-semibold text-slate-700">{property.area} m²</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center gap-1 text-center">
                  <img src="/icons-property/dormitorios.png" className="h-4.5 w-4.5 object-contain" alt="" />
                  <span className="font-semibold text-slate-700">{property.beds} Dorms</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-center border-l border-r border-slate-150">
                  <img src="/icons-property/baños.png" className="h-4.5 w-4.5 object-contain" alt="" />
                  <span className="font-semibold text-slate-700">{property.baths} Baños</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-center">
                  <img src="/icons-property/m2.png" className="h-4.5 w-4.5 object-contain" alt="" />
                  <span className="font-semibold text-slate-700">{(property.constructionArea || property.area)} m²</span>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
