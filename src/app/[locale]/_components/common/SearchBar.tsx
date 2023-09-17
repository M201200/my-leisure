"use client"
import { dictionarySearchBar } from "../../../../../messages/dictionary/clientSide"
import Link from "next-intl/link"
import { useState } from "react"
import { useRouter } from "next-intl/client"
import { BsSearch } from "react-icons/bs"

export default function SearchBar({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("")
  const [path, setPath] = useState("movie")
  const t = dictionarySearchBar(locale)
  const router = useRouter()
  return (
    <div className="flex">
      <select value={path} onChange={(e) => setPath(e.target.value)}>
        <option value="movie">{t.Movie}</option>
        <option value="tvshow">{t.TVShow}</option>
        <option value="book">{t.Book}</option>
      </select>
      <input
        type="text"
        placeholder={t.Placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/category/search/${path}?query=${query}`, {
              locale: locale,
            })
          }
        }}
      />
      <Link
        href={`/category/search/${path}?query=${query}`}
        locale={locale}
        title={t.Search}
        className="translate-y-1"
      >
        <BsSearch />
      </Link>
    </div>
  )
}
