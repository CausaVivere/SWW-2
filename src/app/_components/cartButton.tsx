"use client";

import { ShoppingCart, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "~/components/ui/sheet";
import { useCart } from "~/lib/cart";
import { cn } from "~/lib/utils";

export default function CartButton({ className }: { className?: string }) {
  const { items, total, remove, clear, increment, decrement } = useCart();

  const nrOfItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative h-9 gap-2 px-3 hover:cursor-pointer sm:h-10 sm:px-4",
            className,
          )}
        >
          <ShoppingCart className="size-4 sm:size-5" />
          <span className="hidden sm:inline">Cart</span>
          {items.length > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full text-[11px] font-semibold shadow-sm sm:h-6 sm:min-w-6 sm:text-xs">
              {nrOfItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full max-w-md flex-col p-0">
        <div className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close cart">
              <X className="size-4" />
            </Button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {product.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      ${product.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md border">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Decrease ${product.name}`}
                        onClick={() => decrement(product.id)}
                        className="size-8"
                      >
                        −
                      </Button>
                      <span className="w-8 text-center text-sm tabular-nums">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Increase ${product.name}`}
                        onClick={() => increment(product.id)}
                        className="size-8"
                      >
                        +
                      </Button>
                    </div>
                    <span className="ml-1 text-sm font-semibold">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => remove(product.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-3 sm:px-6">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <SheetFooter className="gap-2">
            <Button
              variant="outline"
              onClick={clear}
              disabled={items.length === 0}
            >
              Clear cart
            </Button>
            <Button disabled={items.length === 0}>Checkout</Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
