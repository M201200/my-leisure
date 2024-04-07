"use client"

import { useState, useTransition } from "react"

import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs"

import addToBookmarks from "@/utils/actions/FavoritesActions/addToBookmarks"
import removeFromBookmarks from "@/utils/actions/FavoritesActions/removeFromBookmarks"
import {
  addEntry,
  removeEntry,
} from "../../../../utils/functions/localStorageActions"
import { useBookmarks } from "@/utils/hooks/zustand/useBookmarks"

type BookmarkProps = {
  props: CardMedia | CardBook
}

export default function BookmarkButton({ props }: BookmarkProps) {
  const allBookmarks = useBookmarks()
  const bookmarks =
    props.catalog === "book"
      ? allBookmarks.books
      : props.catalog === "movie"
      ? allBookmarks.movies
      : allBookmarks.series
  const [isAdded, setIsAdded] = useState<boolean | undefined | null>(
    bookmarks?.some((entry) => entry.id === props.id) ? true : false
  )
  const [isPending, startTransition] = useTransition()

  const title =
    props.locale === "ru"
      ? "Добавить в закладки"
      : props.locale === "ro"
      ? "Adăugați la marcaje"
      : "Add to bookmarks"

  return (
    <button
      title={title}
      className="p-1 transition-colors text-textPrimary fluid-base hover:text-green-500"
      onClick={() => {
        setIsAdded(!isAdded)
        if (props.user_email) {
          !isAdded
            ? props.catalog === "book"
              ? allBookmarks.addBook(props as BookEntry)
              : props.catalog === "movie"
              ? allBookmarks.addMovie(props as MediaEntry)
              : allBookmarks.addSeries(props as MediaEntry)
            : props.catalog === "book"
            ? allBookmarks.removeBook(props as BookEntry)
            : props.catalog === "movie"
            ? allBookmarks.removeMovie(props as MediaEntry)
            : allBookmarks.removeSeries(props as MediaEntry)
          startTransition(() => {
            !isAdded
              ? addToBookmarks(
                  props.user_email!,
                  props as MediaEntry | BookEntry
                )
              : removeFromBookmarks(
                  props.user_email!,
                  props as MediaEntry | BookEntry
                )
          })
        } else {
          if (!isAdded) {
            props.catalog === "book"
              ? allBookmarks.addBook(props as BookEntry)
              : props.catalog === "movie"
              ? allBookmarks.addMovie(props as MediaEntry)
              : allBookmarks.addSeries(props as MediaEntry)
            addEntry(props as MediaEntry | BookEntry)
          } else {
            props.catalog === "book"
              ? allBookmarks.removeBook(props as BookEntry)
              : props.catalog === "movie"
              ? allBookmarks.removeMovie(props as MediaEntry)
              : allBookmarks.removeSeries(props as MediaEntry)
            removeEntry(props.id, props.catalog)
          }
        }
      }}
    >
      <span className={`fluid-lg ${isAdded ? "text-green-600" : ""}`}>
        {" "}
        {isAdded ? <BsBookmarkCheckFill /> : <BsBookmark />}
      </span>
    </button>
  )
}
