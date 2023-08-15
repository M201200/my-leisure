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
    <div>
      <Link href={`/${catalog}/${id}`}>
        <Image
          src={`${folderPath}${coverPath}`}
          alt="cover"
          width={200}
          height={400}
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
