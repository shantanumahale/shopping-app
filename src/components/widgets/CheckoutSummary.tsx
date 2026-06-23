"use client";

import Link from "next/link";
import Price from "@/components/atoms/Price";
import { useCart } from "@/store/cart";

export default function CheckoutSummary() {
  const { count, total } = useCart();

  if (count === 0)
    return (
      <p className="text-muted-foreground">
        Your cart is empty.{" "}
        <Link
          href="/"
          className="text-primary underline-offset-4 hover:underline"
        >
          Browse products
        </Link>
        .
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Order total ({count} items)</span>
        <Price value={total} />
      </div>
      <p className="text-muted-foreground text-sm">Checkout is coming soon.</p>
    </div>
  );
}
