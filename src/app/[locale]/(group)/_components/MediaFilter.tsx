"use client"
import { useState } from "react"
import SelectMinMaxNumber from "./common/SelectMinMaxNumber"
import GenreCheck from "./common/GenreCheck"
import Link from "next-intl/link"
import { dictionaryMediaFilter } from "../../../../../messages/dictionary/clientSide"
import { usePathname } from "next-intl/client"
import { useSearchParams } from "next/navigation"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import Dropdown from "../../_components/Dropdown"

export default function MediaFilter({
  locale,
  genres,
}: {
  locale: Locale
  genres: Genre[]
}) {
  const t = dictionaryMediaFilter(locale)
  const currentYear = new Date().toISOString().slice(0, 4)

  const currentPath = usePathname()
  const query = useSearchParams()
  const newQuery = new URLSearchParams(query)
  const search_min_year = newQuery.get("min_year")
    ? +newQuery.get("min_year")!
    : 1900
  const search_max_year = newQuery.get("max_year")
    ? +newQuery.get("max_year")!
    : currentYear
  const search_min_score = newQuery.get("min_score")
    ? +newQuery.get("min_score")!
    : 0
  const search_max_score = newQuery.get("max_score")
    ? +newQuery.get("max_score")!
    : 10
  const search_sort_by = newQuery.get("sort_by")
    ? (newQuery.get("sort_by") as SortBy)
    : "popularity"
  const search_sort_order = newQuery.get("sort_order")
    ? (newQuery.get("sort_order") as "desc" | "asc")
    : "desc"
  const search_with_genres = newQuery.get("with_genres")
    ? newQuery
        .get("with_genres")!
        .split(",")
        .map((id) => +id)
    : []
  const search_without_genres = newQuery.get("without_genres")
    ? newQuery
        .get("without_genres")!
        .split(",")
        .map((id) => +id)
    : []

  const [min_year, set_min_year] = useState(search_min_year)
  const [max_year, set_max_year] = useState(search_max_year)
  const [min_score, set_min_score] = useState(search_min_score)
  const [max_score, set_max_score] = useState(search_max_score)
  const [sort_by, set_sort_by] = useState(search_sort_by)
  const [sort_order, set_sort_order] = useState(search_sort_order)
  const [with_genres, set_with_genres] = useState(search_with_genres)
  const [without_genres, set_without_genres] = useState(search_without_genres)
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
    <div className="grid gap-4 p-2 justify-items-center bg-secondary text-textPrimary fluid-base rounded-b-md">
      <div className="grid items-end gap-4 p-2 justify-items-center fluid-base sm:grid-cols-2 lg:grid-cols-4">
        <SelectMinMaxNumber
          firstNumber={1900}
          lastNumber={+currentYear}
          minNumber={min_year ? +min_year : 1900}
          maxNumber={max_year ? +max_year : +currentYear}
          label={t.ReleaseDate}
          setMInNumber={(event) => set_min_year(+event.target.value)}
          setMaxNumber={(event) => set_max_year(+event.target.value)}
        />
        <SelectMinMaxNumber
          firstNumber={0}
          lastNumber={10}
          minNumber={min_score ? +min_score : 0}
          maxNumber={max_score ? +max_score : 10}
          label={t.Score}
          setMInNumber={(event) => set_min_score(+event.target.value)}
          setMaxNumber={(event) => set_max_score(+event.target.value)}
        />
        <div>
          <label title={t.Sort} className="font-bold text-accent">
            {t.Sort}
          </label>
          <div className="flex p-1 rounded gap-x-1 bg-primary text-textSecondary">
            <button
              title="Descend/Ascend"
              className="px-1 text-textSecondary"
              onClick={() =>
                set_sort_order((prev) => (prev === "desc" ? "asc" : "desc"))
              }
            >
              {sort_order === "asc" ? <SlArrowUp /> : <SlArrowDown />}
            </button>
            <select
              className="p-1 cursor-pointer bg-primary text-textSecondary"
              value={sort_by || "popularity"}
              onChange={(event) => set_sort_by(event.target.value as SortBy)}
            >
              <option value="popularity">{t.Popularity}</option>
              <option value="primary_release_date">{t.ReleaseDate}</option>
              <option value="vote_average">{t.Score}</option>
              <option value="vote_count">{t.Votes}</option>
            </select>
          </div>
        </div>

        {genres?.length ? (
          <div className="grid content-end">
            <Dropdown
              buttonLabel={t.Genres}
              additionalContainerStyles="bg-primary text-textSecondary w-max p-1 rounded"
              buttonContainerStyles="rounded p-1"
            >
              <div className="p-1 overflow-hidden translate-y-1 rounded drop-shadow-xl bg-primary text-textSecondary w-max">
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
                        console.log(with_genres, without_genres)
                      } else {
                        set_with_genres((prev) => [...prev, genre.id])
                        set_without_genres((prev) =>
                          prev.filter((id) => +id !== genre.id)
                        )

                        console.log(with_genres, without_genres)
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
                        console.log(with_genres, without_genres)
                      } else {
                        set_without_genres((prev) => [...prev, genre.id])
                        set_with_genres((prev) =>
                          prev.filter((id) => +id !== genre.id)
                        )

                        console.log(with_genres, without_genres)
                      }
                    }}
                  />
                ))}
              </div>
            </Dropdown>
          </div>
        ) : null}
      </div>
      <div className="grid items-end grid-cols-2 gap-4 p-2 fluid-base">
        <Link
          href={currentPath + "?" + newQuery}
          locale={locale}
          className="p-2 text-center transition-colors bg-green-700 rounded-md h-max hover:bg-green-600 text-slate-200"
        >
          {t.Submit}
        </Link>
        <Link
          href={currentPath}
          locale={locale}
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
      </div>
    </div>
  )
}
