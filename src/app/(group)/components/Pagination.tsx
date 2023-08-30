import { stringifyQuery } from "@/api/QueryActions"
import Link from "next/link"

type Props = {
  path: string
  queryObject: DiscoverQuery | SearchQuery
  totalPages: number
  media?: "movie" | "tvshow"
}

export default function Pagination({
  path,
  queryObject,
  totalPages,
  media,
}: Props) {
  function pageSetter(page: number, object: DiscoverQuery | SearchQuery) {
    if (media === "movie") return { ...object, moviePage: page }
    if (media === "tvshow") return { ...object, seriesPage: page }
    return { ...object, page: page }
  }
  const currentPage =
    "page" in queryObject
      ? queryObject.page
      : media === "movie"
      ? queryObject.moviePage
      : queryObject.seriesPage
  if (totalPages === 1) return null
  const lastPage = totalPages > 500 ? 500 : totalPages
  const prevPages = []
  const nextPages = []
  const activePage =
    currentPage > 1 && currentPage < lastPage ? (
      <Link
        href={`${path}/${stringifyQuery(pageSetter(currentPage, queryObject))}`}
      >
        {currentPage}
      </Link>
    ) : null

  for (
    let page = currentPage - 1;
    page > 1 && page + 3 !== currentPage;
    --page
  ) {
    prevPages.unshift(
      <Link href={`${stringifyQuery(pageSetter(page, queryObject))}`}>
        {page}
      </Link>
    )
  }

  for (
    let page = currentPage + 1;
    page < lastPage && page - 3 !== currentPage;
    ++page
  ) {
    nextPages.push(
      <Link href={`${stringifyQuery(pageSetter(page, queryObject))}`}>
        {page}
      </Link>
    )
  }

  return (
    <div className="flex gap-2">
      <Link href={`${path}/${stringifyQuery(pageSetter(1, queryObject))}`}>
        1
      </Link>

      {prevPages.length > 1 ? <span>...</span> : null}
      {[...prevPages]}
      {activePage}
      {[...nextPages]}
      {nextPages.length > 1 ? <span>...</span> : null}

      <Link
        href={`${path}/${stringifyQuery(pageSetter(lastPage, queryObject))}`}
      >
        {lastPage}
      </Link>
    </div>
  )
}
