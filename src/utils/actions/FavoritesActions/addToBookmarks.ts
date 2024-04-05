"use server"

import { db } from "@/app/db"
import {
  bookmarksBooks,
  bookmarksMovies,
  bookmarksSeries,
} from "@/app/db/schema"

export default async function addToBookmarks(
  userEmail: string,
  item: MediaEntry | BookEntry
) {
  "use server"
  switch (item.catalog) {
    case "book":
      return await db
        .insert(bookmarksBooks)
        .values({
          user_email: userEmail,
          item_id: item.id,
          folderPath: item.folderPath,
          coverPath: item.coverPath || 0,
          title: item.title,
          author: item.author?.join(",") || "",
          editions: item.editions,
          languages: item.languages?.join(",") || "",
          date: item.date || 1900,
        })
        .onConflictDoNothing()
        .execute()
    case "tvshow":
      return await db
        .insert(bookmarksSeries)
        .values({
          user_email: userEmail,
          item_id: item.id,
          folderPath: item.folderPath,
          coverPath: item.coverPath,
          title: item.title,
          score: item.score,
          votes: item.votes,
          genreIds: item.genreIds?.join(","),
          date: item.date,
        })
        .onConflictDoNothing()
        .execute()
    case "movie":
      return await db
        .insert(bookmarksMovies)
        .values({
          user_email: userEmail,
          item_id: item.id,
          folderPath: item.folderPath,
          coverPath: item.coverPath,
          title: item.title,
          score: item.score,
          votes: item.votes,
          genreIds: item.genreIds?.join(","),
          date: item.date,
        })
        .onConflictDoNothing()
        .execute()
  }
}
