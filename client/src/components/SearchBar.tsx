'use client'

import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)

  useEffect(() => {
    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by SKU or name..."
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
