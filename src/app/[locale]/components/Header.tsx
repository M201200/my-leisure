import Link from "next-intl/link"
import { getTranslator } from "next-intl/server"
import React from "react"

type Props = {
  locale: Locale
  searchBar: React.ReactNode
  languageSwitcher: React.ReactNode
}

export default async function Header({
  locale,
  searchBar,
  languageSwitcher,
}: Props) {
  const t = await getTranslator(locale, "Header")
  return (
    <nav className="flex justify-between col-start-2 col-end-12 row-start-1 row-end-2 gap-4 p-8">
      <span>
        <Link href={"/"} locale={locale}>
          My Leisure
        </Link>
      </span>
      {searchBar}
      <ul className="flex gap-4">
        <li>
          <Link
            href={
              '/category/movies/"page":1,"minYear":1900,"maxYear":2023,"minScore":0,"maxScore":10,"sort_by":"popularity","sort_order":"desc","with_genres":[],"without_genres":[]'
            }
            locale={locale}
          >
            {t("Movies")}
          </Link>
        </li>
        <li>
          <Link
            href={
              '/category/tvseries/"page":1,"minYear":1900,"maxYear":2023,"minScore":0,"maxScore":10,"sort_by":"popularity","sort_order":"desc","with_genres":[],"without_genres":[]'
            }
            locale={locale}
          >
            {t("Series")}
          </Link>
        </li>
        <li>
          <Link href={"#"}>{t("Books")}</Link>
        </li>
        <li>{languageSwitcher}</li>
        <li>
          <Link href={"/profile/Guest"} locale={locale}>
            {t("Guest")}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
