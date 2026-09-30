"use client";

import Icon from "./Icon";

function Toast({ message, onView, onClose, visible }: { message: string; onView: () => void; onClose: () => void; visible: boolean }) {
  return (
    <div className={`fixed z-9999 bottom-8 left-1/2 -translate-x-1/2 grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 p-4 bg-[#211a16] text-white shadow-lg transition-all duration-400 ease-[cubic-bezier(0.2,0.75,0.3,1)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[200%] opacity-0'}`}>
      <span className="grid place-items-center w-[1.8rem] h-[1.8rem] bg-[#647458] rounded-full">
        <Icon name="check" />
      </span>
      <span className="text-[0.75rem]">{message}</span>
      <button className="p-1 border border-white/30 bg-transparent text-white text-[0.6rem] font-semibold tracking-[0.08em] uppercase cursor-pointer" onClick={() => { onView(); onClose(); }}>
        View Cart
      </button>
      <button className="grid place-items-center w-6 h-6 p-0 border-0 bg-transparent text-white cursor-pointer" onClick={onClose} aria-label="Close">
        <Icon name="close" />
      </button>
    </div>
  );
}

export default Toast;
