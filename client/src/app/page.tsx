'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Product } from '@/types/product'
import { ProductCard } from '@/components/ProductCard'
import { SearchBar } from '@/components/SearchBar'
import { Cart } from '@/components/Cart'
import { getProducts, searchProducts } from '@/actions/product'
import { ThemeToggle } from '@/components/ThemeToggle'

const CART_STORAGE_KEY = 'cartItems'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState<
    { product: Product; quantity: number }[]
  >([])

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

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
    }
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.product.Variants[0].VariantSKU === product.Variants[0].VariantSKU
      )
      if (existingItem) {
        return prev.map((item) =>
          item.product.Variants[0].VariantSKU === product.Variants[0].VariantSKU
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { product, quantity: 1 }]
      }
    })
    toast.success('Product added to cart')
  }

  const removeFromCart = (sku: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.Variants[0].VariantSKU !== sku)
    )
    toast.success('Item removed from cart')
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
    toast.success('Cart cleared')
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
      <div className="fixed top-0 left-0 right-0 bg-background z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="w-full max-w-sm">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Cart
              items={cartItems}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          </div>
        </div>
      </div>

      <div className="pt-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-[400px] rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.Handle}
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
    </div>
  )
}
