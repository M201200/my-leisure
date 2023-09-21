import type { Metadata } from "next"
import Image from "next/image"
import Link from "next-intl/link"
import { AiFillAmazonSquare } from "react-icons/ai"
import { getTranslator } from "next-intl/server"
import {
  currentAuthor,
  currentWorks,
  currentWorksEditions,
  currentWorksRating,
} from "@/api/FETCH_OPEN_LIBRARY"
import Bookmark from "@/app/[locale]/_components/common/Bookmark"

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
  const query = params.query
  const lastIndexOfId = query.search(/%26/)
  const id = lastIndexOfId === -1 ? query : query.slice(0, lastIndexOfId)

  const editionId = searchParams.edition ? +searchParams.edition : null

  const tData = getTranslator(params.locale, "BookDetails")

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

  const bookBookmark: BookEntry = {
    id: works.key.slice(7)!,
    title: works?.title || t("Unknown"),
    coverPath: cover,
    author: authorNames,
    date: currentEdition?.publish_date
      ? +currentEdition?.publish_date.slice(-4)
      : 0,
    editions: editions.entries?.length || 0,
    languages: currentEdition?.languages?.map((lang) => lang.key.slice(-3)),
    folderPath: "https://covers.openlibrary.org/b/id/",
    catalog: "book",
  }

  return (
    <>
      <section className="md:grid gap-4 fluid-base lg:justify-self-center lg:max-w-[120ch] text-textPrimary lg:grid-cols-[28.75rem_1fr] flex flex-wrap py-4">
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

        <section className="grid content-start gap-y-2">
          <div className="flex items-start gap-2 pt-2">
            <h1 className="text-accent fluid-2xl max-w-[30rem]">
              {works.title}
            </h1>
            <Bookmark props={bookBookmark} />
          </div>

          {currentEdition?.publish_date ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Date")} </label>
              {currentEdition?.publish_date}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-x-2">
            <label className="font-semibold">{t("Author")}</label>
            <span>
              {authorNames.map((name, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={name + "key"}
                    href={`/category/discover/books?author=${name}`}
                    locale={params.locale}
                  >
                    {name}
                    {", "}
                  </Link>
                ) : (
                  <Link
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    key={name + "key"}
                    href={`/category/discover/books?author=${name}`}
                    locale={params.locale}
                  >
                    {name}
                  </Link>
                )
              )}{" "}
            </span>
          </div>

          {works?.subjects ? (
            <div className="grid gap-x-2">
              <label className="font-semibold">{t("Subjects")}</label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-20 border-primary">
                {works.subjects.map((subject, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={subject + "key"}
                      href={`/category/discover/books?subject=${subject}`}
                      locale={params.locale}
                    >
                      {subject}
                      {", "}
                    </Link>
                  ) : (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={subject + "key"}
                      href={`/category/discover/books?subject=${subject}`}
                      locale={params.locale}
                    >
                      {subject}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}
          {works?.subject_people ? (
            <div className="grid gap-x-2">
              <label className="font-semibold">{t("Characters")} </label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-20 border-primary">
                {works?.subject_people.map((person, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={person + "key"}
                      href={`/category/discover/books?person=${person}`}
                      locale={params.locale}
                    >
                      {person}
                      {", "}
                    </Link>
                  ) : (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={person + "key"}
                      href={`/category/discover/books?person=${person}`}
                      locale={params.locale}
                    >
                      {person}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}
          {works?.subject_places ? (
            <div className="grid gap-x-2">
              <label className="font-semibold">{t("Places")} </label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-20 border-primary">
                {works?.subject_places.map((place, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={place + "key"}
                      href={`/category/discover/books?place=${place}`}
                      locale={params.locale}
                    >
                      {place}
                      {", "}
                    </Link>
                  ) : (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={place + "key"}
                      href={`/category/discover/books?place=${place}`}
                      locale={params.locale}
                    >
                      {place}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}
          {works?.subject_times ? (
            <div className="grid gap-x-2">
              <label className="font-semibold">{t("Period")} </label>
              <span className="max-w-lg gap-2 p-1 overflow-auto border rounded-md max-h-28 border-primary">
                {works?.subject_times.map((period, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={period + "key"}
                      href={`/category/discover/books?query=${period}`}
                      locale={params.locale}
                    >
                      {period}
                      {", "}
                    </Link>
                  ) : (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={period + "key"}
                      href={`/category/discover/books?query=${period}`}
                      locale={params.locale}
                    >
                      {period}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}
          {editions.entries ? (
            <div className="grid gap-x-2">
              <label className="font-semibold">{t("Editions")} </label>
              <span className="flex flex-wrap max-w-lg gap-2 p-1 overflow-auto border rounded-md max-h-28 border-primary">
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
                        entry?.covers?.find((cover) => cover !== undefined) ||
                        works?.covers?.find((cover) => cover !== undefined)
                          ? `https://covers.openlibrary.org/b/id/${
                              entry?.covers?.find(
                                (cover) => cover !== undefined
                              ) ||
                              works?.covers?.find(
                                (cover) => cover !== undefined
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
            </div>
          ) : null}
          {currentEdition?.number_of_pages ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Pages")}</label>
              {currentEdition?.number_of_pages}
            </div>
          ) : null}
          {rating?.summary?.average ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Rating")}</label>
              {`${rating.summary.average.toFixed(1)}/5`}
            </div>
          ) : null}
          {rating?.summary?.count ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Votes")}</label>
              {rating.summary.count}
            </div>
          ) : null}
          {records ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Buy")}</label>
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
            </div>
          ) : null}
          {works?.links ? (
            <div className="grid gap-x-2">
              <label className="font-semibold">{t("Links")}</label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-20 border-primary">
                {works.links.map((link, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={link + "key"}
                      href={link.url}
                      locale={params.locale}
                    >
                      {link.title},{" "}
                    </Link>
                  ) : (
                    <Link
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                      key={link + "key"}
                      href={link.url}
                      locale={params.locale}
                    >
                      {link.title}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}
        </section>
        <section className="col-span-2">
          <h1 className="font-semibold fluid-lg">{t("Overview")}</h1>
          <p className="p-1 pr-4 overflow-auto text-justify border rounded-md max-h-40 border-primary">
            {description ? description : t("NA")}
          </p>
        </section>
      </section>
    </>
  )
}
