import CheckoutSummary from "@/components/widgets/CheckoutSummary";

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      <CheckoutSummary />
    </main>
  );
}
