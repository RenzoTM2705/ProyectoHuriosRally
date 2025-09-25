// src/components/ProductCard.tsx
import React from "react";

/*
 ProductCard.tsx
 - Card simple reutilizable para mostrar producto con imagen, titulo y precio.
 - Recibe props; tiene valores por defecto para desarrollo.
*/

type Props = {
  title?: string;
  price?: string;
  img?: string;
};

const ProductCard: React.FC<Props> = ({ title = "Producto ejemplo", price = "S/0.00", img = "/assets/imgs/logo1.webp" }) => {
  return (
    <article className="bg-white rounded-lg shadow p-3">
      {/* imagen */}
      <div className="h-36 rounded overflow-hidden mb-3">
        <img src={"/assets/imgs/filtros_de_aire_universal.webp"} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* texto */}
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-3">Descripción breve del producto.</p>

      {/* footer card con precio y acciones */}
      <div className="flex items-center justify-between">
        <span className="font-bold">{price}</span>
        <div className="flex items-center gap-3 text-gray-500">
          <button aria-label="Agregar al carrito" className="p-1 hover:text-blue-600">🛒</button>
          <button aria-label="Ver detalles" className="p-1 hover:text-blue-600">🔍</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard
