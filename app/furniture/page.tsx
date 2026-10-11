"use client";

import { useState, useMemo, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Icon from "../components/Icon";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import FurnitureHero from "../components/FurnitureHero";
import CartDrawer from "../components/CartDrawer";
import Toast from "../components/Toast";
import SortSelect from "../components/SortSelect";
import Action from "../components/Action";
import { useCart } from "../context/CartContext";

const CATEGORIES = [
  "All",
  "Bedroom",
  "Living Room",
  "Dining",
  "Tables",
  "Seating",
] as const;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

// Styles the inner <label>/<select> of SortSelect without touching its file.
// Luxury look: no box, just a single flat hairline under the control.
const SORT_WRAPPER =
  "[&_label]:flex [&_label]:items-center [&_label]:gap-3 max-md:[&_label]:text-[0px] " +
  "[&_select]:cursor-pointer [&_select]:rounded-none [&_select]:border-x-0 [&_select]:border-t-0 [&_select]:border-b " +
  "[&_select]:border-(--espresso) [&_select]:bg-transparent [&_select]:py-2 [&_select]:pr-8 [&_select]:pl-1 " +
  "[&_select]:text-sm [&_select]:tracking-wide [&_select]:text-(--espresso) [&_select]:outline-0 " +
  "[&_select]:focus-visible:border-(--gold) max-md:[&_select]:w-24 max-md:[&_select]:px-1";

const sameCategory = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase();

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function FurniturePage() {
  const [filter, setFilter] = useState<string>("All");
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart, cartCount, isLoaded, updateQty, removeItem, toast, hideToast } =
    useCart();

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lock page scroll while an overlay is open
  useEffect(() => {
    document.body.style.overflow =
      search || cartOpen || drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [search, cartOpen, drawer]);

  // Close the filter drawer with Escape
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: products.length };
    CATEGORIES.slice(1).forEach((c) => {
      map[c] = products.filter((p) => sameCategory(p.category, c)).length;
    });
    return map;
  }, []);

  const shown = useMemo(() => {
    const selected =
      filter === "All"
        ? products
        : products.filter((p) => sameCategory(p.category, filter));
    return [...selected].sort((a, b) =>
      sort === "low"
        ? a.basePrice - b.basePrice
        : sort === "high"
          ? b.basePrice - a.basePrice
          : sort === "newest"
            ? Number(Boolean(b.isNew)) - Number(Boolean(a.isNew))
            : 0,
    );
  }, [filter, sort]);

  const resetFilters = () => {
    setFilter("All");
    setSort("featured");
  };

  return (
    <>
      <Header
        path="/furniture"
        openSearch={() => setSearch(true)}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
        isLoaded={isLoaded}
      />
      <SearchOverlay open={search} close={() => setSearch(false)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onViewCart={() => navigate("/cart")}
        onOrder={() => navigate("/order")}
        isLoaded={isLoaded}
      />
      {toast.visible && (
        <Toast
          message={toast.msg}
          onView={() => navigate("/cart")}
          onClose={hideToast}
          visible={toast.visible}
        />
      )}

      <main className="bg-(--ivory) pt-[4.6rem] md:pt-[5.3rem]">
        <div className="mx-auto w-(--shell)">
          <FurnitureHero />
        </div>

        <section
          aria-labelledby="catalog-title"
          className="mx-auto w-(--shell) pt-16 pb-(--section) md:pt-28"
        >
          {/* Toolbar: quiet, generous, one gold hairline as the only accent */}
          <header className="flex flex-col gap-8 pb-10 sm:flex-row sm:items-end sm:justify-between md:pb-14">
            <div>
              <span
                aria-hidden="true"
                className="mb-6 block h-px w-12 bg-(--gold)"
              />
              <h2
                id="catalog-title"
                className="m-0 font-(family-name:--serif) text-4xl font-light leading-[1.05] tracking-tight text-(--espresso) md:text-6xl"
              >
                {filter === "All" ? "The collection" : filter}
              </h2>
              <p
                aria-live="polite"
                className="mt-4 text-sm tracking-wide text-[#74685f]"
              >
                {shown.length} {shown.length === 1 ? "piece" : "pieces"}
              </p>
            </div>

            <div className="flex items-center gap-8">
              <Action
                variant="text"
                onClick={() => setDrawer(true)}
                aria-expanded={drawer}
                className="hidden gap-2 text-sm tracking-wide max-md:inline-flex"
              >
                Filter
                {filter !== "All" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-(--gold)" />
                )}
              </Action>

              <div className={SORT_WRAPPER}>
                <SortSelect
                  label="Sort by"
                  value={sort}
                  onChange={setSort}
                  options={SORT_OPTIONS}
                />
              </div>
            </div>
          </header>

          <div className="border-t border-(--line) pt-10 md:grid md:grid-cols-[13rem_1fr] md:gap-16 md:pt-14">
            {/* Filters: sidebar on desktop, bottom sheet on mobile */}
            <aside
              aria-label="Product filters"
              className={cx(
                "md:sticky md:top-28 md:self-start",
                "max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-120 max-md:max-h-[82vh] max-md:overflow-y-auto max-md:border-t max-md:border-(--gold) max-md:bg-(--ivory) max-md:p-8",
                "max-md:transition-transform max-md:duration-500 max-md:ease-out motion-reduce:transition-none",
                drawer ? "max-md:translate-y-0" : "max-md:translate-y-[110%]",
              )}
            >
              <div className="mb-6 flex items-center justify-between border-b border-(--line) pb-5 font-(family-name:--serif) text-2xl font-light md:hidden">
                <strong className="font-light">Filter</strong>
                <Action
                  variant="text"
                  onClick={() => setDrawer(false)}
                  aria-label="Close filters"
                >
                  <Icon name="close" />
                </Action>
              </div>

              <div>
                <span className="mb-6 block font-(family-name:--serif) text-xl font-light text-(--espresso)">
                  Category
                </span>
                <ul className="m-0 list-none space-y-1 p-0">
                  {CATEGORIES.map((item) => {
                    const active = sameCategory(filter, item);
                    return (
                      <li key={item}>
                        <Action
                          variant="text"
                          onClick={() => {
                            setFilter(item);
                            setDrawer(false);
                          }}
                          aria-pressed={active}
                          className={cx(
                            "flex w-full items-center justify-between border-l py-3 pl-4 text-left text-sm tracking-wide transition-colors motion-reduce:transition-none",
                            active
                              ? "border-(--gold) font-medium text-(--espresso)"
                              : "border-(--line) text-[#74685f] hover:border-(--espresso) hover:text-(--espresso)",
                          )}
                        >
                          {item}
                          <small className="text-xs text-[#a69a8d]">
                            {counts[item]}
                          </small>
                        </Action>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {filter !== "All" && (
                <Action
                  variant="text"
                  onClick={resetFilters}
                  className="mt-8 p-0 text-sm tracking-wide underline underline-offset-4"
                >
                  Clear filters
                </Action>
              )}
            </aside>

            {drawer && (
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawer(false)}
                className="fixed inset-0 z-110 border-0 bg-[rgba(20,15,12,0.55)] md:hidden"
              />
            )}

            {shown.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16 min-[1100px]:grid-cols-3">
                {shown.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="border border-(--line) px-8 py-24 text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto mb-8 block h-px w-12 bg-(--gold)"
                />
                <h3 className="m-0 font-(family-name:--serif) text-3xl font-light text-(--espresso) md:text-4xl">
                  Nothing here yet
                </h3>
                <p className="mx-auto mt-4 mb-10 max-w-sm text-[#74685f]">
                  This category has no pieces at the moment. Browse the full
                  collection instead.
                </p>
                <Action variant="dark" onClick={resetFilters}>
                  View all furniture
                </Action>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}