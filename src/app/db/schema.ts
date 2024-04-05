import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  primaryKey,
  text,
  serial,
  timestamp,
  varchar,
  real,
} from "drizzle-orm/pg-core"
//////////
// NextAuth

import type { AdapterAccount } from "@auth/core/adapters"

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

//////////
// Profile

export const user_profile = pgTable("user_profile", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull().unique(),
  language: varchar("language", { length: 10 }),
  theme: varchar("theme", { length: 10 }),
})

export const profileUsersRelations = relations(user_profile, ({ one }) => ({
  items: one(users, {
    fields: [user_profile.user_email],
    references: [users.id],
  }),
}))

//////////
// Bookmarks

export const bookmarksMovies = pgTable("bookmarks_movies", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull(),
  item_id: integer("item_id").notNull(),
  folderPath: varchar("folder_path", { length: 64 }).notNull(),
  coverPath: varchar("cover_path", { length: 128 }).notNull(),
  title: varchar("title", { length: 64 }).notNull(),
  score: real("score").notNull(),
  votes: integer("votes").notNull(),
  genreIds: varchar("genre_ids", { length: 128 }).notNull(),
  date: varchar("date", { length: 12 }).notNull(),
})

export const bookmarksSeries = pgTable("bookmarks_series", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull(),
  item_id: integer("item_id").notNull(),
  folderPath: varchar("folder_path", { length: 64 }).notNull(),
  coverPath: varchar("cover_path", { length: 128 }).notNull(),
  title: varchar("title", { length: 64 }).notNull(),
  score: real("score").notNull(),
  votes: integer("votes").notNull(),
  genreIds: varchar("genre_ids", { length: 128 }).notNull(),
  date: varchar("date", { length: 12 }).notNull(),
})

export const bookmarksBooks = pgTable("bookmarks_books", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull(),
  item_id: varchar("item_id", { length: 64 }).notNull(),
  folderPath: varchar("folder_path", { length: 64 }).notNull(),
  coverPath: integer("cover_path").notNull(),
  title: varchar("title", { length: 64 }).notNull(),
  author: varchar("author", { length: 256 }).notNull(),
  editions: integer("editions").notNull(),
  languages: varchar("languages", { length: 128 }).notNull(),
  date: integer("date").notNull(),
})

export const profileBookmarksMoviesUsersRelations = relations(
  bookmarksMovies,
  ({ one }) => ({
    items: one(users, {
      fields: [bookmarksMovies.user_email],
      references: [users.id],
    }),
  })
)

export const profileBookmarksSeriesUsersRelations = relations(
  bookmarksSeries,
  ({ one }) => ({
    items: one(users, {
      fields: [bookmarksSeries.user_email],
      references: [users.id],
    }),
  })
)

export const profileBookmarksBooksUsersRelations = relations(
  bookmarksBooks,
  ({ one }) => ({
    items: one(users, {
      fields: [bookmarksBooks.user_email],
      references: [users.id],
    }),
  })
)

//////////
