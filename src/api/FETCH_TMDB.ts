import {
  Credits,
  Movie,
  MovieDetails,
  MovieDiscoverResult,
  PopularMovies,
  PopularTvShows,
  Search,
  SortOption,
  TV,
  TvShowDetails,
  TvShowDiscoverResult,
  WatchProviders,
} from "./typesTMDB"

type FetchTmdbData = {
  baseURL?: URL
  additionURL?: string
  queryList?: Query[]
  method?: "GET" | "POST" | "PUT"
  accept?: "application/json"
}

type Query = [string, string | number | boolean | null | undefined]

const BASE_TMDB_URL = new URL("https://api.themoviedb.org/3/")

export async function fetchTmdbData({
  baseURL = BASE_TMDB_URL,
  additionURL,
  queryList,
  method = "GET",
  accept = "application/json",
}: FetchTmdbData) {
  const url = additionURL ? new URL(additionURL, baseURL) : baseURL
  if (queryList?.length)
    queryList.forEach((query) => {
      if (query[1] !== null || query[1] !== undefined)
        /* @ts-ignore */
        url.searchParams.set(query[0], query[1])
    })
  const options = {
    method: method,
    headers: {
      accept: accept,
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
    },
  }
  const response = await fetch(url, options)
  return response.json()
}

export async function popularMovies(language: Locale) {
  const page = +(Math.random() * 20 + 1).toFixed()
  const popularMoviesURL = "movie/popular/"

  const response = await fetchTmdbData({
    additionURL: popularMoviesURL,
    queryList: [
      ["language", language],
      ["page", page],
    ],
  })

  const result: PopularMovies = await response
  return result
}

export async function popularSeries(language: Locale) {
  const page = +(Math.random() * 20 + 1).toFixed()
  const popularSeriesURL = "tv/popular/"

  const response = await fetchTmdbData({
    additionURL: popularSeriesURL,
    queryList: [
      ["language", language],
      ["page", page],
    ],
  })

  const result: PopularTvShows = await response

  return result
}

export async function pageMovies(props: DiscoverQuery, locale: Locale) {
  const sortBy = `${props.sort_by}.${props.sort_order}` as SortOption
  const withGenres = props.with_genres?.length
    ? props.with_genres.join(",")
    : ""
  const withoutGenres = props.without_genres?.length
    ? props.without_genres.join(",")
    : ""
  const currentYear = +new Date().toISOString().slice(0, 4)
  const maxYear =
    props.maxYear === currentYear
      ? new Date().toISOString().slice(0, 10)
      : `${props.maxYear}-01-01`
  const dateMin = `${props.minYear}-01-01`
  const dateMax = `${maxYear}`

  const discoverMoviesURL = "discover/movie/"

  const response = await fetchTmdbData({
    additionURL: discoverMoviesURL,
    queryList: [
      ["language", locale],
      ["page", 1],
      ["primary_release_date.gte", dateMin],
      ["primary_release_date.lte", dateMax],
      ["vote_average.gte", props.minScore ?? 0],
      ["vote_average.lte", props.maxScore ?? 10],
      ["sort_by", sortBy],
      ["with_genres", withGenres],
      ["without_genres", withoutGenres],
    ],
  })

  const result: MovieDiscoverResult = await response

  return result
}

export async function pageSeries(props: DiscoverQuery, locale: Locale) {
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
      : `${props.maxYear}-01-01`
  const dateMin = `${props.minYear}-01-01`
  const dateMax = `${maxYear}`

  const discoverSeriesURL = "discover/tv/"

  const response = await fetchTmdbData({
    additionURL: discoverSeriesURL,
    queryList: [
      ["language", locale],
      ["page", 1],
      ["first_air_date.gte", dateMin],
      ["first_air_date.lte", dateMax],
      ["vote_average.gte", props.minScore ?? 0],
      ["vote_average.lte", props.maxScore ?? 10],
      ["sort_by", sortBy],
      ["with_genres", withGenres],
      ["without_genres", withoutGenres],
    ],
  })

  const result: TvShowDiscoverResult = await response

  return result
}

export async function currentMovieDetails(id: number, locale: Locale) {
  const detailsMovieURL = `movie/${id}/`

  const response = await fetchTmdbData({
    additionURL: detailsMovieURL,
    queryList: [["language", locale]],
  })

  const result: MovieDetails = await response

  return result
}

export async function currentMovieCredits(id: number, locale: Locale) {
  const creditsMovieURL = `movie/${id}/credits/`

  const response = await fetchTmdbData({
    additionURL: creditsMovieURL,
    queryList: [["language", locale]],
  })

  const result: Credits = await response

  return result
}

export async function currentMovieProviders(id: number, locale: Locale) {
  const providerMovieURL = `movie/${id}/watch/providers/`

  const response = await fetchTmdbData({
    additionURL: providerMovieURL,
  })

  const result: WatchProviders = await response

  const results = result.results
  const defaultLink = results?.US?.link
  const defaultProviders =
    results?.US.buy || results?.US?.rent || results?.US?.flatrate
  let providerLink
  let watchProviders

  switch (locale) {
    case "en":
      {
        providerLink = defaultLink
        watchProviders = defaultProviders
      }
      break
    case "ro":
      {
        providerLink = results?.RO?.link || defaultLink
        watchProviders = results?.RO?.flatrate || defaultProviders
      }
      break
    case "ru":
      {
        providerLink = results?.RU?.link || defaultLink
        watchProviders =
          results?.RU.buy ||
          results?.RU.flatrate ||
          results?.RU.rent ||
          defaultProviders
      }
      break
  }

  return { providerLink, watchProviders }
}

export async function currentTVShowDetails(id: number, locale: Locale) {
  const detailsTVShowURL = `movie/${id}/`

  const response = await fetchTmdbData({
    additionURL: detailsTVShowURL,
    queryList: [["language", locale]],
  })

  const result: TvShowDetails = await response

  return result
}

export async function currentTVShowCredits(id: number, locale: Locale) {
  const creditsTVShowURL = `movie/${id}/credits/`

  const response = await fetchTmdbData({
    additionURL: creditsTVShowURL,
    queryList: [["language", locale]],
  })

  const result: Credits = await response

  return result
}

export async function currentTVShowProviders(id: number, locale: Locale) {
  const providerTVShowURL = `tv/${id}/watch/providers/`

  const response = await fetchTmdbData({
    additionURL: providerTVShowURL,
  })

  const result: WatchProviders = await response

  const results = result.results
  const defaultLink = results?.US?.link
  const defaultProviders =
    results?.US.buy || results?.US?.rent || results?.US?.flatrate
  let providerLink
  let watchProviders

  switch (locale) {
    case "en":
      {
        providerLink = defaultLink
        watchProviders = defaultProviders
      }
      break
    case "ro":
      {
        providerLink = results?.RO?.link || defaultLink
        watchProviders = results?.RO?.flatrate || defaultProviders
      }
      break
    case "ru":
      {
        providerLink = results?.RU?.link || defaultLink
        watchProviders =
          results?.RU.buy ||
          results?.RU.flatrate ||
          results?.RU.rent ||
          defaultProviders
      }
      break
  }

  return { providerLink, watchProviders }
}

export async function searchMovie(
  query: string,
  locale: Locale,
  page?: number
) {
  const searchMovieURL = `search/movie/`

  const response = await fetchTmdbData({
    additionURL: searchMovieURL,
    queryList: [
      ["language", locale],
      ["query", encodeURIComponent(query)],
      ["page", page],
    ],
  })

  const result: Search<Movie> = await response

  return result
}

export async function searchTVShow(
  query: string,
  locale: Locale,
  page?: number
) {
  const searchTVShowURL = `search/tv/`

  const response = await fetchTmdbData({
    additionURL: searchTVShowURL,
    queryList: [
      ["language", locale],
      ["query", encodeURIComponent(query)],
      ["page", page],
    ],
  })

  const result: Search<TV> = await response

  return result
}

export async function genresMovie(locale: Locale) {
  const genreMovieURL = `genre/movie/list/`

  const response = await fetchTmdbData({
    additionURL: genreMovieURL,
    queryList: [["language", locale]],
  })

  const result: Genre[] = await response
  return result
}
export async function genresTVShow(locale: Locale) {
  const genreMovieURL = `genre/tv/list/`

  const response = await fetchTmdbData({
    additionURL: genreMovieURL,
    queryList: [["language", locale]],
  })

  const result: Genre[] = await response
  return result
}
