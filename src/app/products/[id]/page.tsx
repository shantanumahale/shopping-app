import Image from "next/image";
import { notFound } from "next/navigation";
import Discount from "@/components/atoms/Discount";
import Price from "@/components/atoms/Price";
import Rating from "@/components/atoms/Rating";
import AddToCartButton from "@/components/widgets/AddToCartButton";
import { getProduct } from "@/lib/api";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  if (!product) notFound();

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-8 p-6 md:grid-cols-2">
      <Image
        src={product.images[0] ?? product.thumbnail}
        alt={product.title}
        width={600}
        height={600}
        className="h-auto w-full rounded-lg object-contain"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <Rating value={product.rating} />
        <div className="flex items-center gap-3">
          <Price value={product.price} />
          <Discount value={product.discountPercentage} />
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
