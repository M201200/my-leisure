import Link from "next/link"
import Image from "next/image"
import BookmarkButton from "../BookmarkButton"

export default function CardPopularMedia(props: CardMedia) {
  return (
    <div className="w-32 transition duration-300 shrink-0 snap-start text-textPrimary hover:scale-105">
      <Link
        href={`/${props.locale}/entry/${props.catalog}/${props.id}`}
        title={props.title}
      >
        <Image
          className="rounded-t-md min-h-48"
          unoptimized={true}
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
      <section className="p-1 truncate rounded-b-md bg-secondary">
        <label className="truncate fluid-base" title={props.title}>
          <Link
            href={`/${props.locale}/entry/${props.catalog}/${props.id}`}
            title={props.title}
            className="truncate"
          >
            {props.title}
          </Link>
        </label>
        <div className="flex justify-between text-textHoverPrimary">
          <span>
            <span className="fluid-sm">☆{props.score.toFixed(1)}/</span>
            <span className="fluid-xs">{props.votes.toLocaleString()}</span>
          </span>
          <BookmarkButton props={props} />
        </div>
      </section>
    </div>
  )
}
