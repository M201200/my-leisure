import type { Metadata } from "next"
import SearchResult from "@/app/(group)/components/SearchResult"

type Props = {
  params: { query: string }
}

export const metadata: Metadata = {
  title: "Search",
}

export default async function SearchPage({ params }: Props) {
  return (
    <div className="grid gap-4">
      <h1>Search results:</h1>
      <SearchResult media="movie" query={params.query} />
      <SearchResult media="tvshow" query={params.query} />
    </div>
  )
}
