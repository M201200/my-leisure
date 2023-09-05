import { TMDB } from "tmdb-ts"
import {
  Credits,
  Movie,
  MovieDetails,
  PopularMovies,
  PopularTvShows,
  SortOption,
  TV,
  TvShowDetails,
  WatchProviders,
} from "./typesTMDB"

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!)

type Headers = {
  method?: "GET" | "POST" | "PUT"
  accept?: "application/json"
}

type FetchLanguage = {
  language: Locale
}

type FetchPage = {
  page: number
}

type FetchMedia = Headers &
  FetchLanguage &
  FetchPage & {
    initialFolder: string
    secondaryFolder: string | number
  }

async function fetchMedia({
  initialFolder,
  secondaryFolder,
  language,
  page,
  method = "GET",
  accept = "application/json",
}: FetchMedia) {
  const url = `https://api.themoviedb.org/3/${initialFolder}/${secondaryFolder}?language=${language}&page=${page}`
  const options = {
    method: method,
    headers: {
      accept: accept,
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
    },
  }

  const response = await fetch(url, options)
  return response
}

export async function popularMovies(language: Locale) {
  const page = (Math.random() * 20 + 1).toFixed()

  // const url = `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
  //   },
  // }

  const response = await fetchMedia({
    initialFolder: "movie",
    secondaryFolder: "popular",
    language: language,
    page: +page,
  })
  const result: PopularMovies = await response.json()

  // const results = (
  //   await tmdb.movies.nowPlaying({
  //     language: language,
  //     page: +page,
  //   })
  // ).results
  return result
}

export async function popularSeries(language: Locale) {
  const page = (Math.random() * 20 + 1).toFixed()

  // const url = `https://api.themoviedb.org/3/tv/popular?language=${language}&page=${page}`
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
  //   },
  // }

  const response = await fetchMedia({
    initialFolder: "tv",
    secondaryFolder: "popular",
    language: language,
    page: +page,
  })
  const result: PopularTvShows = await response.json()
  // const results = (
  //   await tmdb.tvShows.popular({ language: language, page: +page })
  // ).results

  return result
}

type FetchDiscover = Headers &
  FetchLanguage &
  FetchPage & {
    folder: "movie" | "tv"
    adult?: boolean
    video?: boolean
    date_gte?: string
    date_lte?: string
    sortBy?: SortOption
    vote_gte?: number
    vote_lte?: number
    withGenres?: string
    withoutGenres?: string
  }

async function fetchDiscover({
  folder,
  language,
  page = 1,
  method = "GET",
  accept = "application/json",
  adult = false,
  video = false,
  date_gte = "1900-01-01",
  date_lte = new Date().toISOString().slice(0, 10),
  sortBy = "popularity.desc",
  vote_gte = 0,
  vote_lte = 10,
  withGenres = "",
  withoutGenres = "",
}: FetchDiscover) {
  const url = `https://api.themoviedb.org/3/discover/${folder}?include_adult=${adult}&include_video=${video}&language=${language}&page=${page}&primary_release_date.gte=${date_gte}&primary_release_date.lte=${date_lte}&sort_by=${sortBy}&vote_average.gte=${vote_gte}&vote_average.lte=${vote_lte}&with_genres=${withGenres}&without_genres=${withoutGenres}`
  const options = {
    method: method,
    headers: {
      accept: accept,
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
    },
  }

  const response = await fetch(url, options)
  return response
}
export async function pageMovies(
  props: DiscoverQuery,
  // returnValue: "results" | "totalPages" | "totalResults",
  locale: Locale
) {
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

  const response = await fetchDiscover({
    folder: "movie",
    language: locale,
    page: 1,
    date_gte: dateMin,
    date_lte: dateMax,
    sortBy: sortBy,
    withGenres: withGenres,
    withoutGenres: withoutGenres,
  })

  const result: Movie[] = await response.json()

  return result

  // switch (returnValue) {
  //   case "results":
  //     const results = (
  //       await tmdb.discover.movie({
  //         language: locale,
  //         page: props.page,
  //         "primary_release_date.gte": `${props.minYear}-01-01`,
  //         "primary_release_date.lte": maxYear,
  //         "vote_average.gte": props.minScore,
  //         "vote_average.lte": props.maxScore,
  //         sort_by: sortBy,
  //         with_genres: withGenres,
  //         without_genres: withoutGenres,
  //       })
  //     ).results
  //     return results
  //   case "totalPages":
  //     const totalPages = (
  //       await tmdb.discover.movie({
  //         language: locale,
  //         page: props.page,
  //         "primary_release_date.gte": `${props.minYear}-01-01`,
  //         "primary_release_date.lte": maxYear,
  //         "vote_average.gte": props.minScore,
  //         "vote_average.lte": props.maxScore,
  //         sort_by: sortBy,
  //         with_genres: withGenres,
  //         without_genres: withoutGenres,
  //       })
  //     ).total_pages
  //     return totalPages
  //   case "totalResults":
  //     const totalResults = (
  //       await tmdb.discover.movie({
  //         language: locale,
  //         page: props.page,
  //         "primary_release_date.gte": `${props.minYear}-01-01`,
  //         "primary_release_date.lte": maxYear,
  //         "vote_average.gte": props.minScore,
  //         "vote_average.lte": props.maxScore,
  //         sort_by: sortBy,
  //         with_genres: withGenres,
  //         without_genres: withoutGenres,
  //       })
  //     ).total_results
  //     return totalResults
  //   default:
  //     return new Error("Enter requested value!")
  // }
}

export async function pageSeries(
  props: DiscoverQuery,
  // returnValue: "results" | "totalPages" | "totalResults",
  locale: Locale
) {
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

  const response = await fetchDiscover({
    folder: "tv",
    language: locale,
    page: 1,
    date_gte: dateMin,
    date_lte: dateMax,
    sortBy: sortBy,
    withGenres: withGenres,
    withoutGenres: withoutGenres,
  })

  const result: TV[] = await response.json()

  return result

  // switch (returnValue) {
  //   case "results":
  //     const results = (
  //       await tmdb.discover.tvShow({
  //         language: locale,
  //         page: props.page,
  //         "first_air_date.gte": `${props.minYear}-01-01`,
  //         "first_air_date.lte": maxYear,
  //         "vote_average.gte": props.minScore,
  //         "vote_average.lte": props.maxScore,
  //         sort_by: sortBy,
  //         with_genres: withGenres,
  //         without_genres: withoutGenres,
  //       })
  //     ).results
  //     return results
  //   case "totalPages":
  //     const totalPages = (
  //       await tmdb.discover.tvShow({
  //         language: locale,
  //         page: props.page,
  //         "first_air_date.gte": `${props.minYear}-01-01`,
  //         "first_air_date.lte": maxYear,
  //         "vote_average.gte": props.minScore,
  //         "vote_average.lte": props.maxScore,
  //         sort_by: sortBy,
  //         with_genres: withGenres,
  //         without_genres: withoutGenres,
  //       })
  //     ).total_pages
  //     return totalPages
  //   case "totalResults":
  //     const totalResults = (
  //       await tmdb.discover.tvShow({
  //         language: locale,
  //         page: props.page,
  //         "first_air_date.gte": `${props.minYear}-01-01`,
  //         "first_air_date.lte": maxYear,
  //         "vote_average.gte": props.minScore,
  //         "vote_average.lte": props.maxScore,
  //         sort_by: sortBy,
  //         with_genres: withGenres,
  //         without_genres: withoutGenres,
  //       })
  //     ).total_results
  //     return totalResults
  //   default:
  //     return new Error("Enter requested value!")
  // }
}

type FetchDetails = Headers &
  FetchLanguage &
  FetchLanguage & {
    folder: "movie" | "tv"
    id: number
    isCredits?: boolean
  }

async function fetchDetailsAndCredits({
  folder,
  id,
  language,
  isCredits = false,
  method = "GET",
  accept = "application/json",
}: FetchDetails) {
  const credits = isCredits ? "/credits" : ""
  const url = `https://api.themoviedb.org/3/${folder}/${id}${credits}?language=${language}`
  const options = {
    method: method,
    headers: {
      accept: accept,
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
    },
  }

  const response = await fetch(url, options)
  return response
}

export async function currentMovieDetails(id: number, locale: Locale) {
  const response = await fetchDetailsAndCredits({
    folder: "movie",
    id: id,
    language: locale,
  })

  const result: MovieDetails = await response.json()

  return result
  // return await tmdb.movies.details(id, locale)
}

export async function currentMovieCredits(id: number, locale: Locale) {
  const response = await fetchDetailsAndCredits({
    folder: "movie",
    id: id,
    language: locale,
    isCredits: true,
  })

  const result: Credits = await response.json()

  return result
  // return await tmdb.movies.credits(id, locale)
}

type FetchProviders = Headers & {
  folder: "movie" | "tv"
  id: number
}
async function fetchProviders({
  folder,
  id,
  method = "GET",
  accept = "application/json",
}: FetchProviders) {
  const url = `https://api.themoviedb.org/3/${folder}/${id}/watch/providers`
  const options = {
    method: method,
    headers: {
      accept: accept,
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
    },
  }

  const response = await fetch(url, options)
  return response
}

export async function currentMovieProviders(id: number, locale: Locale) {
  // const results = (await tmdb.movies.watchProviders(id)).results

  const response = await fetchProviders({ folder: "movie", id: id })

  const result: WatchProviders = await response.json()

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

// export async function currentMovieProviders(id: number, locale: Locale) {
//   const results = (await tmdb.movies.watchProviders(id)).results

//   const watchProviders =
//     locale === "en"
//       ? results?.US
//       : locale === "ro"
//       ? results?.RO
//       : locale === "ru"
//       ? results?.RU
//       : results?.US

//   const defaultProviders = results?.US?.buy
//     ? results?.US?.buy
//     : results?.US?.rent
//     ? results?.US?.rent
//     : results?.US?.flatrate
//     ? results?.US?.flatrate
//     : watchProviders?.flatrate
//   return watchProviders?.flatrate || defaultProviders
// }

export async function currentTVShowDetails(id: number, locale: Locale) {
  const response = await fetchDetailsAndCredits({
    folder: "tv",
    id: id,
    language: locale,
  })

  const result: TvShowDetails = await response.json()

  return result
  // return await tmdb.tvShows.details(id, locale)
}

export async function currentTVShowCredits(id: number, locale: Locale) {
  const response = await fetchDetailsAndCredits({
    folder: "tv",
    id: id,
    language: locale,
    isCredits: true,
  })

  const result: Credits = await response.json()

  return result
  // return await tmdb.tvShows.credits(id, locale)
}

export async function currentTVShowProvidersLink(id: number, locale: Locale) {
  const response = await fetchProviders({ folder: "tv", id: id })

  const result: WatchProviders = await response.json()

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
  //   const results = (await tmdb.tvShows.watchProviders(id)).results
  //   return locale === "en"
  //     ? results?.US?.link
  //     : locale === "ro"
  //     ? results?.RO?.link
  //     : locale === "ru"
  //     ? results?.RU?.link
  //     : results?.US?.link
}

// export async function currentTVShowProviders(id: number, locale: Locale) {
//   const results = (await tmdb.tvShows.watchProviders(id))?.results

//   const watchProviders =
//     locale === "en"
//       ? results?.US
//       : locale === "ro"
//       ? results?.RO
//       : locale === "ru"
//       ? results?.RU
//       : results?.US

//   const defaultProviders = results?.US?.buy
//     ? results?.US?.buy
//     : results?.US?.rent
//     ? results?.US?.rent
//     : results?.US?.flatrate
//     ? results?.US?.flatrate
//     : watchProviders?.flatrate
//   return watchProviders?.flatrate || defaultProviders
// }

export async function searchMovieResults(
  query: string,
  locale: Locale,
  page?: number
) {
  const results = (
    await tmdb.search.movies({
      query: encodeURIComponent(query),
      page: page,
      language: locale,
    })
  ).results
  return results
}

export async function searchMovieTotalPages(
  query: string,
  locale: Locale,
  page?: number
) {
  const totalPages = (
    await tmdb.search.movies({
      query: encodeURIComponent(query),
      page: page,
      language: locale,
    })
  ).total_pages
  return totalPages
}

export async function searchMovieTotalResults(
  query: string,
  locale: Locale,
  page?: number
) {
  const totalResults = (
    await tmdb.search.movies({
      query: encodeURIComponent(query),
      page: page,
      language: locale,
    })
  ).total_results
  return totalResults
}

export async function searchtvShowResults(
  query: string,
  locale: Locale,
  page?: number
) {
  const results = (
    await tmdb.search.tvShows({
      query: encodeURIComponent(query),
      page: page,
      language: locale,
    })
  ).results
  return results
}

export async function searchTVShowTotalPages(
  query: string,
  locale: Locale,
  page?: number
) {
  const totalPages = (
    await tmdb.search.tvShows({
      query: encodeURIComponent(query),
      page: page,
      language: locale,
    })
  ).total_pages
  return totalPages
}

export async function searchTVShowTotalResults(
  query: string,
  locale: Locale,
  page?: number
) {
  const totalResults = (
    await tmdb.search.tvShows({
      query: encodeURIComponent(query),
      page: page,
      language: locale,
    })
  ).total_results
  return totalResults
}

export async function genresMovie(locale: Locale) {
  const genres = (await tmdb.genres.movies(locale)).genres
  return genres
}
export async function genresSeries(locale: Locale) {
  const genres = (await tmdb.genres.tvShows(locale)).genres
  return genres
}
