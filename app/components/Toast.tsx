"use client";

import Icon from "./Icon";

function Toast({ message, onView, onClose }: { message: string; onView: () => void; onClose: () => void }) {
  return (
    <div className="toast is-visible">
      <span className="toast-check">
        <Icon name="check" />
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-action" onClick={() => { onView(); onClose(); }}>
        View Cart
      </button>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        <Icon name="close" />
      </button>
    </div>
  );
}

export default Toast;
