'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface LightboxGalleryProps {
  gallery: string[];
  title: string;
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (idx: number) => void;
}

const ZOOM_LEVELS = [1, 1.5, 2, 3, 4];

export default function LightboxGallery({
  gallery,
  title,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxGalleryProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOrigin, setPanOrigin] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Reset zoom/pan when changing images
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [activeIndex]);

  // Scroll thumbnail strip to make active thumbnail visible
  useEffect(() => {
    if (thumbsRef.current) {
      const activeThumb = thumbsRef.current.children[activeIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, zoom]);

  const handlePrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + gallery.length) % gallery.length);
  }, [activeIndex, gallery.length, onChangeIndex]);

  const handleNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % gallery.length);
  }, [activeIndex, gallery.length, onChangeIndex]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => {
      const nextIdx = ZOOM_LEVELS.findIndex((z) => z > prev);
      return nextIdx !== -1 ? ZOOM_LEVELS[nextIdx] : prev;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const prevIdx = ZOOM_LEVELS.slice().reverse().findIndex((z) => z < prev);
      const idx = prevIdx !== -1 ? ZOOM_LEVELS.length - 1 - prevIdx : -1;
      if (idx !== -1) {
        if (ZOOM_LEVELS[idx] === 1) setPan({ x: 0, y: 0 });
        return ZOOM_LEVELS[idx];
      }
      return prev;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Mouse wheel zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    },
    [handleZoomIn, handleZoomOut]
  );

  // Double click to toggle zoom
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (zoom > 1) {
        resetZoom();
      } else {
        setZoom(2.5);
        // Pan to click point
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = (rect.width / 2 - (e.clientX - rect.left)) * 0.5;
          const y = (rect.height / 2 - (e.clientY - rect.top)) * 0.5;
          setPan({ x, y });
        }
      }
    },
    [zoom, resetZoom]
  );

  // Pan (drag) handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      setPanOrigin({ ...pan });
    },
    [zoom, pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      setPan({
        x: panOrigin.x + dx,
        y: panOrigin.y + dy,
      });
    },
    [isPanning, panStart, panOrigin]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Touch handlers for mobile zoom and pan
  const [lastTouchDist, setLastTouchDist] = useState<number | null>(null);
  const [touchPanStart, setTouchPanStart] = useState({ x: 0, y: 0 });
  const [touchPanOrigin, setTouchPanOrigin] = useState({ x: 0, y: 0 });

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch start
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        setLastTouchDist(dist);
      } else if (e.touches.length === 1 && zoom > 1) {
        // Pan start
        setTouchPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setTouchPanOrigin({ ...pan });
      }
    },
    [zoom, pan]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && lastTouchDist !== null) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const scale = dist / lastTouchDist;
        setZoom((prev) => Math.min(Math.max(prev * scale, 1), 4));
        setLastTouchDist(dist);
      } else if (e.touches.length === 1 && zoom > 1) {
        const dx = e.touches[0].clientX - touchPanStart.x;
        const dy = e.touches[0].clientY - touchPanStart.y;
        setPan({
          x: touchPanOrigin.x + dx,
          y: touchPanOrigin.y + dy,
        });
      }
    },
    [lastTouchDist, zoom, touchPanStart, touchPanOrigin]
  );

  const handleTouchEnd = useCallback(() => {
    setLastTouchDist(null);
    if (zoom <= 1) setPan({ x: 0, y: 0 });
  }, [zoom]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/97 select-none"
    >
      {/* Top Bar */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 z-20">
        <div className="flex items-center gap-3">
          <span className="text-white/80 text-xs sm:text-sm font-medium truncate max-w-[40vw]">
            {title}
          </span>
          <span className="text-white/40 text-xs font-medium">
            {activeIndex + 1} / {gallery.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-xl px-2 py-1 border border-white/10">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="p-1.5 text-white/70 hover:text-white disabled:text-white/20 transition-colors cursor-pointer disabled:cursor-not-allowed"
              aria-label="Alejar"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-white/60 text-xs font-mono min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 4}
              className="p-1.5 text-white/70 hover:text-white disabled:text-white/20 transition-colors cursor-pointer disabled:cursor-not-allowed"
              aria-label="Acercar"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            {zoom > 1 && (
              <button
                onClick={resetZoom}
                className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Restablecer zoom"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2.5 text-white hover:text-white/80 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl border border-white/10 transition-all cursor-pointer"
            aria-label="Cerrar galería"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div
        ref={containerRef}
        className="relative flex-grow flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: zoom > 1 ? (isPanning ? 'grabbing' : 'grab') : 'zoom-in',
        }}
      >
        {/* Navigation arrows */}
        {zoom <= 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white z-20 cursor-pointer transition-all"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white z-20 cursor-pointer transition-all"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>
          </>
        )}

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: isPanning ? 'none' : 'transform 0.25s ease-out',
            }}
          >
            <img
              src={gallery[activeIndex]}
              alt={`${title} - Foto ${activeIndex + 1}`}
              className="max-w-[90vw] max-h-[calc(100vh-180px)] object-contain rounded-lg shadow-2xl"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom indicator (mobile) */}
        {zoom > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 sm:hidden">
            {Math.round(zoom * 100)}%
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="shrink-0 py-3 px-4 sm:px-6 z-20">
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto hide-scrollbar justify-center"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onChangeIndex(idx)}
              className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                idx === activeIndex
                  ? 'border-white/90 ring-1 ring-white/40 opacity-100 scale-105'
                  : 'border-transparent opacity-40 hover:opacity-70'
              }`}
              aria-label={`Ir a foto ${idx + 1}`}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
