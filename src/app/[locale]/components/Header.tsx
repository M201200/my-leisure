import React from "react"

import { getTranslations } from "next-intl/server"
import { Dancing_Script } from "next/font/google"
import Link from "next/link"
import { AiOutlineMenu } from "react-icons/ai"

import { auth } from "@/app/lib/auth"
import loadProfile from "@/utils/actions/LoadProfile"

import { ProfileButtons } from "./ProfileButtons"
import LanguageSwitcher from "./common/LanguageSwitcher"
import NavLink from "./common/NavLink"
import SearchBar from "./common/SearchBar"
import Dropdown from "./Dropdown"
import ThemeToggle from "./ThemeToggle"

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
          <Dropdown
            buttonLabel={<AiOutlineMenu className="w-5 h-5" />}
            buttonStyles="lg:hidden"
          >
            <ul className="grid content-center justify-center gap-2 p-1 text-center rounded lg:bg-inherit bg-secondary text-textPrimary drop-shadow-xl gap-x-4 lg:flex">
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink href={`/${locale}/main`} title={linksTl.main}>
                  {linksTl.main}
                </NavLink>
              </li>
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink
                  href={`/${locale}/category/discover/movies`}
                  title={linksTl.movies}
                >
                  {linksTl.movies}
                </NavLink>
              </li>
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink
                  href={`/${locale}/category/discover/tvseries`}
                  title={linksTl.series}
                >
                  {linksTl.series}
                </NavLink>
              </li>
              <li className="grid content-center p-2">
                <NavLink
                  href={`/${locale}/category/discover/books`}
                  title={linksTl.books}
                >
                  {linksTl.books}
                </NavLink>
              </li>
            </ul>
          </Dropdown>
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
        <ProfileButtons
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
  {
    /* <div className="col-start-1 col-end-12 row-start-1 row-end-2 bg-secondary" />
      <nav className="grid justify-between self-start z-20 bg-secondary grid-cols-3 lg:grid-cols-[6rem_1fr_6rem] text-textPrimary fluid-base col-start-2 col-end-12 row-start-1 row-end-2 py-8 gap-x-4">
        <div className="grid items-center gap-x-2 content-center row-start-1 grid-cols-[2rem_2rem] lg:grid-cols-[3rem_1fr_1fr] row-end-2 translate-y-0.5 lg:translate-y-0 2xl:grid-cols-3 lg:col-start-2 lg:col-end-3">
          <Dropdown
            buttonLabel={<AiOutlineMenu className="w-5 h-5" />}
            additionalContainerStyles="row-start-1 row-end-2 grid lg:col-start-3 lg:col-end-4"
            additionalDropdownStyles="lg:scale-100 row-start-2 lg:opacity-100 lg:w-full lg:static translate-y-1 lg:translate-y-0"
            buttonStyles="lg:hidden"
            hasArrow={false}
          >
            <ul className="grid content-center justify-center text-center rounded lg:bg-inherit bg-primary lg:text-textPrimary text-textSecondary drop-shadow-xl gap-x-4 lg:flex">
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink href={`/${locale}/main`} title={linksTl.main}>
                  {linksTl.main}
                </NavLink>
              </li>
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink
                  href={`/${locale}/category/discover/movies`}
                  title={linksTl.movies}
                >
                  {linksTl.movies}
                </NavLink>
              </li>
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink
                  href={`/${locale}/category/discover/tvseries`}
                  title={linksTl.series}
                >
                  {linksTl.series}
                </NavLink>
              </li>
              <li className="grid content-center p-2">
                <NavLink
                  href={`/${locale}/category/discover/books`}
                  title={linksTl.books}
                >
                  {linksTl.books}
                </NavLink>
              </li>
            </ul>
          </Dropdown> */
  }
  {
    /* <Dropdown
            buttonLabel={<BsSearch />}
            additionalContainerStyles="lg:justify-self-center row-start-1 row-end-2 lg:col-start-2 lg:col-end-3"
            additionalDropdownStyles="lg:scale-100 drop-shadow-xl z-20 lg:opacity-100 -translate-x-[10%] lg:translate-x-0 translate-y-4 lg:translate-y-0 lg:static row-start-2"
            buttonStyles="lg:hidden"
          >
            <SearchBar locale={locale} />
          </Dropdown> */
  }
  {
    /* </div> */
  }

  {
    /* <span className="grid content-center justify-center fluid-base lg:col-start-1 lg:col-end-2">
          <Link
            href={`/${locale}/main`}
            className={`flex content-center w-max lg:justify-start ${dancingScript.className} hover:scale-95 transition-transform fluid-lg`}
            title={linksTl.main}
          >
            <span className="w-full text-center lg:hidden">
              <span className="text-orange-600">M</span>L
            </span>
            <span className="hidden w-full text-center lg:block">
              <span className="text-orange-600">My</span> Leisure
            </span>
          </Link>
        </span> */
  }
  {
    /* <Dropdown
          buttonLabel={!session ? linksTl.guest : session.user?.name!}
          additionalContainerStyles="justify-self-end lg:col-start-3 text-textPrimary rounded hover:text-secondary transition-colors hover:bg-accent px-2 py-1 lg:col-end-4 grid"
          additionalDropdownStyles="lg:col-start-3 lg:col-end-4 row-start-2 -translate-x-[10%] translate-y-3"
        >
          <ul className="transition-shadow rounded fluid-base bg-primary text-textSecondary drop-shadow-xl">
            <li className="p-2 border-b border-b-background">
              <ThemeToggle locale={locale} />
            </li>
            <li className="p-2 border-b border-b-background">
              <LanguageSwitcher locale={locale} />
            </li>
            <li className="p-2">
              <NavLink
                href={`/${locale}/profile`}
                className="block text-center"
                title={linksTl.profile}
              >
                {linksTl.profile}
              </NavLink>
            </li>
            <li>
              <SignIn
                tl={{ signin: "Sign in", signout: "Sign out" }}
                session={session}
              />
            </li>
          </ul>
        </Dropdown> */
  }
  {
    /* </nav> */
  }
  {
    /* <div className="col-start-12 col-end-13 row-start-1 row-end-2 bg-secondary" /> */
  }

  // {/* <header className="grid gap-1 p-2">
  // <ul className="flex gap-2 px-4 py-2">
  //   <li>
  //     <LanguageSwitcher
  //       locale={userPreferences.preferredLocale}
  //       user_email={userEmail}
  //       tl={languageTl}
  //     />
  //   </li>
  //   <li>
  //     <ThemeToggle
  //       tl={themeTl}
  //       currentTheme={userPreferences.theme}
  //       user_email={userEmail}
  //     />
  //   </li>
  // </ul>
  // <ul className="grid lg:grid-cols-[0.5fr,0.5fr,3fr,1fr] grid-cols-[0.5fr,1fr,0.5fr] gap-6 items-center">
  //           <li></li>
  //           <li></li>
  //           <li></li>
  //   <Link
  //     className="flex justify-center col-start-2 col-end-3 gap-1 fluid-lg lg:justify-self-start lg:col-start-1 lg:col-end-2"
  //     href={`/${locale}/main`}
  //   >
  //     <span className="w-full text-center lg:hidden">
  //               <span className="text-orange-600">M</span>L
  //             </span>
  //             <span className="hidden w-full text-center lg:block">
  //               <span className="text-orange-600">My</span> Leisure
  //             </span>
  //   </Link>
  //   <SearchBar locale={locale} tl={linksTl.searchBar} />
  //   <ActionButtons
  //     tl={linksTl}
  //     locale={locale}
  //     session={session}
  //     userPreferences={userPreferences}
  //   />
  // </ul>
  // </header> */}
}
