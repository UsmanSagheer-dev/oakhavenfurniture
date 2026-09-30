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
  const { cart, cartCount, updateQty, removeItem, toast, hideToast } =
    useCart();
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.size.price * item.quantity,
    0,
  );

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = search || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [search, cartOpen]);

  if (cart.length === 0) {
    return (
      <>
        <Header
          path="/cart"
          openSearch={openSearch}
          cartCount={cartCount}
          openCart={() => setCartOpen(true)}
        />
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
        {toast.visible && (
          <Toast
            message={toast.msg}
            onView={() => navigate("/cart")}
            onClose={hideToast}
            visible={toast.visible}
          />
        )}
        <main className="page-main">
          <div className="flex flex-col items-center text-center p-24 max-w-120mx-auto">
            <img
              className="max-w-120 mb-8"
              src="/images/sofa.jpg"
              alt="Elegant furniture"
            />
            <span className="eyebrow">Your Selection</span>
            <h2>Your Cart Is Empty</h2>
            <p>
              Discover pieces selected to bring warmth and character to your
              home.
            </p>
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
      <Header
        path="/cart"
        openSearch={openSearch}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
      />
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
      {toast.visible && (
        <Toast
          message={toast.msg}
          onView={() => navigate("/cart")}
          onClose={hideToast}
          visible={toast.visible}
        />
      )}
      <main className="page-main">
        <section className="py-16 content-shell">
          <div className="mb-12">
            <span className="eyebrow">OAK &amp; HAVEN</span>
            <h1 className="my-2">Your Cart</h1>
            <p>Review your selected pieces before placing your order.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
            <div className="flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-6 p-6 bg-white"
                  key={item.id}
                >
                  <div className="aspect-square overflow-hidden bg-[#efe8de]">
                    <img
                      src={item.color.image || item.product.variants[0].image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[#a69a8d] text-[0.6rem] tracking-[0.08em] uppercase">
                        {item.product.category} Collection
                      </span>
                      <div className="flex flex-col items-start  gap-1">
                        <span className="text-[0.85rem] font-semibold">
                          {formatPrice(item.size.price * item.quantity)}
                        </span>
                        <button
                          className="p-0 border-0 bg-transparent text-[#a69a8d] hover:text-red-500 cursor-pointer"
                          onClick={() => removeItem(item.id)}
                        >
                          <Icon
                            name="trash"
                            className="w-4 h-4 transition-colors duration-200"
                          />
                        </button>
                      </div>
                    </div>
                    <h3 className="m-0 font-serif text-[1.1rem] font-medium">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[0.7rem] text-[#a69a8d]">
                      <span>Size: {item.size.label}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block border border-black/10"
                          style={{ background: item.color.hex }}
                        />
                        {item.color.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-4">
                      <QtyControl
                        qty={item.quantity}
                        onChange={(n) => updateQty(item.id, n)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-[#efe8de] sticky top-32 lg:sticky lg:top-32">
              <h2 className="m-0 mb-4 font-serif text-[1.3rem] font-medium">
                Order Summary
              </h2>
              <div className="flex flex-col gap-2 py-4 border-y border-[rgba(33,26,22,0.15)]">
                {cart.map((item) => (
                  <div
                    className="flex justify-between text-[0.68rem]"
                    key={item.id}
                  >
                    <span className="text-[#211a16]">
                      {item.product.name}{" "}
                      <span className="text-[#a69a8d]">× {item.quantity}</span>
                    </span>
                    <span>{formatPrice(item.size.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-[#647458]">Free</span>
                </div>
                <div className="flex justify-between pt-2 mt-1 font-semibold text-[0.9rem]">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <div className="grid gap-2 mt-6">
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
            <SectionTitle
              eyebrow="Complete your space"
              title="You May Also Like"
            />
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
