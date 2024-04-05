type MediaEntry = {
  id: number
  catalog: "movie" | "tvshow"
  folderPath: string
  coverPath: string
  title: string
  score: number
  votes: number
  genreIds: number[]
  date: string
}

type BookEntry = {
  id: string
  catalog: "book"
  folderPath: string
  coverPath?: number | null
  title: string
  author?: string[] | null
  editions: number
  languages?: string[] | null
  date?: number | null
}

type CardMedia = {
  id: number
  locale: Locale
  catalog: "movie" | "tvshow"
  folderPath: string
  coverPath: string
  title: string
  score: number
  votes: number
  genreIds: number[]
  date: string
  user_email: string | null | undefined
  // bookmark: React.ReactNode
}

type CardBook = {
  id: string
  locale: Locale
  catalog: "book"
  folderPath: string
  coverPath: number
  title: string
  author?: string[] | null
  editions: number
  languages?: string[] | null
  date?: number | null
  user_email: string | null | undefined
}

type DiscoverQuery = {
  page?: number
  min_year?: number
  max_year?: number
  max_score?: number
  min_score?: number
  sort_by?: SortBy
  sort_order?: "desc" | "asc"
  with_genres?: string
  without_genres?: string
  with_people?: string
  with_companies?: string
  with_origin_country?: string
}

type Genre = {
  id: number
  name: string
}

type SortBy =
  | "popularity"
  | "release_date"
  | "revenue"
  | "primary_release_date"
  | "original_title"
  | "vote_average"
  | "vote_count"

type SearchQuery = {
  query: string
  page: number
}

type Locale = "en" | "ro" | "ru"

type Theme = "dark" | "light"

type UserPreferences =
  | {
      theme: Theme | null
      preferredLocale: Locale
      movies:
        | {
            id: number
            catalog: "movie"
            folderPath: string
            coverPath: string
            title: string
            score: number
            votes: number
            genreIds: number[]
            date: string
          }[]
        | null
        | undefined
      series:
        | {
            id: number
            catalog: "tvshow"
            folderPath: string
            coverPath: string
            title: string
            score: number
            votes: number
            genreIds: number[]
            date: string
          }[]
        | null
        | undefined
      books: BookEntry[] | null | undefined
    }
  | undefined
  | null
