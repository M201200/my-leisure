import { HomePageTMDB } from "@/api/DATA_TMDB"
import Card from "./Card"

export default async function SeriesList() {
  const { popularSeries } = await HomePageTMDB()
  const seriesList = popularSeries.map((entry) => {
    return (
      <Card
        key={entry.id}
        id={entry.id}
        catalog="tvshow"
        folderPath="https://image.tmdb.org/t/p/w342"
        coverPath={entry.poster_path}
        title={entry.name}
        score={entry.vote_average}
      />
    )
  })

  return seriesList
}
