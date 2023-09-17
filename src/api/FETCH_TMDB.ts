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
      if (query[1] !== undefined && query[1] !== null)
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

export async function popularMedia(language: Locale, media: "movie" | "tv") {
  const page = +(Math.random() * 20 + 1).toFixed()
  const popularMoviesURL = `${media}/popular`

  const response = await fetchTmdbData({
    additionURL: popularMoviesURL,
    queryList: [
      ["language", language],
      ["page", page],
    ],
  })

  const result: PopularMovies | PopularTvShows = await response
  return result
}

export async function pageMedia(
  {
    page,
    min_year,
    max_year,
    max_score,
    min_score,
    sort_by,
    sort_order,
    with_genres,
    without_genres,
  }: DiscoverQuery,
  locale: Locale,
  media: "movie" | "tvshow"
) {
  const sortBy =
    sort_by && sort_order ? (`${sort_by}.${sort_order}` as SortOption) : null
  const currentYear = +new Date().toISOString().slice(0, 4)
  const maxYear =
    max_year === currentYear
      ? new Date().toISOString().slice(0, 10)
      : max_year
      ? `${max_year}-01-01`
      : null
  const dateMin = min_year ? `${min_year}-01-01` : null

  const discoverMoviesURL = media === "movie" ? "discover/movie" : "discover/tv"

  const response = await fetchTmdbData({
    additionURL: discoverMoviesURL,
    queryList: [
      ["language", locale],
      ["page", page || 1],
      ["primary_release_date.gte", dateMin],
      ["primary_release_date.lte", maxYear],
      ["vote_average.gte", min_score],
      ["vote_average.lte", max_score],
      ["sort_by", sortBy],
      ["with_genres", with_genres],
      ["without_genres", without_genres],
    ],
  })

  const result: MovieDiscoverResult | TvShowDiscoverResult = await response

  return result
}

export async function currentMediaDetails(
  id: number,
  locale: Locale,
  media: "movie" | "tv"
) {
  const detailsMovieURL = `${media}/${id}`

  const response = await fetchTmdbData({
    additionURL: detailsMovieURL,
    queryList: [["language", locale]],
  })

  const result: MovieDetails | TvShowDetails = await response

  return result
}

export async function currentMediaCredits(
  id: number,
  locale: Locale,
  media: "movie" | "tv"
) {
  const creditsMovieURL = `${media}/${id}/credits`

  const response = await fetchTmdbData({
    additionURL: creditsMovieURL,
    queryList: [["language", locale]],
  })

  const result: Credits = await response

  return result
}

export async function currentMediaProviders(
  id: number,
  locale: Locale,
  media: "movie" | "tv"
) {
  const providerMovieURL = `${media}/${id}/watch/providers`

  const response = await fetchTmdbData({
    additionURL: providerMovieURL,
  })

  const result: WatchProviders = await response

  const results = result.results
  const defaultLink = results?.US?.link
  const defaultProviders =
    results?.US?.buy || results?.US?.rent || results?.US?.flatrate
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
          results?.RU?.buy ||
          results?.RU?.flatrate ||
          results?.RU?.rent ||
          defaultProviders
      }
      break
  }

  return { providerLink, watchProviders }
}

export async function searchMedia(
  query: string,
  locale: Locale,
  media: "movie" | "tv",
  page?: number
) {
  const searchMovieURL = `search/${media}`

  const response = await fetchTmdbData({
    additionURL: searchMovieURL,
    queryList: [
      ["language", locale],
      ["query", encodeURIComponent(query)],
      ["page", page],
    ],
  })

  const result: Search<Movie> | Search<TV> = await response

  return result
}

type Genres = {
  genres: Genre[]
}

export async function genresMedia(locale: Locale, media: "movie" | "tv") {
  const genreMovieURL = `genre/${media}/list`

  const response = await fetchTmdbData({
    additionURL: genreMovieURL,
    queryList: [["language", locale]],
  })

  const result: Genres = await response
  return result
}
