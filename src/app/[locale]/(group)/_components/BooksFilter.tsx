"use client"
import Link from "next-intl/link"
import { usePathname } from "next-intl/client"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { dictionaryBookFilter } from "../../../../../messages/dictionary/clientSide"
import { SortBooks } from "@/api/FETCH_OPEN_LIBRARY"

export default function BooksFilter({ locale }: { locale: Locale }) {
  const t = dictionaryBookFilter(locale)
  const currentPath = usePathname()
  const query = useSearchParams()

  const searchQuery = query.get("query") as string | undefined
  const searchTitle = query.get("title") as string | undefined
  const searchAuthor = query.get("author") as string | undefined
  const searchSubject = query.get("subject") as string | undefined
  const searchPlace = query.get("place") as string | undefined
  const searchPerson = query.get("person") as string | undefined
  const searchLanguage = query.get("language") as string | undefined
  const searchPublisher = query.get("publisher") as string | undefined
  const searchSort = query.get("sort") as SortBooks | undefined
  const newQuery = new URLSearchParams(query)

  const [any, setAny] = useState(searchQuery || "")
  const [title, setTitle] = useState(searchTitle || "")
  const [author, setAuthor] = useState(searchAuthor || "")
  const [subject, setSubject] = useState(searchSubject || "")
  const [place, setPlace] = useState(searchPlace || "")
  const [person, setPerson] = useState(searchPerson || "")
  const [language, setLanguage] = useState(searchLanguage || "")
  const [publisher, setPublisher] = useState(searchPublisher || "")
  const [sort, setSort] = useState(searchSort || "")

  /* @ts-ignore */
  newQuery.set("page", 1)
  newQuery.set("query", any)
  newQuery.set("title", title)
  newQuery.set("author", author)
  newQuery.set("subject", subject)
  newQuery.set("place", place)
  newQuery.set("person", person)
  newQuery.set("language", language)
  newQuery.set("publisher", publisher)
  newQuery.set("sort", sort)
  return (
    <div className="grid gap-4 p-2 justify-items-center bg-hoverSecondary text-textPrimary fluid-base rounded-b-md">
      <div className="grid gap-4 p-2 justify-items-center md:grid-cols-2 2xl:grid-cols-4">
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.Any}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={any}
            onFocus={(e) => setAny("")}
            onChange={(e) => setAny(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.ByTitle}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={title}
            onFocus={(e) => setTitle("")}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.ByAuthor}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={author}
            onFocus={(e) => setAuthor("")}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.BySubject}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={subject}
            onFocus={(e) => setSubject("")}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.ByPlace}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={place}
            onFocus={(e) => setPlace("")}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.ByPerson}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={person}
            onFocus={(e) => setPerson("")}
            onChange={(e) => setPerson(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.ByLanguage}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={language}
            onFocus={(e) => setLanguage("")}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="font-bold text-accent">{t.ByPublisher}</label>
          <input
            className="p-2 rounded bg-background text-textPrimary"
            type="text"
            value={publisher}
            onFocus={(e) => setPublisher("")}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
      </div>

      <div className="grid">
        <label className="font-bold text-accent">{t.Sort}</label>
        <div className="flex">
          <select
            className="p-2 rounded cursor-pointer bg-primary text-textSecondary"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortBooks)}
          >
            <option value="">{t.Relevance}</option>
            <option value="editions">
              {t.Editions} ({t.Desc})
            </option>
            <option value="old">
              {t.Date} ({t.Asc})
            </option>
            <option value="new">
              {t.Date} ({t.Desc})
            </option>
            <option value="rating">
              {t.Rating} ({t.Desc})
            </option>
            <option value="random">{t.Random}</option>
          </select>
        </div>
      </div>
      <div className="grid items-end grid-cols-2 gap-4 p-2 fluid-base">
        <Link
          href={currentPath + "?" + newQuery}
          locale={locale}
          className="p-2 bg-green-700 rounded-md h-max hover:bg-green-600 text-slate-200"
        >
          {t.Submit}
        </Link>
        <Link
          href={currentPath}
          locale={locale}
          className="p-2 bg-red-700 rounded-md h-max hover:bg-red-600 text-slate-200"
          onClick={() => {
            setAny("")
            setTitle("")
            setAuthor("")
            setSubject("")
            setPlace("")
            setPerson("")
            setLanguage("")
            setPublisher("")
            setSort("")
          }}
        >
          {t.Reset}
        </Link>
      </div>
    </div>
  )
}
