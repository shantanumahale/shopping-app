"use client";

import { useCallback } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Price from "@/components/atoms/Price";
import QuantityStepper from "@/components/molecules/QuantityStepper";
import { useCart } from "@/store/cart";
import { CartItem } from "@/lib/types";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { add, decrement, remove } = useCart();

  const handleAdd = useCallback(() => add(item), [add, item]);
  const handleDecrement = useCallback(
    () => decrement(item.id),
    [decrement, item.id],
  );
  const handleRemove = useCallback(() => remove(item.id), [remove, item.id]);

  return (
    <div className="flex items-center gap-3 border-b py-3 last:border-b-0">
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={56}
        height={56}
        className="size-14 rounded-md object-contain"
      />
      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className="line-clamp-1 text-sm font-medium">{item.title}</h3>
        <Price value={item.price * item.quantity} />
        <QuantityStepper
          quantity={item.quantity}
          onIncrement={handleAdd}
          onDecrement={handleDecrement}
        />
      </div>
      <Button
        variant="destructive"
        size="icon-sm"
        aria-label={`Remove ${item.title} from cart`}
        onClick={handleRemove}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
