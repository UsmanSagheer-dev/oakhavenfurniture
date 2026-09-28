"use client";

import { useState } from "react";
import NavLink from "../components/NavLink";
import TrustStrip from "../components/TrustStrip";
import { images } from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";

export default function AboutPage() {
  const [search, setSearch] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);
  return (
    <>
      <Header path="/about" openSearch={openSearch} />
      <SearchOverlay open={search} close={closeSearch} />
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