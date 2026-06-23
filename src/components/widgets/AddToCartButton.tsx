"use client";

import Button from "@/components/atoms/Button";
import { useCart } from "@/store/cart";
import { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  return <Button onClick={() => add(product)}>Add to Cart</Button>;
}
