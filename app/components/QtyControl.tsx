"use client";

import Icon from "./Icon";

function QtyControl({ qty, onChange }: { qty: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center gap-2 p-1 border border-[rgba(33,26,22,0.15)] bg-[#f7f3ec]">
      <button onClick={() => onChange(Math.max(1, qty - 1))} aria-label="Decrease" disabled={qty <= 1} className="grid place-items-center w-6 h-6 p-0 border-0 bg-transparent cursor-pointer text-[#211a16] disabled:opacity-30 disabled:cursor-not-allowed">
        <Icon name="minus" />
      </button>
      <span className="min-w-[1.2rem] text-center text-[0.75rem] font-semibold">{qty}</span>
      <button onClick={() => onChange(qty + 1)} aria-label="Increase" className="grid place-items-center w-6 h-6 p-0 border-0 bg-transparent cursor-pointer text-[#211a16]">
        <Icon name="plus" />
      </button>
    </div>
  );
}

export default QtyControl;
