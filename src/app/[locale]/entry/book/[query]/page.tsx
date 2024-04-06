import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { AiFillAmazonSquare } from "react-icons/ai"
import { getTranslations } from "next-intl/server"
import {
  currentAuthor,
  currentWorks,
  currentWorksEditions,
  currentWorksRating,
} from "@/app/api/FETCH_OPEN_LIBRARY"
import { auth } from "@/app/lib/auth"
import BookmarkButton from "@/app/[locale]/components/BookmarkButton"

type Props = {
  params: {
    query: string
    locale: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await currentWorks(params.query)
  const title = book?.title || "No title"

  return {
    title: title,
  }
}

export default async function BookPage({ params, searchParams }: Props) {
  const session = await auth()

  const query = params.query
  const lastIndexOfId = query.search(/%26/)
  const id = lastIndexOfId === -1 ? query : query.slice(0, lastIndexOfId)

  const editionId = searchParams.edition ? +searchParams.edition : null

  const tData = getTranslations("BookDetails")

  const worksData = currentWorks(id)
  const editionsData = currentWorksEditions(id)
  const ratingData = currentWorksRating(id)

  const [t, works, editions, rating] = await Promise.all([
    tData,
    worksData,
    editionsData,
    ratingData,
  ])

  const currentEdition =
    editions.entries?.find((book, id) => id === editionId) ||
    editions.entries?.find(
      (book) => book?.covers !== undefined && book.number_of_pages !== undefined
    )

  const authorKeys = currentEdition?.authors?.map((author) =>
    author.key.slice(9)
  )
  const authors = authorKeys
    ? await Promise.all(authorKeys?.map((key) => currentAuthor(key)))
    : null
  const authorNames = authors ? authors?.map((name) => name.name) : [""]
  const cover =
    currentEdition?.covers?.find((cover) => cover !== undefined) ||
    works.covers?.find((cover) => cover !== undefined)
  const records = currentEdition?.source_records
    ? currentEdition?.source_records
    : null
  const amazonRecord = records?.find((record) => /^amazon/.test(record))
  const bwbRecord = records?.find((record) => /^bwb/.test(record))

  const description =
    works?.description instanceof Object
      ? works?.description?.value
      : works?.description

  if (works === undefined)
    return (
      <section className="py-4 fluid-xl text-textPrimary">
        {t("Not found pt1")}
        {params.query}
        {t("Not found pt2")}
      </section>
    )

  const bookBookmark = {
    id: works.key.slice(7)!,
    title: works?.title || t("Unknown"),
    coverPath: cover || 0,
    author: authorNames,
    date: currentEdition?.publish_date
      ? +currentEdition?.publish_date.slice(-4)
      : 0,
    editions: editions.entries?.length || 0,
    languages: currentEdition?.languages?.map((lang) => lang.key.slice(-3)),
    folderPath: "https://covers.openlibrary.org/b/id/",
    catalog: "book" as const,
    locale: params.locale,
    user_email: session?.user?.email,
  }

  return (
    <section className="md:grid gap-y-6 gap-x-4 fluid-base lg:justify-self-center text-textPrimary lg:grid-cols-[28.75rem_1fr] flex flex-wrap py-4">
      <div>
        <Image
          className="relative z-10 transition duration-300 delay-300 rounded lg:hover:translate-x-2/4 drop-shadow-lg lg:hover:scale-125"
          src={
            cover
              ? `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
              : "https://fakeimg.pl/460x690/d1d1d1/878787?text=No+image"
          }
          alt="backdrop"
          width={460}
          height={690}
          placeholder="blur"
          blurDataURL="data:image/png;base64,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"
        />
      </div>

      <ul className="grid content-start gap-y-3">
        <li className="flex items-start gap-2 pt-2">
          <h1 className="text-accent fluid-2xl max-w-[30rem]">{works.title}</h1>
          <BookmarkButton props={bookBookmark} />
        </li>

        {currentEdition?.publish_date ? (
          <li className="flex gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Date")}{" "}
            </label>
            {currentEdition?.publish_date}
          </li>
        ) : null}

        <li className="flex flex-wrap gap-x-2">
          <label className="font-semibold text-textHoverPrimary">
            {t("Author")}
          </label>
          <span>
            {authorNames.map((name, id, arr) =>
              id < arr.length - 1 ? (
                <Link
                  className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                  key={name + "key"}
                  href={`/${params.locale}/discover/books?author=${name}`}
                  locale={params.locale}
                >
                  {name}
                  {", "}
                </Link>
              ) : (
                <Link
                  className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                  key={name + "key"}
                  href={`/${params.locale}/discover/books?author=${name}`}
                  locale={params.locale}
                >
                  {name}
                </Link>
              )
            )}{" "}
          </span>
        </li>

        {works?.subjects ? (
          <li className="grid gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Subjects")}
            </label>
            <div className="flex flex-wrap max-w-lg p-1 overflow-auto rounded-md gap-x-2 max-h-40 bg-secondary">
              {works.subjects.map((subject, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={subject + "key"}
                    href={`/${params.locale}/discover/books?subject=${subject}`}
                    locale={params.locale}
                  >
                    {subject}
                    {", "}
                  </Link>
                ) : (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={subject + "key"}
                    href={`/${params.locale}/discover/books?subject=${subject}`}
                    locale={params.locale}
                  >
                    {subject}
                  </Link>
                )
              )}
            </div>
          </li>
        ) : null}
        {works?.subject_people ? (
          <li className="grid gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Characters")}{" "}
            </label>
            <span className="flex flex-wrap max-w-lg p-1 overflow-auto rounded gap-x-2 max-h-40 bg-secondary">
              {works?.subject_people.map((person, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={person + "key"}
                    href={`/${params.locale}/discover/books?person=${person}`}
                    locale={params.locale}
                  >
                    {person}
                    {", "}
                  </Link>
                ) : (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={person + "key"}
                    href={`/${params.locale}/discover/books?person=${person}`}
                    locale={params.locale}
                  >
                    {person}
                  </Link>
                )
              )}
            </span>
          </li>
        ) : null}
        {works?.subject_places ? (
          <li className="grid gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Places")}{" "}
            </label>
            <span className="flex flex-wrap max-w-lg p-1 overflow-auto rounded gap-x-2 max-h-40 bg-secondary">
              {works?.subject_places.map((place, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={place + "key"}
                    href={`/${params.locale}/discover/books?place=${place}`}
                    locale={params.locale}
                  >
                    {place}
                    {", "}
                  </Link>
                ) : (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={place + "key"}
                    href={`/${params.locale}/discover/books?place=${place}`}
                    locale={params.locale}
                  >
                    {place}
                  </Link>
                )
              )}
            </span>
          </li>
        ) : null}
        {works?.subject_times ? (
          <li className="grid gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Period")}{" "}
            </label>
            <span className="max-w-lg gap-2 p-1 overflow-auto border rounded-md max-h-28 border-primary">
              {works?.subject_times.map((period, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={period + "key"}
                    href={`/${params.locale}/discover/books?query=${period}`}
                    locale={params.locale}
                  >
                    {period}
                    {", "}
                  </Link>
                ) : (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={period + "key"}
                    href={`/${params.locale}/discover/books?query=${period}`}
                    locale={params.locale}
                  >
                    {period}
                  </Link>
                )
              )}
            </span>
          </li>
        ) : null}
        {editions.entries ? (
          <li className="grid gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Editions")}{" "}
            </label>
            <span className="flex flex-wrap max-w-lg gap-2 p-1 overflow-auto max-h-28 bg-secondary">
              {editions?.entries.map((entry, id) => (
                <Link
                  className="transition drop-shadow-md hover:scale-110"
                  key={entry.key}
                  href={`${params.query}?edition=${id}`}
                  scroll={false}
                >
                  <Image
                    unoptimized={true}
                    src={
                      entry?.covers?.find(
                        (cover) => cover !== -1 && cover !== undefined
                      ) ||
                      works?.covers?.find(
                        (cover) => cover !== -1 && cover !== undefined
                      )
                        ? `https://covers.openlibrary.org/b/id/${
                            entry?.covers?.find(
                              (cover) => cover !== -1 && cover !== undefined
                            ) ||
                            works?.covers?.find(
                              (cover) => cover !== -1 && cover !== undefined
                            )
                          }-M.jpg`
                        : "https://fakeimg.pl/64x96/d1d1d1/878787?text=No+image"
                    }
                    alt="Book cover"
                    width={64}
                    height={96}
                    title={entry.title}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAtElEQVR4Xu3XAQ3AIBAEQV4jcpCFQBCyUwmb8pObd/Zd4W8E8Ad4Am5A+AYuR5ACFKAABSgQLoBBDGIQgxgMI2AMYRCDGMQgBjEYLoBBDGIQgxgMI2ANYhCDGMQgBjEYLoBBDGIQgxgMI2ANYhCDGMQgBjEYLoBBDGIQgxgMI2ANYhCDGMQgBjEYLoBBDGIQgxgMI2ANYhCDGMQgBjEYLoBBDGIQgxgMI2ANYhCDGMQgBssMfqKY8GFgV1duAAAAAElFTkSuQmCC"
                  />
                </Link>
              ))}
            </span>
          </li>
        ) : null}
        {currentEdition?.number_of_pages ? (
          <li className="flex gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Pages")}
            </label>
            {currentEdition?.number_of_pages}
          </li>
        ) : null}
        {rating?.summary?.average ? (
          <li className="flex gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Rating")}
            </label>
            {`${rating.summary.average.toFixed(1)}/5`}
          </li>
        ) : null}
        {rating?.summary?.count ? (
          <li className="flex gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Votes")}
            </label>
            {rating.summary.count}
          </li>
        ) : null}
        {records ? (
          <li className="flex gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Buy")}
            </label>
            <span className="flex gap-2">
              {amazonRecord ? (
                <Link
                  title="Amazon"
                  className="transition drop-shadow-md hover:scale-110 text-accent"
                  href={`https://www.amazon.com/dp/${amazonRecord.slice(
                    7,
                    17
                  )}/?tag=internetarchi-20`}
                >
                  <AiFillAmazonSquare className="w-8 h-8" />
                </Link>
              ) : null}
              {bwbRecord ? (
                <Link
                  title="Better World Books"
                  className="transition drop-shadow-md hover:scale-110"
                  href={`https://www.betterworldbooks.com/product/detail/-${bwbRecord.slice(
                    4
                  )}`}
                >
                  <Image
                    unoptimized={true}
                    src={`/images/BWBookicon_400x400.png`}
                    alt="Better World Books logo"
                    width={28}
                    height={28}
                  />
                </Link>
              ) : null}
            </span>
          </li>
        ) : null}
        {works?.links ? (
          <li className="grid gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Links")}
            </label>
            <span className="flex flex-wrap max-w-lg p-1 overflow-auto rounded gap-x-2 max-h-40 bg-secondary">
              {works.links.map((link, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={link + "key"}
                    href={link.url}
                    locale={params.locale}
                  >
                    {link.title},{" "}
                  </Link>
                ) : (
                  <Link
                    className="leading-relaxed truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={link + "key"}
                    href={link.url}
                    locale={params.locale}
                  >
                    {link.title}
                  </Link>
                )
              )}
            </span>
          </li>
        ) : null}
      </ul>
      <section className="grid col-span-2 gap-2 py-2 max-w-[80ch]">
        <h1 className="font-semibold fluid-lg">{t("Overview")}</h1>
        <p className="p-1 pl-4 leading-relaxed text-balance">
          {description ? description : t("NA")}
        </p>
      </section>
    </section>
  )
}
