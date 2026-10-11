"use client";

import { useState, useMemo, use, useEffect } from "react";
import { products, images } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import Icon from "../../components/Icon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchOverlay from "../../components/SearchOverlay";
import CartDrawer from "../../components/CartDrawer";
import Toast from "../../components/Toast";
import SortSelect from "../../components/SortSelect";
import { useCart } from "../../context/CartContext";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const routeCategory = category.replace("-", " ");
  const [filter, setFilter] = useState(routeCategory || "All");
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const { cart, cartCount, isLoaded, updateQty, removeItem, toast, hideToast } = useCart();

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "low", label: "Price: Low to High" },
    { value: "high", label: "Price: High to Low" },
  ];

  useEffect(() => {
    document.body.style.overflow = search || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [search, cartOpen]);

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

  const heroImage =
    routeCategory === "bedroom"
      ? images.bedroom
      : routeCategory === "living room"
        ? images.living
        : routeCategory === "dining"
          ? images.dining2
          : null;

  return (
    <>
      <Header path={`/furniture/${category}`} openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} isLoaded={isLoaded} />
      <SearchOverlay open={search} close={closeSearch} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onViewCart={() => navigate("/cart")}
        onOrder={() => navigate("/order")}
        isLoaded={isLoaded}
      />
      {toast.visible && <Toast message={toast.msg} onView={() => navigate("/cart")} onClose={hideToast} visible={toast.visible} />}
      <main className="page-main">
        {heroImage ? (
          <section className="category-hero">
            <img src={heroImage} alt={`${routeCategory} collection`} />
            <div>
              <span className="eyebrow1">The collection</span>
              <h1>{routeCategory}</h1>
              <p>
                Considered furniture to bring ease, warmth and character to your
                space.
              </p>
            </div>
          </section>
        ) : (
          <section className="page-title content-shell">
            <span className="eyebrow">OAK &amp; HAVEN Furniture</span>
            <h1>{routeCategory}</h1>
            <p>Explore our collection of thoughtfully selected pieces.</p>
          </section>
        )}
        <section className="catalog content-shell">
          <div className="catalog-toolbar">
            <span>Showing {shown.length} products</span>
            <button className="filter-trigger" onClick={() => setDrawer(true)}>
              Filter
            </button>
            <SortSelect
              label="Sort by"
              value={sort}
              onChange={setSort}
              options={sortOptions}
            />
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
                      filter.toLowerCase() === item.toLowerCase()
                        ? "active"
                        : ""
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
              {/* {["Price", "Availability", "Material", "Color"].map((item) => (
                <button className="filter-collapsed" key={item}>
                  {item}
                  <span>+</span>
                </button>
              ))} */}
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
