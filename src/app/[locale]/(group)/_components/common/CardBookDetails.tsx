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
            title={author}
            href={`/category/discover/books?author=${author}`}
            locale={locale}
            className="transition cursor-pointer hover:text-textHoverPrimary"
          >
            {author},{" "}
          </Link>
        ) : (
          <Link
            key={author + props.id}
            title={author}
            href={`/category/discover/books?author=${author}`}
            locale={locale}
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
        href={`/entry/${props.catalog}/${props.id}`}
        locale={locale}
        className="col-start-1 col-end-2"
      >
        <Image
          className="aspect-auto rounded-l-md min-h-[13rem]"
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
            <label
              className="font-semibold truncate transition cursor-pointer text-accent fluid-lg hover:text-hoverAccent"
              title={props.title}
            >
              {props.title}
            </label>
          </Link>
          {button}
        </div>
        <ul>
          <li className="flex flex-wrap truncate gap-x-2">
            <label className="font-semibold">{t.Author}</label>
            {authors}
          </li>
          <li title={props.date?.toString()} className="flex truncate gap-x-2">
            <label className="font-semibold">{t.Date}</label>
            {props.date}
          </li>
          <li
            title={props.editions?.toString()}
            className="flex truncate gap-x-2"
          >
            <label className="font-semibold">{t.Editions}</label>
            {props.editions}
          </li>
          {props.languages ? (
            <li
              title={props.languages?.join(", ")}
              className="flex truncate gap-x-2"
            >
              <label className="font-semibold">{t.Languages}</label>
              {props.languages?.length}
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  )
}
