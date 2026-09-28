"use client";

import { useState } from "react";
import { Product } from "../data/products";
import NavLink from "./NavLink";
import Icon from "./Icon";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-[#efe8de] aspect-[0.77]">
        <NavLink href={`/product/${product.slug}`}>
          <img
            className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
            src={product.variants[0].image}
            alt={product.name}
          />
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-[1.025]"
            src={product.variants[0].altImage}
            alt=""
          />
        </NavLink>
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-[#f7f3ec] px-3 py-2 text-xs font-semibold tracking-[0.12em] uppercase">
            New
          </span>
        )}
        <button
          className={`absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full border-0 bg-[rgba(247,243,236,0.86)] text-[#211a16] transition-all duration-300 hover:scale-110 opacity-100 translate-y-0 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 ${saved ? "md:opacity-100 md:translate-y-0" : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label="Save product"
        >
          <Icon name="heart" className={saved ? "fill-[#211a16]" : ""} />
        </button>
      </div>
      <div className="pt-5">
        <span className="text-[#a69a8d] text-xs tracking-[0.14em] uppercase">
          {product.category} Collection
        </span>
        <h3 className="my-2 font-serif text-2xl font-medium leading-[1.1]">
          <NavLink href={`/product/${product.slug}`}>{product.name}</NavLink>
        </h3>
        <p className="text-sm font-semibold">
          {formatPrice(product.basePrice)}
        </p>
        <NavLink
          href={`/product/${product.slug}`}
          className="hidden md:inline-flex items-center gap-2 mt-4 pb-1 border-b border-[rgba(33,26,22,0.15)] text-xs tracking-widest uppercase transition-all duration-300 hover:gap-3"
        >
          View product <Icon name="arrow" className="w-4" />
        </NavLink>
      </div>
    </article>
  );
}

export default ProductCard;
