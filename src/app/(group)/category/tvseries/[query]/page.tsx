import type { Metadata } from "next"
import { pageSeries } from "@/api/FETCH_TMDB"
import { parseQuery } from "@/api/QueryActions"
import Pagination from "../../../components/Pagination"
import CardDetails from "@/app/(group)/components/common/CardDetails"
import CardDetailsContainer from "@/app/(group)/components/CardDetailsContainer"
import MediaFilter from "@/app/(group)/components/MediaFilter"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "TV Series",
}

export default async function TVShows({ params }: Props) {
  const formattedQuery: DiscoverQuery = parseQuery(params.query)
  const series = (await pageSeries(formattedQuery)).results
  const totalPages = (await pageSeries(formattedQuery)).totalPages
  const totalAmount =
    (await pageSeries(formattedQuery)).totalResults > 10000
      ? 10000
      : (await pageSeries(formattedQuery)).totalResults
  const seriesList =
    series && series.length ? (
      series.map((TVShow) => {
        const props: Entry = {
          id: TVShow.id,
          catalog: "tvshow",
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: TVShow.poster_path,
          title: TVShow.name,
          score: TVShow.vote_average,
          votesAmount: TVShow.vote_count,
          genreIDs: TVShow.genre_ids,
          date: TVShow.first_air_date,
        }
        return <CardDetails key={TVShow.id} props={props} />
      })
    ) : (
      <section>No coincidences.</section>
    )
  return (
    <>
      <MediaFilter media="tvshow" queryObject={formattedQuery} />
      <CardDetailsContainer label="Series:" hasCount={totalAmount}>
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
