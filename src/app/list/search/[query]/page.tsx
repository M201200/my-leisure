import type { Metadata } from "next"
import { SearchTMDB } from "@/api/DATA_TMDB"
import Card from "@/app/components/Card"
import CardContainer from "@/app/components/CardContainer"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "Search",
}

export default async function SearchPage({ params }: Props) {
  const movieSearchResult = (await SearchTMDB(params.query)).searchMovie
  if (movieSearchResult === undefined) return <h1>Not found</h1>
  const resultList = movieSearchResult.map((movie) => {
    return (
      <Card
        key={movie.id}
        id={movie.id}
        catalog="movie"
        folderPath="https://image.tmdb.org/t/p/w342"
        coverPath={movie.poster_path}
        title={movie.title}
        score={movie.vote_average}
      />
    )
  })
  return (
    <CardContainer>{resultList ? resultList : <p>No results</p>}</CardContainer>
  )
}
