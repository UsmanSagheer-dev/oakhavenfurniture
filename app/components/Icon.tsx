import { ReactNode } from "react";

function Icon({ name }: { name: "search" | "heart" | "menu" | "close" | "arrow" | "whatsapp" | "phone" | "filter" | "chevron" | "instagram" | "facebook" }) {
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M3 7h18M3 17h18" /></>,
    close: <><path d="m5 5 14 14M19 5 5 19" /></>,
    arrow: <><path d="M4 12h15M14 7l5 5-5 5" /></>,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="M8.5 7.5c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.7 2.2 3 2.8.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.5.2.5.4.1.8-.4 1.7-1 2.1-.7.5-1.7.7-2.7.4-1.1-.3-2.5-.8-4.1-2.2-1.3-1.2-2.3-2.7-2.7-3.8-.4-1.2 0-2.4.4-2.9.2 0 .5-.1.8-.1Z" /></>,
    phone: <path d="M6.6 3h3l1.2 5-2 1.2c1 2.1 2.8 3.9 4.9 4.9l1.2-2 5 1.2v3c0 2-1.7 3.7-3.7 3.7C9.4 20 4 14.6 4 7.7 4 5.1 5.2 3 6.6 3Z" />,
    filter: <><path d="M4 7h16M7 12h10M10 17h4" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.7 1.8-1.7H18V3.8c-.4-.1-1.7-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.5V10H8v3h2.8v8H14Z" />,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default Icon;