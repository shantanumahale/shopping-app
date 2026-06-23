"use client";

import Link from "next/link";
import Price from "@/components/atoms/Price";
import CartItemRow from "@/components/molecules/CartItemRow";
import { useCart } from "@/store/cart";

export default function CartView() {
  const { items, remove, count, total } = useCart();

  if (count === 0)
    return (
      <p className="text-zinc-500">
        Your cart is empty.{" "}
        <Link href="/" className="underline">
          Browse products
        </Link>
        .
      </p>
    );

  return (
    <div>
      {items.map((item) => (
        <CartItemRow key={item.id} item={item} onRemove={remove} />
      ))}
      <div className="mt-6 flex items-center justify-between text-lg font-semibold">
        <span>Total ({count} items)</span>
        <Price value={total} />
      </div>
    </div>
  );
}
