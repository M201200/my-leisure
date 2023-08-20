import type { Metadata } from "next"
import { MediaPagesTMDB, TotalPagesTMDB } from "@/api/DATA_TMDB"
import Card from "../../../components/Card"
import PagesNavigation from "../../components/PagesNavigation"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "TV Series",
}

export default async function TVShows({ params }: Props) {
  const series = (await MediaPagesTMDB(+params.query)).pageSeries
  if (series === undefined) return <section>Not found</section>
  const totalPages = (await TotalPagesTMDB()).totalPagesSeries
  const seriesList = series.map((TVShow) => {
    return (
      <Card
        key={TVShow.id}
        id={TVShow.id}
        catalog="tvshow"
        folderPath="https://image.tmdb.org/t/p/w342"
        coverPath={TVShow.poster_path}
        title={TVShow.name}
        score={TVShow.vote_average}
      />
    )
  })
  return (
    <>
      <section className="flex flex-wrap gap-4 px-4">{seriesList}</section>
      <PagesNavigation
        path="tvseries"
        currentPage={+params.query}
        totalPages={totalPages}
      />
    </>
  )
}
