import Image from "next/image";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import Discount from "@/components/atoms/Discount";
import Price from "@/components/atoms/Price";
import Rating from "@/components/atoms/Rating";
import CartControl from "@/components/widgets/CartControl";
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
      <Card className="flex items-center justify-center p-6">
        <Image
          src={product.images[0] ?? product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-auto w-full max-w-md object-contain"
        />
      </Card>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-2">
          <Rating value={product.rating} />
          <Discount value={product.discountPercentage} />
        </div>
        <span className="text-2xl">
          <Price value={product.price} />
        </span>
        <p className="text-muted-foreground">{product.description}</p>
        <div className="max-w-xs">
          <CartControl product={product} />
        </div>
      </div>
    </main>
  );
}
