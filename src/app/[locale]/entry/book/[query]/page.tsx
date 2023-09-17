import type { Metadata } from "next"
import Image from "next/image"
import Link from "next-intl/link"
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
  const author = currentEdition?.authors
    ? await currentAuthor(currentEdition?.authors![0].key.slice(9))
    : null
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
      <section>
        {t("Not found pt1")}
        {params.query}
        {t("Not found pt2")}
      </section>
    )

  const bookBookmark: BookEntry = {
    id: works.key.slice(7)!,
    title: works?.title || t("Unknown"),
    coverPath: cover,
    author: [author?.name || ""],
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
      <section className="md:grid gap-4 md:grid-cols-[28.75rem_1fr] flex flex-wrap">
        <div>
          <Image
            src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
            alt="backdrop"
            width={460}
            height={690}
          />
        </div>

        <section>
          <h2>
            {works.title} <Bookmark props={bookBookmark} />
          </h2>
          {currentEdition?.publish_date ? (
            <div className="flex gap-x-2">
              <h5>{t("Date")} </h5>
              {currentEdition?.publish_date}
            </div>
          ) : null}
          {author?.name ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Author")}</h5>
              <span>{author?.fuller_name || author.name}</span>
            </div>
          ) : null}
          {works?.subjects ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Subjects")}</h5>

              {works.subjects.map((subject, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    key={subject + "key"}
                    href={`/category/discover/books?subject=${subject}`}
                    locale={params.locale}
                  >
                    {subject}
                    {", "}
                  </Link>
                ) : (
                  <Link
                    key={subject + "key"}
                    href={`/category/discover/books?subject=${subject}`}
                    locale={params.locale}
                  >
                    {subject}
                  </Link>
                )
              )}
            </div>
          ) : null}
          {works?.subject_people ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Characters")} </h5>
              {works?.subject_people.map((character, id, arr) =>
                id < arr.length - 1 ? (
                  <span key={character + "key"}>{character},</span>
                ) : (
                  <span key={character + "key"}>{character}</span>
                )
              )}
            </div>
          ) : null}
          {works?.subject_places ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Places")} </h5>
              {works?.subject_places.map((place, id, arr) =>
                id < arr.length - 1 ? (
                  <span key={place + "key"}>{place},</span>
                ) : (
                  <span key={place + "key"}>{place}</span>
                )
              )}
            </div>
          ) : null}
          {works?.subject_times ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Period")} </h5>
              {works?.subject_times.map((date, id, arr) =>
                id < arr.length - 1 ? (
                  <span key={date + "key"}>{date},</span>
                ) : (
                  <span key={date + "key"}>{date}</span>
                )
              )}
            </div>
          ) : null}
          {editions.entries ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Editions")} </h5>
              <span className="flex flex-wrap gap-x-2">
                {editions?.entries.map((entry, id) => (
                  <Link
                    key={entry.key}
                    href={`${params.query}?edition=${id}`}
                    scroll={false}
                  >
                    <Image
                      src={`https://covers.openlibrary.org/b/id/${
                        entry?.covers?.find((cover) => cover !== undefined) ||
                        works.covers?.find((cover) => cover !== undefined)
                      }-M.jpg`}
                      alt="Book cover"
                      width={64}
                      height={96}
                      title={entry.title}
                    />
                  </Link>
                ))}
              </span>
            </div>
          ) : null}
          {currentEdition?.number_of_pages ? (
            <div className="flex gap-x-2">
              <h5>{t("Pages")}</h5>
              {currentEdition?.number_of_pages}
            </div>
          ) : null}
          {rating?.summary?.average ? (
            <div className="flex gap-x-2">
              <h5>{t("Rating")}</h5>
              {`${rating.summary.average.toFixed(1)}/5`}
            </div>
          ) : null}
          {rating?.summary?.count ? (
            <div className="flex gap-x-2">
              <h5>{t("Votes")}</h5>
              {rating.summary.count}
            </div>
          ) : null}
          {records ? (
            <div className="flex gap-x-2">
              <h5>{t("Buy")}</h5>
              {amazonRecord ? (
                <Link
                  href={`https://www.amazon.com/dp/${amazonRecord.slice(
                    7,
                    17
                  )}/?tag=internetarchi-20`}
                >
                  Amazon
                </Link>
              ) : null}
              {amazonRecord && bwbRecord ? ", " : null}
              {bwbRecord ? (
                <Link
                  href={`https://www.betterworldbooks.com/product/detail/-${bwbRecord.slice(
                    4
                  )}`}
                >
                  Better World Books
                </Link>
              ) : null}
            </div>
          ) : null}
          {works?.links ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Links")}</h5>
              <span>
                {works.links.map((link, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={link + "key"}
                      href={link.url}
                      locale={params.locale}
                    >
                      {link.title},{" "}
                    </Link>
                  ) : (
                    <Link
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
          <h5>{t("Overview")}</h5>
          <p>{description ? description : t("NA")}</p>
        </section>
      </section>
    </>
  )
}
