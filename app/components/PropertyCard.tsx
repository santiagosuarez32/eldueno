'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, ShieldCheck } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-panel rounded-3xl overflow-hidden border border-slate-800/60 flex flex-col group h-full shadow-lg hover:shadow-emerald-500/5 hover:border-slate-700/80 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300 z-10" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <span className="bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 border border-emerald-500/25">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
            Dueño Directo
          </span>
          {property.featured && (
            <span className="bg-amber-500/90 text-slate-950 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full w-fit">
              Destacado
            </span>
          )}
        </div>

        {/* Property Image / Gradient Mock */}
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
          {/* Fallback elegant gradient background if image isn't loaded */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center">
            {/* Visual simulation of architectural shapes */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
            <span className="text-xs text-slate-500">Imágenes de la propiedad</span>
          </div>
          
          {/* We'll use Next/Image but fallback to gradient as above */}
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover relative z-10"
            onError={(e) => {
              // Hide image if not found to fall back to the stylish gradient above
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 right-4 z-20 bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-2xl shadow-lg shadow-emerald-500/10">
          {formattedPrice}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Neighborhood & Location */}
        <div className="flex items-center text-xs text-slate-400 mb-2 gap-1">
          <MapPin className="h-3.5 w-3.5 text-emerald-400" />
          <span>{property.neighborhood}, {property.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-1">
          {property.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
          {property.description}
        </p>

        {/* Property Specs */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-800/60 mb-6 text-slate-300 text-xs">
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <Bed className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold">{property.beds} Dorms</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-center border-l border-r border-slate-800/60">
            <Bath className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold">{property.baths} Baños</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <Square className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold">{property.area} m²</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/propiedades/${property.id}`}
          className="w-full text-center bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-slate-200 hover:text-emerald-400 font-semibold py-3 px-4 rounded-2xl transition-all duration-200 text-sm"
        >
          Ver Detalle de la Propiedad
        </Link>
      </div>
    </motion.div>
  );
}
