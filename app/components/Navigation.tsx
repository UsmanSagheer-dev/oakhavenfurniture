import NavLink from "./NavLink";

type NavItem = {
  href: string;
  label: string;
};
function Navigation({ items }: { items: NavItem[] }) {
  return (
    <nav
      className="desktop-nav flex items-center gap-[clamp(1.3rem,2.4vw,2.8rem)]"
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          className="relative text-[0.69rem] font-bold tracking-[0.14em] uppercase after:absolute after:inset-auto after:right-full after:bottom-[-0.55rem] after:left-0 after:h-px after:bg-current after:transition-all after:duration-350 hover:after:right-0"
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;