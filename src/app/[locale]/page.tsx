import CardPopularContainer from "./components/CardPopularContainer"
import { popularMovies, popularSeries } from "@/api/FETCH_TMDB"
import { getTranslator } from "next-intl/server"
import CardPopular from "./components/common/CardPopular"
import Bookmark from "./components/common/Bookmark"

type Params = {
  params: {
    locale: Locale
  }
}

export default async function HomePage({ params: { locale } }: Params) {
  const coverFolderPath = "https://image.tmdb.org/t/p/w342"

  const tData = getTranslator(locale, "MainPage")
  const moviesData = popularMovies(locale)
  const seriesData = popularSeries(locale)

  const [t, moviesResponse, seriesResponse] = await Promise.all([
    tData,
    moviesData,
    seriesData,
  ])

  const movies = moviesResponse.results
  const movieCatalog = "movie"
  const movieList = movies?.map((movie) => ({
    id: movie.id!,
    title: movie.title || "No title",
    coverPath: movie.poster_path || "",
    score: movie.vote_average || 0,
    votes: movie.vote_count || 0,
    genreIds: movie.genre_ids || [],
    date: movie.release_date || "Unknown",
  }))

  const series = seriesResponse.results
  const seriesCatalog = "tvshow"
  const seriesList = series?.map((tv) => ({
    id: tv.id!,
    title: tv.name || "No title",
    coverPath: tv.poster_path || "",
    score: tv.vote_average || 0,
    votes: tv.vote_count || 0,
    genreIds: tv.genre_ids || [],
    date: tv.first_air_date || "Unknown",
  }))

  return (
    <div className="grid gap-y-4">
      <CardPopularContainer label={t("labelMovies")}>
        {movieList
          ? movieList.map((movie) => (
              <CardPopular
                key={movie.id}
                id={movie.id!}
                locale={locale}
                catalog={movieCatalog}
                folderPath={coverFolderPath}
                coverPath={movie.coverPath}
                title={movie.title}
                score={movie.score}
                votesAmount={movie.votes}
                bookmark={
                  <Bookmark
                    props={{
                      ...movie,
                      catalog: movieCatalog,
                      folderPath: coverFolderPath,
                      locale: locale,
                    }}
                  />
                }
              />
            ))
          : "Something went wrong"}
      </CardPopularContainer>
      <CardPopularContainer label={t("labelSeries")}>
        {seriesList
          ? seriesList.map((tv) => (
              <CardPopular
                key={tv.id}
                id={tv.id!}
                locale={locale}
                catalog={seriesCatalog}
                folderPath={coverFolderPath}
                coverPath={tv.coverPath}
                title={tv.title}
                score={tv.score}
                votesAmount={tv.votes}
                bookmark={
                  <Bookmark
                    props={{
                      ...tv,
                      catalog: seriesCatalog,
                      folderPath: coverFolderPath,
                      locale: locale,
                    }}
                  />
                }
              />
            ))
          : "Something went wrong"}
      </CardPopularContainer>
    </div>
  )
}
