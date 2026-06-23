"use client";

import Image from "next/image";
import Button from "@/components/atoms/Button";
import Price from "@/components/atoms/Price";
import QuantityStepper from "@/components/molecules/QuantityStepper";
import { useCart } from "@/store/cart";
import { CartItem } from "@/lib/types";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { add, decrement, remove } = useCart();
  return (
    <div className="flex items-center gap-3 border-b border-zinc-200 py-3 dark:border-zinc-800">
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={56}
        height={56}
        className="h-14 w-14 rounded object-contain"
      />
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="line-clamp-1 text-sm font-medium">{item.title}</h3>
        <Price value={item.price * item.quantity} />
        <QuantityStepper
          quantity={item.quantity}
          onIncrement={() => add(item)}
          onDecrement={() => decrement(item.id)}
        />
      </div>
      <Button variant="ghost" onClick={() => remove(item.id)}>
        Remove
      </Button>
    </div>
  );
}
