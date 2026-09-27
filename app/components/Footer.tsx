"use client";

import { useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Icon from "./Icon";

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <section className="newsletter">
      <div>
        <span className="eyebrow">The OAK &amp; HAVEN letter</span>
        <h2>Stay inspired.</h2>
        <p>New furniture, collections and considered ideas for your home.</p>
      </div>
      {subscribed ? (
        <strong>Thank you for joining us.</strong>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            aria-label="Email address"
          />
          <button>
            Subscribe <Icon name="arrow" />
          </button>
        </form>
      )}
    </section>
  );
}

function Footer() {
  const columns = [
    [
      "Shop",
      [
        ["All Furniture", "/furniture"],
        ["New Arrivals", "/furniture?sort=newest"],
        ["Bedroom", "/furniture/bedroom"],
        ["Living", "/furniture/living-room"],
        ["Dining", "/furniture/dining"],
      ],
    ],
    [
      "About",
      [
        ["Our Story", "/about"],
        ["Contact", "/contact"],
        ["Delivery", "/contact"],
      ],
    ],
    [
      "Help",
      [
        ["WhatsApp", "https://wa.me/923001234567"],
        ["Call Us", "tel:+923001234567"],
        ["Delivery Information", "/contact"],
      ],
    ],
  ] as const;
  return (
    <>
      <Newsletter />
      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <Logo light />
            <p>Furniture for beautiful living.</p>
            <div>
              <a href="#" aria-label="Instagram">
                <Icon name="instagram" />
              </a>
              <a href="#" aria-label="Facebook">
                <Icon name="facebook" />
              </a>
            </div>
          </div>
          {columns.map(([title, links]) => (
            <div className="footer-column" key={title}>
              <span>{title}</span>
              {links.map(([label, href]) =>
                href.startsWith("/") ? (
                  <NavLink key={label} href={href}>
                    {label}
                  </NavLink>
                ) : (
                  <a key={label} href={href}>
                    {label}
                  </a>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 OAK &amp; HAVEN FURNITURE</span>
          <span>All Rights Reserved.</span>
          <span>Pakistan</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
