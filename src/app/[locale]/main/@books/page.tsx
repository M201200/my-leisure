import CardPopularContainer from "../../components/CardPopularContainer"
import { getTranslations } from "next-intl/server"
import Bookmark from "../../components/common/Bookmark"
import { popularBooks } from "@/app/api/FETCH_OPEN_LIBRARY"
import CardPopularBook from "../../components/common/CardPopularBook"
import { auth } from "@/app/lib/auth"

type Params = {
  params: {
    locale: Locale
  }
}

export default async function BooksMain({ params: { locale } }: Params) {
  const session = await auth()
  const user_email = session?.user?.email
  const coverOpenLibraryFolderPath = "https://covers.openlibrary.org/b/id/"
  const tData = getTranslations("MainPage")
  const booksData = popularBooks()

  const [t, booksResponse] = await Promise.all([tData, booksData])

  const buttonLabels: [string, string] = [t("Prev"), t("Next")]

  const books = booksResponse?.works
  const booksCatalog = "book"
  const bookList = books?.map((book) => ({
    id: book.key.slice(7)!,
    title: book?.title || t("Unknown"),
    coverPath: book?.cover_i,
    author: book?.author_name,
    date: book?.first_publish_year,
    editions: book?.edition_count || 0,
    languages: book?.language || [""],
  }))
  return (
    <CardPopularContainer label={t("labelBooks")} buttonLabels={buttonLabels}>
      {bookList
        ? bookList.map((book) => (
            <CardPopularBook
              key={book.id}
              id={book.id!}
              locale={locale}
              catalog={booksCatalog}
              folderPath={coverOpenLibraryFolderPath}
              coverPath={book.coverPath}
              title={book.title}
              author={book?.author ? [book?.author[0]] : [t("Unknown")]}
              date={book.date}
              user_email={user_email}
              editions={book.editions}
              languages={book?.languages}
            />
          ))
        : t("Error")}
    </CardPopularContainer>
  )
}
