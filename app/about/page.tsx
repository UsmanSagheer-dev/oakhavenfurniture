"use client";

import { useState, useEffect } from "react";
import NavLink from "../components/NavLink";
import TrustStrip from "../components/TrustStrip";
import { images } from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import { useCart } from "../context/CartContext";

export default function AboutPage() {
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const { cart, cartCount, updateQty, removeItem, toast, hideToast } = useCart();

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = search || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [search, cartOpen]);

  return (
    <>
      <Header path="/about" openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
      <SearchOverlay open={search} close={closeSearch} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onViewCart={() => navigate("/cart")}
        onOrder={() => navigate("/order")}
      />
      {toast.visible && <Toast message={toast.msg} onView={() => navigate("/cart")} onClose={hideToast} visible={toast.visible} />}
      <main className="page-main">
      <section className="about-hero">
        <img src={images.sofa2} alt="Beautifully curated living room" />

        <div>
          <span className="eyebrow">Our point of view</span>

          <h1>
            Designed for
            <br />
            <em>your space.</em>
          </h1>

          <p className="hero-description">
            Thoughtfully chosen furniture that brings comfort, character, and
            timeless style to everyday living.
          </p>
        </div>
      </section>

      <section className="about-story content-shell">
        <div>
          <span className="eyebrow">OAK &amp; HAVEN</span>
          <h2>A more considered way to furnish your home.</h2>
        </div>

        <div>
          <p className="lead">
            We believe finding beautiful furniture should feel inspiring, clear
            and personal.
          </p>

          <p>
            OAK &amp; HAVEN brings together a curated selection of furniture
            pieces, making it easier to discover beautiful products, explore
            their details and order with confidence.
          </p>

          <p>
            We select pieces for their ability to bring warmth, function and
            enduring style to everyday spaces. Our team is available directly
            through WhatsApp to answer questions and guide every order.
          </p>
        </div>
      </section>

      <section className="about-image-pair content-shell">
        <img src={images.intro} alt="Natural oak table detail" />
        <img src={images.bedroom} alt="Calm bedroom interior" />
      </section>

      <TrustStrip />
    </main>
    <Footer />
    </>
  );
}