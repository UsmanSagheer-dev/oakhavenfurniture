"use client";

import { useState, useEffect, use } from "react";
import { products, images, productColors, cartItemId, Product, SizeOption, ColorOption, CartItem } from "../../data/products";
import NavLink from "../../components/NavLink";
import Action from "../../components/Action";
import Icon from "../../components/Icon";
import SectionTitle from "../../components/SectionTitle";
import ProductCard from "../../components/ProductCard";
import { formatPrice } from "../../utils/formatPrice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchOverlay from "../../components/SearchOverlay";
import CartDrawer from "../../components/CartDrawer";
import Toast from "../../components/Toast";
import { useCart } from "../../context/CartContext";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((item) => item.slug === slug) || products[0];
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [activeImage, setActiveImage] = useState(selectedVariant.image);
  const [viewer, setViewer] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  const { cart, cartCount, addToCart, updateQty, removeItem, toast, hideToast } = useCart();

  const colors: ColorOption[] = productColors[product.slug] || [{ name: "Natural Oak", hex: "#C4A882", image: product.variants[0].image }];
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setActiveImage(selectedVariant.image);
    setSelectedColor(null);
    setQty(1);
    setAdded(false);
    setErrors([]);
  }, [product, selectedVariant]);

  const unitPrice = selectedVariant.price;
  const subtotal = unitPrice * qty;

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
    if (color.image) setActiveImage(color.image);
  };

  const handleAddToCart = () => {
    const errs: string[] = [];
    if (!selectedColor) errs.push("color");
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    const item: CartItem = {
      id: cartItemId(product.slug, selectedVariant.size, selectedColor!.name),
      product,
      size: { label: selectedVariant.size, price: selectedVariant.price },
      color: selectedColor!,
      quantity: qty,
    };
    addToCart(item);
    setAdded(true);
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

  return (
    <>
      <Header path={`/product/${slug}`} openSearch={openSearch} cartCount={cartCount} openCart={() => setCartOpen(true)} />
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
      <main className="product-page page-main">
      <div className="product-breadcrumb content-shell">
        <NavLink href="/">Home</NavLink>
        <span>/</span>
        <NavLink href="/furniture">Furniture</NavLink>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <section className="product-layout content-shell">
        <div className="gallery">
          <div className="gallery-main" onClick={() => setViewer(true)}>
            <img src={activeImage} alt={product.category} />
            <span>Click to expand</span>
          </div>
          <div className="thumbnails">
            {selectedVariant.thirdImage ? (
              <>
                <button
                  className={activeImage === selectedVariant.image ? "active" : ""}
                  onClick={() => setActiveImage(selectedVariant.image)}
                >
                  <img src={selectedVariant.image} alt={`${selectedVariant.size} - Main view`} />
                  {/* <span>{selectedVariant.size}</span> */}
                </button>
                <button
                  className={activeImage === selectedVariant.altImage ? "active" : ""}
                  onClick={() => setActiveImage(selectedVariant.altImage)}
                >
                  <img src={selectedVariant.altImage} alt={`${selectedVariant.size} - Alternate view`} />
                  {/* <span>Alt</span> */}
                </button>
                <button
                  className={activeImage === selectedVariant.thirdImage ? "active" : ""}
                  onClick={() => selectedVariant.thirdImage && setActiveImage(selectedVariant.thirdImage)}
                >
                  <img src={selectedVariant.thirdImage || selectedVariant.image} alt={`${selectedVariant.size} - Third view`} />
                  {/* <span>3rd</span> */}
                </button>
              </>
            ) : (
              <>
                <button
                  className={activeImage === selectedVariant.image ? "active" : ""}
                  onClick={() => setActiveImage(selectedVariant.image)}
                >
                  <img src={selectedVariant.image} alt={`${selectedVariant.size} - Main view`} />
                  <span>{selectedVariant.size}</span>
                </button>
                <button
                  className={activeImage === selectedVariant.altImage ? "active" : ""}
                  onClick={() => setActiveImage(selectedVariant.altImage)}
                >
                  <img src={selectedVariant.altImage} alt={`${selectedVariant.size} - Alternate view`} />
                  <span>Alt</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="product-detail">
          <span className="eyebrow">{product.category} Collection</span>
          <h1>{product.name}</h1>
          <p className="product-price">{formatPrice(selectedVariant.price)}</p>
          <div className="availability">
            <span>
              <i /> Available
            </span>
            <span>Free home delivery*</span>
          </div>
          {product.variants.length > 1 && (
            <div className="size-selector">
              <label>Select Size:</label>
              <div className="size-options">
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
                    className={selectedVariant.size === variant.size ? "active" : ""}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <img src={variant.image} alt={variant.size} />
                    <span>{variant.size}</span>
                    <small>{formatPrice(variant.price)}</small>
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="product-description">{product.description}</p>

          {/* Color Selector */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2 text-[0.63rem] font-semibold tracking-widest uppercase text-[#211a16]">
              <span>Select Color</span>
              {selectedColor && <em className="text-[#a69a8d] font-normal text-[0.6rem]">{selectedColor.name}</em>}
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`flex flex-col items-center gap-1 p-0 border-2 bg-transparent cursor-pointer transition-colors ${selectedColor?.name === color.name ? "border-[#211a16]" : "border-transparent hover:border-[rgba(33,26,22,0.15)]"}`}
                  onClick={() => handleColorSelect(color)}
                  title={color.name}
                >
                  <div className="w-8 h-8 rounded-full border border-black/10" style={{ background: color.hex }} />
                  <span className="text-[0.65rem]">{color.name}</span>
                </button>
              ))}
            </div>
            {errors.includes("color") && <p className="mt-2 text-[#b91c1c] text-[0.65rem]">Please select a color to continue.</p>}
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <div className="text-[0.63rem] font-semibold tracking-widest uppercase text-[#211a16] mb-2"><span>Quantity</span></div>
            <div className="inline-flex items-center gap-2 p-1 border border-[rgba(33,26,22,0.15)] bg-[#f7f3ec]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} aria-label="Decrease quantity" className="grid place-items-center w-6 h-6 p-0 border-0 bg-transparent cursor-pointer text-[#211a16] disabled:opacity-30 disabled:cursor-not-allowed">
                <Icon name="minus" />
              </button>
              <span className="min-w-[1.2rem] text-center text-[0.75rem] font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="grid place-items-center w-6 h-6 p-0 border-0 bg-transparent cursor-pointer text-[#211a16]">
                <Icon name="plus" />
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-6 p-4 bg-[#efe8de]">
            <div className="flex justify-between py-1 text-[0.7rem]"><span>Unit Price</span><span>{formatPrice(unitPrice)}</span></div>
            <div className="flex justify-between py-1 text-[0.7rem]"><span>Quantity</span><span>× {qty}</span></div>
            <div className="flex justify-between py-1 text-[0.7rem]"><span>Delivery</span><span>Free</span></div>
            <div className="flex justify-between py-1 mt-1 pt-2 border-t border-[rgba(33,26,22,0.15)] font-semibold text-[0.8rem]"><span>Total</span><span>{formatPrice(subtotal)}</span></div>
          </div>

          {/* Actions */}
          {!added ? (
            <div className="grid gap-2 mb-3">
              <button className="action action-dark" onClick={handleAddToCart}>
                <Icon name="bag" /> Add to Cart
              </button>
              <a className="action action-whatsapp" href={`https://wa.me/447310613403?text=${encodeURIComponent(`Assalam o Alaikum, I'm interested in the ${product.name} (${selectedVariant.size}) listed on OAK & HAVEN FURNITURE for ${formatPrice(selectedVariant.price)}. Please share availability and delivery details.`)}`}>
                <Icon name="whatsapp" /> Order on WhatsApp
              </a>
            </div>
          ) : (
            <div className="my-4  p-4 bg-[#f0fdf4] border border-[#86efac]">
              <div className="flex items-center gap-2 mb-4 text-[0.75rem] text-[#166534]">
                <span className="grid place-items-center w-5 h-5 bg-[#22c55e] text-white rounded-full">
                  <Icon name="check" className="w-3.5 h-3.5" />
                </span>
                {product.name} added to your cart.
              </div>
              <div className="grid gap-2">
                <NavLink href="/cart" className="action action-dark">
                  <Icon name="bag" /> View Cart
                </NavLink>
                <NavLink href="/furniture" className="action action-outline">
                  Continue Shopping
                </NavLink>
              </div>
            </div>
          )}

          <div className="detail-actions">
            {/* <Action href="tel:+447310613403" variant="outline">
              <Icon name="phone" /> Call us
            </Action> */}
          </div>
          {/* <p className="help-note">
            Have a question about this piece? Our team is happy to help.
          </p> */}
          <div className="detail-notes">
            <div>
              <span>Delivery</span>
              <p>
                Available for eligible locations. Confirm your area with our
                team.
              </p>
            </div>
            <div>
              <span>Ordering</span>
              <p>Order directly through WhatsApp with personal assistance.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="specifications content-shell">
        <div>
          <span className="eyebrow">The details</span>
          <h2>Product specifications</h2>
          <p>
            Essential information to help you find the right piece for your
            home.
          </p>
        </div>
        <dl>
          {Object.entries(selectedVariant.specs || product.specs || {}).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div>
            <dt>Availability</dt>
            <dd>Available</dd>
          </div>
        </dl>
      </section>
      <section className="delivery-panel content-shell">
        <span>Delivery information</span>
        <p>
          Free home delivery is available on eligible products and locations.
          Please contact us to confirm delivery availability for your area.
        </p>
      </section>
      <section className="related content-shell">
        <SectionTitle eyebrow="Complete your space" title="You May Also Like" />
        <div className="product-grid">
          {products
            .filter((item) => item.slug !== product.slug)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
        </div>
      </section>
      <div className="sticky-mobile-actions">
        {!added ? <>
          <button className="action action-dark border-0 flex-[1.7]" onClick={handleAddToCart}>
            <Icon name="bag" /> Add to Cart
          </button>
          <a href={`https://wa.me/447310613403?text=${encodeURIComponent(`Assalam o Alaikum, I'm interested in the ${product.name} (${selectedVariant.size}) listed on OAK & HAVEN FURNITURE for ${formatPrice(selectedVariant.price)}. Please share availability and delivery details.`)}`} className="flex-1 flex items-center justify-center border border-[#211a16] text-[0.63rem] font-semibold tracking-[0.08em] uppercase gap-1">
            <Icon name="whatsapp" /> WhatsApp
          </a>
        </> : <>
          <NavLink href="/cart" className="action action-dark flex-[1.7]">
            <Icon name="bag" /> View Cart
          </NavLink>
          <NavLink href="/furniture" className="flex-1 flex items-center justify-center border border-[#211a16] text-[0.63rem] font-semibold tracking-[0.08em] uppercase">
            Continue
          </NavLink>
        </>}
      </div>
      {viewer && (
        <div className="image-viewer">
          <button onClick={() => setViewer(false)} aria-label="Close image">
            <Icon name="close" />
          </button>
          <img src={activeImage} alt={product.category} />
        </div>
      )}
    </main>
    <Footer />
    </>
  );
}