import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Rating({ value }: { value: number }) {
  return (
    <Badge
      variant="secondary"
      className="gap-1"
      aria-label={`Rated ${value} out of 5`}
    >
      <Star className="size-3 fill-amber-400 text-amber-400" />
      <span className="tabular-nums">{value.toFixed(1)}</span>
    </Badge>
  );
}
