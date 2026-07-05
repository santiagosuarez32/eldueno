import Script from 'next/script';
import { Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { FiPhone } from 'react-icons/fi';

export default function GoogleReviewsWidget() {
  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
            Testimonios de nuestros clientes
          </h2>
          <p className="mt-6 text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es el reflejo de nuestro compromiso, experiencia y servicio personalizado
          </p>
        </div>

        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div 
          className="elfsight-app-2304c626-f53a-4528-ab89-b903cc665b6e w-full" 
          data-elfsight-app-lazy 
        ></div>

        {/* Botón a Google Maps */}
        <div className="mt-12 flex justify-center">
          <a 
            href="https://maps.app.goo.gl/h94HFsWCvMHmN6Jp8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className="fill-[#FFFF33] text-[#FFFF33]" />
              ))}
            </div>
            <span>Ver reseñas en Google</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
