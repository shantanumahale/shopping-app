"use client";

import { useSyncExternalStore } from "react";
import { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "cart";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

let items: CartItem[] =
  typeof window === "undefined"
    ? EMPTY
    : JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

function setItems(next: CartItem[]) {
  items = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

function add(product: Product) {
  const existing = items.find((i) => i.id === product.id);
  setItems(
    existing
      ? items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      : [...items, { ...product, quantity: 1 }],
  );
}

function remove(id: number) {
  setItems(items.filter((i) => i.id !== id));
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useCart() {
  const list = useSyncExternalStore(
    subscribe,
    () => items,
    () => EMPTY,
  );
  const count = list.reduce((n, i) => n + i.quantity, 0);
  const total = list.reduce((n, i) => n + i.price * i.quantity, 0);
  return { items: list, count, total, add, remove };
}
