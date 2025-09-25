// src/components/Hero.tsx
import React from "react";

/*
 Hero.tsx
 - Hero con imágenes en capas que hacen crossfade por CSS.
 - El texto está en un overlay (position: absolute) para quedarse fijo encima.
 - Reemplaza las rutas en `slides` por tus imágenes en public/assets/imgs/.
*/

const slides = [
  "/assets/imgs/banner1.jpg",
  "/assets/imgs/banner2.jpg",
  "/assets/imgs/banner3.jpg",
];

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Contenedor de slides: ponemos cada img como fondo en una capa */}
      <div className="absolute inset-0">
        {slides.map((src, idx) => (
          // cada capa tiene la animación fade; CSS en index.css controla delay/tiempo
          <div
            key={idx}
            className={`hero-slide hero-slide-${idx}`}
            style={{
              backgroundImage: `url(${src})`,
            }}
            aria-hidden
          />
        ))}
      </div>

      {/* Overlay fijo encima de las imágenes */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">RALLY DE HURIOS</h1>
        <p className="mt-4 text-white/90 max-w-2xl">Bienvenido a la tienda online — repuestos y accesorios con garantía.</p>

        {/* indicadores visuales decorativos */}
        <div className="mt-8 flex gap-2">
          <span className="w-10 h-1 bg-white/80 rounded"></span>
          <span className="w-6 h-1 bg-white/50 rounded"></span>
          <span className="w-6 h-1 bg-white/50 rounded"></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
