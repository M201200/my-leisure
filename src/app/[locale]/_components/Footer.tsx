import { genresMedia } from "@/api/FETCH_TMDB"
import Link from "next-intl/link"

export default async function Footer({ locale }: { locale: Locale }) {
  const movieGenresData = genresMedia(locale, "movie")
  const tvGenresData = genresMedia(locale, "tv")
  const [movieGenres, tvGenres] = await Promise.all([
    movieGenresData,
    tvGenresData,
  ])
  const someBookSubjects = [
    "Fantasy",
    "Historical Fiction",
    "Horror",
    "Humor",
    "Literature",
    "Magic",
    "Detective",
    "Poetry",
    "Romance",
    "Science Fiction",
    "Thriller",
  ]

  return (
    <footer className="grid grid-cols-3 col-start-2 col-end-12 row-start-3">
      {movieGenres ? (
        <section className="flex flex-wrap gap-x-2">
          <h2>{"Movie genres: "}</h2>

          <span>
            {movieGenres.genres.map((genre, id, arr) =>
              id < arr.length - 1 ? (
                <Link
                  key={genre.id}
                  href={`/category/discover/movies?with_genres=${genre.id}`}
                  locale={locale}
                >
                  {genre.name},{" "}
                </Link>
              ) : (
                <Link
                  key={genre.id}
                  href={`/category/discover/movies?with_genres=${genre.id}`}
                  locale={locale}
                >
                  {genre.name}
                </Link>
              )
            )}
          </span>
        </section>
      ) : null}

      {tvGenres ? (
        <section className="flex flex-wrap gap-x-2">
          <h2>{"Series genres: "}</h2>
          <span>
            {tvGenres.genres.map((genre, id, arr) =>
              id < arr.length - 1 ? (
                <Link
                  key={genre.id}
                  href={`/category/discover/tvseries?with_genres=${genre.id}`}
                  locale={locale}
                >
                  {genre.name},{" "}
                </Link>
              ) : (
                <Link
                  key={genre.id}
                  href={`/category/discover/tvseries?with_genres=${genre.id}`}
                  locale={locale}
                >
                  {genre.name}
                </Link>
              )
            )}
          </span>
        </section>
      ) : null}

      <section>
        <h2>{"Some book subjects: "}</h2>
        <span>
          {someBookSubjects.map((subject, id, arr) =>
            id < arr.length - 1 ? (
              <Link
                key={subject + "key"}
                href={`/category/discover/books?subject=${subject}`}
                locale={locale}
              >
                {subject},{" "}
              </Link>
            ) : (
              <Link
                key={subject + "key"}
                href={`/category/discover/books?subject=${subject}`}
                locale={locale}
              >
                {subject}
              </Link>
            )
          )}
        </span>
      </section>
    </footer>
  )
}
