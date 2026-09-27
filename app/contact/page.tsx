"use client";

import { useState } from "react";
import Action from "../components/Action";
import Icon from "../components/Icon";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [search, setSearch] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);
  const submit = (event: React.FormEvent) => { event.preventDefault(); setSent(true); };
  return (
    <>
      <Header path="/contact" openSearch={openSearch} />
      <SearchOverlay open={search} close={closeSearch} />
      <main className="page-main contact-page">
    <section className="contact-intro content-shell"><div><span className="eyebrow">We are here to help</span><h1>Let's find your<br /><em>next piece.</em></h1><p>Questions about a product, delivery or availability? Speak directly with our team.</p><div className="contact-actions"><Action href="https://wa.me/923001234567"><Icon name="whatsapp" /> WhatsApp us</Action><Action href="tel:+923001234567" variant="outline"><Icon name="phone" /> Call us</Action></div></div><dl><div><dt>WhatsApp &amp; Phone</dt><dd>+92 300 123 4567</dd></div><div><dt>Business hours</dt><dd>Monday–Saturday<br />10:00 AM–8:00 PM</dd></div><div><dt>Social</dt><dd>Instagram<br />Facebook Marketplace</dd></div><div><dt>Location</dt><dd>Pakistan<br />Delivery subject to location</dd></div></dl></section>
    <section className="contact-form-wrap content-shell"><div><span className="eyebrow">Send an enquiry</span><h2>Tell us what you're looking for.</h2></div>{sent ? <div className="form-success"><span>Thank you</span><p>Your enquiry has been noted. For the quickest reply, contact us on WhatsApp.</p></div> : <form onSubmit={submit}><label>Your name<input required placeholder="Enter your name" /></label><label>Phone number<input required placeholder="+92" /></label><label>Email address<input type="email" placeholder="you@example.com" /></label><label>How can we help?<textarea required placeholder="Tell us about the piece you're interested in" /></label><Action>Send enquiry <Icon name="arrow" /></Action></form>}</section>
  </main>
  <Footer />
  </>
  );
}