'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
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
  },
  {
    id: 'item-7',
    question: '¿Puedo comprar una propiedad por medio del bono-crédito?',
    answer: 'Sí, Si no has recibido anteriormente el bono, no has tenido propiedades registralmente a nombre tuyo, si cuentas con un núcleo familiar, y eres sujeto a crédito, tu y tu familia serian los candidatos ideales.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".faq-head", {
      scrollTrigger: {
        trigger: ".faq-head",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    gsap.from(".faq-list", {
      scrollTrigger: {
        trigger: ".faq-list",
        start: "top bottom-=50px",
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.2
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-white pt-20 pb-10 md:pt-32 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5 md:gap-16">

          {/* Left: Title */}
          <div
            className="faq-head md:col-span-2"
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
                className="text-black font-bold underline decoration-[#FFFF33] decoration-[3px] underline-offset-4 hover:text-black transition-colors"
              >
                equipo
              </Link>
            </p>
          </div>

          {/* Right: Accordion */}
          <div
            className="faq-list md:col-span-3"
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
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${openId === faq.id ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${openId === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-slate-500 text-base leading-relaxed pb-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile support link */}
          <p className="text-slate-500 mt-6 md:hidden col-span-full">
            ¿No encontrás lo que buscás? Contactá a nuestro{' '}
            <Link
              href="/contacto"
              className="text-black font-bold underline decoration-[#FFFF33] decoration-[3px] underline-offset-4 hover:text-black transition-colors"
            >
              equipo
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}
