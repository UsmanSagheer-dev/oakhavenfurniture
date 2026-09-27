import { ReactNode } from "react";

function SectionTitle({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-title align-${align}`}>
      {eyebrow && <span className="eyebrow1">{eyebrow}</span>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export default SectionTitle;
