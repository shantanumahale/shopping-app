type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

const styles = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
  ghost: "text-red-600 hover:underline",
};

export default function Button({ variant = "primary", ...props }: Props) {
  return (
    <button
      className={`rounded-md px-3 py-1.5 text-sm font-medium ${styles[variant]}`}
      {...props}
    />
  );
}
