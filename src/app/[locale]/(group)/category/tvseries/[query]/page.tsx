import type { Metadata } from "next"
import { genresSeries, pageSeries } from "@/api/FETCH_TMDB"
import { parseQuery } from "@/api/QueryActions"
import Pagination from "../../../components/Pagination"
import CardDetails from "../../../components/common/CardDetails"
import CardDetailsContainer from "../../../components/CardDetailsContainer"
import MediaFilter from "../../../components/MediaFilter"
import { TV } from "tmdb-ts"
import { getTranslator } from "next-intl/server"
import pickGenres from "@/data/tmdbGenres"
import Bookmark from "@/app/[locale]/components/common/Bookmark"

type Props = {
  params: {
    query: string
    locale: Locale
  }
}

export const metadata: Metadata = {
  title: "TV Series",
}

export default async function TVShows({ params }: Props) {
  const genres = (await genresSeries(params.locale)) || pickGenres("tvshow")
  const t = await getTranslator(params.locale, "SearchResults")
  const formattedQuery: DiscoverQuery = parseQuery(params.query)
  const series = (await pageSeries(
    formattedQuery,
    "results",
    params.locale
  )) as TV[]
  const totalPages = (await pageSeries(
    formattedQuery,
    "totalPages",
    params.locale
  )) as number
  const totalResults = (await pageSeries(
    formattedQuery,
    "totalResults",
    params.locale
  )) as number
  const totalAmount = totalResults > 10000 ? 10000 : totalResults
  const seriesList =
    series && series.length ? (
      series.map((TVShow) => {
        const props: Entry = {
          id: TVShow.id,
          catalog: "tvshow",
          locale: params.locale,
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: TVShow.poster_path,
          title: TVShow.name,
          score: TVShow.vote_average,
          votes: TVShow.vote_count,
          genreIds: TVShow.genre_ids,
          date: TVShow.first_air_date,
        }
        return (
          <CardDetails
            key={TVShow.id}
            props={props}
            button={<Bookmark props={props} />}
          />
        )
      })
    ) : (
      <section>{t("NotFound")}</section>
    )
  return (
    <>
      <MediaFilter
        queryObject={formattedQuery}
        locale={params.locale}
        genres={genres}
      />
      <CardDetailsContainer label={t("Series")} hasCount={totalAmount}>
        {seriesList}
      </CardDetailsContainer>
      <Pagination
        path="/category/tvseries"
        queryObject={formattedQuery}
        totalPages={totalPages}
      />
    </>
  )
}
