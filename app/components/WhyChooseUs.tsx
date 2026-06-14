'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <img src="/icons/venta.png" alt="Icono venta" className="h-12 w-12 object-contain brightness-0" />,
      title: 'Compra y venta de propiedades',
      description: 'Buscá y negociá directamente con el dueño de la propiedad. Sin intermediarios, sin comisiones y con comunicación directa desde el primer día.'
    },
    {
      icon: <img src="/icons/prestamo-hipotecario.png" alt="Icono préstamo hipotecario" className="h-12 w-12 object-contain brightness-0" />,
      title: 'Préstamos hipotecarios',
      description: 'Accedé a financiamiento y opciones de crédito hipotecario adaptadas a tus necesidades para adquirir tu propiedad.'
    },
    {
      icon: <img src="/icons/arquitectura.png" alt="Icono arquitectura" className="h-12 w-12 object-contain brightness-0" />,
      title: 'Servicios de arquitectura',
      description: 'Consultá por remodelaciones, planos y asesoría técnica de diseño para transformar tu nuevo espacio.'
    }
  ];

  return (
    <section className="bg-white py-24 text-slate-900 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]">
              Nuestros servicios
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 lg:pt-2"
          >
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
              Desde la compra-venta directa hasta el diseño de tu próximo espacio y opciones de financiamiento a tu medida, te acompañamos para que operes con total confianza.
            </p>
            <div>
              <Link href="/servicios" className="inline-flex items-center group relative pb-1">
                <span className="text-base font-bold text-slate-950 group-hover:text-emerald-600 transition-colors duration-200">
                  Ver servicios
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-950 group-hover:bg-emerald-600 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Modern House Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-[32px] overflow-hidden group shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Luxury modern house facade" 
              className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
          </motion.div>

          {/* Right: Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-10"
          >
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 pt-1 text-slate-950 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
