import Link from "next/link"
import Image from "next/image"
import cardTranslation from "@/utils/functions/cardTranslation"
import BookmarkButton from "../common/BookmarkButton"

export default function CardBookDetails({
  props,
  locale,
}: {
  locale: Locale
  props: CardBook
}) {
  const t = cardTranslation(locale)

  const authors = props?.author
    ? props?.author
        ?.slice(0, 3)
        .filter(
          (author, id, arr) => arr.indexOf(author) === arr.lastIndexOf(author)
        )
        ?.map((author, id, arr) =>
          id < arr.length - 1 ? (
            <Link
              key={author + props.id}
              title={author}
              href={`/${locale}/discover/books?author=${author}`}
              className="transition cursor-pointer hover:text-textHoverPrimary"
            >
              {author},{" "}
            </Link>
          ) : (
            <Link
              key={author + props.id}
              title={author}
              href={`/${locale}/discover/books?author=${author}`}
              className="transition cursor-pointer hover:text-textHoverPrimary"
            >
              {author}
            </Link>
          )
        )
    : t.Unknown
  return (
    <div className="grid bg-secondary text-textPrimary rounded-md fluid-base grid-cols-[8rem_1fr] min-h-[13rem]">
      <Link
        title={props.title}
        href={`/${locale}/entry/${props.catalog}/${props.id}`}
        className="col-start-1 col-end-2"
      >
        <Image
          className="aspect-auto rounded-l-md min-h-[13rem]"
          unoptimized={true}
          src={
            props.coverPath
              ? `${props.folderPath}${props.coverPath}-M.jpg`
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
            href={`/${locale}/entry/${props.catalog}/${props.id}`}
            className="truncate"
          >
            <label
              className="font-bold truncate transition cursor-pointer text-accent fluid-lg hover:text-hoverAccent"
              title={props.title}
            >
              {props.title}
            </label>
          </Link>
          <BookmarkButton props={props} />
        </div>
        <ul className="grid gap-2 p-1">
          <li
            className="flex flex-wrap font-semibold truncate gap-x-2"
            title={t.Author}
          >
            {authors}
          </li>
          <li title={t.Date} className="flex truncate gap-x-2">
            {props.date}
          </li>
          <li
            title={props.editions?.toString()}
            className="flex truncate gap-x-2"
          >
            <label>{t.Editions}:</label>
            {props.editions}
          </li>
          {props.languages ? (
            <li
              title={props.languages?.join(", ")}
              className="flex truncate gap-x-2"
            >
              <label>{t.Languages}:</label>
              {props.languages?.length}
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  )
}
