// import { SortOption, TMDB } from "tmdb-ts"
import { TMDB } from "tmdb-ts-wrapper"
import {
  DiscoverMovieSortOption,
  DiscoverTVSortOption,
} from "tmdb-ts-wrapper/dist/types"

const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!)

function getLanguage(language: Locale) {
  return language === "en"
    ? "en-US"
    : language === "ro"
    ? "ro-RO"
    : language === "ru"
    ? "ru-RU"
    : "en-US"
}

export async function popularMovies(language: Locale) {
  const page = (Math.random() * 20 + 1).toFixed()
  const results = (
    await tmdb.movies.getPopular({
      language: getLanguage(language),
      page: +page,
    })
  ).results
  return results
}
export async function popularSeries(language: Locale) {
  const page = (Math.random() * 20 + 1).toFixed()
  const results = (
    await tmdb.tv.getPopular({ language: getLanguage(language), page: +page })
  ).results
  return results
}

export async function pageMovies(
  props: DiscoverQuery,
  returnValue: "results" | "totalPages" | "totalResults",
  locale: Locale
) {
  const sortBy =
    `${props.sort_by}.${props.sort_order}` as DiscoverMovieSortOption
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

  switch (returnValue) {
    case "results":
      const results = (
        await tmdb.discover.discoverMovies({
          language: getLanguage(locale),
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
      return results
    case "totalPages":
      const totalPages = (
        await tmdb.discover.discoverMovies({
          language: getLanguage(locale),
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
      return totalPages
    case "totalResults":
      const totalResults = (
        await tmdb.discover.discoverMovies({
          language: getLanguage(locale),
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
      return totalResults
    default:
      return new Error("Enter requested value!")
  }
}

export async function pageSeries(
  props: DiscoverQuery,
  returnValue: "results" | "totalPages" | "totalResults",
  locale: Locale
) {
  const sortBy = `${props.sort_by}.${props.sort_order}` as DiscoverTVSortOption
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

  switch (returnValue) {
    case "results":
      const results = (
        await tmdb.discover.discoverTV({
          language: getLanguage(locale),
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
      return results
    case "totalPages":
      const totalPages = (
        await tmdb.discover.discoverTV({
          language: getLanguage(locale),
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
      return totalPages
    case "totalResults":
      const totalResults = (
        await tmdb.discover.discoverTV({
          language: getLanguage(locale),
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
      return totalResults
    default:
      return new Error("Enter requested value!")
  }
}

export async function currentMovieDetails(id: number, locale: Locale) {
  return await tmdb.movies.getDetails(id, getLanguage(locale))
}

export async function currentMovieCredits(id: number, locale: Locale) {
  return await tmdb.movies.getCredits(id, getLanguage(locale))
}

export async function currentMovieProvidersLink(id: number, locale: Locale) {
  const results = (await tmdb.movies.getWatchProviders(id)).results
  return locale === "en"
    ? results?.US?.link
    : locale === "ro"
    ? results?.RO?.link
    : locale === "ru"
    ? results?.RU?.link
    : results?.US?.link
}

export async function currentMovieProviders(id: number, locale: Locale) {
  const watchProvidersData = (await tmdb.movies.getWatchProviders(id)).results

  const watchProviders =
    locale === "en"
      ? watchProvidersData?.US
      : locale === "ro"
      ? watchProvidersData?.RO
      : locale === "ru"
      ? watchProvidersData?.RU
      : watchProvidersData?.US

  const defaultProviders = watchProvidersData?.US?.buy
    ? watchProvidersData?.US?.buy
    : watchProvidersData?.US?.rent
    ? watchProvidersData?.US?.rent
    : watchProvidersData?.US?.flatrate
    ? watchProvidersData?.US?.flatrate
    : watchProviders?.flatrate
  return watchProviders?.flatrate || defaultProviders
}

export async function currentTVShowDetails(id: number, locale: Locale) {
  return await tmdb.tv.getDetails(id, getLanguage(locale))
}

export async function currentTVShowCredits(id: number, locale: Locale) {
  return await tmdb.tv.getCredits(id, getLanguage(locale))
}

export async function currentTVShowProvidersLink(id: number, locale: Locale) {
  const results = (await tmdb.tv.getWatchProviders(id)).results
  return locale === "en"
    ? results?.US?.link
    : locale === "ro"
    ? results?.RO?.link
    : locale === "ru"
    ? results?.RU?.link
    : results?.US?.link
}

export async function currentTVShowProviders(id: number, locale: Locale) {
  const watchProvidersData = (await tmdb.tv.getWatchProviders(id))?.results

  const watchProviders =
    locale === "en"
      ? watchProvidersData?.US
      : locale === "ro"
      ? watchProvidersData?.RO
      : locale === "ru"
      ? watchProvidersData?.RU
      : watchProvidersData?.US

  const defaultProviders = watchProvidersData?.US?.buy
    ? watchProvidersData?.US?.buy
    : watchProvidersData?.US?.rent
    ? watchProvidersData?.US?.rent
    : watchProvidersData?.US?.flatrate
    ? watchProvidersData?.US?.flatrate
    : watchProviders?.flatrate
  return watchProviders?.flatrate || defaultProviders
}

export async function searchMovieResults(
  query: string,
  locale: Locale,
  page?: number
) {
  const results = (
    await tmdb.search.searchMovies({
      query: encodeURIComponent(query),
      page: page,
      language: getLanguage(locale),
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
    await tmdb.search.searchMovies({
      query: encodeURIComponent(query),
      page: page,
      language: getLanguage(locale),
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
    await tmdb.search.searchMovies({
      query: encodeURIComponent(query),
      page: page,
      language: getLanguage(locale),
    })
  ).total_results
  return totalResults
}

export async function searchTVShowResults(
  query: string,
  locale: Locale,
  page?: number
) {
  const results = (
    await tmdb.search.searchTVShows({
      query: encodeURIComponent(query),
      page: page,
      language: getLanguage(locale),
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
    await tmdb.search.searchTVShows({
      query: encodeURIComponent(query),
      page: page,
      language: getLanguage(locale),
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
    await tmdb.search.searchTVShows({
      query: encodeURIComponent(query),
      page: page,
      language: getLanguage(locale),
    })
  ).total_results
  return totalResults
}

export async function genresMovie(locale: Locale) {
  const genres = (await tmdb.genres.getMovieList(getLanguage(locale))).genres
  return genres
}
export async function genresSeries(locale: Locale) {
  const genres = (await tmdb.genres.getTVList(getLanguage(locale))).genres
  return genres
}
