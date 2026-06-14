'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowButton } from './FlowButton';
import { Building, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isLightPage = pathname.startsWith('/propiedades/') && pathname !== '/propiedades';

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

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Propiedades', href: '/propiedades' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const isNavbarLight = scrolled || isLightPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavbarLight
          ? 'bg-white border-b border-slate-200 py-3 shadow-lg shadow-black/5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/navbar.png"
              alt="El Dueño Vende"
              className={`h-16 w-auto object-contain transition-all duration-300 group-hover:scale-102 ${isNavbarLight ? 'brightness-0' : ''}`}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[17px] font-medium transition-colors duration-200 py-1.5 after:absolute after:bottom-[3px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${isNavbarLight ? 'text-slate-950 hover:text-black after:bg-slate-950' : 'text-slate-350 hover:text-[#ffe600] after:bg-[#ffe600]'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/propiedades"
              className={`px-4 py-2 text-base font-medium transition-colors ${isNavbarLight ? 'text-slate-950 hover:text-black' : 'text-slate-300 hover:text-white'}`}
            >
              Buscar Propiedades
            </Link>
            <Link href="/contacto">
              <FlowButton text="Contáctenos" variant="primary-solid" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-xl focus:outline-none transition-colors border ${
                isNavbarLight
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 border-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`md:hidden border-b overflow-hidden ${isNavbarLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800/80'}`}
          >
            <div className="px-4 pt-3 pb-6 space-y-4">
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-normal transition-colors ${isNavbarLight ? 'text-slate-650 hover:bg-slate-50 hover:text-slate-950' : 'text-slate-300 hover:bg-slate-900 hover:text-[#ffe600]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className={`pt-4 border-t space-y-4 flex flex-col items-center ${isNavbarLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <Link
                  href="/propiedades"
                  onClick={() => setIsOpen(false)}
                  className={`block text-center w-full px-4 py-3 text-base font-medium rounded-xl transition-colors ${isNavbarLight ? 'text-slate-650 hover:bg-slate-50 hover:text-slate-950' : 'text-slate-300 hover:text-white hover:bg-slate-900'}`}
                >
                  Buscar Propiedades
                </Link>
                <Link href="/contacto" onClick={() => setIsOpen(false)}>
                  <FlowButton text="Contáctenos" variant="primary-solid" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
