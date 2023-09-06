import type { Metadata } from "next"
import Image from "next/image"
import Link from "next-intl/link"
import {
  currentTVShowDetails,
  currentTVShowCredits,
  currentTVShowProviders,
} from "@/api/FETCH_TMDB"
import { getTranslator } from "next-intl/server"

type Props = {
  params: {
    id: string
    locale: Locale
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name =
    (await currentTVShowDetails(+params.id, params.locale)).name || "No name"

  return {
    title: name,
  }
}

export default async function TVShowPage({ params }: Props) {
  const tData = getTranslator(params.locale, "Details")
  const TVShowData = currentTVShowDetails(+params.id, params.locale)
  const creditsData = currentTVShowCredits(+params.id, params.locale)
  const providersData = currentTVShowProviders(+params.id, params.locale)

  const [t, TVShow, credits, providers] = await Promise.all([
    tData,
    TVShowData,
    creditsData,
    providersData,
  ])

  const providersLink = providers.providerLink

  if (TVShow === undefined)
    return (
      <section>
        {t("Not found pt1")}
        {params.id}
        {t("Not found pt2")}
      </section>
    )

  const actors = credits?.cast
    ?.slice(0, 6)
    ?.filter((cast) => cast.known_for_department === "Acting")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const direction = credits?.cast
    ?.slice(0, 6)
    ?.filter((cast) => cast.known_for_department === "Directing")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const production = credits?.cast
    ?.slice(0, 6)
    ?.filter((cast) => cast.known_for_department === "Production")
    ?.sort((a, b) => b.popularity! - a.popularity!)

  return (
    <>
      <section className="md:grid gap-4 md:grid-cols-[28.75rem_1fr] flex flex-wrap">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/original${TVShow.poster_path}`}
            alt="backdrop"
            width={460}
            height={690}
          />
        </div>

        <section>
          {TVShow.name === TVShow.original_name ? (
            <h2>{TVShow.name}</h2>
          ) : (
            <h2>
              {TVShow.name}/{TVShow.original_name}
            </h2>
          )}
          {TVShow?.tagline ? <span>{TVShow.tagline}</span> : null}

          {TVShow?.first_air_date ? (
            <div className="flex gap-x-2">
              <h5>{t("Date")}</h5>
              {TVShow.first_air_date}
            </div>
          ) : null}

          {TVShow?.genres ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Genres")}</h5>
              <span>
                {TVShow.genres.map((genre, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={genre.id}
                      href={`/category/tvseries/"page":1,"minYear":1900,"maxYear":2023,"minScore":0,"maxScore":10,"sort_by":"popularity","sort_order":"desc","with_genres":[${genre.id}],"without_genres":[]`}
                      locale={params.locale}
                    >
                      {genre.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={genre.id}
                      href={`/category/tvseries/"page":1,"minYear":1900,"maxYear":2023,"minScore":0,"maxScore":10,"sort_by":"popularity","sort_order":"desc","with_genres":[${genre.id}],"without_genres":[]`}
                      locale={params.locale}
                    >
                      {genre.name}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}

          {actors?.length ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Actors")}</h5>
              {actors.map((cast, id, arr) =>
                id < arr.length - 1 ? (
                  <span key={cast.id}>{cast.name},</span>
                ) : (
                  <span key={cast.id}>{cast.name}</span>
                )
              )}
            </div>
          ) : null}

          {direction?.length ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Direction")}</h5>
              {direction.map((cast, id) =>
                id < 4 ? (
                  <span key={cast.id}>{cast.name},</span>
                ) : (
                  <span key={cast.id}>{cast.name}</span>
                )
              )}
            </div>
          ) : null}

          {production?.length ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Production")}</h5>
              {production.map((cast, id) =>
                id < 4 ? (
                  <span key={cast.id}>{cast.name},</span>
                ) : (
                  <span key={cast.id}>{cast.name}</span>
                )
              )}
            </div>
          ) : null}

          {TVShow?.status ? (
            <div className="flex gap-x-2">
              <h5>{t("Status")}</h5> {TVShow.status}
            </div>
          ) : null}

          {TVShow?.number_of_episodes ? (
            <div className="flex gap-x-2">
              <h5>{t("Episodes")}</h5> {TVShow.number_of_episodes}
            </div>
          ) : null}

          {TVShow?.number_of_seasons ? (
            <div className="flex gap-x-2">
              <h5>{t("Seasons")}</h5>
              {TVShow.number_of_seasons}{" "}
            </div>
          ) : null}

          {TVShow?.episode_run_time ? (
            <div className="flex gap-x-2">
              <h5>{t("Episode time")}</h5>
              {TVShow.episode_run_time} {t("Min")}
            </div>
          ) : null}

          <div>
            {t("Score")}
            {TVShow.vote_average?.toFixed(1)}/10
          </div>

          <div>
            {t("Votes")}
            {TVShow.vote_count?.toLocaleString()}
          </div>

          {TVShow?.production_countries ? (
            <div className="flex gap-x-2">
              <h5>{t("Countries")}</h5>
              {TVShow.production_countries.map((country, id, arr) =>
                id < arr.length - 1 ? (
                  <span key={country.iso_3166_1}>
                    {country.name}
                    {", "}{" "}
                  </span>
                ) : (
                  <span key={country.iso_3166_1}>{country.name}</span>
                )
              )}
            </div>
          ) : null}

          {TVShow?.production_companies ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Companies")}</h5>
              {TVShow.production_companies.map((company, id, arr) =>
                id < arr.length - 1 ? (
                  <span key={company.id}>
                    {company.name}
                    {", "}{" "}
                  </span>
                ) : (
                  <span key={company.id}>{company.name}</span>
                )
              )}
            </div>
          ) : null}

          {providers?.watchProviders?.length ? (
            <div className="flex flex-wrap items-center gap-x-2">
              <span>
                {t("Available")}
                <Link href={"#remark"} title={t("Disclaimer")}>
                  *
                </Link>
                :
              </span>

              <span className="flex gap-x-4">
                {providers.watchProviders?.map((item) => (
                  <Link
                    href={providersLink || "https://www.justwatch.com/"}
                    key={item.provider_id}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w45/${item.logo_path}`}
                      width={45}
                      height={45}
                      alt="provider logo"
                      title={item.provider_name}
                      className="w-8 h-8 rounded"
                    />
                  </Link>
                ))}
              </span>
            </div>
          ) : null}
        </section>
        <section className="col-span-2">
          <h5>{t("Overview")}</h5>
          <p>{TVShow.overview ? TVShow.overview : "Not available"}</p>
        </section>
      </section>
    </>
  )
}
