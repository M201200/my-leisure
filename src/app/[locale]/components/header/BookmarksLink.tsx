"use client"
import { SetStateAction, useCallback, useEffect } from "react"

import Link from "next/link"
import { BsBookmark } from "react-icons/bs"
import { getEntryList } from "@/utils/functions/localStorageActions"
import { useBookmarks } from "@/utils/hooks/zustand/useBookmarks"

type FavoritesLinkProps = {
  tl: string
  locale: Locale
  userPreferences: UserPreferences
  isOpen: (value: SetStateAction<boolean>) => void
}
export default function BookmarksLink({
  tl,
  locale,
  userPreferences,
  isOpen,
}: FavoritesLinkProps) {
  const setBooks = useBookmarks((state) => state.setBooks)
  const setMovies = useBookmarks((state) => state.setMovies)
  const setSeries = useBookmarks((state) => state.setSeries)

  const loadBookmarks = useCallback(() => {
    !!userPreferences?.books
      ? setBooks(userPreferences.books)
      : setBooks(getEntryList("book") as BookEntry[] | null)
    !!userPreferences?.movies
      ? setMovies(userPreferences.movies)
      : setMovies(getEntryList("movie") as MediaEntry[] | null)
    !!userPreferences?.series
      ? setSeries(userPreferences.series)
      : setSeries(getEntryList("tvshow") as MediaEntry[] | null)
  }, [userPreferences, setBooks, setMovies, setSeries])

  useEffect(() => {
    loadBookmarks()
  }, [loadBookmarks])

  return (
    <li>
      <Link
        className="grid items-center gap-2 p-1 text-center rounded"
        href={`/${locale}/bookmarks`}
        onClick={() => isOpen(false)}
        title={tl}
      >
        <BsBookmark className="fluid-lg justify-self-center" />
        <span className="font-semibold fluid-sm">{tl}</span>
      </Link>
    </li>
  )
}
