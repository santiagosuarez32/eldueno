import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="relative bg-white pt-8 sm:pt-12">
      {/* Call to Action (CTA) Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-20 mb-[-70px] md:mb-[-90px]">
        <div className="bg-slate-950 rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 relative">
          
          {/* Background Hero Image */}
          <img
            src="/hero.jpeg"
            alt="Hero background texture"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/65 z-0 pointer-events-none" />

          {/* Left-Aligned Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col items-start text-left space-y-6 max-w-3xl mr-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.15]">
              ¿Listo para encontrar tu hogar perfecto?
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Conectá con nuestro equipo hoy y descubrí propiedades adaptadas a tu estilo de vida, presupuesto y metas futuras.
            </p>
            <div className="pt-2">
              <Link href="/propiedades" className="inline-flex items-center group relative pb-1">
                <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#ffe600] transition-colors duration-200">
                  Comenzar Búsqueda
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white group-hover:bg-[#ffe600] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ffe600] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Element */}
      <footer className="bg-slate-950 text-slate-400 pt-40 pb-8 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main heading in footer as requested / as in screenshot */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/20">
            <div className="space-y-6 max-w-xl">
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.1]">
                Empezá a buscar tu hogar hoy mismo
              </h3>
              
              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-1">
                <div>
                  <span className="block text-xs text-slate-500 font-bold mb-1">Teléfonos</span>
                  <a href="tel:+50622806665" className="text-white hover:text-[#ffe600] transition-colors font-medium text-sm sm:text-base block">+506 2280-6665</a>
                  <a href="tel:+50686208287" className="text-white hover:text-[#ffe600] transition-colors font-medium text-sm sm:text-base block">+506 8620-8287</a>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-bold mb-1">Email</span>
                  <a href="mailto:bienesraices@elduenovende.com" className="text-white hover:text-[#ffe600] transition-colors font-medium text-sm sm:text-base block">bienesraices@elduenovende.com</a>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <a href="#" className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#ffe600] hover:bg-slate-900 transition-all duration-200">
                  <FaFacebookF className="h-4.5 w-4.5" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#ffe600] hover:bg-slate-900 transition-all duration-200">
                  <FaInstagram className="h-4.5 w-4.5" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#ffe600] hover:bg-slate-900 transition-all duration-200">
                  <FaTwitter className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <Link 
                href="/propiedades"
                className="text-white hover:text-[#ffe600] transition-colors font-semibold text-base sm:text-lg border-b-2 border-slate-850 hover:border-[#ffe600] pb-1"
              >
                Explorar todas las propiedades
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
            {/* Brand Column */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center group">
                <img
                  src="/navbar.png"
                  alt="El Dueño Vende"
                  className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-102 brightness-0 invert"
                />
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                Conectamos a dueños y compradores directamente. Sin intermediarios, sin comisiones inmobiliarias. Tu hogar, al precio real de mercado.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-white mb-6">Enlaces rápidos</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-[#ffe600] transition-colors">Inicio</Link>
                </li>
                <li>
                  <Link href="/nosotros" className="text-slate-400 hover:text-[#ffe600] transition-colors">Nosotros</Link>
                </li>
                <li>
                  <Link href="/propiedades" className="text-slate-400 hover:text-[#ffe600] transition-colors">Propiedades</Link>
                </li>
                <li>
                  <Link href="/servicios" className="text-slate-400 hover:text-[#ffe600] transition-colors">Servicios</Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-slate-400 hover:text-[#ffe600] transition-colors">Contacto</Link>
                </li>
              </ul>
            </div>

            {/* Legal / Services */}
            <div>
              <h3 className="text-sm font-bold text-white mb-6">Servicios</h3>
              <ul className="space-y-3 text-sm">
                <li className="text-slate-400 hover:text-[#ffe600] cursor-pointer transition-colors">Compra y Venta de Propiedades</li>
                <li className="text-slate-400 hover:text-[#ffe600] cursor-pointer transition-colors">Préstamos hipotecarios</li>
                <li className="text-slate-400 hover:text-[#ffe600] cursor-pointer transition-colors">Servicios de arquitectura</li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-sm font-bold text-white mb-6">Ubicación</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#ffe600] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400">Heredia, Asunción de Belén, diagonal a la plaza de deportes.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} El Dueño Vende. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
