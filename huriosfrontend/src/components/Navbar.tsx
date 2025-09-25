// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

/*
 Navbar.tsx
 - Responsive header with hamburger menu for mobile.
 - Search is highlighted (white background + shadow) so it doesn't blend with navbar.
 - Categories are clickable (dropdown on desktop, <details> on mobile).
 - Comments inline explain behavior.
*/

const categories = [
  { id: 1, name: "Motor" },
  { id: 2, name: "Suspensión" },
  { id: 3, name: "Frenos" },
  { id: 4, name: "Eléctrico" },
  { id: 5, name: "Accesorios" },
];

const Navbar: React.FC = () => {
  // menuOpen controla si el menú móvil está visible
  const [menuOpen, setMenuOpen] = useState(false);
  // catsOpen controla dropdown de categorías en desktop
  const [catsOpen, setCatsOpen] = useState(false);

  return (
    <header className="w-full bg-[#27557a] text-white sticky top-0 z-50">
      {/* contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* logo + título */}
        <Link to="/" className="flex items-center gap-3">
          {/* logo: colocarlo en public/assets/imgs/logo.webp */}
          <img src="/assets/imgs/logo.webp" alt="Hurios Rally" className="h-10 w-auto" />
          <span className="hidden sm:inline-block font-semibold text-lg">Hurios Rally</span>
        </Link>

        {/* nav desktop: oculto en md- (visible en md+) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/products" className="hover:underline">Productos</Link>

          {/* dropdown categorías (desktop) */}
          <div className="relative">
            {/* botón que abre el dropdown */}
            <button
              onClick={() => setCatsOpen(v => !v)}
              onMouseEnter={() => setCatsOpen(true)}
              onMouseLeave={() => setCatsOpen(false)}
              className="flex items-center gap-1"
              aria-expanded={catsOpen}
            >
              Categorías
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* lista de categorias; pointer-events por defecto permiten clicks */}
            <ul
              onMouseEnter={() => setCatsOpen(true)}
              onMouseLeave={() => setCatsOpen(false)}
              className={`absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-md transform transition-all ${
                catsOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}
              style={{ zIndex: 60 }}
            >
              {categories.map(cat => (
                <li key={cat.id} className="px-4 py-2 hover:bg-gray-100">
                  {/* Link navegable; permite click */}
                  <Link to={`/category/${cat.id}`} className="block">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/about" className="hover:underline">Nosotros</Link>
        </nav>

        {/* acciones (search, cart, login, hamburger) */}
        <div className="flex items-center gap-3">
          {/* search: visible en md+; diseño para destacarlo (fondo blanco) */}
          <div className="hidden md:block">
            <input
              aria-label="Buscar"
              placeholder="Buscar repuestos..."
              className="px-3 py-2 rounded-md w-64 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffe08a] transition"
            />
          </div>

          {/* carrito (opcional) */}
          <Link to="/cart" className="hidden sm:inline-flex items-center p-2 rounded hover:bg-white/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </Link>

          {/* botón login circular */}
          <Link to="/login" aria-label="Iniciar sesión" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-[#27557a] hover:scale-105 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
            </svg>
          </Link>

          {/* hamburger: visible en mobile */}
          <button
            className="md:hidden p-2 rounded text-white/90 hover:bg-white/10"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Abrir menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (visible cuando menuOpen=true) */}
      <div className={`md:hidden bg-[#27557a] text-white ${menuOpen ? "block" : "hidden"} px-4 pb-4`}>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="py-2 border-b border-white/10">Inicio</Link>
          <Link to="/products" className="py-2 border-b border-white/10">Productos</Link>

          {/* details permite expandir categorias y seguir siendo accesible/clickable */}
          <details className="py-2 border-b border-white/10">
            <summary className="cursor-pointer">Categorías</summary>
            <ul className="pl-4 mt-2">
              {categories.map(c => (
                <li key={c.id} className="py-1">
                  <Link to={`/category/${c.id}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </details>

          <Link to="/about" className="py-2 border-b border-white/10">Nosotros</Link>
          <Link to="/user" className="py-2">Usuario</Link>

          {/* mobile search visible en mobile */}
          <div className="mt-2">
            <input
              aria-label="Buscar"
              placeholder="Buscar..."
              className="px-3 py-2 rounded-md w-full bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffe08a]"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
