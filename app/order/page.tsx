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
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { formatPrice } from "../utils/formatPrice";

export default function OrderPage() {
  const { cart, cartCount, clearCart, toast, hideToast } = useCart();
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.size.price * item.quantity,
    0,
  );
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
    if (!form.address.trim())
      errs.address = "Please enter your delivery address.";
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
      ...cart.map((item, i) =>
        [
          `${i + 1}. ${item.product.name}`,
          `   Size: ${item.size.label}`,
          `   Color: ${item.color.name}`,
          `   Quantity: ${item.quantity}`,
          `   Price: ${formatPrice(item.size.price * item.quantity)}`,
        ].join("\n"),
      ),
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      "Delivery: Free",
      `Total: ${formatPrice(subtotal)}`,
      "",
      "Please confirm availability and delivery.",
    ]
      .filter((l) => l !== undefined && l !== null)
      .join("\n");
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [search, cartOpen]);

  if (cart.length === 0 && !orderSuccess) {
    return (
      <>
        <Header
          path="/order"
          openSearch={openSearch}
          cartCount={cartCount}
          openCart={() => setCartOpen(true)}
        />
        <SearchOverlay open={search} close={closeSearch} />
        <main className="page-main">
          <div className="content-shell px-8 py-24">
            <h2 className="font-serif text-[2.5rem] font-normal mb-4">
              Your cart is empty
            </h2>
            <p>Add some pieces to your cart before placing an order.</p>
            <NavLink href="/furniture" className="action action-dark mt-6">
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
        <Header
          path="/order"
          openSearch={openSearch}
          cartCount={cartCount}
          openCart={() => setCartOpen(true)}
        />
        <SearchOverlay open={search} close={closeSearch} />
        <main className="page-main">
          <div className="flex flex-col items-center text-center p-24 content-shell">
            <div className="grid place-items-center w-16 h-16 mb-8 bg-[#22c55e] text-white rounded-full">
              <Icon name="check" className="w-8 h-8" />
            </div>
            <span className="eyebrow">Thank You</span>
            <h1>Order Request Sent</h1>
            <p>
              Thank you for choosing OAK &amp; HAVEN. Your order details have
              been sent to our team. We will contact you shortly to confirm
              availability and delivery.
            </p>
            <div className="flex flex-col gap-2 my-8 text-left">
              <div className="flex items-center gap-2 text-[0.75rem]">
                <Icon name="check" className="w-4 h-4 text-[#22c55e]" />
                <span>Order request received</span>
              </div>
              <div className="flex items-center gap-2 text-[0.75rem]">
                <Icon name="check" className="w-4 h-4 text-[#22c55e]" />
                <span>Team will confirm within a few hours</span>
              </div>
              <div className="flex items-center gap-2 text-[0.75rem]">
                <Icon name="check" className="w-4 h-4 text-[#22c55e]" />
                <span>Delivery details to follow</span>
              </div>
            </div>
            <div className="grid gap-2 my-8">
              <button
                className="action action-dark"
                onClick={() => {
                  setOrderSuccess(false);
                  navigate("/furniture");
                }}
              >
                Continue Shopping
              </button>
              <NavLink href="/" className="action action-outline">
                Back to Home
              </NavLink>
            </div>
            <p className="text-[#a69a8d] text-[0.7rem]">
              Need help?{" "}
              <a href="https://wa.me/447310613403" className="underline">
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
      <Header
        path="/order"
        openSearch={openSearch}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
      />
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
      {toast.visible && (
        <Toast
          message={toast.msg}
          onView={() => navigate("/cart")}
          onClose={hideToast}
          visible={toast.visible}
        />
      )}
      <main className="page-main">
        <section className="content-shell">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
            <div>
              <div className="mb-8">
                <span className="eyebrow">Almost there</span>
                <h1>Complete Your Order</h1>
                <p>
                  Enter your details and send your order directly to OAK &amp;
                  HAVEN. We will confirm availability and delivery promptly.
                </p>
              </div>
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    id="ord-name"
                    label="Full Name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    error={fieldErrors.name}
                    required
                  />
                  <Input
                    id="ord-phone"
                    type="tel"
                    label="Phone Number"
                    placeholder="+44 0000 00000 0"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    error={fieldErrors.phone}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    id="ord-wa"
                    type="tel"
                    label="WhatsApp Number"
                    placeholder="If different from phone"
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                  />
                  <Input
                    id="ord-city"
                    label="City"
                    placeholder="e.g. London, Manchester"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    error={fieldErrors.city}
                    required
                  />
                </div>
                <Textarea
                  id="ord-address"
                  label="Delivery Address"
                  placeholder="House no., street, area, city"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  error={fieldErrors.address}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    id="ord-time"
                    label="Preferred Delivery Time"
                    placeholder="e.g. Weekday mornings"
                    value={form.deliveryTime}
                    onChange={(e) => update("deliveryTime", e.target.value)}
                  />
                  <Input
                    id="ord-notes"
                    label="Additional Notes"
                    placeholder="Anything else we should know?"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                  />
                </div>
                <div className="grid gap-2 mt-4">
                  <button type="submit" className="action action-dark">
                    <Icon name="whatsapp" /> Confirm &amp; Send to WhatsApp
                  </button>
                  <NavLink href="/cart" className="action action-outline">
                    Back to Cart
                  </NavLink>
                </div>
              </form>
            </div>
            <div className="p-6 bg-[#efe8de] sticky top-32 lg:sticky lg:top-32">
              <h2 className="m-0 mb-4 font-serif text-[1.3rem] font-medium">
                Order Summary
              </h2>
              {cart.map((item) => (
                <div
                  className="grid grid-cols-[4rem_1fr] gap-4 py-3 border-b border-[rgba(33,26,22,0.15)]"
                  key={item.id}
                >
                  <div className="aspect-square overflow-hidden bg-white rounded-lg">
                    <img
                      src={item.color.image || item.product.variants[0].image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-serif text-[0.85rem] font-medium">
                      {item.product.name}
                    </span>
                    <span className="text-[0.6rem] text-[#a69a8d]">
                      {item.size.label} · {item.color.name} · Qty{" "}
                      {item.quantity}
                    </span>
                    <span className="text-[0.75rem] font-semibold">
                      {formatPrice(item.size.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2 py-4 mt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-[#647458]">Free</span>
                </div>
                <div className="flex justify-between pt-2 mt-1 font-semibold text-[0.9rem]">
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
