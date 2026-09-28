"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Icon from "./Icon";
import Navigation from "./Navigation";
import { createGeneralWhatsAppLink } from "../utils/whatsapp";

function Header({
  path,
  openSearch,
}: {
  path: string;
  openSearch: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const transparent = path === "/" && !scrolled;

  const navItems = [
    { href: "/furniture?sort=newest", label: "New Arrivals" },
    { href: "/furniture", label: "Furniture" },
    { href: "/furniture/bedroom", label: "Bedroom" },
    { href: "/furniture/living-room", label: "Living" },
    { href: "/furniture/dining", label: "Dining" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header
        className={`site-header ${transparent ? "header-overlay" : "header-solid"}`}
      >
        <NavLink href="/" className="header-logo">
          <Logo light={transparent} />
        </NavLink>
        <Navigation items={navItems} />
        <div className="header-tools">
          <button className="tool-button search-label" onClick={openSearch}>
            <Icon name="search" />
            <span>Search</span>
          </button>
          <button
            className="tool-button desktop-tool"
            aria-label="Saved pieces"
          >
            <Icon name="heart" />
          </button>
          <a
            className="tool-button desktop-tool"
            aria-label="WhatsApp"
            href={createGeneralWhatsAppLink()}
          >
            <Icon name="whatsapp" />
          </a>
          <button
            className="tool-button menu-button"
            aria-label="Open menu"
            onClick={() => setMenu(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>
      <div
        className={`mobile-menu ${menu ? "is-open" : ""}`}
        aria-hidden={!menu}
      >
        <div className="mobile-menu-top">
          <Logo />
          <button
            className="tool-button"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        <nav>
          {[
            ["/furniture?sort=newest", "New Arrivals"],
            ["/furniture", "All Furniture"],
            ["/furniture/bedroom", "Bedroom"],
            ["/furniture/living-room", "Living Room"],
            ["/furniture/dining", "Dining"],
            ["/about", "Our Story"],
            ["/contact", "Contact"],
          ].map(([href, label], index) => (
            <NavLink href={href} onClick={() => setMenu(false)} key={href}>
              <span>0{index + 1}</span>
              {label}
              <Icon name="arrow" />
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <p>Furniture for beautiful living.</p>
          <a href={createGeneralWhatsAppLink()}>
            <Icon name="whatsapp" /> WhatsApp us
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
