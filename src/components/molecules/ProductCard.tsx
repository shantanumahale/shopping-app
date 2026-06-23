import Image from "next/image";
import Link from "next/link";
import Price from "@/components/atoms/Price";
import Rating from "@/components/atoms/Rating";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
        className="h-40 w-full object-contain"
      />
      <h2 className="line-clamp-1 font-medium">{product.title}</h2>
      <div className="flex items-center justify-between">
        <Price value={product.price} />
        <Rating value={product.rating} />
      </div>
    </Link>
  );
}
