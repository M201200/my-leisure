import { Dancing_Script } from "next/font/google"
import { getTranslator } from "next-intl/server"
import React from "react"
import SearchBar from "./common/SearchBar"
import LanguageSwitcher from "./common/LanguageSwitcher"
import Dropdown from "./Dropdown"
import { AiOutlineMenu } from "react-icons/ai"
import { BsSearch } from "react-icons/bs"
import NavLink from "./common/NavLink"
import ThemeToggle from "./ThemeToggle"

type Props = {
  locale: Locale
}

const dancingScript = Dancing_Script({
  subsets: ["latin"],
})

export default async function Header({ locale }: Props) {
  const t = await getTranslator(locale, "Header")
  return (
    <>
      <div className="col-start-1 col-end-12 row-start-1 row-end-2 bg-secondary" />
      <nav className="grid justify-between self-start z-20 bg-secondary grid-cols-3 lg:grid-cols-[6rem_1fr_6rem] text-textPrimary fluid-base col-start-2 col-end-12 row-start-1 row-end-2 py-8 gap-x-4">
        <div className="grid items-center gap-x-2 content-center row-start-1 grid-cols-[2rem_2rem] lg:grid-cols-[3rem_1fr_1fr] row-end-2 translate-y-0.5 lg:translate-y-0 2xl:grid-cols-3 lg:col-start-2 lg:col-end-3">
          <Dropdown
            buttonLabel={<AiOutlineMenu className="w-5 h-5" />}
            additionalContainerStyles="row-start-1 row-end-2 grid lg:col-start-3 lg:col-end-4"
            additionalDropdownStyles="lg:scale-100 row-start-2 lg:opacity-100 lg:w-full lg:static translate-y-1 lg:translate-y-0"
            buttonStyles="lg:hidden"
            hasArrow={false}
          >
            <ul className="grid content-center justify-center rounded lg:bg-inherit bg-primary lg:text-textPrimary text-textSecondary drop-shadow-xl gap-x-4 lg:flex">
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink
                  href={"/category/discover/movies"}
                  locale={locale}
                  title={t("Movies")}
                >
                  {t("Movies")}
                </NavLink>
              </li>
              <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
                <NavLink
                  href={"/category/discover/tvseries"}
                  locale={locale}
                  title={t("Series")}
                >
                  {t("Series")}
                </NavLink>
              </li>
              <li className="grid content-center p-2">
                <NavLink
                  href={"/category/discover/books"}
                  locale={locale}
                  title={t("Books")}
                >
                  {t("Books")}
                </NavLink>
              </li>
            </ul>
          </Dropdown>
          <Dropdown
            buttonLabel={<BsSearch />}
            additionalContainerStyles="lg:justify-self-center row-start-1 row-end-2 lg:col-start-2 lg:col-end-3"
            additionalDropdownStyles="lg:scale-100 drop-shadow-xl z-20 lg:opacity-100 -translate-x-[10%] lg:translate-x-0 translate-y-4 lg:translate-y-0 lg:static row-start-2"
            buttonStyles="lg:hidden"
          >
            <SearchBar locale={locale} />
          </Dropdown>
        </div>

        <span className="grid content-center justify-center fluid-base lg:col-start-1 lg:col-end-2">
          <NavLink
            href={"/"}
            locale={locale}
            className={`flex content-center w-max lg:justify-start ${dancingScript.className} fluid-lg`}
            title={t("Home")}
          >
            <span className="w-full text-center lg:hidden">
              <span className="text-orange-600">M</span>L
            </span>
            <span className="hidden w-full text-center lg:block">
              <span className="text-orange-600 ">My</span> Leisure
            </span>
          </NavLink>
        </span>

        <Dropdown
          buttonLabel={t("Profile")}
          additionalContainerStyles="justify-self-end lg:col-start-3 rounded border border-accent text-textPrimary hover:text-secondary transition-colors hover:bg-accent p-1 lg:col-end-4 grid"
          additionalDropdownStyles="lg:col-start-3 lg:col-end-4 row-start-2 -translate-x-[10%] translate-y-3"
          buttonStyles=""
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
                href={"/profile/Guest"}
                locale={locale}
                title={t("Guest")}
              >
                {t("Guest")}
              </NavLink>
            </li>
          </ul>
        </Dropdown>
      </nav>
      <div className="col-start-12 col-end-13 row-start-1 row-end-2 bg-secondary" />
    </>
  )
}
