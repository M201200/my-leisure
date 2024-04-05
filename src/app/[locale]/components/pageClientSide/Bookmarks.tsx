"use client"
import { useBookmarks } from "@/utils/hooks/zustand/useBookmarks"

import CardDetailsContainer from "../CardDetailsContainer"
import CardBookDetails from "../common/CardBookDetails"
import CardMediaDetails from "../common/CardMediaDetails"

type BookmarksProps = {
  locale: Locale
  userEmail: string | null | undefined
  tl: {
    Books: string
    Movies: string
    Series: string
    Nothing: string
  }
}

export default function Bookmarks({ tl, locale, userEmail }: BookmarksProps) {
  const books = useBookmarks((state) => state.books)
  const movies = useBookmarks((state) => state.movies)
  const series = useBookmarks((state) => state.series)

  return (
    <section className="text-textPrimary min-h-[40vh]">
      {books?.length || movies?.length || series?.length ? (
        <>
          {books?.length ? (
            <CardDetailsContainer
              label={tl.Books}
              maxHeight="max-h-125"
              hasCount={books.length}
              locale={locale}
              labelSize="fluid-xl"
            >
              {books.map((entry) => (
                <CardBookDetails
                  key={entry.id}
                  props={{
                    ...entry,
                    locale: locale,
                    user_email: userEmail,
                    coverPath: entry.coverPath || 0,
                  }}
                  locale={locale}
                />
              ))}
            </CardDetailsContainer>
          ) : null}
          {movies?.length ? (
            <CardDetailsContainer
              label={tl.Movies}
              maxHeight="max-h-125"
              hasCount={movies.length}
              locale={locale}
              labelSize="fluid-xl"
            >
              {movies.map((entry) => (
                <CardMediaDetails
                  key={entry.id}
                  props={{
                    ...entry,
                    locale: locale,
                    user_email: userEmail,
                  }}
                  locale={locale}
                />
              ))}
            </CardDetailsContainer>
          ) : null}
          {series?.length ? (
            <CardDetailsContainer
              label={tl.Series}
              maxHeight="max-h-125"
              hasCount={series.length}
              locale={locale}
              labelSize="fluid-xl"
            >
              {series.map((entry) => (
                <CardMediaDetails
                  key={entry.id}
                  props={{
                    ...entry,
                    locale: locale,
                    user_email: userEmail,
                  }}
                  locale={locale}
                />
              ))}
            </CardDetailsContainer>
          ) : null}
        </>
      ) : (
        <p>{tl.Nothing}</p>
      )}
    </section>
  )
}
