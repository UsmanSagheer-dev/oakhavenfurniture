"use client";

import { useState, useEffect } from "react";
import Action from "../components/Action";
import Icon from "../components/Icon";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import { useCart } from "../context/CartContext";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);
  const submit = (event: React.FormEvent) => { event.preventDefault(); setSent(true); };

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
      <Header path="/contact" openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
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
      <main className="page-main contact-page">
    <section className="contact-intro content-shell"><div><span className="eyebrow">We are here to help</span><h1>Let's find your<br /><em>next piece.</em></h1><p>Questions about a product, delivery or availability? Speak directly with our team.</p><div className="contact-actions"><Action href="https://wa.me/447310613403"><Icon name="whatsapp" /> WhatsApp us</Action><Action href="tel:+447310613403" variant="outline"><Icon name="phone" /> Call us</Action></div></div><dl><div><dt>WhatsApp &amp; Phone</dt><dd>+92 300 123 4567</dd></div><div><dt>Business hours</dt><dd>Monday–Saturday<br />10:00 AM–8:00 PM</dd></div><div><dt>Social</dt><dd>Instagram<br />Facebook Marketplace</dd></div><div><dt>Location</dt><dd>Pakistan<br />Delivery subject to location</dd></div></dl></section>
    <section className="contact-form-wrap content-shell"><div><span className="eyebrow">Send an enquiry</span><h2>Tell us what you're looking for.</h2></div>{sent ? <div className="form-success"><span>Thank you</span><p>Your enquiry has been noted. For the quickest reply, contact us on WhatsApp.</p></div> : <form onSubmit={submit}><label>Your name<input required placeholder="Enter your name" /></label><label>Phone number<input required placeholder="+92" /></label><label>Email address<input type="email" placeholder="you@example.com" /></label><label>How can we help?<textarea required placeholder="Tell us about the piece you're interested in" /></label><Action>Send enquiry <Icon name="arrow" /></Action></form>}</section>
  </main>
  <Footer />
  </>
  );
}