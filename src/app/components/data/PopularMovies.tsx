import { HomePageTMDB } from "@/api/DATA_TMDB"
import Card from "../Card"

export default async function MoviesList() {
  const { popularMovies } = await HomePageTMDB()
  const moviesList = popularMovies.map((movie) => {
    return (
      <Card
        key={movie.id}
        id={movie.id}
        catalog="movie"
        folderPath="https://image.tmdb.org/t/p/w342"
        coverPath={movie.poster_path}
        title={movie.title}
        score={movie.vote_average}
      />
    )
  })

  return moviesList
}
