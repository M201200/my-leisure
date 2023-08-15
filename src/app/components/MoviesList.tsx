import { DataTMDB } from "@/api/DATA_TMDB"
import Card from "./Card"

export default async function MoviesList() {
  const movies = (await DataTMDB()).movies
  const movieGenres = (await DataTMDB()).movieGenres
  const moviesList = movies.map((movie) => {
    const genreList = movie.genre_ids.map(
      (genreId) => movieGenres.find((genre) => genre.id === genreId)!.name
    ) || ["Genres not found"]
    return (
      <Card
        key={movie.id}
        id={movie.id}
        catalog="movie"
        folderPath="https://image.tmdb.org/t/p/w500"
        coverPath={movie.poster_path}
        title={movie.title}
        genres={genreList}
        score={movie.vote_average}
      />
    )
  })

  return <section>{moviesList}</section>
}
