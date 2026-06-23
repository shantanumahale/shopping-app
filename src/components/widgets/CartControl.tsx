"use client";

import { useCallback } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantityStepper from "@/components/molecules/QuantityStepper";
import { useCart } from "@/store/cart";
import { Product } from "@/lib/types";

export default function CartControl({ product }: { product: Product }) {
  const { quantityOf, add, decrement } = useCart();
  const quantity = quantityOf(product.id);

  const handleAdd = useCallback(() => add(product), [add, product]);
  const handleDecrement = useCallback(
    () => decrement(product.id),
    [decrement, product.id],
  );

  if (quantity === 0)
    return (
      <Button className="w-full rounded-sm h-10" onClick={handleAdd}>
        Add + 
      </Button>
    );

  return (
    <QuantityStepper
      className="w-full justify-between"
      quantity={quantity}
      onIncrement={handleAdd}
      onDecrement={handleDecrement}
    />
  );
}
