"use client"
import Link from "next-intl/link"
import { usePathname } from "next-intl/client"
import { useSearchParams } from "next/navigation"
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs"

type Props = {
  totalPages: number
}

export default function Pagination({ totalPages }: Props) {
  const currentPath = usePathname()
  const query = useSearchParams()
  const currentPage = query.get("page") ? Number(query.get("page")) : 1
  function setPage(page: number) {
    const newQuery = new URLSearchParams(query)
    /* @ts-ignore */
    newQuery.set("page", page)
    return currentPath + "?" + newQuery
  }
  if (totalPages <= 1) return null
  const lastPage = totalPages > 500 ? 500 : totalPages
  const prevPages = []
  const nextPages = []
  const activePage = (
    <span
      className="min-w-[2rem] bg-secondary flex align-middle justify-center rounded px-2 py-1 text-textPrimary"
      title={currentPage.toString()}
    >
      {currentPage}
    </span>
  )

  for (
    let page = currentPage - 1;
    page > 1 && page + 3 !== currentPage;
    --page
  ) {
    prevPages.unshift(
      <Link
        title={page.toString()}
        key={page}
        href={setPage(page)}
        className=" bg-accent hover:bg-hoverAccent min-w-[2rem] transition-color rounded px-2 py-1 text-textSecondary flex align-middle justify-center"
      >
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
      <Link
        title={page.toString()}
        key={page}
        href={setPage(page)}
        className=" bg-accent hover:bg-hoverAccent min-w-[2rem] transition-color rounded px-2 py-1 text-textSecondary flex align-middle justify-center"
      >
        {page}
      </Link>
    )
  }

  return (
    <div className="flex justify-center gap-2 m-4 fluid-base gap-x-2 h-max">
      {currentPage === 1 ? null : (
        <Link
          title={(currentPage - 1).toString()}
          href={setPage(currentPage - 1)}
          className=" bg-accent hover:bg-hoverAccent min-w-[2rem] items-center transition-color rounded px-2 py-1 text-textSecondary flex align-middle justify-center"
        >
          <BsChevronLeft />
        </Link>
      )}
      {currentPage === 1 ? null : (
        <Link
          title="1"
          href={setPage(1)}
          className=" bg-accent hover:bg-hoverAccent min-w-[2rem] items-center transition-color rounded px-2 py-1 text-textSecondary flex align-middle justify-center"
        >
          <BsChevronDoubleLeft />
        </Link>
      )}

      {prevPages.length > 1 ? <span>...</span> : null}
      {[...prevPages]}
      {activePage}
      {[...nextPages]}
      {nextPages.length > 1 ? <span>...</span> : null}

      {currentPage === lastPage ? null : (
        <Link
          title={lastPage.toString()}
          href={setPage(lastPage)}
          aria-disabled={currentPage === lastPage}
          className=" bg-accent hover:bg-hoverAccent items-center min-w-[2rem] transition-color rounded px-2 py-1 text-textSecondary flex align-middle justify-center"
        >
          <BsChevronDoubleRight />
        </Link>
      )}
      {currentPage === lastPage ? null : (
        <Link
          title={(currentPage + 1).toString()}
          href={setPage(currentPage + 1)}
          aria-disabled={currentPage === lastPage}
          className=" bg-accent hover:bg-hoverAccent items-center min-w-[2rem] transition-color rounded px-2 py-1 text-textSecondary flex align-middle justify-center"
        >
          <BsChevronRight />
        </Link>
      )}
    </div>
  )
}
