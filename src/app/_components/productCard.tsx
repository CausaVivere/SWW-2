"use client";
import type { Product } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ShoppingCart } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useCart } from "~/lib/cart";

export default function ProductCard({
  product,
  className,
  ...props
}: {
  product: Product;
  className?: string;
} & React.ComponentProps<"div">) {
  const router = useRouter();

  const { add, items, increment } = useCart();

  const isInCart = items.find((item) => item.product.id === product.id);

  return (
    <div
      className={cn(
        "h-56 w-full rounded-2xl shadow-xl outline-1 hover:cursor-pointer",
        className,
      )}
      {...props}
      onClick={() => {
        router.push(`/products/${product.id}`);
      }}
    >
      <div className="mt-2 p-4">
        <h2 className="line-clamp-1 text-lg font-bold text-ellipsis">
          {product.name}
        </h2>
        <p className="mt-2 line-clamp-2">{product.description}</p>
        <div>
          {["40", "41", "42", "43", "44"].map((size) => (
            <span
              key={size}
              className="mt-2 mr-2 inline-block rounded border px-2 py-1 text-sm hover:cursor-pointer hover:bg-zinc-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.id}?size=${size}`);
              }}
            >
              {size}
            </span>
          ))}
        </div>
        <div className="mt-4 flex w-full items-center justify-between">
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <Button
            className="mt-2 w-fit bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              isInCart ? increment(product.id) : add(product);
            }}
          >
            <ShoppingCart /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
