import Link from "next-intl/link"
import Image from "next/image"
import pickGenres from "@/data/tmdbGenres"
import { dictionaryDetails } from "../../../../../../messages/dictionary/clientSide"

export default function CardMediaDetails({
  props,
  button,
  locale,
}: {
  props: MediaEntry
  button: React.ReactNode
  locale: Locale
}) {
  const path = props.catalog === "movie" ? "movies" : "tvseries"
  const t = dictionaryDetails(locale)

  const genres = pickGenres(props.catalog, locale)
    .map((genre) =>
      props.genreIds.some((id) => id === genre.id) ? (
        <Link
          key={genre.id}
          href={`/category/discover/${path}?with_genres=${genre.id}`}
          locale={locale}
        >
          {genre.name}
        </Link>
      ) : null
    )
    .filter((genre) => genre !== null)
    .slice(0, 3)
    .map((genre, id, arr) =>
      id < arr.length - 1 ? (
        <span key={genre?.key + "key"}>{genre}, </span>
      ) : (
        <span key={genre?.key + "key"}>{genre}</span>
      )
    )
  return (
    <div className="grid bg-gray-200 grid-cols-[8rem_1fr] min-h-48">
      <Link
        title={props.title}
        href={`/entry/${props.catalog}/${props.id}`}
        locale={locale}
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
            locale={locale}
          >
            <h5 className="truncate" title={props.title}>
              {props.title}
            </h5>
          </Link>
          {button}
        </div>
        <ol>
          <li className="flex truncate gap-x-2">
            <h5>{t.Date}</h5>
            {props.date}
          </li>
          <li className="flex flex-wrap gap-x-2">
            <h5>{t.Genres}</h5>
            {genres ? genres : <span>{t.Unknown}</span>}
          </li>
          <li className="flex truncate gap-x-2">
            {t.Score}
            {props.score.toFixed(1)}/10
          </li>
          <li className="flex truncate gap-x-2">
            {t.Votes}
            {props.votes.toLocaleString()}
          </li>
        </ol>
      </section>
    </div>
  )
}
