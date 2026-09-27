import { ReactNode } from "react";

function Action({ children, href, variant = "dark", onClick, className = "" }: { children: ReactNode; href?: string; variant?: "dark" | "light" | "outline" | "text"; onClick?: () => void; className?: string }) {
  const classes = `action action-${variant} ${className}`;
  if (href) return <a className={classes} href={href} onClick={onClick}>{children}</a>;
  return <button className={classes} onClick={onClick}>{children}</button>;
}

export default Action;