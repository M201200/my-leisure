import { SortOption, TMDB } from "tmdb-ts"

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!)

export async function popularMovies() {
  const page = (Math.random() * 20 + 1).toFixed()
  return (await tmdb.movies.nowPlaying({ language: "en-En", page: +page }))
    .results
}
export async function popularSeries() {
  const page = (Math.random() * 20 + 1).toFixed()
  return (await tmdb.tvShows.popular({ language: "en-En", page: +page }))
    .results
}

export async function pageMovies(props: DiscoverQuery) {
  const sortBy = `${props.sort_by}.${props.sort_order}` as SortOption
  const withGenres = props.with_genres?.length
    ? props.with_genres.join(",")
    : undefined
  const withoutGenres = props.without_genres?.length
    ? props.without_genres.join(",")
    : undefined
  const currentYear = +new Date().toISOString().slice(0, 4)
  const maxYear =
    props.maxYear === currentYear
      ? new Date().toISOString().slice(0, 10)
      : props.maxYear.toString()
  const results = (
    await tmdb.discover.movie({
      language: "en-En",
      page: props.page,
      "primary_release_date.gte": `${props.minYear}-01-01`,
      "primary_release_date.lte": maxYear,
      "vote_average.gte": props.minScore,
      "vote_average.lte": props.maxScore,
      sort_by: sortBy,
      with_genres: withGenres,
      without_genres: withoutGenres,
    })
  ).results

  const totalPages = (
    await tmdb.discover.movie({
      language: "en-En",
      page: props.page,
      "primary_release_date.gte": `${props.minYear}-01-01`,
      "primary_release_date.lte": maxYear,
      "vote_average.gte": props.minScore,
      "vote_average.lte": props.maxScore,
      sort_by: sortBy,
      with_genres: withGenres,
      without_genres: withoutGenres,
    })
  ).total_pages

  const totalResults = (
    await tmdb.discover.movie({
      language: "en-En",
      page: props.page,
      "primary_release_date.gte": `${props.minYear}-01-01`,
      "primary_release_date.lte": maxYear,
      "vote_average.gte": props.minScore,
      "vote_average.lte": props.maxScore,
      sort_by: sortBy,
      with_genres: withGenres,
      without_genres: withoutGenres,
    })
  ).total_results

  return { results, totalPages, totalResults }
}

export async function pageSeries(props: DiscoverQuery) {
  const sortBy = `${props.sort_by}.${props.sort_order}` as SortOption
  const withGenres = props.with_genres?.length
    ? props.with_genres.join(",")
    : undefined
  const withoutGenres = props.without_genres?.length
    ? props.without_genres.join(",")
    : undefined
  const currentYear = +new Date().toISOString().slice(0, 4)
  const maxYear =
    props.maxYear === currentYear
      ? new Date().toISOString().slice(0, 10)
      : props.maxYear.toString()
  const results = (
    await tmdb.discover.tvShow({
      language: "en-En",
      page: props.page,
      "first_air_date.gte": `${props.minYear}-01-01`,
      "first_air_date.lte": maxYear,
      "vote_average.gte": props.minScore,
      "vote_average.lte": props.maxScore,
      sort_by: sortBy,
      with_genres: withGenres,
      without_genres: withoutGenres,
    })
  ).results

  const totalPages = (
    await tmdb.discover.tvShow({
      language: "en-En",
      page: props.page,
      "first_air_date.gte": `${props.minYear}-01-01`,
      "first_air_date.lte": maxYear,
      "vote_average.gte": props.minScore,
      "vote_average.lte": props.maxScore,
      sort_by: sortBy,
      with_genres: withGenres,
      without_genres: withoutGenres,
    })
  ).total_pages

  const totalResults = (
    await tmdb.discover.tvShow({
      language: "en-En",
      page: props.page,
      "first_air_date.gte": `${props.minYear}-01-01`,
      "first_air_date.lte": maxYear,
      "vote_average.gte": props.minScore,
      "vote_average.lte": props.maxScore,
      sort_by: sortBy,
      with_genres: withGenres,
      without_genres: withoutGenres,
    })
  ).total_results

  return { results, totalPages, totalResults }
}

export async function currentMovie(id: number) {
  return await tmdb.movies.details(id)
}
export async function currentTVShow(id: number) {
  return await tmdb.tvShows.details(id)
}

export async function searchMovie(query: string, page?: number) {
  const results = (await tmdb.search.movies({ query: query, page: page }))
    .results
  const totalPages = (await tmdb.search.movies({ query: query })).total_pages
  const totalResults = (await tmdb.search.movies({ query: query }))
    .total_results
  return { results, totalPages, totalResults }
}
export async function searchTVShow(query: string, page?: number) {
  const results = (await tmdb.search.tvShows({ query: query, page: page }))
    .results
  const totalPages = (await tmdb.search.tvShows({ query: query })).total_pages
  const totalResults = (await tmdb.search.tvShows({ query: query }))
    .total_results
  return { results, totalPages, totalResults }
}

export async function genresMovie() {
  return (await tmdb.genres.movies()).genres
}
export async function genresSeries() {
  return (await tmdb.genres.tvShows()).genres
}
