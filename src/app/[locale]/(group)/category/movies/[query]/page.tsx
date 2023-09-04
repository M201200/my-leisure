import type { Metadata } from "next"
import { genresMovie, pageMovies } from "@/api/FETCH_TMDB"
import { parseQuery } from "@/api/QueryActions"
import Pagination from "../../../components/Pagination"
import CardDetailsContainer from "../../../components/CardDetailsContainer"
import CardDetails from "../../../components/common/CardDetails"
import MediaFilter from "../../../components/MediaFilter"
import { Movie } from "tmdb-ts"
import { getTranslator } from "next-intl/server"
import pickGenres from "@/data/tmdbGenres"
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
  const genres = (await genresMovie(params.locale)) || pickGenres("movie")
  const t = await getTranslator(params.locale, "SearchResults")
  const formattedQuery: DiscoverQuery = parseQuery(params.query)
  const movies = (await pageMovies(
    formattedQuery,
    "results",
    params.locale
  )) as Movie[]
  const totalPages = (await pageMovies(
    formattedQuery,
    "totalPages",
    params.locale
  )) as number
  const totalResults = (await pageMovies(
    formattedQuery,
    "totalResults",
    params.locale
  )) as number
  const totalAmount = totalResults > 10000 ? 10000 : totalResults
  const moviesList =
    movies && movies.length ? (
      movies.map((movie) => {
        const props: Entry = {
          id: movie.id,
          locale: params.locale,
          catalog: "movie",
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: movie.poster_path,
          title: movie.title,
          score: movie.vote_average,
          votes: movie.vote_count,
          genreIds: movie.genre_ids,
          date: movie.release_date,
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
