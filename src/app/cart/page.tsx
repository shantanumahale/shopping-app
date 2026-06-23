import CartView from "@/components/widgets/CartView";

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Cart</h1>
      <CartView />
    </main>
  );
}
