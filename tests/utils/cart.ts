import { renderHook, act } from "@testing-library/react";
import { useCart } from "@/store/cart";

// The cart store is a module singleton; reset it between tests via its public API.
export function resetCart() {
  localStorage.clear();
  const { result, unmount } = renderHook(() => useCart());
  act(() => {
    [...result.current.items].forEach((i) => result.current.remove(i.id));
  });
  unmount();
}
