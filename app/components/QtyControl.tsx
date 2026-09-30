"use client";

import Icon from "./Icon";

function QtyControl({ qty, onChange }: { qty: number; onChange: (n: number) => void }) {
  return (
    <div className="qty-mini">
      <button onClick={() => onChange(Math.max(1, qty - 1))} aria-label="Decrease" disabled={qty <= 1}>
        <Icon name="minus" />
      </button>
      <span>{qty}</span>
      <button onClick={() => onChange(qty + 1)} aria-label="Increase">
        <Icon name="plus" />
      </button>
    </div>
  );
}

export default QtyControl;
