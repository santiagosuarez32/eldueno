'use client';

import { motion } from 'framer-motion';

const partners = [
  { name: 'MUCAP', logo: 'https://www.elduenovende.com/wp-content/uploads/2023/09/unnamed-175x50-c-center.jpg' },
  { name: 'Coope Ande', logo: 'https://www.elduenovende.com/wp-content/uploads/2022/01/logo_coopeande_sitio_web-175x50-c-center.png' },
  { name: 'Banco de Costa Rica', logo: 'https://www.elduenovende.com/wp-content/uploads/2016/04/unnamed-175x50-c-center.jpg' },
  { name: 'Banco Popular', logo: 'https://www.elduenovende.com/wp-content/uploads/2016/04/Logo-Banco-Popular-300x171-1-175x50-c-center.png' },
  { name: 'Davivienda', logo: 'https://www.elduenovende.com/wp-content/uploads/2016/04/LOGO-DAVIVIENDA-V-175x50-c-center.jpg' },
  { name: 'Scotiabank', logo: 'https://www.elduenovende.com/wp-content/uploads/2016/04/scotiabank-logo-175x50-c-center.png' }
];

export default function PartnersCarousel() {
  // Duplicate partners to create a seamless infinite loop (need at least 2 sets)
  const doublePartners = [...partners, ...partners];

  return (
    <section className="bg-white py-16 border-t border-slate-100 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Nuestros Partners Financieros
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Trabajamos con las principales entidades financieras para facilitarte las opciones de crédito y financiamiento más convenientes.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-white after:to-transparent">
          
          <motion.div
            className="flex gap-16 items-center w-max"
            animate={{
              x: [0, -1440] // 6 items * (176px item + 64px gap) = 1440px
            }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {doublePartners.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center h-16 w-44 shrink-0 px-4 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-11 max-w-full object-contain"
                />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
