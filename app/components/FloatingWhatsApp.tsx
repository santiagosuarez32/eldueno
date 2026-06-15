"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type React from "react";

type Props = {
  phone?: string;      // E.164 (ej: 50686208287)
  message?: string;    // Mensaje prellenado
  right?: number;      // px desde el borde derecho
  bottom?: number;     // px desde el borde inferior
};

export default function FloatingWhatsApp({
  phone = "50686208287",
  message = "¡Hola! Vengo desde la web de El Dueño y quiero hacer una consulta 🙌",
  right = 20,
  bottom = 24,
}: Props) {
  const [mounted, setMounted] = useState(false);

  // monta en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // inyecta CSS
  useEffect(() => {
    const id = "wa-fab-anim";
    let style = document.getElementById(id) as HTMLStyleElement;
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }
    style.textContent = `
      @keyframes waPulse {
        0%   { transform: scale(1);   opacity: .75; }
        70%  { transform: scale(1.9); opacity: 0;   }
        100% { opacity: 0; }
      }

      .wa-fab {
        position: fixed;
        right: 20px;
        bottom: calc(24px + env(safe-area-inset-bottom));
        width: 64px;
        height: 64px;
        border-radius: 9999px;
        display: grid;
        place-items: center;
        color: #fff;
        background: #16a34a;
        cursor: pointer;
        box-shadow: 0 10px 28px rgba(0,0,0,.35);
        transition: transform .18s ease, background-color .15s ease, box-shadow .18s ease;
        z-index: 2147483647;
        isolation: isolate;
      }
      .wa-fab:hover {
        transform: translateY(-3px) scale(1.05);
        background: #15803d;
        box-shadow: 0 16px 34px rgba(0,0,0,.45);
      }
      .wa-ring {
        position: absolute;
        inset: -6px;
        border-radius: 9999px;
        border: 2.5px solid rgba(255, 193, 7, .75);
        pointer-events: none;
        animation: waPulse 2.2s ease-out infinite;
      }
      .wa-ring2 {
        position: absolute;
        inset: -6px;
        border-radius: 9999px;
        border: 2.5px solid rgba(255, 255, 255, .75);
        pointer-events: none;
        animation: waPulse 2.2s ease-out infinite;
        animation-delay: 1.1s;
      }
      .wa-sr {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      }
    `;
  }, []);

  if (!mounted) return null;

  // Normalizar número de teléfono para WhatsApp (Costa Rica / Internacional)
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length === 8 && !cleanPhone.startsWith("506")) {
    cleanPhone = "506" + cleanPhone;
  }

  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const fabStyle: React.CSSProperties = {
    right,
    bottom: `calc(${bottom}px + env(safe-area-inset-bottom))`,
  };

  const node = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="wa-fab"
      style={fabStyle}
    >
      <span className="wa-ring" aria-hidden="true" />
      <span className="wa-ring2" aria-hidden="true" />
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512" 
        width={28} 
        height={28} 
        fill="currentColor"
        style={{ position: "relative", zIndex: 1 }}
        aria-hidden="true"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
      <span className="wa-sr">Escribir por WhatsApp</span>
    </a>
  );

  return createPortal(node, document.body);
}
