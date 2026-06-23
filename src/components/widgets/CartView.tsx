"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Price from "@/components/atoms/Price";
import CartItemRow from "@/components/widgets/CartItemRow";
import { useCart } from "@/store/cart";

export default function CartView() {
  const { items, count, total } = useCart();

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
    <div>
      <div>
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Total ({count} items)</span>
        <Price value={total} />
      </div>
      <Button asChild className="mt-4 h-12 w-full">
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}
