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
  const seriesData = popularMedia(locale, "tv")
  const [t, seriesResponse] = await Promise.all([tData, seriesData])

  const buttonLabels: [string, string] = [t("Prev"), t("Next")]
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
  return (
    <CardPopularContainer label={t("labelSeries")} buttonLabels={buttonLabels}>
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
              votes={tv.votes}
              genreIds={tv.genreIds}
              date={tv.date}
              user_email={user_email}
            />
          ))
        : t("Error")}
    </CardPopularContainer>
  )
}
