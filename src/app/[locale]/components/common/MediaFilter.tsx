"use client"
import { useEffect, useRef, useState } from "react"
import SelectMinMaxNumber from "./SelectMinMaxNumber"
import GenreCheck from "./GenreCheck"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { GiSettingsKnobs } from "react-icons/gi"

export default function MediaFilter({
  genres,
  t,
}: {
  genres: Genre[]
  t: {
    Filters: string
    ReleaseDate: string
    Genres: string
    Sort: string
    Score: string
    Votes: string
    Popularity: string
    Order: string
    Accept: string
    Reset: string
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
  const currentYear = +new Date().toISOString().slice(0, 4)

  const currentPath = usePathname()
  const query = useSearchParams()

  const [min_year, set_min_year] = useState(1900)
  const [max_year, set_max_year] = useState(currentYear)
  const [min_score, set_min_score] = useState(0)
  const [max_score, set_max_score] = useState(10)
  const [sort_by, set_sort_by] = useState("popularity")
  const [sort_order, set_sort_order] = useState("desc")
  const [with_genres, set_with_genres] = useState<number[]>([])
  const [without_genres, set_without_genres] = useState<number[]>([])

  useEffect(() => {
    const search_min_year = query.get("min_year")
      ? +query.get("min_year")!
      : 1900
    const search_max_year = query.get("max_year")
      ? +query.get("max_year")!
      : currentYear
    const search_min_score = query.get("min_score")
      ? +query.get("min_score")!
      : 0
    const search_max_score = query.get("max_score")
      ? +query.get("max_score")!
      : 10
    const search_sort_by = query.get("sort_by")
      ? (query.get("sort_by") as SortBy)
      : "popularity"
    const search_sort_order = query.get("sort_order")
      ? (query.get("sort_order") as "desc" | "asc")
      : "desc"
    const search_with_genres = query.get("with_genres")
      ? query
          .get("with_genres")!
          .split(",")
          .map((id) => +id)
      : []
    const search_without_genres = query.get("without_genres")
      ? query
          .get("without_genres")!
          .split(",")
          .map((id) => +id)
      : []

    set_min_year(search_min_year)
    set_max_year(search_max_year)
    set_min_score(search_min_score)
    set_max_score(search_max_score)
    set_sort_by(search_sort_by)
    set_sort_order(search_sort_order)
    set_with_genres(search_with_genres)
    set_without_genres(search_without_genres)
  }, [currentYear, query])

  const newQuery = new URLSearchParams(query)

  /* @ts-ignore */
  newQuery.set("page", 1)
  /* @ts-ignore */
  newQuery.set("min_year", min_year)
  /* @ts-ignore */
  newQuery.set("max_year", max_year)
  /* @ts-ignore */
  newQuery.set("min_score", min_score)
  /* @ts-ignore */
  newQuery.set("max_score", max_score)
  newQuery.set("sort_by", sort_by)
  newQuery.set("sort_order", sort_order)
  newQuery.set("with_genres", with_genres.join(",").replace(/^\,/, ""))
  newQuery.set("without_genres", without_genres.join(",").replace(/^\,/, ""))

  return (
    <div
      ref={ref}
      className={`relative ${
        isOpen ? "max-w-[30rem]" : ""
      } bg-primary p-1 m-4 rounded justify-self-end text-textPrimary`}
    >
      <button
        className="flex items-center w-full gap-2 p-2 font-bold text-center transition-colors rounded text-textSecondary fluid-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t.Filters} <GiSettingsKnobs className="w-8 h-8" />
      </button>
      <section
        className={`grid gap-4 p-2 justify-items-center text-textPrimary fluid-base rounded-b-md absolute w-fit  transition-[visibility,opacity,transform] ease-in-out drop-shadow rounded bg-background border-hoverAccent border z-20 ${
          isOpen
            ? "opacity-100 visible -translate-x-28 translate-y-4"
            : "invisible overflow-hidden opacity-0 translate-x-4 translate-y-4"
        }`}
      >
        <ul className="grid gap-4 p-2 justify-items-center fluid-base">
          <SelectMinMaxNumber
            firstNumber={0}
            lastNumber={10}
            minNumber={min_score ? +min_score : 0}
            maxNumber={max_score ? +max_score : 10}
            label={t.Score}
            setMInNumber={(event) => set_min_score(+event.target.value)}
            setMaxNumber={(event) => set_max_score(+event.target.value)}
          />
          <SelectMinMaxNumber
            firstNumber={1900}
            lastNumber={+currentYear}
            minNumber={min_year ? +min_year : 1900}
            maxNumber={max_year ? +max_year : +currentYear}
            label={t.ReleaseDate}
            setMInNumber={(event) => set_min_year(+event.target.value)}
            setMaxNumber={(event) => set_max_year(+event.target.value)}
          />
          <li>
            <label title={t.Sort} className="font-bold text-accent">
              {t.Sort}
            </label>
            <div className="flex p-1 rounded gap-x-1 bg-secondary text-textPrimary">
              <button
                title="Descend/Ascend"
                className="px-1 text-textPrimary"
                onClick={() =>
                  set_sort_order((prev) => (prev === "desc" ? "asc" : "desc"))
                }
              >
                {sort_order === "asc" ? <SlArrowUp /> : <SlArrowDown />}
              </button>
              <select
                className="p-1 cursor-pointer bg-secondary text-textPrimary"
                value={sort_by || "popularity"}
                onChange={(event) => set_sort_by(event.target.value as SortBy)}
              >
                <option value="popularity">{t.Popularity}</option>
                <option value="primary_release_date">{t.ReleaseDate}</option>
                <option value="vote_average">{t.Score}</option>
                <option value="vote_count">{t.Votes}</option>
              </select>
            </div>
          </li>

          {genres?.length ? (
            <li className="grid content-end gap-2 p-1 rounded drop-shadow-xl bg-secondary text-textPrimary">
              {genres.map((genre) => (
                <GenreCheck
                  key={genre.id}
                  genre={genre}
                  withGenreCheck={with_genres.some((id) => +id === genre.id)}
                  withoutGenreCheck={without_genres.some(
                    (id) => +id === genre.id
                  )}
                  withGenre={(e) => {
                    if (with_genres.some((id) => +id === genre.id)) {
                      set_with_genres((prev) =>
                        prev.filter((id) => +id !== genre.id)
                      )
                      set_without_genres((prev) =>
                        prev.filter((id) => +id !== genre.id)
                      )
                    } else {
                      set_with_genres((prev) => [...prev, genre.id])
                      set_without_genres((prev) =>
                        prev.filter((id) => +id !== genre.id)
                      )
                    }
                  }}
                  withoutGenre={(e) => {
                    if (without_genres.some((id) => +id === genre.id)) {
                      set_without_genres((prev) =>
                        prev.filter((id) => +id !== genre.id)
                      )
                      set_with_genres((prev) =>
                        prev.filter((id) => +id !== genre.id)
                      )
                    } else {
                      set_without_genres((prev) => [...prev, genre.id])
                      set_with_genres((prev) =>
                        prev.filter((id) => +id !== genre.id)
                      )
                    }
                  }}
                />
              ))}
            </li>
          ) : null}
          <li className="grid items-end grid-cols-2 gap-4 p-2 fluid-base">
            <Link
              href={currentPath + "?" + newQuery}
              className="p-2 text-center transition-colors bg-green-700 rounded-md h-max hover:bg-green-600 text-slate-200"
            >
              {t.Accept}
            </Link>
            <Link
              href={currentPath}
              className="p-2 text-center transition-colors bg-red-700 rounded-md h-max hover:bg-red-600 text-slate-200"
              onClick={() => {
                set_min_year(1900)
                set_max_year(currentYear)
                set_min_score(0)
                set_max_score(10)
                set_sort_by("popularity")
                set_sort_order("desc")
                set_with_genres([])
                set_without_genres([])
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
