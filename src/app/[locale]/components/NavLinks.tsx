"use client"
import { useEffect, useRef, useState } from "react"

import { Session } from "next-auth"
import NavLink from "./common/NavLink"
import { AiOutlineMenu } from "react-icons/ai"

type ProfileButtonsProps = {
  tl: {
    main: string
    movies: string
    series: string
    books: string
    guest: string
  }
  locale: Locale
}

export function NavLinks({ tl, locale }: ProfileButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref])

  return (
    <div
      ref={ref}
      className={`relative ${
        isOpen ? "max-w-[30rem]" : "lg:w-full"
      } bg-background lg:bg-transparent rounded justify-self-end text-textPrimary`}
    >
      <button
        className="flex items-center w-full gap-2 p-2 text-center transition-colors rounded lg:hidden fluid-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineMenu className="w-5 h-5" />
      </button>
      <section
        className={`flex flex-wrap justify-end gap-3 gap-x-6 lg:relative absolute w-fit lg:w-full lg:opacity-100 lg:visible lg:translate-x-0 lg:bg-transparent  transition-[visibility,opacity,transform] ease-in-out drop-shadow rounded bg-secondary z-20 p-4 ${
          isOpen
            ? "opacity-100 visible translate-x-0"
            : "invisible overflow-hidden opacity-0 -translate-x-6"
        }`}
      >
        <ul className="flex flex-col items-center gap-2 lg:flex-row">
          <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
            <NavLink
              href={`/${locale}/main`}
              title={tl.main}
              onClick={() => setIsOpen(!isOpen)}
            >
              {tl.main}
            </NavLink>
          </li>
          <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
            <NavLink
              href={`/${locale}/discover/movies`}
              title={tl.movies}
              onClick={() => setIsOpen(!isOpen)}
            >
              {tl.movies}
            </NavLink>
          </li>
          <li className="grid content-center p-2 border-b lg:border-b-0 border-b-background">
            <NavLink
              href={`/${locale}/discover/tvseries`}
              title={tl.series}
              onClick={() => setIsOpen(!isOpen)}
            >
              {tl.series}
            </NavLink>
          </li>
          <li className="grid content-center p-2">
            <NavLink
              href={`/${locale}/discover/books`}
              title={tl.books}
              onClick={() => setIsOpen(!isOpen)}
            >
              {tl.books}
            </NavLink>
          </li>
        </ul>
      </section>
    </div>
  )
}
