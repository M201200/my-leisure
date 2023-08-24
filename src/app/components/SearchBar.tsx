"use client"
import Link from "next/link"
import { useState } from "react"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="search for..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.open(query ? `/category/search/${query}` : "#", "_self")
          }
        }}
      />
      <Link href={query ? `/category/search/${query}` : "#"}>Search</Link>
    </div>
  )
}
