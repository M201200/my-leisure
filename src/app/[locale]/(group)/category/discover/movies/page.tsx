import type { Metadata } from "next"
import { genresMedia, pageMedia } from "@/api/FETCH_TMDB"
import Pagination from "../../../_components/Pagination"
import CardDetailsContainer from "../../../_components/CardDetailsContainer"
import CardMediaDetails from "../../../_components/common/CardMediaDetails"
import MediaFilter from "../../../_components/MediaFilter"
import { getTranslator } from "next-intl/server"
import Bookmark from "@/app/[locale]/_components/common/Bookmark"

type Props = {
  params: {
    locale: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "Movies",
}

export default async function Movies({ params, searchParams }: Props) {
  const search_page = searchParams.page ? +searchParams.page : 1
  const search_min_year = searchParams.min_year as string | undefined
  const search_max_year = searchParams.max_year as string | undefined
  const search_min_score = searchParams.min_score as string | undefined
  const search_max_score = searchParams.max_score as string | undefined
  const search_sort_by = searchParams.sort_by as SortBy | undefined
  const search_sort_order = searchParams.sort_order as "desc" | "asc" | null
  const search_with_genres = searchParams.with_genres as string | undefined
  const search_without_genres = searchParams.without_genres as
    | string
    | undefined
  console.log(searchParams)

  const genresData = genresMedia(params.locale, "movie")
  const tData = getTranslator(params.locale, "SearchResults")
  const moviesData = pageMedia(
    {
      page: search_page || 1,
      min_year: search_min_year ? +search_min_year : undefined,
      max_year: search_max_year ? +search_max_year : undefined,
      max_score: search_max_score ? +search_max_score : undefined,
      min_score: search_min_score ? +search_min_score : undefined,
      sort_by: search_sort_by || "popularity",
      sort_order: search_sort_order || "desc",
      with_genres: search_with_genres,
      without_genres: search_without_genres,
    },
    params.locale,
    "movie"
  )
  const [t, genresResponse, moviesResponse] = await Promise.all([
    tData,
    genresData,
    moviesData,
  ])
  const genres = genresResponse.genres
  const movies = moviesResponse.results
  const totalPages = moviesResponse.total_pages || 1
  const totalAmount =
    moviesResponse.total_results > 10000 ? 10000 : moviesResponse.total_results

  const moviesList = movies?.length ? (
    movies.map((movie) => {
      if ("title" in movie) {
        const props: MediaEntry = {
          id: movie.id!,
          catalog: "movie",
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: movie.poster_path || "",
          title: movie.title || "No title",
          score: movie.vote_average || 0,
          votes: movie.vote_count || 0,
          genreIds: movie.genre_ids || [],
          date: movie.release_date || "Unknown",
        }
        return (
          <CardMediaDetails
            key={movie.id}
            props={props}
            locale={params.locale}
            button={<Bookmark props={props} />}
          />
        )
      }
    })
  ) : (
    <section>{t("NotFound")}</section>
  )
  return (
    <>
      <MediaFilter locale={params.locale} genres={genres} />
      <CardDetailsContainer
        label={t("Movies")}
        hasCount={totalAmount}
        locale={params.locale}
      >
        {moviesList}
      </CardDetailsContainer>
      <Pagination totalPages={totalPages} />
    </>
  )
}
