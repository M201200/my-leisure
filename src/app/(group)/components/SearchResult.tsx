import { searchMovie, searchTVShow } from "@/api/FETCH_TMDB"
import { parseQuery } from "@/api/QueryActions"
import Pagination from "./Pagination"
import CardDetails from "@/app/(group)/components/common/CardDetails"
import CardDetailsContainer from "@/app/(group)/components/CardDetailsContainer"

type Props = {
  query: string
  media: "movie" | "tvshow"
}

export default async function TVShows({ query, media }: Props) {
  const formattedQuery: SearchQuery = parseQuery(query)
  const currentMedia =
    media === "movie"
      ? await searchMovie(formattedQuery.query, formattedQuery.moviePage)
      : await searchTVShow(formattedQuery.query, formattedQuery.seriesPage)
  const mediaResult = currentMedia.results
  const totalPages = currentMedia.totalPages
  const totalAmount =
    currentMedia.totalResults > 10000 ? 10000 : currentMedia.totalResults
  const mediaList =
    mediaResult && mediaResult.length ? (
      mediaResult.map((entry) => {
        const props: Entry = {
          id: entry.id,
          catalog: media,
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: entry.poster_path,
          title: "title" in entry ? entry.title : entry.name,
          score: entry.vote_average,
          votesAmount: entry.vote_count,
          genreIDs: entry.genre_ids,
          date:
            "release_date" in entry ? entry.release_date : entry.first_air_date,
        }
        return <CardDetails key={entry.id} props={props} />
      })
    ) : (
      <section>No coincidences.</section>
    )
  return (
    <>
      <CardDetailsContainer
        label={media === "movie" ? "Movies:" : "Series:"}
        hasCount={totalAmount}
        maxHeight="max-h-96"
      >
        {mediaList}
      </CardDetailsContainer>
      <Pagination
        path="/category/search"
        queryObject={formattedQuery}
        totalPages={totalPages}
        media={media}
      />
    </>
  )
}
