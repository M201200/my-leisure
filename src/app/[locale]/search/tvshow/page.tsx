import type { Metadata } from "next"
import { searchMedia } from "@/app/api/FETCH_TMDB"
import CardDetailsContainer from "@/app/[locale]/components/cards/CardDetailsContainer"
import CardMediaDetails from "@/app/[locale]/components/cards/CardMediaDetails"
import Pagination from "@/app/[locale]/components/Pagination"
import { getTranslations } from "next-intl/server"
import { auth } from "@/app/lib/auth"
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
  const session = await auth()

  const searchQuery = (searchParams.query as string) || ""
  const searchPage = searchParams.page ? +searchParams.page : 1

  const tData = getTranslations("SearchResults")
  const mediaData = searchMedia(searchQuery, params.locale, "tv", searchPage)
  const [t, mediaResponse] = await Promise.all([tData, mediaData])

  const mediaResult = mediaResponse.results
  const totalPages = mediaResponse.total_pages || 1
  const totalResults = mediaResponse.total_results
  const totalAmount = totalResults! > 10000 ? 10000 : totalResults

  const mediaList = mediaResult?.length ? (
    mediaResult.map((entry) => {
      const props = {
        id: entry.id!,
        catalog: "tvshow" as const,
        folderPath: "https://image.tmdb.org/t/p/w342",
        coverPath: entry.poster_path || "",
        title: "name" in entry ? (entry?.name ? entry.name : "No title") : "",
        score: entry.vote_average || 0,
        votes: entry.vote_count || 0,
        genreIds: entry.genre_ids || [],
        date:
          "first_air_date" in entry ? entry.first_air_date || "Unknown" : "",
        locale: params.locale,
        user_email: session?.user?.email,
      }
      return (
        <CardMediaDetails locale={params.locale} key={entry.id} props={props} />
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
        label={t("Series")}
        hasCount={totalAmount}
        locale={params.locale}
      >
        {mediaList}
      </CardDetailsContainer>
      <Pagination totalPages={totalPages} />
    </div>
  )
}
