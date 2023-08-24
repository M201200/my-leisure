import type { Metadata } from "next"
import { pageMovies, totalPagesMovies } from "@/api/DATA_TMDB"
import PagesNavigation from "../../../components/PagesNavigation"
import CardDetails from "@/app/(group)/components/CardDetails"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "Movies",
}

export default async function Movies({ params }: Props) {
  const movies = await pageMovies(+params.query)
  if (movies === undefined) return <section>Not found</section>
  const totalPages = await totalPagesMovies()
  const moviesList = movies.map((movie) => {
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
  return (
    <>
      <section className="flex flex-wrap gap-4 px-4">{moviesList}</section>
      <PagesNavigation
        path="/category/movies"
        currentPage={+params.query}
        totalPages={totalPages}
      />
    </>
  )
}
