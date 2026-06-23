"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "@/components/molecules/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const PAGE_SIZE = 30;

type Props = { initialProducts: Product[]; total: number };

export default function ProductFeed({ initialProducts, total }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMore = products.length < total;

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const { products: next } = await getProducts(PAGE_SIZE, products.length);
      setProducts((prev) => [...prev, ...next]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [products.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const cards = useMemo(
    () =>
      products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      )),
    [products],
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={`skeleton-${i}`}
              className="h-72 w-full rounded-xl"
            />
          ))}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden className="h-px" />}
      <p
        className="text-muted-foreground py-6 text-center text-sm"
        role="status"
        aria-live="polite"
      >
        {hasMore
          ? `Showing ${products.length} of ${total} products`
          : `All ${total} products loaded`}
      </p>
    </>
  );
}
