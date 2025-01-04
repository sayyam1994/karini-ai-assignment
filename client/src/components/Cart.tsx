'use client'

import { Product } from '@/types/product'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'

interface CartProps {
  items: Product[]
  onRemove: (sku: string) => void
}

export function Cart({ items, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.VariantPrice, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-15rem)] mt-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.VariantSKU} className="flex gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={item.ImageSrc}
                      alt={item.Title || item.Handle}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">
                      {item.Title || item.Handle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${item.VariantPrice?.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(item.VariantSKU)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">${total?.toFixed(2)}</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
