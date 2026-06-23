export default function Rating({ value }: { value: number }) {
  return <span className="text-sm text-amber-500">★ {value.toFixed(1)}</span>;
}
