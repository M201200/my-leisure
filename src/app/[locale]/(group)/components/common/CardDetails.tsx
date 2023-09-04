import Link from "next-intl/link"
import Image from "next/image"
import pickGenres from "@/data/tmdbGenres"
import { dictionaryDetails } from "@/dictionary/clientSide"

export default function CardDetails({
  props,
  button,
}: {
  props: Entry
  button: React.ReactNode
}) {
  const path = props.catalog === "movie" ? "movies" : "tvseries"
  const dictionary = dictionaryDetails(props.locale)
  const Date = dictionary.Date
  const Genres = dictionary.Genres
  const Unknown = dictionary.Unknown
  const Score = dictionary.Score
  const Votes = dictionary.Votes

  const genres = pickGenres(props.catalog)
    .map((genre) =>
      props.genreIds.some((id) => id === genre.id) ? (
        <Link
          key={genre.id}
          href={`/category/${path}/"page":1,"minYear":1900,"maxYear":2023,"minScore":0,"maxScore":10,"sort_by":"popularity","sort_order":"desc","with_genres":[${genre.id}],"without_genres":[]`}
          locale={props.locale}
        >
          {genre.name}
        </Link>
      ) : null
    )
    .filter((genre) => genre !== null)
    .slice(0, 3)
  return (
    <div className="grid bg-gray-200 grid-cols-[8rem_1fr] min-h-48">
      <Link
        title={props.title}
        href={`/entry/${props.catalog}/${props.id}`}
        locale={props.locale}
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
            locale={props.locale}
          >
            <h5 className="truncate" title={props.title}>
              {props.title}
            </h5>
          </Link>
          {button}
        </div>
        <ol>
          <li>
            <h5>{Date}</h5>
            {props.date}
          </li>
          <li className="flex flex-wrap gap-x-2">
            <h5>{Genres}</h5>
            {genres ? genres : <span>{Unknown}</span>}
          </li>
          <li>
            {Score}
            {props.score.toFixed(1)}/10
          </li>
          <li>
            {Votes}
            {props.votes.toLocaleString()}
          </li>
        </ol>
      </section>
    </div>
  )
}
