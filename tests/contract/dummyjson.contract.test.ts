import { describe, it, expect } from "vitest";
import { z } from "zod";

// The fields the app actually depends on (see src/lib/types.ts).
const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  thumbnail: z.url(),
  images: z.array(z.url()),
});

const ProductListSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

const BASE_URL = "https://dummyjson.com";

describe("DummyJSON API contract", () => {
  it("GET /products returns the paginated list shape", async () => {
    const res = await fetch(`${BASE_URL}/products?limit=5&skip=0`);
    expect(res.ok).toBe(true);
    const parsed = ProductListSchema.safeParse(await res.json());
    expect(parsed.success, parsed.error?.message).toBe(true);
    if (parsed.success) {
      expect(parsed.data.products.length).toBe(5);
      expect(parsed.data.total).toBeGreaterThan(30);
    }
  }, 15000);

  it("GET /products supports limit & skip pagination params", async () => {
    const res = await fetch(`${BASE_URL}/products?limit=10&skip=10`);
    const data = ProductListSchema.parse(await res.json());
    expect(data.limit).toBe(10);
    expect(data.skip).toBe(10);
  }, 15000);

  it("GET /products/:id returns a single product shape", async () => {
    const res = await fetch(`${BASE_URL}/products/1`);
    expect(res.ok).toBe(true);
    const parsed = ProductSchema.safeParse(await res.json());
    expect(parsed.success, parsed.error?.message).toBe(true);
  }, 15000);

  it("GET /products/:id returns 404 for a missing product", async () => {
    const res = await fetch(`${BASE_URL}/products/0`);
    expect(res.status).toBe(404);
  }, 15000);
});
