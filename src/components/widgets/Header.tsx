"use client";

import { useState } from "react";
import Link from "next/link";
import CartIcon from "@/components/molecules/CartIcon";
import CartDrawer from "@/components/widgets/CartDrawer";
import { useCart } from "@/store/cart";

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/" className="text-lg font-bold">
            Shopping App
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <button onClick={() => setOpen(true)} aria-label="Open cart">
              <CartIcon count={count} />
            </button>
          </div>
        </nav>
      </header>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
