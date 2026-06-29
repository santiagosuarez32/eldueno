'use client';

import { motion } from 'framer-motion';

export default function AboutFeatures() {
  const features = [
    {
      title: 'Ubicación Estratégica',
      description: 'Nuestras propiedades destacadas se encuentran en zonas de fácil acceso desde diferentes puntos. Podés llegar al centro, zonas comerciales y lugares importantes de la ciudad de manera rápida y cómoda.'
    },
    {
      title: 'Diseño Moderno',
      description: 'Seleccionamos casas y departamentos con diseños modernos y elegantes. Podés elegir el estilo de propiedad que mejor se adapte a tus gustos y necesidades, desde lofts industriales hasta amplias casas familiares.'
    },
    {
      title: 'Seguridad Garantizada',
      description: 'Priorizamos propiedades en barrios seguros o complejos cerrados con sistemas de seguridad integrados. Muchas cuentan con cercos perimetrales, portones automáticos, y sistemas de monitoreo para tu tranquilidad.'
    }
  ];

  return (
    <section className="bg-white text-slate-900 relative overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left: Image (smaller width, full height) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12 flex"
        >
          <img 
            src="/about.png" 
            alt="Sobre nosotros" 
            className="w-full h-[300px] sm:h-[400px] lg:h-auto object-cover rounded-b-[32px] lg:rounded-r-[32px] lg:rounded-bl-none"
          />
        </motion.div>

        {/* Right: Features List */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-7/12 py-16 lg:py-24 px-6 sm:px-12 lg:px-16 xl:px-24 flex flex-col justify-center gap-10 sm:gap-12"
        >
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
    </section>
  );
}
