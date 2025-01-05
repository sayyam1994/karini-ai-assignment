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
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

interface CartProps {
  items: { product: Product; quantity: number }[]
  onRemove: (sku: string) => void
  onClear: () => void
}

export function Cart({ items, onRemove, onClear }: CartProps) {
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false)

  const total = items.reduce(
    (sum, item) =>
      sum + (item.product.Variants[0]?.VariantPrice || 0) * item.quantity,
    0
  )

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (sku: string) => {
    setImageErrors((prev) => ({ ...prev, [sku]: true }))
  }

  const handleCheckout = () => {
    setIsCheckoutDialogOpen(true)
  }

  const handleDialogClose = () => {
    onClear()
    setIsCheckoutDialogOpen(false)
  }

  return (
    <>
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
                {items.map((item) => {
                  const firstVariant = item.product.Variants[0]
                  const firstImage =
                    firstVariant?.Images?.[0]?.ImageSrc || '/placeholder.png'

                  return (
                    <div key={firstVariant.VariantSKU} className="flex gap-4">
                      <div className="relative h-16 w-16">
                        <Image
                          src={
                            imageErrors[firstVariant.VariantSKU]
                              ? '/placeholder.png'
                              : firstImage
                          }
                          alt={item.product.Title || item.product.Handle}
                          fill
                          className="object-cover rounded"
                          onError={() =>
                            handleImageError(firstVariant.VariantSKU)
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">
                          {item.product.Title || item.product.Handle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${firstVariant?.VariantPrice?.toFixed(2)} x{' '}
                          {item.quantity}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(firstVariant.VariantSKU)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            )}
          </ScrollArea>
          {items.length > 0 && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total?.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isCheckoutDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Placed Successfully</DialogTitle>
          </DialogHeader>
          <p>
            Your order has been placed successfully. Thank you for shopping with
            us!
          </p>
          <Button className="w-full" onClick={handleDialogClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
