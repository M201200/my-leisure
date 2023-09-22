import CardPopularContainer from "../../_components/CardPopularContainer"
import { popularMedia } from "@/api/FETCH_TMDB"
import { getTranslator } from "next-intl/server"
import CardPopularMedia from "../../_components/common/CardPopularMedia"
import Bookmark from "../../_components/common/Bookmark"

type Params = {
  params: {
    locale: Locale
  }
}

export default async function MainPage({ params: { locale } }: Params) {
  const coverTMDBFolderPath = "https://image.tmdb.org/t/p/w154"
  const tData = getTranslator(locale, "MainPage")
  const moviesData = popularMedia(locale, "movie")

  const [t, moviesResponse] = await Promise.all([tData, moviesData])

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

  return (
    <CardPopularContainer label={t("labelMovies")} buttonLabels={buttonLabels}>
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
  )
}
