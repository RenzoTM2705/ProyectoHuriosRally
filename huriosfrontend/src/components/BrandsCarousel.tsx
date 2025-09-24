// src/components/BrandsCarousel.tsx
import React, { useEffect, useRef } from "react";

/*
 BrandsCarousel.tsx
 - Carrusel continuo horizontal sin librerías.
 - Duplicamos los items en DOM para crear loop infinito.
 - Se mueve modificando scrollLeft con requestAnimationFrame.
 - Pausa on hover (accesible).
*/

const logos = [
  "/assets/imgs/logo1.webp",
  "/assets/imgs/logo2.webp",
  "/assets/imgs/logo3.webp",
  "/assets/imgs/logo4.webp",
  "/assets/imgs/logo5.webp",
  "/assets/imgs/logo6.webp",
];

const BrandsCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Si no hay suficiente ancho, no animamos
    const speed = 0.5; // px per tick (ajustable)
    // asegurar que content sea lo suficientemente largo; duplicar manualmente en render

    const step = () => {
      if (!el || pausedRef.current) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      // avance
      el.scrollLeft += speed;
      // cuando lleguemos a la mitad (porque duplicamos), resetear
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    // iniciar animación
    rafRef.current = requestAnimationFrame(step);

    // limpiar
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Marcas asociadas</h2>

        {/* contenedor con overflow hidden */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-hidden no-scrollbar"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          aria-label="Carrusel de marcas"
        >
          {/* renderizamos logos dos veces para efecto loop */}
          {[...logos, ...logos].map((src, idx) => (
            <div key={idx} className="flex-shrink-0 w-48 h-20 bg-white rounded flex items-center justify-center shadow">
              <img src={src} alt={`logo-${idx}`} className="max-h-14 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
