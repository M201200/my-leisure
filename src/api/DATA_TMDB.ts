import { TMDB } from "tmdb-ts"

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!)

export async function popularMovies() {
  return (await tmdb.movies.nowPlaying({ language: "en-En" })).results
}
export async function popularSeries() {
  return (await tmdb.tvShows.popular({ language: "en-En" })).results
}

export async function pageMovies(page: number) {
  return (await tmdb.discover.movie({ language: "en-En", page: page })).results
}
export async function pageSeries(page: number) {
  return (await tmdb.discover.tvShow({ language: "en-En", page: page })).results
}

export async function totalPagesMovies() {
  return (await tmdb.discover.movie({ language: "en-En" })).total_pages
}
export async function totalPagesSeries() {
  return (await tmdb.discover.tvShow({ language: "en-En" })).total_pages
}

export async function genresMovie() {
  return (await tmdb.genres.movies()).genres
}
export async function genresSeries() {
  return (await tmdb.genres.tvShows()).genres
}

export async function currentMovie(id: number) {
  return await tmdb.movies.details(id)
}
export async function currentTVShow(id: number) {
  return await tmdb.tvShows.details(id)
}

export async function searchMovie(query: string) {
  return (await tmdb.search.movies({ query: query })).results
}
export async function searchTVShow(query: string) {
  return (await tmdb.search.tvShows({ query: query })).results
}
