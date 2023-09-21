import type { Metadata } from "next"
import { getTranslator } from "next-intl/server"
import { searchMedia } from "@/api/FETCH_TMDB"
import CardMediaDetails from "../../../_components/common/CardMediaDetails"
import Bookmark from "@/app/[locale]/_components/common/Bookmark"
import CardDetailsContainer from "../../../_components/CardDetailsContainer"
import Pagination from "../../../_components/Pagination"
type Props = {
  params: {
    locale: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "Search",
}

export default async function SearchMoviePage({ params, searchParams }: Props) {
  const searchQuery = (searchParams.query as string) || ""
  const searchPage = searchParams.page ? +searchParams.page : 1

  const tData = getTranslator(params.locale, "SearchResults")
  const mediaData = searchMedia(searchQuery, params.locale, "movie", searchPage)
  const [t, mediaResponse] = await Promise.all([tData, mediaData])

  const mediaResult = mediaResponse.results
  const totalPages = mediaResponse.total_pages || 1
  const totalResults = mediaResponse.total_results
  const totalAmount = totalResults! > 10000 ? 10000 : totalResults

  const mediaList = mediaResult?.length ? (
    mediaResult.map((entry) => {
      const props: MediaEntry = {
        id: entry.id!,
        catalog: "movie",
        folderPath: "https://image.tmdb.org/t/p/w342",
        coverPath: entry.poster_path || "",
        title:
          "title" in entry ? (entry?.title ? entry?.title : "No title") : "",
        score: entry.vote_average || 0,
        votes: entry.vote_count || 0,
        genreIds: entry.genre_ids || [],
        date: "release_date" in entry ? entry.release_date || "Unknown" : "",
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
    <section className="col-span-4 p-2 rounded fluid-lg text-textPrimary bg-secondary">
      {t("NotFound")}.
    </section>
  )
  return (
    <div className="grid content-start min-h-screen gap-4">
      <h1 className="py-2 rounded fluid-lg text-textPrimary">
        {t("Search")} &rdquo;{searchQuery}&rdquo;:
      </h1>

      <CardDetailsContainer
        label={t("Movies")}
        hasCount={totalAmount}
        locale={params.locale}
      >
        {mediaList}
      </CardDetailsContainer>
      <Pagination totalPages={totalPages} />
    </div>
  )
}
