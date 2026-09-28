"use client";

import { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Icon from "../components/Icon";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import FurnitureHero from "../components/FurnitureHero";

export default function FurniturePage() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const shown = useMemo(() => {
    const selected =
      filter === "All"
        ? products
        : products.filter(
            (p) => p.category.toLowerCase() === filter.toLowerCase(),
          );
    return [...selected].sort((a, b) =>
      sort === "low"
        ? a.basePrice - b.basePrice
        : sort === "high"
          ? b.basePrice - a.basePrice
          : sort === "newest"
            ? Number(Boolean(b.isNew)) - Number(Boolean(a.isNew))
            : 0,
    );
  }, [filter, sort]);

  return (
    <>
      <Header path="/furniture" openSearch={openSearch} />
      <SearchOverlay open={search} close={closeSearch} />
      <main className="page-main">
      <div className="content-shell">
        <FurnitureHero />
      </div>
      <section className="catalog content-shell">
        <div className="catalog-toolbar">
          <span>Showing {shown.length} products</span>
          <button className="filter-trigger" onClick={() => setDrawer(true)}>
            <Icon name="filter" /> Filter
          </button>
          <label>
            Sort by{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>
        <div className="catalog-layout">
          <aside className={`filters ${drawer ? "is-open" : ""}`}>
            <div className="filter-mobile-top">
              <strong>Filter</strong>
              <button onClick={() => setDrawer(false)}>
                <Icon name="close" />
              </button>
            </div>
            <div className="filter-block">
              <span>Category</span>
              {[
                "All",
                "Bedroom",
                "Living Room",
                "Dining",
                "Tables",
                "Seating",
              ].map((item) => (
                <button
                  className={
                    filter.toLowerCase() === item.toLowerCase() ? "active" : ""
                  }
                  onClick={() => {
                    setFilter(item);
                    setDrawer(false);
                  }}
                  key={item}
                >
                  {item}
                  <small>
                    {item === "All"
                      ? products.length
                      : products.filter((p) => p.category === item).length}
                  </small>
                </button>
              ))}
            </div>
            {["Price", "Availability", "Material", "Color"].map((item) => (
              <button className="filter-collapsed" key={item}>
                {item}
                <span>+</span>
              </button>
            ))}
          </aside>
          {drawer && (
            <button
              className="drawer-backdrop"
              aria-label="Close filters"
              onClick={() => setDrawer(false)}
            />
          )}
          <div className="product-grid catalog-grid">
            {shown.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}