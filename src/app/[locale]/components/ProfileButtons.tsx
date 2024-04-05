"use client"
import { useEffect, useRef, useState } from "react"

import { Session } from "next-auth"
import Link from "next/link"
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5"

import BookmarksLink from "./BookmarksLink"
import SignIn from "./SignIn"

type ProfileButtonsProps = {
  tl: {
    profile: string
    guest: string
    favorites: string
    signin: string
    signout: string
  }
  locale: Locale
  session: Session | null
  userPreferences: UserPreferences
}

export function ProfileButtons({
  tl,
  locale,
  session,
  userPreferences,
}: ProfileButtonsProps) {
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
        {session ? session.user?.name : tl.guest}
      </button>
      <section
        className={`flex flex-wrap justify-end gap-3 gap-x-6 lg:relative absolute w-fit lg:w-full lg:opacity-100 lg:visible lg:translate-x-0 lg:bg-transparent  transition-[visibility,opacity,transform] ease-in-out drop-shadow rounded bg-secondary z-20 p-4 ${
          isOpen
            ? "opacity-100 visible -translate-x-8"
            : "invisible overflow-hidden opacity-0 translate-x-8"
        }`}
      >
        <ul className="flex flex-col items-center gap-2 lg:flex-row">
          <li>
            <Link
              className="grid items-center gap-2 p-1 text-center rounded min-w-12"
              href={`/${locale}/profile`}
              onClick={() => setIsOpen(false)}
              title={tl.profile}
            >
              <span className="fluid-lg justify-self-center">
                {session ? <IoPersonSharp /> : <IoPersonOutline />}
              </span>
              <span className="font-semibold truncate fluid-sm">
                <span className="hidden lg:block">
                  {session ? session.user?.name : tl.guest}
                </span>{" "}
                <span className="lg:hidden">{tl.profile}</span>
              </span>
            </Link>
          </li>
          <BookmarksLink
            tl={tl.favorites}
            locale={locale}
            userPreferences={userPreferences}
            isOpen={setIsOpen}
          />
          <li>
            <SignIn
              tl={{ signin: tl.signin, signout: tl.signout }}
              session={session}
              isOpen={setIsOpen}
            />
          </li>
        </ul>
      </section>
    </div>
  )
}
