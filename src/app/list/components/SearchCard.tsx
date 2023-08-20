import Link from "next/link"
import Image from "next/image"

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
    <div className="w-32 bg-gray-200 shrink-0">
      <Link href={`/${catalog}/${id}`}>
        <Image
          className="aspect-auto min-h-12"
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
              <h2>{title}</h2>
              
      <p>☆{score.toFixed(1)}</p>
          </section>
      
    </div>
  )
}