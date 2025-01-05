'use client'

import { Product } from '@/types/product'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { CustomCarousel } from './CustomCarousel'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart(product)
    toast('Product added to cart')
  }

  const firstVariant = product.Variants[0]

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="line-clamp-2 h-14">
          {product.Title || product.Handle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CustomCarousel images={firstVariant.Images} />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            SKU: {firstVariant.VariantSKU}
          </p>
          <p className="font-semibold">
            ${firstVariant.VariantPrice?.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.Body}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
