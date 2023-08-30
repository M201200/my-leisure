import type { Metadata } from "next"
import { pageMovies } from "@/api/FETCH_TMDB"
import { parseQuery } from "@/api/QueryActions"
import Pagination from "../../../components/Pagination"
import CardDetailsContainer from "@/app/(group)/components/CardDetailsContainer"
import CardDetails from "@/app/(group)/components/common/CardDetails"
import MediaFilter from "@/app/(group)/components/MediaFilter"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "Movies",
}

export default async function Movies({ params }: Props) {
  const formattedQuery: DiscoverQuery = parseQuery(params.query)
  const movies = (await pageMovies(formattedQuery)).results
  const totalPages = (await pageMovies(formattedQuery)).totalPages
  const totalAmount =
    (await pageMovies(formattedQuery)).totalResults > 10000
      ? 10000
      : (await pageMovies(formattedQuery)).totalResults
  const moviesList =
    movies && movies.length ? (
      movies.map((movie) => {
        const props: Entry = {
          id: movie.id,
          catalog: "movie",
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: movie.poster_path,
          title: movie.title,
          score: movie.vote_average,
          votesAmount: movie.vote_count,
          genreIDs: movie.genre_ids,
          date: movie.release_date,
        }
        return <CardDetails key={movie.id} props={props} />
      })
    ) : (
      <section>No coincidences.</section>
    )
  return (
    <>
      <MediaFilter media="movie" queryObject={formattedQuery} />
      <CardDetailsContainer label="Movies:" hasCount={totalAmount}>
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
