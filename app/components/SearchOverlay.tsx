"use client";

import { useState } from "react";
import { products } from "../data/products";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Icon from "./Icon";
import { formatPrice } from "../utils/formatPrice";

function SearchOverlay({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState("");
  const results = products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
  return <div className={`search-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
    <div className="search-top"><Logo /><button className="tool-button" onClick={close} aria-label="Close search"><Icon name="close" /></button></div>
    <div className="search-inner">
      <span className="eyebrow">Search our collection</span>
      <div className="search-field"><input autoFocus={open} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" /><Icon name="search" /></div>
      {!query && <div className="popular-searches"><span>Popular searches</span>{["Oak bed", "Sofa", "Dining table", "Center table"].map((term) => <button key={term} onClick={() => setQuery(term)}>{term}</button>)}</div>}
      {query && <div className="search-results">{results.length ? results.map((product) => <NavLink href={`/product/${product.slug}`} onClick={close} key={product.slug} className="search-result"><img src={product.variants[0].image} alt="" /><span><small>{product.category}</small><strong>{product.name}</strong><em>{formatPrice(product.basePrice)}</em></span><Icon name="arrow" /></NavLink>) : <p>No pieces found. Try a different search.</p>}</div>}
    </div>
  </div>;
}

export default SearchOverlay;