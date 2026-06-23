import { describe, it, expect, vi, afterEach } from "vitest";
import { getProducts, getProduct } from "@/lib/api";
import { makeProduct } from "../utils/fixtures";

function mockFetch(body: unknown, status = 200) {
  return vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(new Response(JSON.stringify(body), { status }));
}

describe("api", () => {
  afterEach(() => vi.restoreAllMocks());

  it("getProducts requests the right URL and returns products + total", async () => {
    const fetchMock = mockFetch({
      products: [makeProduct({ id: 1 })],
      total: 194,
      skip: 30,
      limit: 30,
    });
    const res = await getProducts(30, 30);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products?limit=30&skip=30",
    );
    expect(res.total).toBe(194);
    expect(res.products).toHaveLength(1);
  });

  it("getProducts uses default limit/skip", async () => {
    const fetchMock = mockFetch({ products: [], total: 0 });
    await getProducts();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products?limit=30&skip=0",
    );
  });

  it("getProduct requests by id", async () => {
    const fetchMock = mockFetch(makeProduct({ id: 5 }));
    const product = await getProduct("5");
    expect(fetchMock).toHaveBeenCalledWith("https://dummyjson.com/products/5");
    expect(product.id).toBe(5);
  });

  it("getProducts throws on a non-ok response", async () => {
    mockFetch("error", 500);
    await expect(getProducts()).rejects.toThrow("Failed to fetch products");
  });

  it("getProduct throws on a non-ok response", async () => {
    mockFetch("not found", 404);
    await expect(getProduct("999")).rejects.toThrow("Failed to fetch product");
  });
});
