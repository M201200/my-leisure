type Entry = {
  id: number
  catalog: "movie" | "tvshow"
  folderPath: string
  coverPath: string
  title: string
  score: number
  genreIDs: number[]
  date: string
}
