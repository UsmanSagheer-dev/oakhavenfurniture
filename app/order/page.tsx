"use client";

import { useState, useEffect } from "react";
import { FormEvent } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../data/products";
import NavLink from "../components/NavLink";
import Action from "../components/Action";
import Icon from "../components/Icon";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import { formatPrice } from "../utils/formatPrice";

export default function OrderPage() {
  const { cart, cartCount, clearCart, toast, hideToast } = useCart();
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const subtotal = cart.reduce((sum, item) => sum + item.size.price * item.quantity, 0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    city: "",
    address: "",
    notes: "",
    deliveryTime: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.phone.trim()) errs.phone = "Please enter your phone number.";
    if (!form.city.trim()) errs.city = "Please enter your city.";
    if (!form.address.trim()) errs.address = "Please enter your delivery address.";
    return errs;
  };

  const buildMessage = () => {
    const lines = [
      "Assalam o Alaikum, I would like to place an order from OAK & HAVEN FURNITURE.",
      "",
      `Customer: ${form.name}`,
      `Phone: ${form.phone}`,
      form.whatsapp ? `WhatsApp: ${form.whatsapp}` : "",
      `City: ${form.city}`,
      `Delivery Address: ${form.address}`,
      form.deliveryTime ? `Preferred Delivery Time: ${form.deliveryTime}` : "",
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "Order:",
      ...cart.map((item, i) => [
        `${i + 1}. ${item.product.name}`,
        `   Size: ${item.size.label}`,
        `   Color: ${item.color.name}`,
        `   Quantity: ${item.quantity}`,
        `   Price: ${formatPrice(item.size.price * item.quantity)}`,
      ].join("\n")),
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      "Delivery: Free",
      `Total: ${formatPrice(subtotal)}`,
      "",
      "Please confirm availability and delivery.",
    ].filter((l) => l !== undefined && l !== null).join("\n");
    return encodeURIComponent(lines);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    window.open(`https://wa.me/447310613403?text=${buildMessage()}`, "_blank");
    setOrderSuccess(true);
    clearCart();
  };

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = search || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [search, cartOpen]);

  if (cart.length === 0 && !orderSuccess) {
    return (
      <>
        <Header path="/order" openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
        <SearchOverlay open={search} close={closeSearch} />
        <main className="page-main">
          <div className="empty-cart content-shell" style={{ padding: "6rem 2rem" }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 400, marginBottom: "1rem" }}>
              Your cart is empty
            </h2>
            <p>Add some pieces to your cart before placing an order.</p>
            <NavLink href="/furniture" className="action action-dark" style={{ marginTop: "1.5rem" }}>
              Explore Furniture
            </NavLink>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (orderSuccess) {
    return (
      <>
        <Header path="/order" openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
        <SearchOverlay open={search} close={closeSearch} />
        <main className="page-main">
          <div className="order-success content-shell">
            <div className="order-success-icon">
              <Icon name="check" />
            </div>
            <span className="eyebrow">Thank You</span>
            <h1>Order Request Sent</h1>
            <p>
              Thank you for choosing OAK &amp; HAVEN. Your order details have been sent to our team. We will contact you
              shortly to confirm availability and delivery.
            </p>
            <div className="order-success-checklist">
              <div className="success-check-item">
                <Icon name="check" />
                <span>Order request received</span>
              </div>
              <div className="success-check-item">
                <Icon name="check" />
                <span>Team will confirm within a few hours</span>
              </div>
              <div className="success-check-item">
                <Icon name="check" />
                <span>Delivery details to follow</span>
              </div>
            </div>
            <div className="order-success-actions">
              <button className="action action-dark" onClick={() => { setOrderSuccess(false); navigate("/furniture"); }}>
                Continue Shopping
              </button>
              <NavLink href="/" className="action action-outline">
                Back to Home
              </NavLink>
            </div>
            <p className="order-success-note">
              Need help? <a href="https://wa.me/447310613403" style={{ textDecoration: "underline" }}>
                Contact us on WhatsApp
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header path="/order" openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
      <SearchOverlay open={search} close={closeSearch} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={() => {}}
        onRemove={() => {}}
        onViewCart={() => navigate("/cart")}
        onOrder={() => navigate("/order")}
      />
      {toast.visible && <Toast message={toast.msg} onView={() => navigate("/cart")} onClose={hideToast} />}
      <main className="page-main">
        <section className="order-page content-shell">
          <div className="order-layout">
            <div>
              <div className="order-form-head">
                <span className="eyebrow">Almost there</span>
                <h1>Complete Your Order</h1>
                <p>
                  Enter your details and send your order directly to OAK &amp; HAVEN. We will confirm availability and
                  delivery promptly.
                </p>
              </div>
              <form className="order-form" onSubmit={handleSubmit} noValidate>
                <div className="field-row">
                  <div className="order-field">
                    <label htmlFor="ord-name">Full Name *</label>
                    <input
                      id="ord-name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={fieldErrors.name ? "error" : ""}
                    />
                    {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                  </div>
                  <div className="order-field">
                    <label htmlFor="ord-phone">Phone Number *</label>
                    <input
                      id="ord-phone"
                      type="tel"
                      placeholder="+92 300 000 0000"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={fieldErrors.phone ? "error" : ""}
                    />
                    {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
                  </div>
                </div>
                <div className="field-row">
                  <div className="order-field">
                    <label htmlFor="ord-wa">WhatsApp Number</label>
                    <input
                      id="ord-wa"
                      type="tel"
                      placeholder="If different from phone"
                      value={form.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                    />
                  </div>
                  <div className="order-field">
                    <label htmlFor="ord-city">City *</label>
                    <input
                      id="ord-city"
                      placeholder="e.g. Lahore, Karachi"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={fieldErrors.city ? "error" : ""}
                    />
                    {fieldErrors.city && <span className="field-error">{fieldErrors.city}</span>}
                  </div>
                </div>
                <div className="order-field">
                  <label htmlFor="ord-address">Delivery Address *</label>
                  <textarea
                    id="ord-address"
                    placeholder="House no., street, area, city"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    className={fieldErrors.address ? "error" : ""}
                  />
                  {fieldErrors.address && <span className="field-error">{fieldErrors.address}</span>}
                </div>
                <div className="field-row">
                  <div className="order-field">
                    <label htmlFor="ord-time">Preferred Delivery Time</label>
                    <input
                      id="ord-time"
                      placeholder="e.g. Weekday mornings"
                      value={form.deliveryTime}
                      onChange={(e) => update("deliveryTime", e.target.value)}
                    />
                  </div>
                  <div className="order-field">
                    <label htmlFor="ord-notes">Additional Notes</label>
                    <input
                      id="ord-notes"
                      placeholder="Anything else we should know?"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                    />
                  </div>
                </div>
                <div className="order-form-actions">
                  <button type="submit" className="action action-dark">
                    <Icon name="whatsapp" /> Confirm &amp; Send to WhatsApp
                  </button>
                  <NavLink href="/cart" className="action action-outline">
                    Back to Cart
                  </NavLink>
                </div>
              </form>
            </div>
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              {cart.map((item) => (
                <div className="order-item" key={item.id}>
                  <div className="order-item-img">
                    <img src={item.color.image || item.product.variants[0].image} alt={item.product.name} />
                  </div>
                  <div className="order-item-info">
                    <span className="order-item-name">{item.product.name}</span>
                    <span className="order-item-variant">
                      {item.size.label} · {item.color.name} · Qty {item.quantity}
                    </span>
                    <span className="order-item-price">{formatPrice(item.size.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
              <div className="summary-rows" style={{ marginTop: ".5rem" }}>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span style={{ color: "#647458" }}>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
