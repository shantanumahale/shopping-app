export default function Discount({ value }: { value: number }) {
  return (
    <span className="text-sm font-medium text-green-600">
      {value.toFixed(0)}% off
    </span>
  );
}
