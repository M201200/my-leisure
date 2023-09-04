import type { Metadata } from "next"
import {
  searchTVShowResults,
  searchTVShowTotalPages,
  searchTVShowTotalResults,
} from "@/api/FETCH_TMDB"
import { parseQuery } from "@/api/QueryActions"
import CardDetailsContainer from "@/app/[locale]/(group)/components/CardDetailsContainer"
import CardDetails from "@/app/[locale]/(group)/components/common/CardDetails"
import Pagination from "@/app/[locale]/(group)/components/Pagination"
import { getTranslator } from "next-intl/server"
import Bookmark from "@/app/[locale]/components/common/Bookmark"

type Props = {
  params: {
    query: string
    locale: Locale
  }
}

export const metadata: Metadata = {
  title: "Search",
}

export default async function SearchTVPage({ params }: Props) {
  const queryObject: SearchQuery = parseQuery(params.query)
  const t = await getTranslator(params.locale, "SearchResults")
  const formattedQuery: SearchQuery = parseQuery(params.query)
  const searchQuery = formattedQuery.query
  const searchPage = formattedQuery.page
  const mediaResult = await searchTVShowResults(
    searchQuery,
    params.locale,
    searchPage
  )
  const totalPages = await searchTVShowTotalPages(
    searchQuery,
    params.locale,
    searchPage
  )
  const totalResults = await searchTVShowTotalResults(
    searchQuery,
    params.locale,
    searchPage
  )
  const totalAmount = totalResults! > 10000 ? 10000 : totalResults
  const mediaList =
    mediaResult && mediaResult.length ? (
      mediaResult.map((entry) => {
        const props: Entry = {
          id: entry.id!,
          catalog: "tvshow",
          locale: params.locale,
          folderPath: "https://image.tmdb.org/t/p/w342",
          coverPath: entry.poster_path || "",
          title: entry?.name ? entry.name : "No title",
          score: entry.vote_average || 0,
          votes: entry.vote_count || 0,
          genreIds: entry.genre_ids || [],
          date: entry.first_air_date || "Unknown",
        }
        return (
          <CardDetails
            key={entry.id}
            props={props}
            button={<Bookmark props={props} />}
          />
        )
      })
    ) : (
      <section>{t("NotFound")}.</section>
    )
  return (
    <div className="grid gap-4">
      <h1>
        {t("Search")} &rdquo;{queryObject.query}&rdquo;:
      </h1>

      <CardDetailsContainer label={`${t("Series")}:`} hasCount={totalAmount}>
        {mediaList}
      </CardDetailsContainer>
      <Pagination
        path="/category/tvshow/search"
        queryObject={formattedQuery}
        totalPages={totalPages!}
      />
    </div>
  )
}
