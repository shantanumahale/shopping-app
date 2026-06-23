"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Price from "@/components/atoms/Price";
import CartItemRow from "@/components/widgets/CartItemRow";
import { useCart } from "@/store/cart";

export default function CartDrawer() {
  const { items, count, total } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Open cart, ${count} items`}
        >
          <ShoppingCart />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-1 size-5 justify-center rounded-full p-0 text-xs tabular-nums">
              {count}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Cart ({count})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {count === 0 ? (
            <p className="text-muted-foreground py-10 text-center text-sm">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          )}
        </div>

        <SheetFooter className="border-t">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <Price value={total} />
          </div>
          <SheetClose asChild>
            <Link
              href="/cart"
              className={buttonVariants({
                variant: "outline",
                className: "h-12 w-full",
              })}
            >
              View full cart
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/checkout"
              className={buttonVariants({ className: "h-12 w-full" })}
            >
              Proceed to Checkout
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
