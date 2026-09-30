"use client";

import { useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Icon from "./Icon";
import { createGeneralWhatsAppLink } from "../utils/whatsapp";

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
        ["WhatsApp", createGeneralWhatsAppLink()],
        ["Call Us", "tel:+447310613403"],
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
              <a href="https://www.instagram.com/oak_and_haven_furniture?utm_source=qr&stkn=NTl1YnY1eWsyYnV4" aria-label="Instagram">
                <Icon name="instagram" />
              </a>
              <a href="https://www.facebook.com/share/19h3hEDbeo/" aria-label="Facebook">
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
          <span>United Kingdom</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
