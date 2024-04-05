import type { Metadata } from "next"
import { genresMedia, pageMedia } from "@/app/api/FETCH_TMDB"
import Pagination from "../../../components/Pagination"
import CardDetailsContainer from "../../../components/CardDetailsContainer"
import CardMediaDetails from "../../../components/common/CardMediaDetails"
import MediaFilter from "../../../components/MediaFilter"
import { getTranslations } from "next-intl/server"
import Bookmark from "@/app/[locale]/components/common/Bookmark"
import { auth } from "@/app/lib/auth"

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
  const session = await auth()

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

  const genresData = genresMedia(params.locale, "movie")
  const tData = getTranslations("SearchResults")
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
      with_people:
        (searchParams.with_people as string | undefined) || undefined,
      with_companies:
        (searchParams.with_companies as string | undefined) || undefined,
      with_origin_country:
        (searchParams.with_origin_country as string | undefined) || undefined,
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
        const props = {
          id: movie.id!,
          catalog: "movie" as const,
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: movie.poster_path || "",
          title: movie.title || "No title",
          score: movie.vote_average || 0,
          votes: movie.vote_count || 0,
          genreIds: movie.genre_ids || [],
          date: movie.release_date || "Unknown",
          locale: params.locale,
          user_email: session?.user?.email,
        }
        return (
          <CardMediaDetails
            key={movie.id}
            props={props}
            locale={params.locale}
          />
        )
      }
    })
  ) : (
    <section className="col-span-4 p-2 rounded bg-secondary text-textPrimary fluid-lg">
      {t("NotFound")}
    </section>
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
