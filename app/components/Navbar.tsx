'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FlowButton } from './FlowButton';

interface MobileAccordionProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}

function MobileAccordion({ label, isOpen, onToggle, items, onNavigate }: MobileAccordionProps) {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-bold text-white transition-colors hover:bg-white/10 hover:text-[#ffe600]"
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ strokeWidth: 3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-3 flex flex-col gap-0.5 border-l border-white/15 pl-3 py-1">
            {items.map((item, index) => (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-[#ffe600]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const pathname = usePathname();

  const isLightPage = pathname.startsWith('/propiedades') || pathname.startsWith('/blog') || pathname.startsWith('/admin') || pathname === '/login' || pathname.startsWith('/arquitectura') || pathname.startsWith('/prestamos') || pathname.startsWith('/contacto');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll + flag body while the mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", isMobileMenuOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  const toggleAccordion = (key: string) =>
    setMobileAccordion((prev) => (prev === key ? null : key));

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  };

  const shouldShowScrolledState = scrolled || isLightPage;

  const serviciosList = [
    { label: "Compra y Venta de Propiedades", href: "/propiedades" },
    { label: "Préstamos Hipotecarios", href: "/prestamos" },
    { label: "Servicios de Arquitectura", href: "/arquitectura" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowScrolledState
          ? 'bg-white border-b border-slate-200 py-3 shadow-lg shadow-black/5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      {/* Hide the floating WhatsApp button while the mobile menu is open so it
          doesn't overlap the "Contáctenos" action at the bottom of the drawer */}
      <style dangerouslySetInnerHTML={{ __html: `
        body.menu-open .wa-fab {
          opacity: 0 !important;
          pointer-events: none !important;
          transition: opacity .2s ease;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/navbar.webp"
              alt="El Dueño Vende"
              className={`h-11 md:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-102 ${
                shouldShowScrolledState ? 'brightness-0' : ''
              }`}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`relative text-[17px] font-medium transition-colors duration-200 py-1.5 after:absolute after:bottom-[3px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                shouldShowScrolledState ? 'text-slate-950 hover:text-black after:bg-slate-950' : 'text-slate-300 hover:text-[#ffe600] after:bg-[#ffe600]'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className={`relative text-[17px] font-medium transition-colors duration-200 py-1.5 after:absolute after:bottom-[3px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                shouldShowScrolledState ? 'text-slate-950 hover:text-black after:bg-slate-950' : 'text-slate-300 hover:text-[#ffe600] after:bg-[#ffe600]'
              }`}
            >
              Nosotros
            </Link>
            <Link
              href="/propiedades"
              className={`relative text-[17px] font-medium transition-colors duration-200 py-1.5 after:absolute after:bottom-[3px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                shouldShowScrolledState ? 'text-slate-950 hover:text-black after:bg-slate-950' : 'text-slate-300 hover:text-[#ffe600] after:bg-[#ffe600]'
              }`}
            >
              Propiedades
            </Link>

            {/* Desktop Servicios Dropdown */}
            <div className="relative group py-1.5">
              <button
                className={`flex items-center gap-1 text-[17px] font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                  shouldShowScrolledState ? 'text-slate-950 hover:text-black after:bg-slate-950' : 'text-slate-300 hover:text-[#ffe600] after:bg-[#ffe600]'
                }`}
              >
                <span>Servicios</span>
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ strokeWidth: 3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              
              {/* Dropdown Menu Container */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-white border border-slate-200/80 shadow-xl py-2 z-50 transition-all duration-300 opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto origin-top">
                {/* Transparent bridge to prevent menu from closing when moving mouse */}
                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />
                
                <Link
                  href="/arquitectura"
                  className="block px-5 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-sm hover:text-emerald-600 transition-colors">Servicios de Arquitectura</div>
                  <div className="text-xs text-slate-500 font-normal mt-0.5">Diseño, planos y remodelaciones.</div>
                </Link>
                
                <div className="border-t border-slate-100 my-1 mx-2" />
                
                <Link
                  href="/prestamos"
                  className="block px-5 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-sm hover:text-emerald-600 transition-colors">Préstamos Hipotecarios</div>
                  <div className="text-xs text-slate-500 font-normal mt-0.5">Opciones de crédito a tu medida.</div>
                </Link>
              </div>
            </div>

            <Link
              href="/contacto"
              className={`relative text-[17px] font-medium transition-colors duration-200 py-1.5 after:absolute after:bottom-[3px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                shouldShowScrolledState ? 'text-slate-950 hover:text-black after:bg-slate-950' : 'text-slate-300 hover:text-[#ffe600] after:bg-[#ffe600]'
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/propiedades"
              className={`px-4 py-2 text-base font-medium transition-colors ${
                shouldShowScrolledState ? 'text-slate-950 hover:text-black' : 'text-slate-300 hover:text-white'
              }`}
            >
              Buscar Propiedades
            </Link>
            <Link href="/contacto">
              <FlowButton text="Contáctenos" variant="primary-solid" />
            </Link>
          </div>

          {/* Hamburger Menu Toggle (visible only on mobile/tablet) - animated morphing icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-xl focus:outline-none transition-colors"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="relative block h-5 w-7">
                <span
                  className={`absolute left-0 block h-[3px] w-7 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "top-1/2 -translate-y-1/2 rotate-45 bg-white"
                      : `top-0 ${shouldShowScrolledState ? 'bg-slate-950' : 'bg-white'}`
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-[3px] w-7 -translate-y-1/2 rounded-full transition-all duration-200 ease-in-out ${
                    isMobileMenuOpen
                      ? "scale-x-0 opacity-0 bg-white"
                      : `scale-x-100 opacity-100 ${shouldShowScrolledState ? 'bg-slate-950' : 'bg-white'}`
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[3px] w-7 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "top-1/2 -translate-y-1/2 -rotate-45 bg-white"
                      : `bottom-0 ${shouldShowScrolledState ? 'bg-slate-950' : 'bg-white'}`
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        onClick={closeMobileMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-slate-950 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "linear-gradient(160deg, #121212 0%, #000000 100%)" }}
      >
        {/* Drawer Header */}
        <div className="flex shrink-0 items-center border-b border-white/10 px-6 py-5">
          <Link href="/" onClick={closeMobileMenu} className="inline-flex">
            <img src="/navbar.webp" alt="El Dueño Vende Logo" className="h-9 w-auto object-contain brightness-0 invert" />
          </Link>
        </div>

        {/* Scrollable Links */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="block rounded-lg px-3 py-3 text-base font-bold text-white transition-colors hover:bg-white/10 hover:text-[#ffe600]"
          >
            Inicio
          </Link>
          <Link
            href="/nosotros"
            onClick={closeMobileMenu}
            className="block rounded-lg px-3 py-3 text-base font-bold text-white transition-colors hover:bg-white/10 hover:text-[#ffe600]"
          >
            Nosotros
          </Link>
          <Link
            href="/propiedades"
            onClick={closeMobileMenu}
            className="block rounded-lg px-3 py-3 text-base font-bold text-white transition-colors hover:bg-white/10 hover:text-[#ffe600]"
          >
            Propiedades
          </Link>

          <MobileAccordion
            label="Servicios"
            isOpen={mobileAccordion === 'servicios'}
            onToggle={() => toggleAccordion('servicios')}
            items={[
              { label: 'Servicios de Arquitectura', href: '/arquitectura' },
              { label: 'Préstamos Hipotecarios', href: '/prestamos' }
            ]}
            onNavigate={closeMobileMenu}
          />

          <Link
            href="/contacto"
            onClick={closeMobileMenu}
            className="block rounded-lg px-3 py-3 text-base font-bold text-white transition-colors hover:bg-white/10 hover:text-[#ffe600]"
          >
            Contacto
          </Link>
        </nav>

        {/* Sticky Action Buttons */}
        <div className="shrink-0 border-t border-white/10 p-5 space-y-3">
          <Link
            href="/propiedades"
            onClick={closeMobileMenu}
            className="block w-full rounded-2xl py-3.5 text-center text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-all duration-200"
          >
            Buscar Propiedades
          </Link>
          <Link
            href="/contacto"
            onClick={closeMobileMenu}
            className="block w-full rounded-2xl py-3.5 text-center text-sm font-bold text-slate-950 bg-[#ffe600] hover:bg-[#ffff33] transition-all duration-200 shadow-lg shadow-[#ffe600]/10"
          >
            Contáctenos
          </Link>
        </div>
      </div>
    </header>
  );
}
