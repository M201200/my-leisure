import Link from "next/link"
import Image from "next/image"
import Bookmark from "@/app/components/Bookmark"
import pickGenres from "@/data/tmdbGenres"

export default function CardDetails({
  props,
  hasBookmark = true,
}: {
  props: Entry
  hasBookmark?: boolean
}) {
  const genres = pickGenres(props.catalog).map((genre) =>
    props.genreIDs.some((id) => id === genre.id) ? genre.name : null
  )
  return (
    <div className="relative w-32 bg-gray-200 shrink-0">
      <Link href={`/entry/${props.catalog}/${props.id}`}>
        <Image
          className="aspect-auto min-h-48"
          src={
            props.coverPath
              ? `${props.folderPath}${props.coverPath}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          alt="No cover"
          width={128}
          height={192}
        />
      </Link>
      <section>
        <h3 className="truncate">{props.title}</h3>
        <p>{props.date}</p>
        <p>{genres}</p>
        <div className="flex justify-between">
          <span>☆{props.score.toFixed(1)}</span>
          {hasBookmark ? <Bookmark props={props} /> : null}
        </div>
      </section>
    </div>
  )
}
