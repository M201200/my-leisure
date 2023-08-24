import Link from "next/link"
import Image from "next/image"
import Bookmark from "./Bookmark"

export default function CardMainPage(props: Entry) {
  return (
    <div className="relative w-32 bg-gray-200 shrink-0">
      <Link href={`/entry/${props.catalog}/${props.id}`}>
        <Image
          className="relative aspect-auto min-h-48"
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
      <section className="px-1">
        <h3 className="truncate">{props.title}</h3>
        <div className="flex justify-between">
          <span>☆{props.score.toFixed(1)}</span>
          <Bookmark props={props} />
        </div>
      </section>
    </div>
  )
}
