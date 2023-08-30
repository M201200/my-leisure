import Link from "next/link"
import Image from "next/image"
import Bookmark from "./Bookmark"

export default function CardMainPage(props: Entry) {
  return (
    <div className="w-32 bg-gray-200 shrink-0">
      <Link href={`/entry/${props.catalog}/${props.id}`} title={props.title}>
        <Image
          className="aspect-auto min-h-48"
          src={
            props.coverPath
              ? `${props.folderPath}${props.coverPath}`
              : "https://fakeimg.pl/128x192/878787/d1d1d1?text=No+image"
          }
          alt="Cover"
          width={128}
          height={192}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAADACAYAAADMZmunAAABQUlEQVR42u3SAQ0AAAQAMPLaVFBdD/4Mz66e4K0UQAABBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAAAQQQQAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEEAAAQQQQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQACuWBc9VVCGM5sbAAAAAElFTkSuQmCC"
        />
      </Link>
      <section className="px-1">
        <h4 className="truncate" title={props.title}>
          {props.title}
        </h4>
        <div className="flex justify-between">
          <span>
            <span>☆{props.score.toFixed(1)}/</span>
            <span className="text-xs">
              {props.votesAmount.toLocaleString()}
            </span>
          </span>
          <Bookmark props={props} />
        </div>
      </section>
    </div>
  )
}
