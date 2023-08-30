type Entry = {
  id: number
  catalog: "movie" | "tvshow"
  folderPath: string
  coverPath: string
  title: string
  score: number
  votesAmount: number
  genreIDs: number[]
  date: string
}

type DiscoverQuery = {
  page: number
  minYear: number
  maxYear: number
  maxScore: number
  minScore: number
  sort_by: SortBy
  sort_order: "desc" | "asc"
  with_genres: number[]
  without_genres: number[]
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
  moviePage: number
  seriesPage: number
}
