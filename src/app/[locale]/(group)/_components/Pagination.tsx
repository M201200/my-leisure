"use client"
import Link from "next-intl/link"
import { usePathname } from "next-intl/client"
import { useSearchParams } from "next/navigation"

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
    <span className=" min-w-[1rem] bg-slate-300 flex align-middle justify-center rounded p-2 text-slate-500 ">
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
        key={page}
        href={setPage(page)}
        className=" bg-slate-500 hover:bg-slate-950 min-w-[1rem] rounded p-2 text-slate-100 flex align-middle justify-center"
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
        key={page}
        href={setPage(page)}
        className=" bg-slate-500 hover:bg-slate-950 min-w-[1rem] rounded p-2 text-slate-100 flex align-middle justify-center"
      >
        {page}
      </Link>
    )
  }

  return (
    <div className="flex justify-center h-8 gap-2">
      {currentPage === 1 ? null : (
        <Link
          href={setPage(1)}
          className=" bg-slate-500 hover:bg-slate-950 min-w-[1rem] rounded p-2 text-slate-100 flex align-middle justify-center"
        >
          1
        </Link>
      )}

      {prevPages.length > 1 ? <span>...</span> : null}
      {[...prevPages]}
      {activePage}
      {[...nextPages]}
      {nextPages.length > 1 ? <span>...</span> : null}

      {currentPage === lastPage ? null : (
        <Link
          href={setPage(lastPage)}
          className=" bg-slate-500 hover:bg-slate-950 min-w-[1rem] rounded p-2 text-slate-100 flex align-middle justify-center"
        >
          {lastPage}
        </Link>
      )}
    </div>
  )
}
