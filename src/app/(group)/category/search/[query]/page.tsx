import type { Metadata } from "next"
import { searchMovie, searchTVShow } from "@/api/DATA_TMDB"
import CardContainer from "@/app/components/CardMPContainer"
import CardDetails from "@/app/(group)/components/CardDetails"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "Search",
}

export default async function SearchPage({ params }: Props) {
  const movieSearchResult = await searchMovie(params.query)
  const movieList = movieSearchResult ? (
    movieSearchResult.map((movie) => {
      const props: Entry = {
        id: movie.id,
        catalog: "movie",
        folderPath: "https://image.tmdb.org/t/p/w342",
        coverPath: movie.poster_path,
        title: movie.title,
        score: movie.vote_average,
        genreIDs: movie.genre_ids,
        date: movie.release_date,
      }
      return <CardDetails key={movie.id} props={props} />
    })
  ) : (
    <h2>Movies not found</h2>
  )

  const seriesSearchResults = await searchTVShow(params.query)
  const seriesList = seriesSearchResults ? (
    seriesSearchResults.map((TVShow) => {
      const props: Entry = {
        id: TVShow.id,
        catalog: "tvshow",
        folderPath: "https://image.tmdb.org/t/p/w342",
        coverPath: TVShow.poster_path,
        title: TVShow.name,
        score: TVShow.vote_average,
        genreIDs: TVShow.genre_ids,
        date: TVShow.first_air_date,
      }
      return <CardDetails key={TVShow.id} props={props} />
    })
  ) : (
    <h2>Series not found</h2>
  )
  return (
    <>
      <CardContainer>{movieList}</CardContainer>
      <CardContainer>{seriesList}</CardContainer>
    </>
  )
}
