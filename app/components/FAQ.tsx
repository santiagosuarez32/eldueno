'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    id: 'item-1',
    question: '¿Qué es El Dueño Vende?',
    answer: 'El Dueño Vende es una empresa inmobiliaria costarricense con más de 35 años de trayectoria en el mercado. Nos especializamos en la compra, venta y alquiler de propiedades, así como en servicios de arquitectura, préstamos hipotecarios y reunificación de deudas en la Gran Área Metropolitana. Nuestro compromiso es brindar soluciones integrales, asesoría profesional y un servicio personalizado que permita a cada cliente alcanzar sus objetivos inmobiliarios y financieros con seguridad, confianza y transparencia.'
  },
  {
    id: 'item-2',
    question: '¿Cómo puedo vender mi propiedad?',
    answer: 'Vender tu propiedad nunca fue tan sencillo. En El Dueño Vende, te brindamos la tranquilidad y seguridad de contar con profesionales que te acompañarán en cada etapa del proceso. Nos encargamos de la promoción, asesoría, negociación y gestión necesaria para que tu propiedad se venda de forma eficiente, transparente y al mejor valor de mercado.'
  },
  {
    id: 'item-3',
    question: '¿Qué documentos necesito para vender una propiedad?',
    answer: 'Generalmente se requiere la escritura de la propiedad, plano catastrado, identificación del propietario y otros documentos que nuestro equipo le indicará según cada caso.'
  },
  {
    id: 'item-4',
    question: '¿Pueden ayudarme a encontrar una propiedad para comprar?',
    answer: 'Sí. Contamos con una amplia cartera de propiedades y asesoría personalizada para encontrar la opción que mejor se adapte a sus necesidades y presupuesto.'
  },
  {
    id: 'item-5',
    question: '¿Ofrecen financiamiento o préstamos hipotecarios?',
    answer: 'Sí. Brindamos asesoría y gestión de préstamos hipotecarios para facilitar la compra de su propiedad.'
  },
  {
    id: 'item-6',
    question: '¿Qué es la reunificación de deudas?',
    answer: 'Es un proceso que permite consolidar varias obligaciones financieras en una sola cuota, facilitando su administración y mejorando su flujo de caja.'
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
                equipo
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
              equipo
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}
