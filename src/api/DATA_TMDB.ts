import { TMDB } from "tmdb-ts"

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!)

export async function HomePageTMDB() {
  const popularMovies = (await tmdb.movies.nowPlaying({ language: "en-En" }))
    .results
  const popularSeries = (await tmdb.tvShows.popular({ language: "en-En" }))
    .results
  return { popularMovies, popularSeries }
}

export async function MediaPagesTMDB(page: number) {
  const pageMovies = (
    await tmdb.discover.movie({ language: "en-En", page: page })
  ).results
  const pageSeries = (
    await tmdb.discover.tvShow({ language: "en-En", page: page })
  ).results
  return { pageMovies, pageSeries }
}

export async function TotalPagesTMDB() {
  const totalPagesMovies = (await tmdb.discover.movie({ language: "en-En" }))
    .total_pages
  const totalPagesSeries = (await tmdb.discover.tvShow({ language: "en-En" }))
    .total_pages
  return { totalPagesMovies, totalPagesSeries }
}

export async function GenresTMDB() {
  const genresMovie = (await tmdb.genres.movies()).genres
  const genresSeries = (await tmdb.genres.tvShows()).genres
  return { genresMovie, genresSeries }
}

export async function EntryTMDB(id: number) {
  const currentMovie = await tmdb.movies.details(id)
  const currentTVShow = await tmdb.tvShows.details(id)
  return { currentMovie, currentTVShow }
}

export async function SearchTMDB(query: string) {
  const searchMovie = (await tmdb.search.movies({ query: query })).results
  const searchSeries = (await tmdb.search.tvShows({ query: query })).results
  return { searchMovie, searchSeries }
}
