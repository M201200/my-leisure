import type { Metadata } from "next"
import { genresMedia, pageMedia } from "@/app/api/FETCH_TMDB"
import Pagination from "@/app/[locale]/components/Pagination"
import CardMediaDetails from "@/app/[locale]/components/common/CardMediaDetails"
import CardDetailsContainer from "@/app/[locale]/components/CardDetailsContainer"
import MediaFilter from "@/app/[locale]/components/MediaFilter"
import { getTranslations } from "next-intl/server"
import { auth } from "@/app/lib/auth"

type Props = {
  params: {
    locale: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "TV Series",
}

export default async function TVShows({ params, searchParams }: Props) {
  const session = await auth()
  const tData = getTranslations("SearchResults")
  const tFilterQuery = getTranslations("MediaFilter")

  const search_page = searchParams.page ? +searchParams.page : 1
  const search_min_year = searchParams.min_year as string | undefined
  const search_max_year = searchParams.max_year as string | undefined
  const search_min_score = searchParams.min_score as string | undefined
  const search_max_score = searchParams.max_score as string | undefined
  const search_sort_by = searchParams.sort_by as SortBy | undefined
  const search_sort_order = searchParams.sort_order as
    | "desc"
    | "asc"
    | undefined
  const search_with_genres = searchParams.with_genres as string | undefined
  const search_without_genres = searchParams.without_genres as
    | string
    | undefined

  const genresData = genresMedia(params.locale, "tv")
  const seriesData = pageMedia(
    {
      page: search_page,
      min_year: search_min_year ? +search_min_year : undefined,
      max_year: search_max_year ? +search_max_year : undefined,
      max_score: search_max_score ? +search_max_score : undefined,
      min_score: search_min_score ? +search_min_score : undefined,
      sort_by: search_sort_by,
      sort_order: search_sort_order,
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
    "tvshow"
  )
  const [t, tFilterAsync, genresResponse, seriesResponse] = await Promise.all([
    tData,
    tFilterQuery,
    genresData,
    seriesData,
  ])
  const genres = genresResponse.genres
  const series = seriesResponse.results
  const totalPages = seriesResponse.total_pages || 1
  const totalResults = seriesResponse.total_results
  const totalAmount = totalResults > 10000 ? 10000 : totalResults

  const seriesList = series?.length ? (
    series.map((TVShow) => {
      if ("name" in TVShow) {
        const props = {
          id: TVShow.id!,
          catalog: "tvshow" as const,
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: TVShow.poster_path || "",
          title: TVShow.name || "No title",
          score: TVShow.vote_average || 0,
          votes: TVShow.vote_count || 0,
          genreIds: TVShow.genre_ids || [],
          date: TVShow.first_air_date || "Unknown",
          locale: params.locale,
          user_email: session?.user?.email,
        }

        return (
          <CardMediaDetails
            locale={params.locale}
            key={TVShow.id}
            props={props}
          />
        )
      }
    })
  ) : (
    <section className="col-span-4 p-2 rounded bg-secondary text-textPrimary fluid-lg">
      {t("NotFound")}
    </section>
  )

  const tFilter = {
    Filters: tFilterAsync("Filters"),
    ReleaseDate: tFilterAsync("ReleaseDate"),
    Genres: tFilterAsync("Genres"),
    Sort: tFilterAsync("Sort"),
    Score: tFilterAsync("Score"),
    Votes: tFilterAsync("Votes"),
    Popularity: tFilterAsync("Popularity"),
    Order: tFilterAsync("Order"),
    Accept: tFilterAsync("Accept"),
    Reset: tFilterAsync("Reset"),
  }
  return (
    <>
      <MediaFilter genres={genres} t={tFilter} />
      <CardDetailsContainer
        label={t("Series")}
        hasCount={totalAmount}
        locale={params.locale}
      >
        {seriesList}
      </CardDetailsContainer>
      <Pagination totalPages={totalPages} />
    </>
  )
}
