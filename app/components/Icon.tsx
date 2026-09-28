import { Search, Heart, Menu, X, ArrowRight, MessageCircle, Phone, Filter, ChevronDown } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

function Icon({ name, className }: { name: "search" | "heart" | "menu" | "close" | "arrow" | "whatsapp" | "phone" | "filter" | "chevron" | "instagram" | "facebook"; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    search: <Search className={className} />,
    heart: <Heart className={className} />,
    menu: <Menu className={className} />,
    close: <X className={className} />,
    arrow: <ArrowRight className={className} />,
    whatsapp: <MessageCircle className={className} />,
    phone: <Phone className={className} />,
    filter: <Filter className={className} />,
    chevron: <ChevronDown className={className} />,
    instagram: <FaInstagram className={className} />,
    facebook: <FaFacebookF className={className} />,
  };

  return icons[name] || null;
}

export default Icon;