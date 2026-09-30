"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../data/products";
import NavLink from "../components/NavLink";
import Action from "../components/Action";
import Icon from "../components/Icon";
import QtyControl from "../components/QtyControl";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import { formatPrice } from "../utils/formatPrice";
import { products } from "../data/products";

export default function CartPage() {
  const { cart, cartCount, updateQty, removeItem, toast, hideToast } = useCart();
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const subtotal = cart.reduce((sum, item) => sum + item.size.price * item.quantity, 0);

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = search || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [search, cartOpen]);

  if (cart.length === 0) {
    return (
      <>
        <Header path="/cart" openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
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
        {toast.visible && <Toast message={toast.msg} onView={() => navigate("/cart")} onClose={hideToast} />}
        <main className="page-main">
          <div className="empty-cart content-shell">
            <img className="empty-cart-image" src="/images/sofa.jpg" alt="Elegant furniture" />
            <span className="eyebrow">Your Selection</span>
            <h2>Your Cart Is Empty</h2>
            <p>Discover pieces selected to bring warmth and character to your home.</p>
            <NavLink href="/furniture" className="action action-dark">
              Explore Furniture
            </NavLink>
          </div>
          <section className="related content-shell pt-0">
            <SectionTitle eyebrow="Start here" title="You May Also Like" />
            <div className="product-grid">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header path="/cart" openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
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
      {toast.visible && <Toast message={toast.msg} onView={() => navigate("/cart")} onClose={hideToast} />}
      <main className="page-main">
        <section className="cart-page content-shell">
          <div className="cart-page-head">
            <span className="eyebrow">OAK &amp; HAVEN</span>
            <h1>Your Cart</h1>
            <p>Review your selected pieces before placing your order.</p>
          </div>
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.color.image || item.product.variants[0].image} alt={item.product.name} />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.product.category} Collection</span>
                    <h3 className="cart-item-name">{item.product.name}</h3>
                    <div className="cart-item-variants">
                      <span>Size: {item.size.label}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="cart-swatch w-2 h-2 rounded-full inline-block border border-black/10"
                          style={{ background: item.color.hex }}
                        />
                        {item.color.name}
                      </span>
                    </div>
                    <div className="cart-item-bottom">
                      <QtyControl qty={item.quantity} onChange={(n) => updateQty(item.id, n)} />
                      <div className="flex flex-col items-end gap-1">
                        <span className="cart-item-price">{formatPrice(item.size.price * item.quantity)}</span>
                        <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary-card">
              <h2>Order Summary</h2>
              <div className="summary-rows">
                {cart.map((item) => (
                  <div className="summary-row text-[0.68rem]" key={item.id}>
                    <span className="text-[#211a16]">
                      {item.product.name} <span className="text-[#a69a8d]">× {item.quantity}</span>
                    </span>
                    <span>{formatPrice(item.size.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="text-[#647458]">Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <div className="summary-actions">
                <NavLink href="/order" className="action action-dark">
                  Proceed to Order
                </NavLink>
                <NavLink href="/furniture" className="action action-outline">
                  Continue Shopping
                </NavLink>
              </div>
            </div>
          </div>

          <section className="related pb-8">
            <SectionTitle eyebrow="Complete your space" title="You May Also Like" />
            <div className="product-grid">
              {products
                .filter((p) => !cart.find((i) => i.product.slug === p.slug))
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
