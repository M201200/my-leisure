"use client"
import { dictionarySearchBar } from "@/dictionary/clientSide"
import Link from "next-intl/link"
import { useState } from "react"

export default function SearchBar({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("")
  const [path, setPath] = useState("movie")
  const t = dictionarySearchBar(locale)
  const prefix = locale === "en" ? "" : `/${locale}`
  return (
    <div className="flex">
      <select value={path} onChange={(e) => setPath(e.target.value)}>
        <option value="movie">{t.Movie}</option>
        <option value="tvshow">{t.TVShow}</option>
      </select>
      <input
        type="text"
        placeholder={t.Placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.open(
              query
                ? `${prefix}/category/search/${path}/"query":"${query}","page":1`
                : "#",
              "_self"
            )
          }
        }}
      />
      <Link
        href={
          query ? `/category/search/${path}/"query":"${query}","page":1` : "#"
        }
        locale={locale}
      >
        {t.Search}
      </Link>
    </div>
  )
}
