'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Product } from '@/types/product'
import { ProductCard } from '@/components/ProductCard'
import { SearchBar } from '@/components/SearchBar'
import { Cart } from '@/components/Cart'
import { getProducts, searchProducts } from '@/actions/product'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState<Product[]>([])

  const {
    data: products = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: async () => {
      try {
        return searchQuery
          ? await searchProducts(searchQuery)
          : await getProducts()
      } catch (err) {
        toast.error('Failed to fetch products')
        throw err
      }
    },
    placeholderData: (previousData) => previousData
  })

  console.log('products', products)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const removeFromCart = (sku: string) => {
    setCartItems((prev) => prev.filter((item) => item.VariantSKU !== sku))
    toast.success('Item removed from cart')
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="w-full max-w-sm">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Cart items={cartItems} onRemove={removeFromCart} />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-[400px] rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
          {products.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  )
}
