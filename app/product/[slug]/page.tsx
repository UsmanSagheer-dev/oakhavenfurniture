"use client";

import { useState, useEffect, use } from "react";
import { products, images } from "../../data/products";
import NavLink from "../../components/NavLink";
import Action from "../../components/Action";
import Icon from "../../components/Icon";
import SectionTitle from "../../components/SectionTitle";
import ProductCard from "../../components/ProductCard";
import { formatPrice } from "../../utils/formatPrice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchOverlay from "../../components/SearchOverlay";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((item) => item.slug === slug) || products[0];
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [activeImage, setActiveImage] = useState(selectedVariant.image);
  const [viewer, setViewer] = useState(false);
  const [search, setSearch] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);
  useEffect(() => setActiveImage(selectedVariant.image), [selectedVariant]);
  const message = encodeURIComponent(
    `Assalam o Alaikum, I'm interested in the ${product.name} (${selectedVariant.size}) listed on OAK & HAVEN FURNITURE for ${formatPrice(selectedVariant.price)}. Please share availability and delivery details.`,
  );
  const whatsapp = `https://wa.me/923001234567?text=${message}`;
  return (
    <>
      <Header path={`/product/${slug}`} openSearch={openSearch} />
      <SearchOverlay open={search} close={closeSearch} />
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
          <div className="detail-actions">
            <Action href={whatsapp}>
              <Icon name="whatsapp" /> Order / Inquire on WhatsApp
            </Action>
            <Action href="tel:+923001234567" variant="outline">
              <Icon name="phone" /> Call us
            </Action>
          </div>
          <p className="help-note">
            Have a question about this piece? Our team is happy to help.
          </p>
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
        <a href={whatsapp}>
          Confirm your location <Icon name="arrow" />
        </a>
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
        <a href={whatsapp}>
          <Icon name="whatsapp" /> WhatsApp
        </a>
        <a href="tel:+923001234567">
          <Icon name="phone" /> Call
        </a>
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