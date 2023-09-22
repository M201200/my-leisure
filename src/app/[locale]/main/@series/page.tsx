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
  )
}
