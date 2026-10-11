import { ReactNode } from "react";

const baseClasses = "inline-flex items-center justify-center gap-[0.7rem] min-h-[3.5rem] px-[1.7rem] border border-transparent rounded-none cursor-pointer text-[0.62rem] font-semibold tracking-[0.13em] leading-[1.2] uppercase transition-all duration-300 hover:-translate-y-0.5";

const variantClasses = {
  dark: "bg-[--espresso] text-[--white]",
  light: "bg-[--ivory] text-[--espresso]",
  outline: "bg-transparent border-[--line] text-[--espresso]",
  text: "p-0 min-h-auto",
};

function Action({ children, href, variant = "dark", onClick, className = "" }: { children: ReactNode; href?: string; variant?: "dark" | "light" | "outline" | "text"; onClick?: () => void; className?: string }) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  if (href) return <a className={classes} href={href} onClick={onClick}>{children}</a>;
  return <button className={classes} onClick={onClick}>{children}</button>;
}

export default Action;