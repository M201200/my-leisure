import Link from "next/link"
import Image from "next/image"
import Bookmark from "@/app/components/common/Bookmark"
import pickGenres from "@/data/tmdbGenres"

export default function CardDetails({
  props,
  hasBookmark = true,
  entryDelete,
}: {
  props: Entry
  hasBookmark?: boolean
  entryDelete?: React.ReactNode
}) {
  const genres = pickGenres(props.catalog)
    .map((genre) =>
      props.genreIDs.some((id) => id === genre.id) ? (
        <span key={genre.id}>{genre.name}</span>
      ) : null
    )
    .filter((genre) => genre !== null)
    .slice(0, 2)
  return (
    <div className="grid bg-gray-200 grid-cols-card-details min-h-48">
      <Link
        title={props.title}
        href={`/entry/${props.catalog}/${props.id}`}
        className="col-start-1 col-end-2"
      >
        <Image
          className="aspect-auto min-h-48"
          src={
            props.coverPath
              ? `${props.folderPath}${props.coverPath}`
              : "https://fakeimg.pl/128x192/878787/d1d1d1?text=No+image"
          }
          alt="No cover"
          width={128}
          height={192}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAADACAYAAADMZmunAAABQUlEQVR42u3SAQ0AAAQAMPLaVFBdD/4Mz66e4K0UQAABBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAAAQQQQAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEEAAAQQQQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQACuWBc9VVCGM5sbAAAAAElFTkSuQmCC"
        />
      </Link>
      <section className="col-start-2 col-end-3 p-2 truncate">
        <div className="flex justify-between gap-4">
          <Link
            href={`/entry/${props.catalog}/${props.id}`}
            className="truncate"
          >
            <h4 className="truncate" title={props.title}>
              {props.title}
            </h4>
          </Link>
          {hasBookmark ? <Bookmark props={props} /> : entryDelete}
        </div>
        <ol>
          <li>
            <h5>Release date:</h5>
            {props.date}
          </li>
          <li className="flex flex-wrap gap-x-2">
            <h6>Genres:</h6>
            {genres ? genres : <span>Unknow</span>}
          </li>
          <li>Rating: {props.score.toFixed(1)}/10</li>
          <li>Votes: {props.votesAmount.toLocaleString()}</li>
        </ol>
      </section>
    </div>
  )
}
