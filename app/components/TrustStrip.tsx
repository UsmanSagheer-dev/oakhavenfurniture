function TrustStrip() {
  const items = [
    ["01", "Clear product details", "Everything you need to choose with confidence."],
    ["02", "Direct WhatsApp support", "Speak with our team before you order."],
    ["03", "Home delivery", "Available for eligible pieces and locations."],
    ["04", "Easy ordering", "A personal, straightforward order experience."],
  ];
  return <section className="trust-strip">{items.map(([num, title, copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</section>;
}

export default TrustStrip;