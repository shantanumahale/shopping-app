import { Badge } from "@/components/ui/badge";

export default function Discount({ value }: { value: number }) {
  return (
    <Badge variant="secondary" className="text-green-600 dark:text-green-400">
      {value.toFixed(0)}% off
    </Badge>
  );
}
