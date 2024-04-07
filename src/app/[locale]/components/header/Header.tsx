import React from "react"

import { getTranslations } from "next-intl/server"
import { Dancing_Script } from "next/font/google"
import Link from "next/link"

import { auth } from "@/app/lib/auth"
import loadProfile from "../../../../utils/actions/loadProfile"

import { ProfileLinks } from "./ProfileLinks"
import LanguageSwitcher from "./LanguageSwitcher"
import SearchBar from "./SearchBar"
import ThemeToggle from "./ThemeToggle"
import { NavLinks } from "./NavLinks"

type Props = {
  locale: Locale
}

const dancingScript = Dancing_Script({
  subsets: ["latin"],
})

export default async function Header({ locale }: Props) {
  const linksTlQuery = getTranslations("Header")
  const languageTlQuery = getTranslations("LanguageSwitcher")
  const themeTlQuery = getTranslations("ThemeSwitcher")
  const logInTlQuery = getTranslations("LogIn")

  const [linksTlAsync, languageTlAsync, themeTlAsync, logInTlAsync] =
    await Promise.all([
      linksTlQuery,
      languageTlQuery,
      themeTlQuery,
      logInTlQuery,
    ])

  const linksTl = {
    main: linksTlAsync("Main"),
    movies: linksTlAsync("Movies"),
    series: linksTlAsync("Series"),
    books: linksTlAsync("Books"),
    guest: linksTlAsync("Guest"),
    profile: linksTlAsync("Profile"),
    favorites: linksTlAsync("Bookmarks"),
    signin: logInTlAsync("Signin"),
    signout: logInTlAsync("Signout"),
  }

  const searchTl = {
    placeholder: linksTlAsync("SearchPlaceholder"),
    movie: linksTlAsync("Movie"),
    tvshow: linksTlAsync("TVShow"),
    book: linksTlAsync("Book"),
    search: linksTlAsync("Search"),
  }

  const languageTl = {
    changeLanguage: languageTlAsync("ChangeLanguage"),
    en: languageTlAsync("en"),
    ro: languageTlAsync("ro"),
    ru: languageTlAsync("ru"),
  }

  const themeTl = {
    changeTheme: themeTlAsync("ChangeTheme"),
    light: themeTlAsync("Light"),
    dark: themeTlAsync("Dark"),
  }

  const session = await auth()
  const userEmail = session?.user?.email
  const userPreferences = await loadProfile(locale, userEmail)

  return (
    <header className="grid col-start-1 col-end-13 gap-4 p-2">
      <ul className="flex justify-end gap-2 px-4 py-2">
        <li>
          <LanguageSwitcher
            locale={userPreferences.preferredLocale}
            user_email={userEmail}
            tl={languageTl}
          />
        </li>
        <li>
          <ThemeToggle
            tl={themeTl}
            currentTheme={userPreferences.theme}
            user_email={userEmail}
          />
        </li>
      </ul>
      <ul className="grid w-[80vw] grid-cols-3 gap-2 px-2 justify-self-center">
        <li className="grid items-center justify-self-start">
          <NavLinks tl={linksTl} locale={locale} />
        </li>
        <li className="grid content-center justify-center fluid-base">
          <Link
            href={`/${locale}/main`}
            className={`flex content-center w-max lg:justify-start ${dancingScript.className} hover:scale-95 transition-transform fluid-xl`}
            title={linksTl.main}
          >
            <span className="w-full text-center lg:hidden text-textPrimary">
              <span className="text-orange-600">M</span>L
            </span>
            <span className="hidden w-full text-center lg:block text-textPrimary">
              <span className="text-orange-600">My</span> Leisure
            </span>
          </Link>
        </li>
        <ProfileLinks
          tl={linksTl}
          locale={locale}
          session={session}
          userPreferences={userPreferences}
        />
      </ul>
      <ul className="justify-self-center min-w-[80vw]">
        <SearchBar locale={locale} tl={searchTl} />
      </ul>
    </header>
  )
}
