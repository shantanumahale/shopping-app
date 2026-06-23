"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/widgets/ThemeToggle";

// Code-split the cart drawer (Radix Dialog) out of the initial bundle.
const CartDrawer = dynamic(() => import("@/components/widgets/CartDrawer"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon" aria-label="Open cart" disabled>
      <ShoppingCart />
    </Button>
  ),
});

export default function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">
          Shopping App
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <ThemeToggle />
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
}
