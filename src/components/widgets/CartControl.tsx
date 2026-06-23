"use client";

import Button from "@/components/atoms/Button";
import QuantityStepper from "@/components/molecules/QuantityStepper";
import { useCart } from "@/store/cart";
import { Product } from "@/lib/types";

export default function CartControl({ product }: { product: Product }) {
  const { quantityOf, add, decrement } = useCart();
  const quantity = quantityOf(product.id);

  if (quantity === 0)
    return (
      <Button className="w-full" onClick={() => add(product)}>
        Add to Cart
      </Button>
    );

  return (
    <QuantityStepper
      quantity={quantity}
      onIncrement={() => add(product)}
      onDecrement={() => decrement(product.id)}
    />
  );
}
