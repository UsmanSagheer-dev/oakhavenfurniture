"use client";

import { useState } from "react";
import NavLink from "./components/NavLink";
import SectionTitle from "./components/SectionTitle";
import ProductCard from "./components/ProductCard";
import TrustStrip from "./components/TrustStrip";
import Action from "./components/Action";
import Icon from "./components/Icon";
import { images, products } from "./data/products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchOverlay from "./components/SearchOverlay";

export default function HomePage() {
  const [search, setSearch] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);
  const categories = [
    ["Bedroom", images.bedroom, "/furniture/bedroom"],
    ["Living room", images.living, "/furniture/living-room"],
    ["Dining", images.dining2, "/furniture/dining"],
    ["Tables", images.table2, "/furniture/tables"],
    ["Seating", images.chair, "/furniture/seating"],
  ];

  return (
    <>
      <Header path="/" openSearch={openSearch} />
      <SearchOverlay open={search} close={closeSearch} />
      <main>
        <section className="hero">
          <img
            src={images.hero}
            alt="Warm contemporary bedroom with oak furniture"
          />

          <div className="hero-shade" />

          <div className="hero-content">
            <span className="hero-kicker">
              OAK &amp; HAVEN · 2026 Collection
            </span>

            <h1>
              Designed for
              <br />
              <em>your space.</em>
            </h1>

            <p>
              Thoughtfully chosen furniture that brings comfort, character and
              timeless style to the way you live.
            </p>

            <div className="hero-actions">
              <NavLink href="/furniture" className="action action-light">
                Explore collection
              </NavLink>

              <NavLink href="/about" className="action action-ghost">
                Discover OAK &amp; HAVEN
              </NavLink>
            </div>
          </div>

          <div className="scroll-cue">
            <span>Scroll to explore</span>
            <i />
          </div>
        </section>

        <section className="editorial-intro content-shell">
          <div className="intro-copy">
            <span className="eyebrow1">The OAK &amp; HAVEN edit</span>

            <h2>
              Designed for the
              <br />
              <em>way you live.</em>
            </h2>

            <p>
              Discover thoughtfully selected furniture pieces that balance
              timeless design, comfort and everyday living.
            </p>

            <NavLink className="text-link" href="/about">
              Our point of view <Icon name="arrow" />
            </NavLink>
          </div>

          <div className="intro-image">
            <img
              src={images.intro}
              alt="Oak dining table in a thoughtfully composed room"
            />

            <span>
              Thoughtful forms
              <br />
              Natural materials
            </span>
          </div>
        </section>

        <section className="collections-section">
          <div className="content-shell">
            <SectionTitle
              eyebrow="Explore by room"
              title="The Collection"
              copy="Considered pieces for every part of home."
            />
          </div>

          <div className="category-rail">
            {categories.map(([name, image, href], index) => (
              <NavLink
                href={href}
                className={`category-card category-${index + 1}`}
                key={name}
              >
                <img
                  src={image}
                  alt={`${name} furniture collection`}
                />

                <span>
                  <small>0{index + 1}</small>
                  <strong>{name}</strong>
                  <Icon name="arrow" />
                </span>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="products-section content-shell">
          <div className="section-head-row">
            <SectionTitle
              eyebrow="Just in"
              title="New Arrivals"
              copy="Recently added pieces, selected for modern interiors."
            />

            <NavLink href="/furniture?sort=newest" className="text-link">
              View all new pieces <Icon name="arrow" />
            </NavLink>
          </div>

          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="banner">
          <img
            src={images.living}
            alt="Luxury living room with cream furniture"
          />

          <div className="banner-shade" />

          <div className="banner-content">
            <span className="eyebrow">A softer way to live</span>

            <h2>
              The Living
              <br />
              <em>Collection</em>
            </h2>

            <p>Spaces designed to feel like home.</p>

            <NavLink
              href="/furniture/living-room"
              className="action action-light"
            >
              Explore living
            </NavLink>
          </div>
        </section>

        <TrustStrip />

        <section className="social-section content-shell">
          <SectionTitle
            align="center"
            eyebrow="@oakandHAVEN"
            title="Follow OAK &amp; HAVEN"
            copy="Discover more furniture inspiration."
          />

          <div className="social-grid">
            {[
              images.sofa2,
              images.chair,
              images.bedSingle,
              images.table2,
              images.dining2,
              images.sofa,
            ].map((image, index) => (
              <a
                href="#"
                aria-label={`Social inspiration ${index + 1}`}
                key={image}
              >
                <img src={image} alt="" />

                <span>
                  <Icon name="instagram" />
                </span>
              </a>
            ))}
          </div>

          <div className="social-actions">
            <Action variant="outline">
              <Icon name="instagram" /> Instagram
            </Action>

            <Action variant="outline">
              <Icon name="facebook" /> Facebook
            </Action>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}