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
      <select
        value={path}
        title={path}
        onChange={(e) => setPath(e.target.value)}
        className="content-center pl-1 cursor-pointer fluid-base bg-secondary text-textPrimary rounded-l-md"
      >
        <option value="movie">{t.Movie}</option>
        <option value="tvshow">{t.TVShow}</option>
        <option value="book">{t.Book}</option>
      </select>
      <input
        className="content-center px-2 text-textPrimary w-36 lg:w-auto 2xl:w-64 fluid-base"
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
        className="flex content-center p-2 transition-colors duration-100 bg-secondary hover:bg-textHoverSecondary fluid-base rounded-r-md text-textPrimary"
      >
        <BsSearch />
      </Link>
    </div>
  )
}
