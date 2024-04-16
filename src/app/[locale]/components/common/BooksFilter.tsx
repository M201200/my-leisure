"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { SortBooks } from "@/app/api/FETCH_OPEN_LIBRARY"
import { GiSettingsKnobs } from "react-icons/gi"

export default function BooksFilter({
  t,
}: {
  t: {
    Filters: string
    Sort: string
    Popularity: string
    Order: string
    Submit: string
    Reset: string
    Any: string
    ByTitle: string
    ByAuthor: string
    BySubject: string
    ByPlace: string
    ByPerson: string
    ByLanguage: string
    ByPublisher: string
    Relevance: string
    Editions: string
    Date: string
    Desc: string
    Asc: string
    Rating: string
    Random: string
  }
}) {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref])
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

  const [any, setAny] = useState(searchQuery || "")
  const [title, setTitle] = useState(searchTitle || "")
  const [author, setAuthor] = useState(searchAuthor || "")
  const [subject, setSubject] = useState(searchSubject || "")
  const [place, setPlace] = useState(searchPlace || "")
  const [person, setPerson] = useState(searchPerson || "")
  const [language, setLanguage] = useState(searchLanguage || "")
  const [publisher, setPublisher] = useState(searchPublisher || "")
  const [sort, setSort] = useState(searchSort || "")

  useEffect(() => {
    setAny(searchQuery || "")
  }, [searchQuery])

  useEffect(() => {
    setTitle(searchTitle || "")
  }, [searchTitle])

  useEffect(() => {
    setAuthor(searchAuthor || "")
  }, [searchAuthor])

  useEffect(() => {
    setSubject(searchSubject || "")
  }, [searchSubject])

  useEffect(() => {
    setPlace(searchPlace || "")
  }, [searchPlace])

  useEffect(() => {
    setPerson(searchPerson || "")
  }, [searchPerson])

  useEffect(() => {
    setLanguage(searchLanguage || "")
  }, [searchLanguage])

  useEffect(() => {
    setPublisher(searchPublisher || "")
  }, [searchPublisher])

  useEffect(() => {
    setSort(searchSort || "")
  }, [searchSort])

  const newQuery = new URLSearchParams(query)
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
    <div
      ref={ref}
      className={`absolute ${
        isOpen ? "max-w-[30rem]" : ""
      } bg-primary p-1 m-4 rounded justify-self-end text-textPrimary`}
    >
      <button
        title={t.Filters}
        className="flex items-center w-full gap-2 p-2 font-bold text-center transition-colors rounded text-textSecondary fluid-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiSettingsKnobs className="w-8 h-8" />
      </button>
      <section
        className={`grid gap-4 p-2 justify-items-center text-textPrimary fluid-base rounded-b-md absolute w-fit  transition-[visibility,opacity,transform] ease-in-out drop-shadow rounded bg-background border-hoverAccent border z-20 ${
          isOpen
            ? "opacity-100 visible -translate-x-52 translate-y-4"
            : "invisible overflow-hidden opacity-0 translate-x-4 translate-y-4"
        }`}
      >
        <ul className="grid gap-4 p-2 justify-items-center text-textPrimary fluid-base rounded-b-md">
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.Any}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={any}
              onChange={(e) => setAny(e.target.value)}
            />
          </li>
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.ByTitle}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </li>
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.ByAuthor}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </li>
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.BySubject}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </li>
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.ByPlace}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </li>
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.ByPerson}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
            />
          </li>
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.ByLanguage}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </li>
          <li className="grid w-full gap-1">
            <label className="font-bold text-accent">{t.ByPublisher}</label>
            <input
              className="p-2 rounded bg-secondary text-textPrimary"
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </li>
          <li className="grid">
            <label className="font-bold text-accent">{t.Sort}</label>
            <div className="flex">
              <select
                className="p-2 rounded cursor-pointer bg-secondary text-textPrimary"
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
          </li>
          <li className="grid items-end grid-cols-2 gap-4 p-2 fluid-base">
            <Link
              href={currentPath + "?" + newQuery}
              className="p-2 bg-green-700 rounded-md h-max hover:bg-green-600 text-slate-200"
            >
              {t.Submit}
            </Link>
            <Link
              href={currentPath}
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
          </li>
        </ul>
      </section>
    </div>
  )
}
