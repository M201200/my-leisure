import Link from "next/link"
import Image from "next/image"

type Props = {
  id: number
  catalog: string
  folderPath: string
  coverPath: string
  title: string
  genres: string[]
  score: number
}

export default async function Card({
  id,
  catalog,
  folderPath,
  coverPath,
  title,
  genres,
  score,
}: Props) {
  return (
    <div className="w-60 shrink-0">
      <Link href={`/${catalog}/${id}`}>
        <Image
          className="h-96"
          src={`${folderPath}${coverPath}`}
          alt="cover"
          width={240}
          height={480}
        />
      </Link>

      <h2>{title}</h2>
      <p>
        {genres.map((genre, id) => (
          <span key={id}>{genre} </span>
        ))}
      </p>
      <p>☆{score}</p>
    </div>
  )
}
