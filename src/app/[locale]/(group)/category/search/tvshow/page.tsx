import type { Metadata } from "next"
import { searchMedia } from "@/api/FETCH_TMDB"
import CardDetailsContainer from "../../../_components/CardDetailsContainer"
import CardMediaDetails from "../../../_components/common/CardMediaDetails"
import Pagination from "../../../_components/Pagination"
import { getTranslator } from "next-intl/server"
import Bookmark from "@/app/[locale]/_components/common/Bookmark"
type Props = {
  params: {
    locale: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "Search",
}

export default async function SearchTVPage({ params, searchParams }: Props) {
  const searchQuery = (searchParams.query as string) || ""
  const searchPage = searchParams.page ? +searchParams.page : 1

  const tData = getTranslator(params.locale, "SearchResults")
  const mediaData = searchMedia(searchQuery, params.locale, "tv", searchPage)
  const [t, mediaResponse] = await Promise.all([tData, mediaData])

  const mediaResult = mediaResponse.results
  const totalPages = mediaResponse.total_pages || 1
  const totalResults = mediaResponse.total_results
  const totalAmount = totalResults! > 10000 ? 10000 : totalResults

  const mediaList = mediaResult?.length ? (
    mediaResult.map((entry) => {
      const props: MediaEntry = {
        id: entry.id!,
        catalog: "tvshow",
        folderPath: "https://image.tmdb.org/t/p/w342",
        coverPath: entry.poster_path || "",
        title: "name" in entry ? (entry?.name ? entry.name : "No title") : "",
        score: entry.vote_average || 0,
        votes: entry.vote_count || 0,
        genreIds: entry.genre_ids || [],
        date:
          "first_air_date" in entry ? entry.first_air_date || "Unknown" : "",
      }
      return (
        <CardMediaDetails
          locale={params.locale}
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
        {t("Search")} &rdquo;{searchQuery}&rdquo;:
      </h1>

      <CardDetailsContainer
        label={`${t("Series")}:`}
        hasCount={totalAmount}
        locale={params.locale}
      >
        {mediaList}
      </CardDetailsContainer>
      <Pagination totalPages={totalPages} />
    </div>
  )
}
