"use client";

import Icon from "./Icon";
import { createGeneralWhatsAppLink } from "../utils/whatsapp";

function FloatingWhatsApp() {
  return (
    <a
      href={createGeneralWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 grid place-items-center w-14 h-14 bg-[#25d366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <Icon name="whatsapp" className="w-7 h-7 text-white" />
    </a>
  );
}

export default FloatingWhatsApp;
