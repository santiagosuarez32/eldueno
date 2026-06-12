import Link from 'next/link';
import { Building, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-slate-950 font-bold">
                <Building className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Dueño<span className="text-emerald-400">Directo</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Conectamos a dueños y compradores directamente. Sin intermediarios, sin comisiones inmobiliarias. Tu hogar, al precio real de mercado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Plataforma</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/propiedades" className="hover:text-emerald-400 transition-colors">Buscar Propiedades</Link>
              </li>
              <li>
                <Link href="/publicar" className="hover:text-emerald-400 transition-colors">Publicar Propiedad</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Servicios Opcionales</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Asesoramiento Legal</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Escribanía y Boleto Seguro</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Fotografía Profesional</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>soporte@duenodirecto.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>+506 2201-0800</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>Escazú, San José, Costa Rica</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-slate-900/60 pt-8 pb-6 text-xs text-slate-600 leading-relaxed">
          <p className="mb-4">
            *Aviso Legal: DueñoDirecto no actúa como corredor inmobiliario, intermediario o agente de bienes raíces. Todos los listados son provistos directamente por sus respectivos dueños. DueñoDirecto no cobra comisión alguna sobre la venta o alquiler de los inmuebles. Se recomienda que los interesados realicen el correspondiente estudio de títulos y cuenten con asesoría legal profesional antes de formalizar cualquier transacción.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-900/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DueñoDirecto. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Hecho con <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" /> para Dueño Vende
          </p>
        </div>
      </div>
    </footer>
  );
}
