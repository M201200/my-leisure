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
  if (any) newQuery.set("query", any)
  if (title) newQuery.set("title", title)
  if (author) newQuery.set("author", author)
  if (subject) newQuery.set("subject", subject)
  if (place) newQuery.set("place", place)
  if (person) newQuery.set("person", person)
  if (language) newQuery.set("language", language)
  if (publisher) newQuery.set("publisher", publisher)
  if (sort) newQuery.set("sort", sort)
  return (
    <div className="grid justify-items-center md:grid-cols-2 2xl:grid-cols-4">
      <div>
        <h5>{t.Any}</h5>
        <input
          type="text"
          value={any}
          onChange={(e) => setAny(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.ByTitle}</h5>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.ByAuthor}</h5>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.BySubject}</h5>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.ByPlace}</h5>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.ByPerson}</h5>
        <input
          type="text"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.ByLanguage}</h5>
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.ByPublisher}</h5>
        <input
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
      </div>
      <div>
        <h5>{t.Sort}</h5>
        <div className="flex">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortBooks)}
          >
            <option value="">{t.Relevance}</option>
            <option value="editions">
              {t.Editions} ({t.Desc})
            </option>
            <option value="ols">
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
      <Link href={currentPath + "?" + newQuery} locale={locale}>
        {t.Submit}
      </Link>
      <Link href={currentPath + "?page=1"} locale={locale}>
        {t.Reset}
      </Link>
    </div>
  )
}
