"use server"

import { eq } from "drizzle-orm"

import { db } from "@/app/db"
import {
  accounts,
  bookmarksBooks,
  bookmarksMovies,
  bookmarksSeries,
  user_profile,
  users,
} from "@/app/db/schema"

export default async function deleteProfile(user_email: string) {
  const userIdArr = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, user_email))
  const userId = userIdArr[0].id
  return await db.transaction(async (tx) => {
    await tx.delete(users).where(eq(users.email, user_email))
    await tx.delete(accounts).where(eq(accounts.userId, userId))
    await tx.delete(user_profile).where(eq(user_profile.user_email, user_email))
    await tx
      .delete(bookmarksBooks)
      .where(eq(bookmarksBooks.user_email, user_email))
    await tx
      .delete(bookmarksMovies)
      .where(eq(bookmarksMovies.user_email, user_email))
    await tx
      .delete(bookmarksSeries)
      .where(eq(bookmarksSeries.user_email, user_email))
  })
}
