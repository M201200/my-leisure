import { TMDB } from "tmdb-ts"

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!)

export async function DataTMDB() {
  const series = (await tmdb.tvShows.popular({ language: "en-En" })).results
  const movies = (await tmdb.movies.nowPlaying({ language: "en-En" })).results
  const movieGenres = (await tmdb.genres.movies()).genres
  const TVGenres = (await tmdb.genres.tvShows()).genres
  return { series, movies, movieGenres, TVGenres }
}
