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

const H1 =
  "m-0 font-(family-name:--serif) text-4xl font-light leading-[1.05] tracking-tight text-(--espresso) md:text-6xl";
const SECTION_TITLE =
  "mb-6 font-(family-name:--serif) text-xl font-light text-(--espresso)";
const RULE = "block h-px w-12 bg-(--gold)";

export default function OrderPage() {
  const { cart, cartCount, isLoaded, clearCart, toast, hideToast } = useCart();
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
    address: "",
    notes: "",
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
      `Delivery Address: ${form.address}`,

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
          isLoaded={isLoaded}
        />
        <SearchOverlay open={search} close={closeSearch} />
        <main className="page-main bg-(--ivory)">
          <div className="content-shell px-8 py-28">
            <span aria-hidden="true" className={`${RULE} mb-8`} />
            <h2 className={H1}>Your cart is empty</h2>
            <p className="mt-6 max-w-md text-[#74685f]">
              Add a piece to your cart before placing an order.
            </p>
            <NavLink href="/furniture" className="action action-dark mt-10">
              Explore furniture
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
          isLoaded={isLoaded}
        />
        <SearchOverlay open={search} close={closeSearch} />
        <main className="page-main bg-(--ivory)">
          <div className="content-shell flex flex-col items-center px-8 py-24 text-center md:py-32">
            <div className="mb-10 grid h-16 w-16 place-items-center rounded-full border border-(--gold) text-(--espresso)">
              <Icon name="check" className="h-7 w-7" />
            </div>
            <h1 className={H1}>Order request sent</h1>
            <p className="mx-auto mt-6 max-w-lg text-[#74685f]">
              Thank you for choosing OAK &amp; HAVEN. Your order details have
              been sent to our team. We will contact you shortly to confirm
              availability and delivery.
            </p>

            <ul className="m-0 my-10 flex list-none flex-col gap-3 border-y border-(--line) p-0 py-8 text-left">
              {[
                "Order request received",
                "Team will confirm within a few hours",
                "Delivery details to follow",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-sm tracking-wide text-(--espresso)"
                >
                  <Icon name="check" className="h-4 w-4 text-(--gold)" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="grid gap-3">
              <button
                className="action action-dark"
                onClick={() => {
                  setOrderSuccess(false);
                  navigate("/furniture");
                }}
              >
                Continue shopping
              </button>
              <NavLink href="/" className="action action-outline">
                Back to home
              </NavLink>
            </div>
            <p className="mt-10 text-sm text-[#a69a8d]">
              Need help?{" "}
              <a
                href="https://wa.me/447310613403"
                className="underline underline-offset-4"
              >
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
        isLoaded={isLoaded}
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
        isLoaded={isLoaded}
      />
      {toast.visible && (
        <Toast
          message={toast.msg}
          onView={() => navigate("/cart")}
          onClose={hideToast}
          visible={toast.visible}
        />
      )}
      <main className="page-main bg-(--ivory)">
        <section className="content-shell">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <div className="my-10 md:my-14">
                <span aria-hidden="true" className={`${RULE} mb-8`} />
                <h1 className={H1}>Complete your order</h1>
                <p className="mt-6 max-w-md text-[#74685f]">
                  Enter your details and send your order directly to OAK &amp;
                  HAVEN. We will confirm availability and delivery promptly.
                </p>
              </div>

              <form
                className="border-t border-(--line) pt-10"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="mb-12">
                  <h3 className={SECTION_TITLE}>Contact information</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                </div>

                <div className="mb-12">
                  <h3 className={SECTION_TITLE}>Delivery details</h3>
                  <Textarea
                    id="ord-address"
                    label="Delivery Address"
                    placeholder="House no., street, area, city"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    error={fieldErrors.address}
                    required
                  />
                </div>

                <div className="mb-12">
                  <h3 className={SECTION_TITLE}>Additional information</h3>
                  <Input
                    id="ord-notes"
                    label="Additional Notes"
                    placeholder="Anything else we should know?"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                  />
                </div>

                <div className="grid gap-3 border-t border-(--line) pt-8">
                  <button
                    type="submit"
                    className="action action-dark w-full justify-center"
                  >
                    <Icon name="whatsapp" /> Confirm &amp; send to WhatsApp
                  </button>
                  <NavLink
                    href="/cart"
                    className="action action-outline w-full justify-center"
                  >
                    Back to cart
                  </NavLink>
                </div>
              </form>
            </div>

            {/* Summary: flat panel with a single gold top rule */}
            <aside
              aria-label="Order summary"
              className="border-t border-(--gold) bg-[#efe8de] p-8 lg:sticky lg:top-32"
            >
              <h2 className="m-0 mb-6 font-(family-name:--serif) text-2xl font-light text-(--espresso)">
                Order summary
              </h2>
              {cart.map((item) => (
                <div
                  className="grid grid-cols-[8rem_1fr] gap-5 border-b border-(--line) py-5"
                  key={item.id}
                >
                  <div className="aspect-square overflow-hidden bg-(--ivory)">
                    <img
                      src={item.color.image || item.product.variants[0].image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-(family-name:--serif) text-base font-light text-(--espresso)">
                      {item.product.name}
                    </span>
                    <span className="text-xs tracking-wide text-[#74685f]">
                      {item.size.label} · {item.color.name} · Qty{" "}
                      {item.quantity}
                    </span>
                    <span className="text-sm text-(--espresso)">
                      {formatPrice(item.size.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-2 flex flex-col gap-3 py-5 text-sm tracking-wide text-[#74685f]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-(--espresso)">Free</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-(--espresso) pt-4 text-(--espresso)">
                  <span className="font-(family-name:--serif) text-xl font-light">
                    Total
                  </span>
                  <span className="text-lg">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}