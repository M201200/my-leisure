import CardPopularContainer from "../_components/CardPopularContainer"
import { popularMedia } from "@/api/FETCH_TMDB"
import { getTranslator } from "next-intl/server"
import CardPopularMedia from "../_components/common/CardPopularMedia"
import Bookmark from "../_components/common/Bookmark"
import { popularBooks } from "@/api/FETCH_OPEN_LIBRARY"
import CardPopularBook from "../_components/common/CardPopularBook"
import { Suspense } from "react"
import MainPageFallback from "../_components/MainPageFallback"

type Params = {
  params: {
    locale: Locale
  }
}

export default async function MainPage({ params: { locale } }: Params) {
  const coverTMDBFolderPath = "https://image.tmdb.org/t/p/w154"
  const coverOpenLibraryFolderPath = "https://covers.openlibrary.org/b/id/"
  const tData = getTranslator(locale, "MainPage")
  const moviesData = popularMedia(locale, "movie")
  const seriesData = popularMedia(locale, "tv")
  const booksData = popularBooks()

  const [t, moviesResponse, seriesResponse, booksResponse] = await Promise.all([
    tData,
    moviesData,
    seriesData,
    booksData,
  ])

  const buttonLabels: [string, string] = [t("Prev"), t("Next")]
  const movies = moviesResponse?.results
  const movieCatalog = "movie"
  const movieList = movies?.map((movie) => ({
    id: movie.id!,
    title: "title" in movie ? movie.title || t("Unknown") : "",
    coverPath: movie.poster_path || "",
    score: movie.vote_average || 0,
    votes: movie.vote_count || 0,
    genreIds: movie.genre_ids || [],
    date: "release_date" in movie ? movie.release_date || t("Unknown") : "",
  }))

  const series = seriesResponse?.results
  const seriesCatalog = "tvshow"
  const seriesList = series?.map((tv) => ({
    id: tv.id!,
    title: "name" in tv ? tv.name || t("Unknown") : "",
    coverPath: tv.poster_path || "",
    score: tv.vote_average || 0,
    votes: tv.vote_count || 0,
    genreIds: tv.genre_ids || [],
    date: "first_air_date" in tv ? tv.first_air_date || t("Unknown") : "",
  }))

  const books = booksResponse?.works
  const booksCatalog = "book"
  const bookList = books?.map((book) => ({
    id: book.key.slice(7)!,
    title: book?.title || t("Unknown"),
    coverPath: book?.cover_i,
    author: book?.author_name,
    date: book?.first_publish_year,
    editions: book?.edition_count || 0,
    languages: book?.language,
  }))
  return (
    <Suspense fallback={<MainPageFallback />}>
      <section className="grid py-4 gap-y-4">
        <CardPopularContainer
          label={t("labelMovies")}
          buttonLabels={buttonLabels}
        >
          {movieList
            ? movieList.map((movie) => (
                <CardPopularMedia
                  key={movie.id}
                  id={movie.id!}
                  locale={locale}
                  catalog={movieCatalog}
                  folderPath={coverTMDBFolderPath}
                  coverPath={movie.coverPath}
                  title={movie.title}
                  score={movie.score}
                  votesAmount={movie.votes}
                  bookmark={
                    <Bookmark
                      props={{
                        ...movie,
                        catalog: movieCatalog,
                        folderPath: coverTMDBFolderPath,
                      }}
                    />
                  }
                />
              ))
            : t("Error")}
        </CardPopularContainer>
        <CardPopularContainer
          label={t("labelSeries")}
          buttonLabels={buttonLabels}
        >
          {seriesList
            ? seriesList.map((tv) => (
                <CardPopularMedia
                  key={tv.id}
                  id={tv.id!}
                  locale={locale}
                  catalog={seriesCatalog}
                  folderPath={coverTMDBFolderPath}
                  coverPath={tv.coverPath}
                  title={tv.title}
                  score={tv.score}
                  votesAmount={tv.votes}
                  bookmark={
                    <Bookmark
                      props={{
                        ...tv,
                        catalog: seriesCatalog,
                        folderPath: coverTMDBFolderPath,
                      }}
                    />
                  }
                />
              ))
            : t("Error")}
        </CardPopularContainer>
        <CardPopularContainer
          label={t("labelBooks")}
          buttonLabels={buttonLabels}
        >
          {bookList
            ? bookList.map((book) => (
                <CardPopularBook
                  key={book.id}
                  id={book.id!}
                  locale={locale}
                  catalog={booksCatalog}
                  folderPath={coverOpenLibraryFolderPath}
                  coverPath={book.coverPath}
                  title={book.title}
                  author={book?.author ? book?.author[0] : t("Unknown")}
                  bookmark={
                    <Bookmark
                      props={{
                        ...book,
                        catalog: booksCatalog,
                        folderPath: coverOpenLibraryFolderPath,
                      }}
                    />
                  }
                />
              ))
            : t("Error")}
        </CardPopularContainer>
      </section>
    </Suspense>
  )
}
