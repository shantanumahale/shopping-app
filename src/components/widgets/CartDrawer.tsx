"use client";

import Link from "next/link";
import Price from "@/components/atoms/Price";
import CartItemRow from "@/components/widgets/CartItemRow";
import { useCart } from "@/store/cart";

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const { items, count, total } = useCart();
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Cart"
        className={`fixed top-0 right-0 z-30 flex h-full w-80 max-w-[90vw] flex-col bg-white shadow-xl transition-transform dark:bg-zinc-900 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="font-semibold">Cart ({count})</h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {count === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          )}
        </div>

        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="mb-3 flex items-center justify-between font-semibold">
            <span>Total</span>
            <Price value={total} />
          </div>
          <Link
            href="/cart"
            onClick={onClose}
            className="mb-2 block text-center text-sm text-zinc-500 hover:underline"
          >
            View full cart
          </Link>
          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full rounded-md bg-zinc-900 py-2.5 text-center text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
