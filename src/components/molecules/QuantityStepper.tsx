type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const button =
  "flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300 text-lg leading-none hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800";

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className={button}
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
      <button
        onClick={onIncrement}
        aria-label="Increase quantity"
        className={button}
      >
        +
      </button>
    </div>
  );
}
