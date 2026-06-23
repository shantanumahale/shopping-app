import { Product } from "@/lib/types";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(
  limit = 30,
  skip = 0,
): Promise<{ products: Product[]; total: number }> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
