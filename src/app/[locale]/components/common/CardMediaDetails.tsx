import Link from "next/link"
import Image from "next/image"
import pickGenres from "@/app/data/tmdbGenres"
import { dictionaryDetails } from "../../../../../messages/dictionary/clientSide"
import BookmarkButton from "../BookmarkButton"

export default function CardMediaDetails({
  props,
  // button,
  locale,
}: {
  props: CardMedia
  locale: Locale
}) {
  const path = props.catalog === "movie" ? "movies" : "tvseries"
  const t = dictionaryDetails(locale)

  const genres = pickGenres(props.catalog, locale)
    .map((genre) =>
      props.genreIds.some((id) => id === genre.id) ? (
        <Link
          key={genre.id}
          href={`/${locale}/category/discover/${path}?with_genres=${genre.id}`}
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
        className="col-start-1 col-end-2"
      >
        <Image
          className="aspect-auto rounded-l-md min-h-48"
          unoptimized={true}
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
            <label
              className="font-semibold truncate transition cursor-pointer text-accent fluid-lg hover:text-hoverAccent"
              title={props.title}
            >
              {props.title}
            </label>
          </Link>
          <BookmarkButton props={props} />
        </div>
        <ul className="grid gap-2 p-1">
          <li className="flex flex-wrap truncate gap-x-2" title={t.Date}>
            {/* <label className="font-semibold truncate">{t.Date}</label> */}
            <Link
              title={t.Date}
              key={props.date + "key"}
              href={`/${locale}/category/discover/${path}?min_year=${
                +props.date.slice(0, 4) - 1 < 1900
                  ? 1900
                  : +props.date.slice(0, 4) - 1
              }&max_year=${
                +props.date.slice(0, 4) === 1900
                  ? 1901
                  : +props.date.slice(0, 4)
              }`}
              className="truncate transition cursor-pointer hover:text-textHoverPrimary"
            >
              {props.date}
            </Link>
          </li>
          <li className="flex flex-wrap gap-x-2" title={`${t.Genres}`}>
            {/* <label className="font-semibold truncate">{t.Genres}</label> */}
            {genres ? genres : <span>{t.Unknown}</span>}
          </li>
          <li className="flex truncate gap-x-2" title={`${t.Score}`}>
            {/* <label className="font-semibold truncate">{t.Score}</label> */}
            {props.score.toFixed(1)}/{props.votes.toLocaleString()}
          </li>
          {/* <li className="flex truncate gap-x-2" title={props.votes.toString()}>
            <label className="font-semibold truncate">{t.Votes}</label>
            {props.votes.toLocaleString()}
          </li> */}
        </ul>
      </section>
    </div>
  )
}
