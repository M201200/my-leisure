import { genresMedia } from "@/api/FETCH_TMDB"
import Link from "next-intl/link"
import { getTranslator } from "next-intl/server"

export default async function Footer({ locale }: { locale: Locale }) {
  const tData = getTranslator(locale, "Footer")
  const movieGenresData = genresMedia(locale, "movie")
  const tvGenresData = genresMedia(locale, "tv")
  const [t, movieGenres, tvGenres] = await Promise.all([
    tData,
    movieGenresData,
    tvGenresData,
  ])
  const someBookSubjects = [
    "Fantasy",
    "Historical Fiction",
    "Science Fiction",
    "Horror",
    "Thriller",
    "Detective",
    "Humor",
    "Romance",
    "Literature",
    "Poetry",
    "Comic books",
    "Manga",
    "Science",
    "Business",
    "Finance",
    "History",
    "Textbooks",
  ]

  return (
    <>
      <div className="col-start-1 col-end-2 row-start-3 bg-secondary" />
      <footer className="grid col-start-2 col-end-12 row-start-3 py-4 bg-secondary content-start min-h-[35vh] fluid-base text-textPrimary lg:grid-cols-3">
        {movieGenres ? (
          <section className="grid content-start gap-4 p-4 border-b-2 border-primary lg:border-r-2 gap-x-2 lg:border-b-0">
            <h2>{t("Movie genres")}</h2>

            <div className="grid grid-cols-2 gap-x-4 p-x-4">
              {movieGenres.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/category/discover/movies?with_genres=${genre.id}`}
                  locale={locale}
                  className="truncate transition duration-150 hover:scale-105"
                  title={genre.name}
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {tvGenres ? (
          <section className="grid content-start gap-4 p-4">
            <h2>{t("Series genres")}</h2>

            <div className="grid grid-cols-2 gap-x-4 p-x-4">
              {tvGenres.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/category/discover/tvseries?with_genres=${genre.id}`}
                  locale={locale}
                  className="truncate transition duration-150 hover:scale-105"
                  title={genre.name}
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid content-start gap-4 p-4 border-t-2 border-primary lg:border-l-2 lg:border-t-0">
          <h2>{t("Book subjects")}</h2>

          <div className="grid grid-cols-2 gap-x-4">
            {someBookSubjects.map((subject) => (
              <Link
                key={subject + "key"}
                href={`/category/discover/books?subject=${subject}`}
                locale={locale}
                className="truncate transition duration-150 hover:scale-105"
                title={subject}
              >
                {subject}
              </Link>
            ))}
          </div>
        </section>
      </footer>
      <div className="col-start-12 col-end-13 row-start-3 bg-secondary" />
    </>
  )
}
