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
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.open(
              query
                ? `/category/search/"query":"${query}","moviePage":1,"seriesPage":1`
                : "#",
              "_self"
            )
          }
        }}
      />
      <Link
        href={
          query
            ? `/category/search/"query":"${query}","moviePage":1,"seriesPage":1`
            : "#"
        }
      >
        Search
      </Link>
    </div>
  )
}
