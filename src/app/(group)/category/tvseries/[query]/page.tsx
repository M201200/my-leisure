import type { Metadata } from "next"
import { pageSeries, totalPagesSeries } from "@/api/DATA_TMDB"
import PagesNavigation from "../../../components/PagesNavigation"
import CardDetails from "@/app/(group)/components/CardDetails"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "TV Series",
}

export default async function TVShows({ params }: Props) {
  const series = await pageSeries(+params.query)
  if (series === undefined) return <section>Not found</section>
  const totalPages = await totalPagesSeries()
  const seriesList = series.map((TVShow) => {
    const props: Entry = {
      id: TVShow.id,
      catalog: "tvshow",
      folderPath: "https://image.tmdb.org/t/p/w342",
      coverPath: TVShow.poster_path,
      title: TVShow.name,
      score: TVShow.vote_average,
      genreIDs: TVShow.genre_ids,
      date: TVShow.first_air_date,
    }
    return <CardDetails key={TVShow.id} props={props} />
  })
  return (
    <>
      <section className="flex flex-wrap gap-4 px-4">{seriesList}</section>
      <PagesNavigation
        path="/category/tvseries"
        currentPage={+params.query}
        totalPages={totalPages}
      />
    </>
  )
}
