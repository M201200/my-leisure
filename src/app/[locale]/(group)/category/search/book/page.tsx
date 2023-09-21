import type { Metadata } from "next"
import { getTranslator } from "next-intl/server"
import Bookmark from "@/app/[locale]/_components/common/Bookmark"
import CardDetailsContainer from "../../../_components/CardDetailsContainer"
import Pagination from "../../../_components/Pagination"
import { searchBook } from "@/api/FETCH_OPEN_LIBRARY"
import CardBookDetails from "../../../_components/common/CardBookDetails"
type Props = {
  params: {
    locale: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "Search",
}

export default async function SearchBookPage({ params, searchParams }: Props) {
  const searchQuery = (searchParams.query as string) || ""
  const searchPage = searchParams.page ? +searchParams.page : 1

  const tData = getTranslator(params.locale, "SearchResults")
  const bookData = searchBook({ query: searchQuery, page: searchPage })
  const [t, bookResponse] = await Promise.all([tData, bookData])

  const bookResult = bookResponse?.docs
  const totalResults = bookResponse?.numFound
  const totalPages = Math.ceil(totalResults / 20) || 1 // 20 is a limit of books per page
  const totalAmount = totalResults! > 10000 ? 10000 : totalResults

  const bookList = bookResult?.length ? (
    bookResult.map((book) => {
      const props: BookEntry = {
        id: book.key.slice(7)!,
        catalog: "book",
        folderPath: "https://covers.openlibrary.org/b/id/",
        coverPath: book?.cover_i,
        title: book?.title ? book?.title : "No title",
        author: book?.author_name,
        editions: book.edition_count,
        languages: book.language,
        date: book.first_publish_year,
      }
      return (
        <CardBookDetails
          key={book.key.slice(7)}
          props={props}
          locale={params.locale}
          button={<Bookmark props={props} />}
        />
      )
    })
  ) : (
    <section className="col-span-4 p-2 rounded fluid-lg text-textPrimary bg-secondary">
      {t("NotFound")}.
    </section>
  )
  return (
    <div className="grid content-start min-h-screen gap-4">
      <h1 className="py-2 rounded fluid-lg text-textPrimary">
        {t("Search")} &rdquo;{searchQuery}&rdquo;:
      </h1>

      <CardDetailsContainer
        label={t("Books")}
        hasCount={totalAmount}
        locale={params.locale}
      >
        {bookList}
      </CardDetailsContainer>
      <Pagination totalPages={totalPages} />
    </div>
  )
}
