'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      slug: 'como-vender-sin-comisiones',
      category: 'Guía Práctica',
      date: '12 de Junio, 2026',
      title: 'Cómo vender tu propiedad sin comisiones inmobiliarias',
      excerpt: 'Descubrí los pasos clave para publicar, promocionar y negociar tu inmueble de forma directa y segura ahorrando miles de dólares.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '5 min'
    },
    {
      slug: 'documentos-compra-directa',
      category: 'Legal',
      date: '8 de Junio, 2026',
      title: 'Documentos necesarios para comprar directo al dueño',
      excerpt: 'Todo lo que necesitás saber sobre boletos de compraventa, escrituras y trámites legales para operar de forma transparente y protegida.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '7 min'
    },
    {
      slug: 'zonas-crecimiento-costa-rica',
      category: 'Tendencias',
      date: '3 de Junio, 2026',
      title: 'Zonas con mayor crecimiento y retorno en Costa Rica',
      excerpt: 'Analizamos los barrios y distritos que están experimentando el mayor auge inmobiliario, ideales para invertir o mudarte.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '4 min'
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-28 pb-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-xl">
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Blog & Recursos
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Consejos, novedades y guías prácticas de expertos para comprar, vender y alquilar de forma directa y 100% segura.
              </p>
            </div>

            {/* Keyword Search */}
            <div className="w-full md:w-80">
              <div className="relative rounded-2xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-2xl bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:outline-none pl-11 pr-4 py-3 text-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-slate-900/40 rounded-[32px] overflow-hidden border border-slate-800/80 hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    {/* Content Box */}
                    <div className="p-6 sm:p-8 flex flex-col flex-grow space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span className="text-emerald-400 font-bold">{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Bottom link line */}
                      <div className="pt-4 mt-auto border-t border-slate-800 flex items-center justify-between text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        <span className="flex items-center gap-1">
                          Leer Artículo <span className="text-slate-500 font-normal">• {post.readTime}</span>
                        </span>
                        <div className="h-8 w-8 rounded-full bg-slate-800 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:rotate-45 shadow-sm">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/20 border border-slate-800/60 rounded-[32px] space-y-4">
              <p className="text-slate-400 text-lg font-semibold">No encontramos artículos con esa búsqueda</p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-slate-900 border border-slate-850 text-emerald-400 font-bold px-6 py-2.5 rounded-2xl text-xs hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-colors"
              >
                Restablecer búsqueda
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
