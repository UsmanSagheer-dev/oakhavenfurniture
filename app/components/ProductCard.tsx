"use client";

import { useState } from "react";
import { Product } from "../data/products";
import NavLink from "./NavLink";
import Icon from "./Icon";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="product-card">
      <div className="product-media">
        <NavLink href={`/product/${product.slug}`}>
          <img
            className="product-primary"
            src={product.variants[0].image}
            alt={product.name}
          />
          <img className="product-secondary" src={product.variants[0].altImage} alt="" />
        </NavLink>
        {product.isNew && <span className="badge">New</span>}
        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label="Save product"
        >
          <Icon name="heart" />
        </button>
      </div>
      <div className="product-info">
        <span>{product.category} Collection</span>
        <h3>
          <NavLink href={`/product/${product.slug}`}>{product.name}</NavLink>
        </h3>
        <p>{formatPrice(product.basePrice)}</p>
        <NavLink href={`/product/${product.slug}`} className="view-link">
          View product <Icon name="arrow" />
        </NavLink>
      </div>
    </article>
  );
}

export default ProductCard;
