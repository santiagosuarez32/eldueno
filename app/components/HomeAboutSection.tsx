'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, TrendingUp, Award } from 'lucide-react';

export default function HomeAboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg border border-slate-100">
              <img
                src="/images/about-hero.webp"
                alt="El Dueño Vende - Asesoría Inmobiliaria"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Badge overlay */}
            <div className="absolute -bottom-8 -right-8 bg-slate-900 text-white p-8 rounded-[24px] hidden lg:block max-w-[280px] shadow-2xl border border-slate-800">
              <div className="text-5xl font-bold mb-3 text-[#ffe600] tracking-tighter">35+</div>
              <p className="text-sm font-medium leading-relaxed text-slate-300">
                Años asesorando con transparencia, agilidad y resultados.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Text content & Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.1]">
                Somos una empresa con historia y resultados
              </h2>
              <p className="text-slate-600 text-base leading-relaxed pt-2">
                El Dueño Vende es una compañía especializada en bienes raíces. Brindamos la mejor asesoría en compra, venta y renta de propiedades dentro del área metropolitana, junto a excelentes oportunidades de inversión y soluciones de crédito.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6 pt-2">
              
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <img src="/icons-about/confianza.png" alt="Asesoría y Seguridad" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Asesoría y Seguridad</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Le acompañamos durante todo el proceso de compra, venta o alquiler de su propiedad, brindándole asesoría profesional, transparencia y seguridad en cada etapa.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <img src="/icons-about/ubication.png" alt="Trayectoria y Confianza" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Trayectoria y Confianza</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Con más de 35 años de experiencia nos desenvolvemos con agilidad en el mercado de bienes raíces; cientos de personas y empresas que han confiado sus inversiones nos respaldan.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <img src="/icons-about/inversion.png" alt="Oportunidades de Inversión" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Oportunidades de Inversión</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Además de la asesoría en compra y venta, brindamos excelentes oportunidades de inversión y soluciones de crédito adaptadas a las necesidades de cada cliente.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100">
              <Link
                href="/nosotros"
                className="inline-flex items-center justify-center gap-2 px-8 h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-300 text-sm shadow-sm hover:shadow-md group"
              >
                Conocer más de nuestra historia
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
