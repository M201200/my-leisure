import type { Metadata } from "next"
import { genresMovie, pageMovies } from "@/api/FETCH_TMDB"
import { parseQuery } from "@/api/QueryActions"
import Pagination from "../../../components/Pagination"
import CardDetailsContainer from "../../../components/CardDetailsContainer"
import CardDetails from "../../../components/common/CardDetails"
import MediaFilter from "../../../components/MediaFilter"
import { getTranslator } from "next-intl/server"
import Bookmark from "@/app/[locale]/components/common/Bookmark"

type Props = {
  params: {
    query: string
    locale: Locale
  }
}

export const metadata: Metadata = {
  title: "Movies",
}

export default async function Movies({ params }: Props) {
  const formattedQuery: DiscoverQuery = parseQuery(params.query)
  const genresData = genresMovie(params.locale)
  const tData = getTranslator(params.locale, "SearchResults")
  const moviesData = pageMovies(formattedQuery, params.locale)
  const [t, genres, moviesResponse] = await Promise.all([
    tData,
    genresData,
    moviesData,
  ])
  const movies = moviesResponse.results
  const totalPages = moviesResponse.total_pages
  const totalAmount =
    moviesResponse.total_results > 10000 ? 10000 : moviesResponse.total_results

  const moviesList = movies?.length ? (
    movies.map((movie) => {
      const props: Entry = {
        id: movie.id!,
        locale: params.locale,
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
        <CardDetails
          key={movie.id}
          props={props}
          button={<Bookmark props={props} />}
        />
      )
    })
  ) : (
    <section>{t("NotFound")}</section>
  )
  return (
    <>
      <MediaFilter
        queryObject={formattedQuery}
        locale={params.locale}
        genres={genres}
      />
      <CardDetailsContainer label={t("Movies")} hasCount={totalAmount}>
        {moviesList}
      </CardDetailsContainer>
      <Pagination
        path="/category/movies"
        queryObject={formattedQuery}
        totalPages={totalPages}
      />
    </>
  )
}
