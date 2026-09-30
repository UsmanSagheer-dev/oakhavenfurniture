"use client";

import { CartItem } from "../data/products";
import QtyControl from "./QtyControl";
import Icon from "./Icon";
import NavLink from "./NavLink";
import Action from "./Action";
import { formatPrice } from "../utils/formatPrice";

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
  const subtotal = items.reduce((sum, item) => sum + item.size.price * item.quantity, 0);

  return (
    <>
      <div className={`cart-drawer-overlay ${open ? "is-open" : ""}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? "is-open" : ""}`} aria-label="Cart">
        <div className="cart-drawer-head">
          <h2>
            Your Cart {items.length > 0 && <span className="cart-drawer-count">({items.length})</span>}
          </h2>
          <button className="tool-button" onClick={onClose} aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <Icon name="bag" />
              <p>Your cart is empty</p>
              <span>Browse our collection to find your perfect piece.</span>
              <NavLink href="/furniture" onClick={onClose} className="action action-dark" style={{ marginTop: "1rem" }}>
                Explore Furniture
              </NavLink>
            </div>
          ) : (
            items.map((item) => (
              <div className="drawer-item" key={item.id}>
                <div className="drawer-item-image">
                  <img src={item.color.image || item.product.variants[0].image} alt={item.product.name} />
                </div>
                <div className="drawer-item-info">
                  <span className="drawer-item-name">{item.product.name}</span>
                  <span className="drawer-item-variant">
                    {item.size.label} · {item.color.name}
                  </span>
                  <div className="drawer-item-bottom">
                    <QtyControl qty={item.quantity} onChange={(n) => onUpdateQty(item.id, n)} />
                    <div className="drawer-item-right">
                      <span className="drawer-item-price">{formatPrice(item.size.price * item.quantity)}</span>
                      <button className="drawer-remove" onClick={() => onRemove(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer-foot">
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div
              className="drawer-subtotal"
              style={{ fontSize: ".65rem", color: "var(--taupe)", marginTop: "-.5rem", marginBottom: "1rem" }}
            >
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="drawer-actions">
              <NavLink href="/order" className="action action-dark" onClick={() => onClose()}>
                Proceed to Order
              </NavLink>
              <NavLink href="/cart" className="action action-outline" onClick={() => onClose()}>
                View Full Cart
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
