"use client"
import { useState } from "react"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BsSearch } from "react-icons/bs"

import sanitizeString from "@/utils/functions/sanitizeString"

export default function SearchBar({
  locale,
  tl,
}: {
  tl: {
    movie: string
    tvshow: string
    book: string
    search: string
    placeholder: string
  }
  locale: Locale
}) {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const href = sanitizeString(query)
    ? `/${locale}/search?query=${sanitizeString(query)}`
    : `${currentPath}?${searchParams}`
  const [path, setPath] = useState("movie")
  return (
    <div className="flex fluid-base drop-shadow">
      <select
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="content-center pl-1 cursor-pointer fluid-base bg-primary text-textSecondary rounded-l-md"
      >
        <option value="movie">{tl.movie}</option>
        <option value="tvshow">{tl.tvshow}</option>
        <option value="book">{tl.book}</option>
      </select>
      <input
        className="content-center w-full p-2 drop-shadow text-textPrimary bg-secondary fluid-base"
        type="text"
        placeholder={tl.placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(href)
          }
        }}
      />
      <Link
        href={`/${locale}/category/search/${path}?query=${query}`}
        title={tl.search}
        className="flex content-center p-2 transition-colors duration-100 bg-primary fluid-base rounded-r-md text-textSecondary"
      >
        <BsSearch className="fluid-lg" />
      </Link>
    </div>
  )
}
