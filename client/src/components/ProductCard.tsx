'use client'

import { Product } from '@/types/product'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const DEFAULT_IMAGE = '/placeholder.png'

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product)
    toast('Product added to cart')
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="line-clamp-2 h-14">
          {product.Title || product.Handle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={imageError ? DEFAULT_IMAGE : product.ImageSrc || DEFAULT_IMAGE}
            alt={product.Title || product.Handle || 'Product image'}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            SKU: {product.VariantSKU}
          </p>
          <p className="font-semibold">${product.VariantPrice?.toFixed(2)}</p>
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
