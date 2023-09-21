import "./globals.css"
import type { Metadata } from "next"
import Header from "./_components/Header"
import { useLocale } from "next-intl"
import { notFound } from "next/navigation"
import Favicon from "/public/images/favicon/favicon-32x32.png"
import Footer from "./_components/Footer"
import { Sofia_Sans } from "next/font/google"

type Params = {
  children: string
  params: {
    locale: Locale
  }
}

const sofia_Sans = Sofia_Sans({
  subsets: ["latin", "latin-ext"],
})

export const metadata: Metadata = {
  title: "My Leisure",
  description: "Search for movies, series and books you interested in",
  icons: [{ rel: "icon", url: Favicon.src }],
}

export default function LocaleLayout({ children, params }: Params) {
  const locale = useLocale()
  if (params.locale !== locale) {
    notFound()
  }
  return (
    <html lang={locale}>
      <body className="dark">
        <div
          className={`grid grid-cols-12 bg-background ${sofia_Sans.className}`}
        >
          <Header locale={locale} />
          <main className="grid col-start-2 col-end-12 row-start-2 row-end-3">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  )
}
