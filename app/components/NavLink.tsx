import Link from "next/link";
import { ReactNode } from "react";

function NavLink({ href, children, onClick, className = "" }: { href: string; children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default NavLink;