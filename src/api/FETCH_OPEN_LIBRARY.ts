import {
  Work,
  Editions,
  PopularBooks,
  Rating,
  Authors,
  SearchOutput,
} from "./typesOpenLibrary/typesOpenLibrary"

type FetchOpenLibraryData = {
  baseURL?: URL
  additionURL?: string
  queryList?: Query[]
  method?: "GET" | "POST" | "PUT"
  accept?: "application/json"
}

type Query = [string, string | number | boolean | null | undefined]

const BASE_OPEN_LIBRARY_URL = new URL("https://openlibrary.org/")

export async function fetchOpenLibraryData({
  baseURL = BASE_OPEN_LIBRARY_URL,
  additionURL,
  queryList,
  method = "GET",
  accept = "application/json",
}: FetchOpenLibraryData) {
  const url = additionURL ? new URL(additionURL, baseURL) : baseURL
  if (queryList?.length)
    queryList.forEach((query) => {
      if (query[1])
        /* @ts-ignore */
        url.searchParams.set(query[0], query[1])
    })
  const options = {
    method: method,
    headers: {
      accept: accept,
    },
  }
  const response = await fetch(url, options)
  return response.json()
}

export async function popularBooks(page?: number, sort?: SortBooks) {
  const randomPage = +(Math.random() * 20 + 1).toFixed()
  const popularBooksURL = "trending/daily.json"

  const response = await fetchOpenLibraryData({
    additionURL: popularBooksURL,
    queryList: [
      ["page", page || randomPage],
      ["sort", sort || ""],
      ["limit", 20],
    ],
  })

  const result: PopularBooks = await response
  return result
}

export async function currentWorks(id: string) {
  const currentWorkURL = `works/${id}.json`
  const response = await fetchOpenLibraryData({ additionURL: currentWorkURL })

  const result: Work = await response
  return result
}

export async function currentWorksEditions(id: string) {
  const currentWorkEditionsURL = `works/${id}/editions.json?limit=20`
  const response = await fetchOpenLibraryData({
    additionURL: currentWorkEditionsURL,
  })

  const result: Editions = await response
  return result
}

export async function currentWorksRating(id: string) {
  const currentWorkRatingURL = `works/${id}/ratings.json`
  const response = await fetchOpenLibraryData({
    additionURL: currentWorkRatingURL,
  })

  const result: Rating = await response
  return result
}

export async function currentAuthor(id = "") {
  const currentAuthorURL = `authors/${id}.json`
  const response = await fetchOpenLibraryData({
    additionURL: currentAuthorURL,
  })

  const result: Authors = await response
  return result
}

type SearchBookQuery = {
  query?: string
  page?: number
  title?: string
  author?: string
  subject?: string
  place?: string
  person?: string
  language?: string
  publisher?: string
  sort?: SortBooks
}

export type SortBooks = "" | "editions" | "old" | "new" | "rating" | "random"

export async function searchBook({
  query,
  page,
  title,
  author,
  subject,
  place,
  person,
  language,
  publisher,
  sort,
}: SearchBookQuery) {
  const currentQueryURL = `search.json?limit=20`
  const response = await fetchOpenLibraryData({
    additionURL: currentQueryURL,
    queryList: [
      ["q", query],
      ["page", page],
      ["title", title],
      ["author", author],
      ["subject", subject],
      ["place", place],
      ["person", person],
      ["language", language],
      ["publisher", publisher],
      ["sort", sort],
    ],
  })

  const result: SearchOutput = await response
  return result
}
