import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CardDetailsContainer from "@/app/[locale]/components/CardDetailsContainer"
import Pagination from "@/app/[locale]/components/Pagination"
import { searchBook } from "@/app/api/FETCH_OPEN_LIBRARY"
import CardBookDetails from "@/app/[locale]/components/common/CardBookDetails"
import { auth } from "@/app/lib/auth"
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
  const session = await auth()

  const searchQuery = (searchParams.query as string) || ""
  const searchPage = searchParams.page ? +searchParams.page : 1

  const tData = getTranslations("SearchResults")
  const bookData = searchBook({ query: searchQuery, page: searchPage })
  const [t, bookResponse] = await Promise.all([tData, bookData])

  const bookResult = bookResponse?.docs
  const totalResults = bookResponse?.numFound
  const totalPages = Math.ceil(totalResults / 20) || 1 // 20 is a limit of books per page
  const totalAmount = totalResults! > 10000 ? 10000 : totalResults

  const bookList = bookResult?.length ? (
    bookResult.map((book) => {
      const props = {
        id: book.key.slice(7)!,
        catalog: "book" as const,
        folderPath: "https://covers.openlibrary.org/b/id/",
        coverPath: book?.cover_i || 0,
        title: book?.title ? book?.title : "No title",
        author: book?.author_name,
        editions: book.edition_count,
        languages: book.language,
        date: book.first_publish_year,
        locale: params.locale,
        user_email: session?.user?.email,
      }
      return (
        <CardBookDetails
          key={book.key.slice(7)}
          props={props}
          locale={params.locale}
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
