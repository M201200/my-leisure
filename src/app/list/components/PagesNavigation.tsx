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
  const lastPage = totalPages > 500 ? 500 : totalPages
  const prevPages = []
  const nextPages = []
  const activePage =
    currentPage > 1 && currentPage < lastPage ? (
      <Link href={`/list/${path}/${currentPage}`}>{currentPage}</Link>
    ) : null
  for (
    let page = currentPage - 1;
    page > 1 && page + 3 !== currentPage;
    --page
  ) {
    prevPages.unshift(<Link href={`/list/${path}/${page}`}>{page}</Link>)
  }
  for (
    let page = currentPage + 1;
    page < lastPage && page - 3 !== currentPage;
    ++page
  ) {
    nextPages.push(<Link href={`/list/${path}/${page}`}>{page}</Link>)
  }
  return (
    <div className="flex gap-2">
      <Link href={`/list/${path}/1`}>1</Link>

      {prevPages.length > 1 ? <span>...</span> : null}
      {[...prevPages]}
      {activePage}
      {[...nextPages]}
      {nextPages.length > 1 ? <span>...</span> : null}

      <Link href={`/list/${path}/${lastPage}`}>{lastPage}</Link>
    </div>
  )
}
