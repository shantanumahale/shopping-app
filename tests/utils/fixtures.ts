import { Product } from "@/lib/types";

export const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "A test product description.",
  price: 9.99,
  discountPercentage: 12.5,
  rating: 4.3,
  thumbnail: "https://cdn.dummyjson.com/test/thumbnail.webp",
  images: ["https://cdn.dummyjson.com/test/1.webp"],
};

export function makeProduct(overrides: Partial<Product> = {}): Product {
  return { ...mockProduct, ...overrides };
}

export function makeProducts(count: number, startId = 1): Product[] {
  return Array.from({ length: count }, (_, i) =>
    makeProduct({ id: startId + i, title: `Product ${startId + i}` }),
  );
}
