"use client";

import { CartItem } from "../data/products";
import QtyControl from "./QtyControl";
import Icon from "./Icon";
import NavLink from "./NavLink";
import Action from "./Action";
import { formatPrice } from "../utils/formatPrice";
import { ArrowBigLeftIcon, ArrowRight, Trash } from "lucide-react";

function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onViewCart,
  onOrder,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onViewCart: () => void;
  onOrder: () => void;
}) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.size.price * item.quantity,
    0,
  );

  return (
    <>
      <div
        className={`cart-drawer-overlay ${open ? "is-open" : ""}`}
        onClick={onClose}
      />
      <div className={`cart-drawer ${open ? "is-open" : ""}`} aria-label="Cart">
        <div className="flex justify-between items-center p-6 border-b border-[rgba(33,26,22,0.15)]">
          <h2 className="m-0 font-serif text-[1.4rem] font-medium">
            Your Cart{" "}
            {items.length > 0 && (
              <span className="text-[0.8rem] text-[#a69a8d]">
                ({items.length})
              </span>
            )}
          </h2>
          <button
            className="inline-flex items-center gap-2 p-0 border-0 bg-none text-inherit cursor-pointer"
            onClick={onClose}
            aria-label="Close cart"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-12">
              <Icon name="bag" className="w-12 h-12 text-[#a69a8d] mb-4" />
              <p className="m-1 font-serif text-[1.2rem]">Your cart is empty</p>
              <span className="text-[0.7rem] text-[#a69a8d]">
                Browse our collection to find your perfect piece.
              </span>
              <NavLink
                href="/furniture"
                onClick={onClose}
                className="action action-dark mt-4"
              >
                Explore Furniture
              </NavLink>
            </div>
          ) : (
            items.map((item) => (
              <div
                className="grid grid-cols-[4rem_1fr] gap-4 p-4 mb-2 bg-white"
                key={item.id}
              >
                <div className="aspect-square overflow-hidden bg-[#efe8de]">
                  <img
                    src={item.color.image || item.product.variants[0].image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-[0.9rem] font-medium">
                    {item.product.name}
                  </span>
                  <span className="text-[0.65rem] text-[#a69a8d]">
                    {item.size.label} · {item.color.name}
                  </span>
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <QtyControl
                      qty={item.quantity}
                      onChange={(n) => onUpdateQty(item.id, n)}
                    />
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[0.75rem] font-semibold">
                        {formatPrice(item.size.price * item.quantity)}
                      </span>
                      <button className="p-2" onClick={() => onRemove(item.id)}>
                        <Trash className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-[rgba(33,26,22,0.15)]">
            <div className="flex justify-between mb-2 text-6">
              <span className="font-medium">Subtotal</span>
              <strong className="font-bold">{formatPrice(subtotal)}</strong>
            </div>
            <div className="flex justify-between text-5 text-[#a69a8d7d] -mt-2 mb-4">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="grid gap-2 mt-4">
              <NavLink href="/cart" className="action action-dark">
                <Icon name="bag" /> View Cart
              </NavLink>
              <NavLink href="/order" className="action action-dark">
                Proceed to Order
              </NavLink>
              <NavLink href="/furniture" className="action action-outline">
                Continue Shopping <Icon name="arrow" />
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
