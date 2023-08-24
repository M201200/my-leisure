import Link from "next/link"

type Props = {
  path: string
  currentPage: number
  totalPages: number
}

export default function PagesNavigation({
  path,
  currentPage,
  totalPages,
}: Props) {
  if (totalPages === 1) return null
  const lastPage = totalPages > 500 ? 500 : totalPages
  const prevPages = []
  const nextPages = []
  const activePage =
    currentPage > 1 && currentPage < lastPage ? (
      <Link href={`${path}/${currentPage}`}>{currentPage}</Link>
    ) : null
  for (
    let page = currentPage - 1;
    page > 1 && page + 3 !== currentPage;
    --page
  ) {
    prevPages.unshift(<Link href={`${path}/${page}`}>{page}</Link>)
  }
  for (
    let page = currentPage + 1;
    page < lastPage && page - 3 !== currentPage;
    ++page
  ) {
    nextPages.push(<Link href={`${path}/${page}`}>{page}</Link>)
  }
  return (
    <div className="flex gap-2">
      <Link href={`${path}/1`}>1</Link>

      {prevPages.length > 1 ? <span>...</span> : null}
      {[...prevPages]}
      {activePage}
      {[...nextPages]}
      {nextPages.length > 1 ? <span>...</span> : null}

      <Link href={`${path}/${lastPage}`}>{lastPage}</Link>
    </div>
  )
}
