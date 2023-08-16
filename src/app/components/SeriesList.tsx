import { DataTMDB } from "@/api/DATA_TMDB"
import Card from "./Card"

export default async function SeriesList() {
  const { series, TVGenres } = await DataTMDB()
  const seriesList = series.map((entry) => {
    const genreList = entry.genre_ids.map(
      (genreId) => TVGenres.find((genre) => genre.id === genreId)!.name
    ) || ["Genres not found"]
    return (
      <Card
        key={entry.id}
        id={entry.id}
        catalog="serial"
        folderPath="https://image.tmdb.org/t/p/w500"
        coverPath={entry.poster_path}
        title={entry.name}
        genres={genreList}
        score={entry.vote_average}
      />
    )
  })

  return seriesList
}
