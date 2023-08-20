import Link from "next/link"
import Image from "next/image"
import AddToFav from "./AddToFav"
import AddToList from "./AddToList"

type Props = {
  id: number
  catalog: string
  folderPath: string
  coverPath: string
  title: string
  score: number
}

export default function Card({
  id,
  catalog,
  folderPath,
  coverPath,
  title,
  score,
}: Props) {
  return (
    <div className="relative w-32 bg-gray-200 shrink-0">
      <Link href={`/entry/${catalog}/${id}`}>
        <Image
          className="aspect-auto min-h-48"
          src={
            coverPath
              ? `${folderPath}${coverPath}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          alt="No cover"
          width={128}
          height={192}
        />
      </Link>
      <section>
        <h3 className="truncate">{title}</h3>
        <div className="flex justify-between">
          <span>☆{score.toFixed(1)}</span>
          <span>
            <AddToFav catalog={`fav-${catalog}`} id={id} />
            <AddToList catalog={`list-${catalog}`} id={id} />
          </span>
        </div>
      </section>
    </div>
  )
}
