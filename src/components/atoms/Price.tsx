export default function Price({ value }: { value: number }) {
  return (
    <span className="font-semibold tabular-nums">${value.toFixed(2)}</span>
  );
}
