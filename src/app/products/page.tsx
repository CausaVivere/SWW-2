import { api } from "~/trpc/server";
import ProductCard from "../_components/productCard";
import { redirect } from "next/navigation";
import CartButton from "../_components/cartButton";

export default async function ProductsPage() {
  const products = await api.products.getAll();

  if (!products.length) {
    return (
      <p className="text-gray-500th flex h-screen items-center justify-center text-center">
        No products available.
      </p>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center pt-20 md:pt-0">
      <CartButton className="fixed top-5 right-5 z-50" />
      <div className="mx-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-4xl lg:grid-cols-3 xl:max-w-7xl xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
