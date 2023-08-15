import { TMDB } from "tmdb-ts"

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!)

export async function DataTMDB() {
  const series = (await tmdb.tvShows.popular({ language: "en-US" })).results
  const movies = (await tmdb.movies.topRated({ language: "en-US" })).results
  const movieGenres = (await tmdb.genres.movies()).genres
  const TVGenres = (await tmdb.genres.tvShows()).genres
  return { series, movies, movieGenres, TVGenres }
}
