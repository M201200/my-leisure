import type { Metadata } from "next"
import Pagination from "@/app/[locale]/components/Pagination"
import CardDetailsContainer from "@/app/[locale]/components/CardDetailsContainer"
import CardBookDetails from "@/app/[locale]/components/common/CardBookDetails"
import { getTranslations } from "next-intl/server"
import {
  SortBooks,
  popularBooks,
  searchBook,
} from "@/app/api/FETCH_OPEN_LIBRARY"
import BooksFilter from "@/app/[locale]/components/BooksFilter"
import { auth } from "@/app/lib/auth"

type Props = {
  params: {
    locale: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "Books",
}

export default async function Books({ params, searchParams }: Props) {
  const session = await auth()
  const tData = getTranslations("SearchResults")
  const tFilterQuery = getTranslations("BookFilter")

  const searchPage = searchParams.page ? +searchParams.page : 1
  const searchQuery = searchParams.query as string | undefined
  const searchTitle = searchParams.title as string | undefined
  const searchAuthor = searchParams.author as string | undefined
  const searchSubject = searchParams.subject as string | undefined
  const searchPlace = searchParams.place as string | undefined
  const searchPerson = searchParams.person as string | undefined
  const searchLanguage = searchParams.language as string | undefined
  const searchPublisher = searchParams.publisher as string | undefined
  const sort = searchParams.sort as SortBooks | undefined

  const isFiltered =
    searchQuery ||
    searchTitle ||
    searchAuthor ||
    searchSubject ||
    searchPlace ||
    searchPerson ||
    searchLanguage ||
    searchPublisher

  const bookData = isFiltered
    ? searchBook({
        query: searchQuery,
        page: searchPage,
        title: searchTitle,
        author: searchAuthor,
        subject: searchSubject,
        place: searchPlace,
        person: searchPerson,
        language: searchLanguage,
        publisher: searchPublisher,
        sort: sort,
      })
    : popularBooks(searchPage, sort)
  const [t, tFilterAsync, bookResponse] = await Promise.all([
    tData,
    tFilterQuery,
    bookData,
  ])

  const bookResult =
    "numFound" in bookResponse ? bookResponse?.docs : bookResponse?.works
  const totalResults = "numFound" in bookResponse ? bookResponse?.numFound : 200
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
        date: book?.first_publish_year,
        locale: params.locale,
        user_email: session?.user?.email,
      }
      return (
        <CardBookDetails
          key={book.key + book?.title}
          locale={params.locale}
          props={props}
        />
      )
    })
  ) : (
    <section className="col-span-4 p-2 rounded bg-secondary text-textPrimary fluid-lg">
      {t("NotFound")}
    </section>
  )
  const tFilter = {
    Filters: tFilterAsync("Filters"),
    Sort: tFilterAsync("Sort"),
    Popularity: tFilterAsync("Popularity"),
    Order: tFilterAsync("Order"),
    Submit: tFilterAsync("Submit"),
    Reset: tFilterAsync("Reset"),
    Any: tFilterAsync("Any"),
    ByTitle: tFilterAsync("ByTitle"),
    ByAuthor: tFilterAsync("ByAuthor"),
    BySubject: tFilterAsync("BySubject"),
    ByPlace: tFilterAsync("ByPlace"),
    ByPerson: tFilterAsync("ByPerson"),
    ByLanguage: tFilterAsync("ByLanguage"),
    ByPublisher: tFilterAsync("ByPublisher"),
    Relevance: tFilterAsync("Relevance"),
    Editions: tFilterAsync("Editions"),
    Date: tFilterAsync("Date"),
    Desc: tFilterAsync("Desc"),
    Asc: tFilterAsync("Asc"),
    Rating: tFilterAsync("Rating"),
    Random: tFilterAsync("Random"),
  }
  return (
    <>
      <BooksFilter t={tFilter} />
      <CardDetailsContainer
        label={t("Books")}
        hasCount={totalAmount}
        locale={params.locale}
      >
        {bookList}
      </CardDetailsContainer>
      <Pagination totalPages={totalPages} />
    </>
  )
}
