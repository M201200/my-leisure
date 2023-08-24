import { popularSeries } from "@/api/DATA_TMDB"
import CardMainPage from "../CardMainPage"

export default async function SeriesList() {
  return (await popularSeries()).map((entry) => {
    return (
      <CardMainPage
        key={entry.id}
        id={entry.id}
        catalog="tvshow"
        folderPath="https://image.tmdb.org/t/p/w342"
        coverPath={entry.poster_path}
        title={entry.name}
        score={entry.vote_average}
        genreIDs={entry.genre_ids}
        date={entry.first_air_date}
      />
    )
  })
}
