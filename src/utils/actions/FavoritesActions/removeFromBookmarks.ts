"use server"

import { and, eq } from "drizzle-orm"

import { db } from "@/app/db"
import {
  bookmarksBooks,
  bookmarksMovies,
  bookmarksSeries,
} from "@/app/db/schema"

export default async function removeFromBookmarks(
  user_email: string,
  item: MediaEntry | BookEntry
) {
  "use server"
  switch (item.catalog) {
    case "book":
      return await db
        .delete(bookmarksBooks)
        .where(
          and(
            eq(bookmarksBooks.user_email, user_email),
            eq(bookmarksBooks.item_id, item.id)
          )
        )
        .execute()
    case "tvshow":
      return await db
        .delete(bookmarksSeries)
        .where(
          and(
            eq(bookmarksSeries.user_email, user_email),
            eq(bookmarksSeries.item_id, item.id)
          )
        )
        .execute()
    case "movie":
      return await db
        .delete(bookmarksMovies)
        .where(
          and(
            eq(bookmarksMovies.user_email, user_email),
            eq(bookmarksMovies.item_id, item.id)
          )
        )
  }
}
