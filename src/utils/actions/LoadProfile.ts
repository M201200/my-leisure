"use server"

import { db } from "@/app/db"
import {
  bookmarksBooks,
  bookmarksMovies,
  bookmarksSeries,
  user_profile,
} from "@/app/db/schema"
import { eq } from "drizzle-orm"

export default async function loadProfile(
  locale: Locale,
  userEmail: string | null | undefined
) {
  const userPreferencesResult = userEmail
    ? await db
        .select({
          email: user_profile.user_email,
          theme: user_profile.theme,
          language: user_profile.language,
        })
        .from(user_profile)
        .where(eq(user_profile.user_email, userEmail || ""))
        .execute()
    : null

  const userPreferences = userPreferencesResult
    ? userPreferencesResult[0]
    : null

  if (userEmail && !userPreferences) {
    await db
      .insert(user_profile)
      .values({
        user_email: userEmail,
        theme: "dark",
        language: locale,
      })
      .execute()
  }

  const bookmarksMoviesArr = userEmail
    ? await db
        .select({
          id: bookmarksMovies.item_id,
          folderPath: bookmarksMovies.folderPath,
          coverPath: bookmarksMovies.coverPath,
          title: bookmarksMovies.title,
          score: bookmarksMovies.score,
          votes: bookmarksMovies.votes,
          genreIds: bookmarksMovies.genreIds,
          date: bookmarksMovies.date,
        })
        .from(bookmarksMovies)
        .where(eq(bookmarksMovies.user_email, userEmail))
        .execute()
    : null

  const bookmarksSeriesArr = userEmail
    ? await db
        .select({
          id: bookmarksSeries.item_id,
          folderPath: bookmarksSeries.folderPath,
          coverPath: bookmarksSeries.coverPath,
          title: bookmarksSeries.title,
          score: bookmarksSeries.score,
          votes: bookmarksSeries.votes,
          genreIds: bookmarksSeries.genreIds,
          date: bookmarksSeries.date,
        })
        .from(bookmarksSeries)
        .where(eq(bookmarksSeries.user_email, userEmail))
        .execute()
    : null

  const bookmarksBooksArr = userEmail
    ? await db
        .select({
          id: bookmarksBooks.item_id,
          item_id: bookmarksBooks.id,
          folderPath: bookmarksBooks.folderPath,
          coverPath: bookmarksBooks.coverPath,
          title: bookmarksBooks.title,
          author: bookmarksBooks.author,
          editions: bookmarksBooks.editions,
          languages: bookmarksBooks.languages,
          date: bookmarksBooks.date,
        })
        .from(bookmarksBooks)
        .where(eq(bookmarksBooks.user_email, userEmail))
        .execute()
    : null

  const books = bookmarksBooksArr?.map((book) => ({
    ...book,
    author: book.author.split(","),
    languages: book.languages.split(","),
    catalog: "book" as const,
  }))
  const movies = bookmarksMoviesArr?.map((movie) => ({
    ...movie,
    genreIds: movie.genreIds.split(",").map(Number),
    catalog: "movie" as const,
  }))
  const series = bookmarksSeriesArr?.map((series) => ({
    ...series,
    genreIds: series.genreIds.split(",").map(Number),
    catalog: "tvshow" as const,
  }))

  const theme = (
    userPreferences?.theme ? userPreferences.theme : null
  ) as Theme | null

  const preferredLocale = (userPreferences?.language || locale) as Locale

  return {
    theme,
    preferredLocale,
    movies,
    series,
    books,
  }
}
