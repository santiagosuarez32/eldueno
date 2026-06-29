'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Search, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { mockBlogPosts, mapDbToBlogPost, BlogPost } from '@/app/data/blog';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setPosts(data.map(mapDbToBlogPost));
        }
      } catch (err) {
        console.warn('Could not fetch blogs from Supabase, using mock fallback', err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (filteredPosts.length > 0) {
      gsap.from(".blog-card", {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1
      });
    }
  }, { scope: containerRef, dependencies: [filteredPosts] });

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const firstChild = carouselRef.current.firstElementChild as HTMLElement;
      // standard width of card + gap, approximately 400px, but we can measure first child
      const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 400; 
      const offset = direction === 'left' ? -cardWidth : cardWidth;
      
      carouselRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Navbar />

      <main ref={containerRef} className="flex-grow pt-28 pb-24 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-xl">
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Blog & Recursos
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Consejos, novedades y guías prácticas de expertos para comprar, vender y alquilar de forma 100% segura.
              </p>
            </div>

            {/* Keyword Search & Arrows */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-80">
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

              {/* Carousel Arrows */}
              {filteredPosts.length > 0 && (
                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => scroll('left')}
                    className="h-12 w-12 rounded-full border border-slate-800 bg-slate-900/60 text-white hover:bg-slate-800 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                    aria-label="Anterior"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="h-12 w-12 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md"
                    aria-label="Siguiente"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cards Carousel */}
          {filteredPosts.length > 0 ? (
            <div 
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar w-screen -mx-4 sm:-mx-6 lg:w-full lg:mx-0 px-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
                maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
              }}
            >
              {filteredPosts.map((post, idx) => (
                <div
                  key={post.slug}
                  className="blog-card snap-center shrink-0 w-[85vw] sm:w-[400px]"
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
                </div>
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
