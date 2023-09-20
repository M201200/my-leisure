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
          title={genre.name}
          className="truncate transition cursor-pointer hover:text-textHoverPrimary"
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
    <div className="grid bg-secondary text-textPrimary rounded-md fluid-base grid-cols-[8rem_1fr] min-h-48">
      <Link
        title={props.title}
        href={`/entry/${props.catalog}/${props.id}`}
        locale={locale}
        className="col-start-1 col-end-2"
      >
        <Image
          className="aspect-auto rounded-l-md min-h-48"
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
            <label
              className="font-semibold truncate transition cursor-pointer text-accent fluid-lg hover:text-hoverAccent"
              title={props.title}
            >
              {props.title}
            </label>
          </Link>
          {button}
        </div>
        <ol>
          <li className="flex truncate gap-x-2" title={props.date}>
            <label className="font-semibold truncate">{t.Date}</label>
            <Link
              key={props.date + "key"}
              href={`/category/discover/${path}?min_year=${
                +props.date.slice(0, 4) - 1 < 1900
                  ? 1900
                  : +props.date.slice(0, 4) - 1
              }&max_year=${
                +props.date.slice(0, 4) === 1900
                  ? 1901
                  : +props.date.slice(0, 4)
              }`}
              locale={locale}
              className="truncate transition cursor-pointer hover:text-textHoverPrimary"
            >
              {props.date}
            </Link>
          </li>
          <li className="flex flex-wrap gap-x-2">
            <label className="font-semibold truncate">{t.Genres}</label>
            {genres ? genres : <span>{t.Unknown}</span>}
          </li>
          <li
            className="flex truncate gap-x-2"
            title={`${props.score.toFixed(1)}/10`}
          >
            <label className="font-semibold truncate">{t.Score}</label>
            {props.score.toFixed(1)}/10
          </li>
          <li className="flex truncate gap-x-2" title={props.votes.toString()}>
            <label className="font-semibold truncate">{t.Votes}</label>
            {props.votes.toLocaleString()}
          </li>
        </ol>
      </section>
    </div>
  )
}
