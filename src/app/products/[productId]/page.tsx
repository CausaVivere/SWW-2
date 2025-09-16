"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useCart } from "~/lib/cart";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [productId, setProductId] = useState<string | null>(null);
  const [shoeSize, setShoeSize] = useState<number | null>(null);

  const { data: product, isPending } = api.products.getById.useQuery(
    {
      id: productId ?? "",
    },
    { enabled: !!productId },
  );

  useEffect(() => {
    params.then(({ productId }) => {
      setProductId(productId);
    });
  }, [params]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const sizeParam = searchParams.get("size");
    if (sizeParam) {
      const sizeNum = parseInt(sizeParam);
      if (!isNaN(sizeNum)) {
        setShoeSize(sizeNum);
      }
    }
  }, [searchParams]);

  const cart = useCart();

  const isInCart = product
    ? !!cart.items.find((item) => item.product.id === product.id)
    : false;

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="my-8 flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
        <p className="mb-4 text-lg text-gray-700">{product.description}</p>
        <div className="mb-4 flex w-full justify-between">
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <div>
            {[40, 41, 42, 43, 44].map((size) => (
              <span
                key={size}
                className={cn(
                  "ml-4 inline-block rounded border px-3 py-1 text-lg hover:cursor-pointer hover:bg-zinc-100",
                  shoeSize === size ? "border-blue-600 bg-blue-100" : "",
                )}
                onClick={() => setShoeSize(size)}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        {isInCart ? (
          <Button
            className="bg-gray-600 text-white hover:cursor-pointer hover:bg-gray-700"
            onClick={() => {
              cart.remove(product.id);
            }}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            className="bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-700"
            onClick={() => {
              cart.add(product);
            }}
          >
            Add to Cart
          </Button>
        )}
        {isInCart && (
          <div className="mt-4 flex items-center justify-center gap-5">
            <Button
              onClick={() => {
                cart.increment(product.id);
              }}
              className="hover:cursor-pointer"
            >
              +
            </Button>
            <span className="mx-2 text-lg font-bold">
              {
                cart.items.find((item) => item.product.id === product.id)
                  ?.quantity
              }
            </span>
            <Button
              onClick={() => {
                cart.decrement(product.id);
              }}
              className="hover:cursor-pointer"
            >
              -
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
