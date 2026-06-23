import { memo } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
};

function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Decrease quantity"
        onClick={onDecrement}
      >
        <Minus />
      </Button>
      <span
        className="w-6 text-center text-sm font-medium tabular-nums"
        aria-live="polite"
      >
        {quantity}
      </span>
      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Increase quantity"
        onClick={onIncrement}
      >
        <Plus />
      </Button>
    </div>
  );
}

export default memo(QuantityStepper);
