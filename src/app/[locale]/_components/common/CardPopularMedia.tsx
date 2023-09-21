import Link from "next-intl/link"
import Image from "next/image"

export default function CardPopularMedia(props: CardPopularMedia) {
  return (
    <div className="w-32 transition duration-300 shrink-0 snap-start text-textPrimary hover:scale-105">
      <Link
        href={`/entry/${props.catalog}/${props.id}`}
        title={props.title}
        locale={props.locale}
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
        <label
          className="truncate text-accent hover:text-hoverAccent fluid-sm"
          title={props.title}
        >
          <Link
            href={`/entry/${props.catalog}/${props.id}`}
            title={props.title}
            locale={props.locale}
            className="truncate"
          >
            {props.title}
          </Link>
        </label>
        <div className="flex justify-between">
          <span>
            <span className="fluid-sm">☆{props.score.toFixed(1)}/</span>
            <span className="fluid-xs">
              {props.votesAmount.toLocaleString()}
            </span>
          </span>
          {props.bookmark}
        </div>
      </section>
    </div>
  )
}
