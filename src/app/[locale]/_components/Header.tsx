import Link from "next-intl/link"
import { getTranslator } from "next-intl/server"
import React from "react"
import SearchBar from "./common/SearchBar"
import LanguageSwitcher from "./common/LanguageSwitcher"
import Dropdown from "./Dropdown"
import { AiOutlineMenu } from "react-icons/ai"

type Props = {
  locale: Locale
}

export default async function Header({ locale }: Props) {
  const t = await getTranslator(locale, "Header")
  return (
    <nav className="grid justify-between grid-cols-3 lg:grid-cols-[5rem_1fr_5rem] col-start-2 col-end-12 row-start-1 row-end-2 p-8 gap-x-4">
      <Dropdown
        buttonLabel={<AiOutlineMenu />}
        additionalDropdownStyles="lg:max-h-max lg:opacity-100 lg:w-full"
        buttonStyles="lg:hidden"
        additionalContainerStyles="lg:col-start-2 lg:col-end-3 translate-y-1"
        hasArrow={false}
      >
        <ul className="grid justify-center gap-x-4 max-h-[inherit] overflow-hidden lg:flex">
          <li>
            <SearchBar locale={locale} />
          </li>
          <li>
            <Link href={"/category/discover/movies/"} locale={locale}>
              {t("Movies")}
            </Link>
          </li>
          <li>
            <Link href={"/category/discover/tvseries"} locale={locale}>
              {t("Series")}
            </Link>
          </li>
          <li>
            <Link href={"/category/discover/books?page=1"} locale={locale}>
              {t("Books")}
            </Link>
          </li>
        </ul>
      </Dropdown>

      <span className="lg:col-start-1 lg:col-end-2">
        <Link
          href={"/"}
          locale={locale}
          className="flex justify-center lg:justify-start"
        >
          My Leisure
        </Link>
      </span>

      <Dropdown
        buttonLabel={t("Profile")}
        additionalContainerStyles="justify-self-end lg:col-start-3 lg:col-end-4"
        additionalDropdownStyles="lg:col-start-3 lg:col-end-4"
      >
        <ul className="grid max-h-[inherit] overflow-hidden">
          <li>
            <LanguageSwitcher locale={locale} />
          </li>
          <li>
            <Link href={"/profile/Guest"} locale={locale}>
              {t("Guest")}
            </Link>
          </li>
        </ul>
      </Dropdown>
    </nav>
  )
}
