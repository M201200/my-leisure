import type { Metadata } from "next"
import Image from "next/image"
import { currentMovie } from "@/api/DATA_TMDB"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = (await currentMovie(+params.id)).title || "No title"

  return {
    title: title,
  }
}

export default async function MoviePage({ params }: Props) {
  const movie = await currentMovie(+params.id)
  if (movie === undefined)
    return <h1>Movie with id:{params.id} do not exist.</h1>

  return (
    <div key={movie.id}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="backdrop"
        width={200}
        height={400}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  )
}
