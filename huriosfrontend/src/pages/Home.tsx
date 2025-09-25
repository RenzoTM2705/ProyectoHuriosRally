// src/pages/Home.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandsCarousel from "../components/BrandsCarousel";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

/*
 Home.tsx
 - Composición de la página principal.
 - useReveal() activa las animaciones de aparición al hacer scroll.
 - Las secciones usan attribute data-reveal para ser observadas.
*/

const Home: React.FC = () => {
  // inicializar observer
  useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* nuevos repuestos */}
        <section data-reveal className="max-w-7xl mx-auto px-4 py-10 opacity-0 transform translate-y-6">
          <h2 className="text-2xl font-bold mb-4">Nuevos repuestos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>

        {/* marcas (slider) */}
        <BrandsCarousel />

        {/* más vendidos */}
        <section data-reveal className="max-w-7xl mx-auto px-4 py-10 opacity-0 transform translate-y-6">
          <h2 className="text-2xl font-bold mb-4">Los más vendidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
