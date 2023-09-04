"use client"
import { useState } from "react"
import SelectMinMaxNumber from "./common/SelectMinMaxNumber"
import GenreCheck from "./common/GenreCheck"
import Link from "next-intl/link"
import { stringifyQuery } from "@/api/QueryActions"
import { dictionaryFilter } from "@/dictionary/clientSide"

export default function MediaFilter({
  locale,
  queryObject,
  genres,
}: {
  queryObject: DiscoverQuery | null
  locale: Locale
  genres: Genre[]
}) {
  const dictionary = dictionaryFilter(locale)
  const date = dictionary.ReleaseDate
  const currentYear = +new Date().toISOString().slice(0, 4)
  const [val, setVal] = useState<DiscoverQuery>({
    page: 1,
    minYear: queryObject?.minYear || 1990,
    maxYear: queryObject?.maxYear || currentYear,
    minScore: queryObject?.minScore || 0,
    maxScore: queryObject?.maxScore || 10,
    sort_by: queryObject?.sort_by || "popularity",
    sort_order: queryObject?.sort_order || "desc",
    with_genres: queryObject?.with_genres || [],
    without_genres: queryObject?.without_genres || [],
  })

  return (
    <div className="grid justify-items-center md:grid-cols-2 2xl:grid-cols-4">
      <SelectMinMaxNumber
        firstNumber={1900}
        lastNumber={currentYear}
        minNumber={val.minYear}
        maxNumber={val.maxYear}
        label={date}
        setMInNumber={(event) =>
          setVal({ ...val, minYear: +event.target.value })
        }
        setMaxNumber={(event) =>
          setVal({ ...val, maxYear: +event.target.value })
        }
      />
      <SelectMinMaxNumber
        firstNumber={0}
        lastNumber={10}
        minNumber={val.minScore}
        maxNumber={val.maxScore}
        label={dictionary.Score}
        setMInNumber={(event) =>
          setVal({ ...val, minScore: +event.target.value })
        }
        setMaxNumber={(event) =>
          setVal({ ...val, maxScore: +event.target.value })
        }
      />
      <div>
        <h5>{dictionary.Sort}</h5>
        <div className="flex">
          <select
            value={val.sort_by}
            onChange={(event) =>
              setVal({ ...val, sort_by: event.target.value as SortBy })
            }
          >
            <option value="popularity">{dictionary.Popularity}</option>
            <option value="primary_release_date">{date}</option>
            <option value="vote_average">{dictionary.Score}</option>
            <option value="vote_count">{dictionary.Votes}</option>
          </select>
          <input
            title="Descend/Ascend"
            type="checkbox"
            checked={val.sort_order === "asc"}
            onChange={(e) =>
              setVal({
                ...val,
                sort_order: val.sort_order === "desc" ? "asc" : "desc",
              })
            }
          />
        </div>
      </div>

      {genres && genres.length ? (
        <div className="w-60">
          <h5>{dictionary.Genres}</h5>
          <div>
            {genres.map((genre) => (
              <GenreCheck
                key={genre.id}
                genre={genre}
                withGenreCheck={val.with_genres!.some((id) => id === genre.id)}
                withoutGenreCheck={val.without_genres!.some(
                  (id) => id === genre.id
                )}
                //////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////
                withGenre={(e) =>
                  setVal(
                    val.with_genres.some((id) => id === genre.id)
                      ? {
                          ...val,
                          with_genres: [...val.with_genres, genre.id!],
                          without_genres: val.without_genres.filter(
                            (id) => id !== genre.id
                          ),
                        }
                      : {
                          ...val,
                          with_genres: val.with_genres.filter(
                            (id) => id !== genre.id
                          ),
                          without_genres: val.without_genres.filter(
                            (id) => id !== genre.id
                          ),
                        }
                  )
                }
                //////////////////////////////////////////////////////////////
                withoutGenre={(e) =>
                  setVal(
                    val.without_genres.some((id) => id === genre.id)
                      ? {
                          ...val,
                          without_genres: [...val.without_genres, genre.id!],
                          with_genres: val.with_genres.filter(
                            (id) => id !== genre.id
                          ),
                        }
                      : {
                          ...val,
                          with_genres: val.with_genres.filter(
                            (id) => id !== genre.id
                          ),
                          without_genres: val.without_genres.filter(
                            (id) => id !== genre.id
                          ),
                        }
                  )
                }
                //////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////
              />
            ))}
          </div>
        </div>
      ) : null}
      <Link href={stringifyQuery(val)} locale={locale}>
        {dictionary.Submit}
      </Link>
    </div>
  )
}
