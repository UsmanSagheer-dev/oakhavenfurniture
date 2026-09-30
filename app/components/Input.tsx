"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className = "", ...props }, ref) => {
    return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[0.6rem] tracking-[0.08em] uppercase font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={`p-2 border-0 border-b border-[rgba(33,26,22,0.15)] outline-0 bg-transparent text-[0.8rem] ${error ? "border-b-[#b91c1c]" : ""} ${className}`}
        {...props}
      />
      {error && <span className="text-[#b91c1c] text-[0.6rem]">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
