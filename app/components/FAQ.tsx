'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    id: 'item-1',
    question: '¿Qué es El Dueño Vende?',
    answer: 'El Dueño Vende es una plataforma que conecta directamente a dueños de propiedades con compradores e inquilinos interesados, eliminando intermediarios y comisiones inmobiliarias. Ofrecemos un servicio transparente, ágil y seguro para que encuentres tu próximo hogar.'
  },
  {
    id: 'item-2',
    question: '¿Cómo puedo publicar mi propiedad?',
    answer: 'Publicar tu propiedad es muy sencillo. Solo tenés que crear una cuenta, completar los datos de tu propiedad (fotos, descripción, precio, ubicación) y listo. Tu propiedad estará visible para miles de usuarios interesados en cuestión de minutos.'
  },
  {
    id: 'item-3',
    question: '¿Cuánto cuesta publicar en la plataforma?',
    answer: 'Publicar tu propiedad en El Dueño Vende es completamente gratuito. No cobramos comisiones por venta ni por alquiler. Nuestro objetivo es facilitar la conexión directa entre dueños y compradores sin costos ocultos.'
  },
  {
    id: 'item-4',
    question: '¿Qué tipo de propiedades puedo encontrar?',
    answer: 'En nuestra plataforma podés encontrar una amplia variedad de propiedades: casas, departamentos, lofts, terrenos, locales comerciales y más. Todas publicadas directamente por sus dueños en las mejores ubicaciones de Costa Rica.'
  },
  {
    id: 'item-5',
    question: '¿Cómo me contacto con el dueño de una propiedad?',
    answer: 'Cada publicación incluye los datos de contacto del dueño. Podés comunicarte directamente por WhatsApp, teléfono o email. La comunicación es directa, sin intermediarios, para que puedas coordinar visitas y resolver todas tus dudas.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white pt-20 pb-10 md:pt-32 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5 md:gap-16">
          
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h2 className="text-4xl font-bold text-slate-950 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-500 mt-4 text-lg text-balance">
              Tus preguntas, respondidas
            </p>
            <p className="text-slate-500 mt-6 hidden md:block">
              ¿No encontrás lo que buscás? Contactá a nuestro{' '}
              <Link
                href="/contacto"
                className="text-black font-bold underline decoration-[#ffe600] decoration-[3px] underline-offset-4 hover:text-black transition-colors"
              >
                equipo de soporte
              </Link>
            </p>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <button
                    onClick={() => toggle(faq.id)}
                    className="flex flex-1 items-center justify-between w-full py-6 text-left font-medium text-lg text-slate-900 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                        openId === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-500 text-base leading-relaxed pb-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mobile support link */}
          <p className="text-slate-500 mt-6 md:hidden col-span-full">
            ¿No encontrás lo que buscás? Contactá a nuestro{' '}
            <Link
              href="/contacto"
              className="text-black font-bold underline decoration-[#ffe600] decoration-[3px] underline-offset-4 hover:text-black transition-colors"
            >
              equipo de soporte
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}
