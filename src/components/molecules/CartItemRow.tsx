import Image from "next/image";
import Button from "@/components/atoms/Button";
import Price from "@/components/atoms/Price";
import { CartItem } from "@/lib/types";

type Props = {
  item: CartItem;
  onRemove: (id: number) => void;
};

export default function CartItemRow({ item, onRemove }: Props) {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-200 py-4 dark:border-zinc-800">
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={64}
        height={64}
        className="h-16 w-16 rounded object-contain"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
      </div>
      <Price value={item.price * item.quantity} />
      <Button variant="ghost" onClick={() => onRemove(item.id)}>
        Remove
      </Button>
    </div>
  );
}
