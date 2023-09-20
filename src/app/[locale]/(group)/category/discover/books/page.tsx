import type { Metadata } from "next"
import Pagination from "../../../_components/Pagination"
import CardDetailsContainer from "../../../_components/CardDetailsContainer"
import CardBookDetails from "../../../_components/common/CardBookDetails"
import { getTranslator } from "next-intl/server"
import Bookmark from "@/app/[locale]/_components/common/Bookmark"
import { SortBooks, popularBooks, searchBook } from "@/api/FETCH_OPEN_LIBRARY"
import BooksFilter from "../../../_components/BooksFilter"

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

  const tData = getTranslator(params.locale, "SearchResults")
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
  const [t, bookResponse] = await Promise.all([tData, bookData])

  const bookResult =
    "numFound" in bookResponse ? bookResponse?.docs : bookResponse?.works
  const totalResults = "numFound" in bookResponse ? bookResponse?.numFound : 200
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
        date: book?.first_publish_year,
      }
      return (
        <CardBookDetails
          key={book.key + book.edition_count}
          locale={params.locale}
          props={props}
          button={<Bookmark props={props} />}
        />
      )
    })
  ) : (
    <section>{t("NotFound")}.</section>
  )
  return (
    <>
      <BooksFilter locale={params.locale} />
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
