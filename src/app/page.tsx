import ProductCard from "@/components/molecules/ProductCard";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="mx-auto w-full max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
