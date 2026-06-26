'use client';

import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { getOptimizedImageUrl } from '@/lib/utils';

interface LightboxGalleryProps {
  gallery: string[];
  title: string;
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (idx: number) => void;
}

export default function LightboxGallery({
  gallery,
  title,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxGalleryProps) {
  const zoomRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Mapeamos las imágenes usando nuestra función para traerlas optimizadas desde Supabase
  const slides = gallery.map((url) => ({
    src: getOptimizedImageUrl(url, 1800)
  }));

  return (
    <>
      <style jsx global>{`
        .yarl__counter {
          margin-left: 20px;
          margin-top: 10px;
        }
        .yarl__slide_image {
          cursor: zoom-in;
        }
        .yarl__thumbnails_track {
          margin-bottom: 10px;
        }
      `}</style>
      <Lightbox
        open={true}
        index={activeIndex}
        close={onClose}
        slides={slides}
        plugins={[Zoom, Counter]}
        animation={{ swipe: 250 }}
        zoom={{ ref: zoomRef, scrollToZoom: true, maxZoomPixelRatio: 4 }}
        carousel={{ padding: "80px" }}
        controller={{ closeOnBackdropClick: true }}
        on={{
          view: ({ index }) => onChangeIndex(index),
          click: () => {
            if (zoomRef.current) {
              if (zoomRef.current.zoom > 1) {
                zoomRef.current.zoomOut();
              } else {
                zoomRef.current.zoomIn();
              }
            }
          }
        }}
        styles={{
          root: { 
            "--yarl__navigation_button_size": "100px",
            "--yarl__color_backdrop": "rgba(0, 0, 0, 0.95)",
            zIndex: 9999,
          } as any,
          navigationPrev: { marginLeft: "20px", backgroundColor: "transparent", "--yarl__icon_size": "50px" } as any,
          navigationNext: { marginRight: "20px", backgroundColor: "transparent", "--yarl__icon_size": "50px" } as any,
          slide: { padding: "10vh 10vw" }
        }}
      />
      {mounted && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[10000] pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onChangeIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                idx === activeIndex 
                  ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                  : 'bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Ir a foto ${idx + 1}`}
            />
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

