import ProductFeed from "@/components/widgets/ProductFeed";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const { products, total } = await getProducts();
  return (
    <main className="mx-auto w-full max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <ProductFeed initialProducts={products} total={total} />
    </main>
  );
}
