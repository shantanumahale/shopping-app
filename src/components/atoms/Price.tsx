export default function Price({ value }: { value: number }) {
  return <span className="font-semibold">${value.toFixed(2)}</span>;
}
