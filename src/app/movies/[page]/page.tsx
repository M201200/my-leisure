import type { Metadata } from "next"
import { MediaPagesTMDB, TotalPagesTMDB } from "@/api/DATA_TMDB"
import Card from "../../components/Card"
import PagesNavigation from "../../components/PagesNavigation"

type Props = {
  params: { page: string }
}

export const metadata: Metadata = {
  title: "Movies",
}

export default async function Movies({ params }: Props) {
  const movies = (await MediaPagesTMDB(+params.page)).pageMovies
  if (movies === undefined) return <section>Not found</section>
  const totalPages = (await TotalPagesTMDB()).totalPagesMovies
  const moviesList = movies.map((movie) => {
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
    <>
      <section className="flex flex-wrap gap-4 px-4">{moviesList}</section>
      <PagesNavigation
        path="movies"
        currentPage={+params.page}
        totalPages={totalPages}
      />
    </>
  )
}
