function Logo({ light = false }: { light?: boolean }) {
  return <span className={`logo ${light ? "logo-light" : ""}`}><strong>OAK &amp; HAVEN</strong><small>FURNITURE</small></span>;
}

export default Logo;