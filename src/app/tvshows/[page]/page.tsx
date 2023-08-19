import type { Metadata } from "next"
import { MediaPagesTMDB, TotalPagesTMDB } from "@/api/DATA_TMDB"
import Card from "../../components/Card"
import PagesNavigation from "../../components/PagesNavigation"

type Props = {
  params: { page: string }
}

export const metadata: Metadata = {
  title: "TV Shows",
}

export default async function TVShows({ params }: Props) {
  const series = (await MediaPagesTMDB(+params.page)).pageSeries
  if (series === undefined) return <section>Not found</section>
  const totalPages = (await TotalPagesTMDB()).totalPagesSeries
  const seriesList = series.map((TVShow) => {
    return (
      <Card
        key={TVShow.id}
        id={TVShow.id}
        catalog="movie"
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
        path="movies"
        currentPage={+params.page}
        totalPages={totalPages}
      />
    </>
  )
}
