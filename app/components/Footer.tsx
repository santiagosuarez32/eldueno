import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <img
                src="/navbar.png"
                alt="DueñoDirecto"
                className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-102 brightness-0"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Conectamos a dueños y compradores directamente. Sin intermediarios, sin comisiones inmobiliarias. Tu hogar, al precio real de mercado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-slate-600 hover:text-emerald-600 transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-slate-600 hover:text-emerald-600 transition-colors">Nosotros</Link>
              </li>
              <li>
                <Link href="/propiedades" className="text-slate-600 hover:text-emerald-600 transition-colors">Propiedades</Link>
              </li>
              <li>
                <Link href="/servicios" className="text-slate-600 hover:text-emerald-600 transition-colors">Servicios</Link>
              </li>
              <li>
                <Link href="/contacto" className="text-slate-600 hover:text-emerald-600 transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Services */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider mb-4">Servicios</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-600 hover:text-emerald-600 cursor-pointer transition-colors">Compra y Venta de Propiedades</li>
              <li className="text-slate-600 hover:text-emerald-600 cursor-pointer transition-colors">Prestamos hipotecarios</li>
              <li className="text-slate-600 hover:text-emerald-600 cursor-pointer transition-colors">Servicios de arquitectura</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Heredia, Asunción de Belén, diagonal a la plaza de deportes.</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>+506 2280-6665</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>+506 8620-8287</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>bienesraices@elduenovende.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DueñoDirecto. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
