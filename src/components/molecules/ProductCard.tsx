import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Price from "@/components/atoms/Price";
import Rating from "@/components/atoms/Rating";
import CartControl from "@/components/widgets/CartControl";
import { Product } from "@/lib/types";

type Props = { product: Product; priority?: boolean };

function ProductCard({ product, priority = false }: Props) {
  return (
    <Card className="gap-0 overflow-hidden p-0 transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="focus-visible:ring-ring rounded-t-xl focus-visible:ring-2 focus-visible:outline-none"
      >
        <CardContent className="p-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="mx-auto h-40 w-full object-contain"
          />
          <h2 className="mt-3 line-clamp-1 font-medium">{product.title}</h2>
          <div className="mt-2 flex items-center justify-between">
            <Price value={product.price} />
            <Rating value={product.rating} />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <CartControl product={product} />
      </CardFooter>
    </Card>
  );
}

export default memo(ProductCard);
