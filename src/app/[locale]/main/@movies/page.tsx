import CardPopularContainer from "@/app/[locale]/components/CardPopularContainer"
import { popularMedia } from "@/app/api/FETCH_TMDB"
import { getTranslations } from "next-intl/server"
import CardPopularMedia from "@/app/[locale]/components/common/CardPopularMedia"
import { auth } from "@/app/lib/auth"

type Params = {
  params: {
    locale: Locale
  }
}

export default async function MainPage({ params: { locale } }: Params) {
  const session = await auth()
  const user_email = session?.user?.email
  const coverTMDBFolderPath = "https://image.tmdb.org/t/p/w154"
  const tData = getTranslations("MainPage")
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
              votes={movie.votes}
              genreIds={movie.genreIds}
              date={movie.date}
              user_email={user_email}
            />
          ))
        : t("Error")}
    </CardPopularContainer>
  )
}
