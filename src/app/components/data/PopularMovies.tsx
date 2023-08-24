import { popularMovies } from "@/api/DATA_TMDB"
import CardMainPage from "../CardMainPage"

export default async function MoviesList() {
  return (await popularMovies()).map((movie) => {
    return (
      <CardMainPage
        key={movie.id}
        id={movie.id}
        catalog="movie"
        folderPath="https://image.tmdb.org/t/p/w342"
        coverPath={movie.poster_path}
        title={movie.title}
        score={movie.vote_average}
        genreIDs={movie.genre_ids}
        date={movie.release_date}
      />
    )
  })
}
