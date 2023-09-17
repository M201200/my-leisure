import Link from "next-intl/link"
import Image from "next/image"
import { dictionaryDetails } from "../../../../../../messages/dictionary/clientSide"

export default function CardBookDetails({
  props,
  button,
  locale,
}: {
  locale: Locale
  props: BookEntry
  button: React.ReactNode
}) {
  const t = dictionaryDetails(locale)

  const authors = props?.author
    ? props?.author?.slice(0, 3)?.map((author, id, arr) =>
        id < arr.length - 1 ? (
          <Link
            key={author + props.id}
            href={`/category/discover/books?author=${author}`}
            locale={locale}
          >
            {author},{" "}
          </Link>
        ) : (
          <Link
            key={author + props.id}
            href={`/category/discover/books?author=${author}`}
            locale={locale}
          >
            {author}
          </Link>
        )
      )
    : t.Unknown
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
        <ul>
          <li className="flex flex-wrap truncate gap-x-2">
            <h5>{t.Author}</h5>
            {authors}
          </li>
          <li className="flex truncate gap-x-2">
            <h5>{t.Date}</h5>
            {props.date}
          </li>
          <li className="flex truncate gap-x-2">
            <h5>{t.Editions}</h5>
            {props.editions}
          </li>
          {props.languages ? (
            <li className="flex truncate gap-x-2">
              <h5>{t.Languages}</h5>
              {props.languages?.length}
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  )
}
