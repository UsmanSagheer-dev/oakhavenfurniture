interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  className?: string;
}

export default function SortSelect({
  label,
  value,
  onChange,
  options,
  className = "",
}: SortSelectProps) {
  return (
    <label className={className}>
      {label}{" "}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "0.6rem 2rem 0.6rem 0.8rem",
          border: "1px solid var(--line)",
          borderRadius: "4px",
          background: "var(--white)",
          cursor: "pointer",
          fontSize: "0.7rem",
          fontWeight: "500",
          letterSpacing: "0.05em",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--espresso)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--espresso)";
          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(33, 26, 22, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
