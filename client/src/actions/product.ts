'use server'

import { Product } from '@/types/product'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw new Error('Failed to fetch products. Please try again later.')
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_URL}/products/search?q=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 0 }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Failed to search products:', error)
    throw new Error('Failed to search products. Please try again later.')
  }
}
