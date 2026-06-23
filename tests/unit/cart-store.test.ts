import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCart } from "@/store/cart";
import { resetCart } from "../utils/cart";
import { makeProduct } from "../utils/fixtures";

describe("cart store", () => {
  beforeEach(() => resetCart());

  it("starts empty", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.count).toBe(0);
    expect(result.current.total).toBe(0);
    expect(result.current.items).toEqual([]);
  });

  it("adds a product", () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.add(makeProduct({ id: 1, price: 10 })));
    expect(result.current.count).toBe(1);
    expect(result.current.quantityOf(1)).toBe(1);
    expect(result.current.total).toBe(10);
  });

  it("increments quantity when adding an existing product", () => {
    const p = makeProduct({ id: 1, price: 10 });
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.add(p);
      result.current.add(p);
    });
    expect(result.current.quantityOf(1)).toBe(2);
    expect(result.current.count).toBe(2);
    expect(result.current.total).toBe(20);
  });

  it("decrements quantity and removes the line at zero", () => {
    const p = makeProduct({ id: 1, price: 10 });
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.add(p);
      result.current.add(p);
    });
    act(() => result.current.decrement(1));
    expect(result.current.quantityOf(1)).toBe(1);
    act(() => result.current.decrement(1));
    expect(result.current.quantityOf(1)).toBe(0);
    expect(result.current.count).toBe(0);
  });

  it("removes a product entirely regardless of quantity", () => {
    const p = makeProduct({ id: 1 });
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.add(p);
      result.current.add(p);
    });
    act(() => result.current.remove(1));
    expect(result.current.quantityOf(1)).toBe(0);
    expect(result.current.items).toEqual([]);
  });

  it("computes count and total across multiple products", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.add(makeProduct({ id: 1, price: 10 }));
      result.current.add(makeProduct({ id: 2, price: 5 }));
      result.current.add(makeProduct({ id: 2, price: 5 }));
    });
    expect(result.current.count).toBe(3);
    expect(result.current.total).toBe(20);
  });

  it("persists the cart to localStorage", () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.add(makeProduct({ id: 7, price: 3 })));
    const saved = JSON.parse(localStorage.getItem("cart") ?? "[]");
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({ id: 7, quantity: 1 });
  });
});
