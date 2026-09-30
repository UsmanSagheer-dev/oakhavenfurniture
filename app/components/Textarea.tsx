"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className = "", ...props }, ref) => {
    return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[0.6rem] tracking-[0.08em] uppercase font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={`min-h-16 p-2 border-0 border-b border-[rgba(33,26,22,0.15)] outline-0 bg-transparent text-[0.8rem] resize-vertical ${error ? "border-b-[#b91c1c]" : ""} ${className}`}
        {...props}
      />
      {error && <span className="text-[#b91c1c] text-[0.6rem]">{error}</span>}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
