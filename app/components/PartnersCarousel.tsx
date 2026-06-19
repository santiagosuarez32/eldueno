'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
  { id: 0, name: 'MUCAP', logo: '/partners/1(1)_transparent_hd.png' },
  { id: 1, name: 'Coope Ande', logo: '/partners/2(1)_transparent_hd.png' },
  { id: 2, name: 'Banco de Costa Rica', logo: '/partners/3(1)_transparent_hd.png' },
  { id: 3, name: 'Banco Popular', logo: '/partners/4_transparent_hd.png' },
  { id: 4, name: 'Davivienda', logo: '/partners/5_transparent_hd.png' },
  { id: 5, name: 'Scotiabank', logo: '/partners/6_transparent_hd.png' }
];

export default function PartnersCarousel() {
  const [list, setList] = useState(partners);
  const [xOffset, setXOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      let show = 5;
      if (window.innerWidth < 640) {
        show = 2;
      } else if (window.innerWidth < 1024) {
        show = 3;
      }
      setItemsToShow(show);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setXOffset(-1);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setXOffset(-1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    // Prepend the last item
    setList(prev => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    // Snap to -1 instantly (no animation)
    setXOffset(-1);
    // Animate back to 0
    setTimeout(() => {
      setIsTransitioning(true);
      setXOffset(0);
    }, 20);
  };

  const handleTransitionEnd = () => {
    if (xOffset < 0) {
      const steps = Math.abs(xOffset);
      setList(prev => [...prev.slice(steps), ...prev.slice(0, steps)]);
      setXOffset(0);
    }
    setIsTransitioning(false);
  };

  const handleDotClick = (targetId: number) => {
    if (isTransitioning) return;
    const targetIndex = list.findIndex(p => p.id === targetId);
    if (targetIndex === 0) return;
    
    setIsTransitioning(true);
    setXOffset(-targetIndex);
  };

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Partners
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Trabajamos con las principales entidades financieras para facilitarte las opciones de crédito y financiamiento más convenientes.
          </p>
        </div>

        {/* Slider Row with Chevron Buttons on the sides */}
        <div className="relative flex items-center justify-between gap-4 sm:gap-6 max-w-[1550px] mx-auto">
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="p-1 sm:p-2 text-slate-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft size={44} className="stroke-[1.5]" />
          </button>

          {/* Slider Window */}
          <div className="relative overflow-hidden flex-grow px-2">
            {/* Fade Overlays for smooth edge clipping */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex items-center"
              animate={{ x: `${xOffset * (100 / itemsToShow)}%` }}
              transition={isTransitioning ? { ease: [0.25, 1, 0.5, 1], duration: 0.6 } : { duration: 0 }}
              onAnimationComplete={handleTransitionEnd}
            >
              {list.map((partner) => (
                <div 
                  key={partner.id} 
                  className="w-1/2 sm:w-1/3 lg:w-1/5 shrink-0 px-4 flex items-center justify-center"
                >
                  <div className="h-44 w-full flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-32 max-w-full object-contain filter grayscale-0 hover:grayscale opacity-100 hover:opacity-50 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="p-1 sm:p-2 text-slate-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
            aria-label="Siguiente"
          >
            <ChevronRight size={44} className="stroke-[1.5]" />
          </button>
        </div>

        {/* Indicators / Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {partners.map((partner) => (
            <button
              key={partner.id}
              onClick={() => handleDotClick(partner.id)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                partner.id === list[0].id 
                  ? 'w-8 bg-slate-900' 
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Ir al slide ${partner.id + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
