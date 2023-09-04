import "./globals.css"
import type { Metadata } from "next"
import Header from "./components/Header"
import { useLocale } from "next-intl"
import { notFound } from "next/navigation"
import SearchBar from "./components/common/SearchBar"
import LanguageSwitcher from "./components/common/LanguageSwitcher"

type Params = {
  children: string
  params: {
    locale: Locale
  }
}

export const metadata: Metadata = {
  title: "My Leisure",
  description: "Search for movies, series and books you interested in",
}

export default function LocaleLayout({ children, params }: Params) {
  const locale = useLocale()
  if (params.locale !== locale) {
    notFound()
  }
  return (
    <html lang={locale}>
      <body className="grid grid-cols-12 ">
        <Header
          locale={locale}
          searchBar={<SearchBar locale={params.locale} />}
          languageSwitcher={<LanguageSwitcher locale={params.locale} />}
        />
        <main className="col-start-2 col-end-12 row-start-2">{children}</main>
      </body>
    </html>
  )
}
