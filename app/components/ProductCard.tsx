"use client";

import { useState, useEffect } from "react";
import { Product } from "../data/products";
import NavLink from "./NavLink";
import Icon from "./Icon";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-[0.77] overflow-hidden bg-[#efe8de]">
        <NavLink href={`/product/${product.slug}`}>
          <img
            className="h-full w-full object-cover transition-opacity duration-1000 ease-out group-hover:opacity-0 motion-reduce:transition-none"
            src={product.variants[0].image}
            alt={product.name}
          />
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100 motion-reduce:transition-none"
            src={product.variants[0].altImage}
            alt=""
          />
        </NavLink>

        {product.isNew && (
          <span className="absolute top-2 left-2 bg-(--ivory) px-4 py-2 text-xs tracking-[0.08em] text-(--espresso)">
            New
          </span>
        )}

        <button
          type="button"
          className={`absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full border-0 bg-(--ivory) text-(--espresso) transition-opacity duration-300 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--gold) motion-reduce:transition-none md:opacity-0 md:group-hover:opacity-100 ${saved ? "md:opacity-100" : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? "Remove from saved" : "Save product"}
          aria-pressed={saved}
          suppressHydrationWarning
        >
          <Icon name="heart" className={saved ? "fill-(--espresso)" : ""} />
        </button>
      </div>

      <div className="p-6 border-t border-transparent transition-colors duration-500 group-hover:border-(--gold) motion-reduce:transition-none">
        <span className="text-xs tracking-wide text-[#a69a8d]">
          {product.category}
        </span>
        <h3 className="mt-2 mb-3 font-(family-name:--serif) text-2xl font-light leading-[1.15] text-(--espresso) md:text-[1.7rem]">
          <NavLink href={`/product/${product.slug}`}>{product.name}</NavLink>
        </h3>
        <p className="text-sm tracking-wide text-[#74685f]">
          {formatPrice(product.basePrice)}
        </p>
        <NavLink
          href={`/product/${product.slug}`}
          className="mt-5 hidden items-center gap-2 border-b border-(--espresso) pb-1 text-sm tracking-wide text-(--espresso) transition-[gap,color,border-color] duration-300 hover:gap-3 hover:border-(--gold) md:inline-flex motion-reduce:transition-none"
        >
          View piece <Icon name="arrow" className="w-4" />
        </NavLink>
      </div>
    </article>
  );
}

export default ProductCard;
