import type { Metadata } from "next"
import Image from "next/image"
import { EntryTMDB } from "@/api/DATA_TMDB"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = (await EntryTMDB(+params.id)).currentTVShow?.name || "No title"

  return {
    title: title,
  }
}

export default async function MoviePage({ params }: Props) {
  const TVShow = (await EntryTMDB(+params.id)).currentTVShow
  if (TVShow === undefined)
    return <h1>Movie with id:{params.id} do not exist.</h1>

  return (
    <div key={TVShow.id}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${TVShow.poster_path}`}
        alt="backdrop"
        width={200}
        height={400}
      />
      <h2>{TVShow.name}</h2>
      <p>{TVShow.overview}</p>
    </div>
  )
}
