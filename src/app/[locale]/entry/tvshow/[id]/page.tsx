import type { Metadata } from "next"
import Image from "next/image"
import Link from "next-intl/link"
import {
  currentMediaDetails,
  currentMediaCredits,
  currentMediaProviders,
} from "@/api/FETCH_TMDB"
import { getTranslator } from "next-intl/server"
import Bookmark from "@/app/[locale]/_components/common/Bookmark"

type Props = {
  params: {
    id: string
    locale: Locale
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tvShow = await currentMediaDetails(+params.id, params.locale, "tv")
  const name = "name" in tvShow ? tvShow?.name || "No name" : ""

  return {
    title: name,
  }
}

export default async function TVShowPage({ params }: Props) {
  const tData = getTranslator(params.locale, "Details")
  const TVShowData = currentMediaDetails(+params.id, params.locale, "tv")
  const creditsData = currentMediaCredits(+params.id, params.locale, "tv")
  const providersData = currentMediaProviders(+params.id, params.locale, "tv")

  const [t, TVShow, credits, providers] = await Promise.all([
    tData,
    TVShowData,
    creditsData,
    providersData,
  ])

  const providersLink = providers?.providerLink

  if (TVShow === undefined)
    return (
      <section className="py-4 fluid-xl text-textPrimary">
        {t("Not found pt1")}
        {params.id}
        {t("Not found pt2")}
      </section>
    )

  const tvBookmark: MediaEntry = {
    id: TVShow.id!,
    title: "name" in TVShow ? TVShow.name || t("Unknown") : "",
    coverPath: TVShow.poster_path || "",
    score: TVShow.vote_average || 0,
    votes: TVShow.vote_count || 0,
    genreIds: TVShow.genres.map((genre) => genre.id) || [],
    date:
      "first_air_date" in TVShow ? TVShow.first_air_date || t("Unknown") : "",
    catalog: "tvshow",
    folderPath: "https://image.tmdb.org/t/p/w342",
  }

  const actors = credits?.cast
    ?.filter((cast) => cast.known_for_department === "Acting")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const direction = credits?.cast
    ?.filter((cast) => cast.known_for_department === "Directing")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const production = credits?.cast
    ?.filter((cast) => cast.known_for_department === "Production")
    ?.sort((a, b) => b.popularity! - a.popularity!)

  return "name" in TVShow ? (
    <section className="md:grid gap-4 lg:justify-self-center lg:max-w-[120ch] fluid-base text-textPrimary lg:grid-cols-[28.75rem_1fr] flex flex-wrap py-4">
      <div>
        <Image
          className="relative z-10 transition duration-300 delay-300 rounded lg:hover:translate-x-2/4 drop-shadow-lg lg:hover:scale-125"
          src={
            TVShow?.poster_path
              ? `https://image.tmdb.org/t/p/original${TVShow.poster_path}`
              : "https://fakeimg.pl/460x690/d1d1d1/878787?text=No+image"
          }
          alt="backdrop"
          width={460}
          height={690}
          placeholder="blur"
          blurDataURL="data:image/png;base64,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"
        />
      </div>

      <section className="grid content-between gap-y-2">
        <section className="grid gap-y-2">
          {TVShow?.name === TVShow?.original_name ? (
            <div className="flex items-start gap-2 pt-2">
              <h1 className="text-accent fluid-2xl max-w-[30rem]">
                {TVShow?.name}
              </h1>
              <Bookmark props={tvBookmark} />
            </div>
          ) : (
            <div className="flex items-start gap-2 pt-2">
              <h1 className="text-accent fluid-2xl max-w-[30rem]">
                {TVShow?.name}/ {TVShow?.original_name}{" "}
              </h1>
              <Bookmark props={tvBookmark} />
            </div>
          )}
          {TVShow?.tagline ? (
            <span className="text-textHoverPrimary fluid-lg">
              {TVShow.tagline}
            </span>
          ) : null}

          {TVShow?.first_air_date ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Date")}</label>
              <Link
                key={TVShow?.first_air_date + "key"}
                href={`/category/discover/tvseries?min_year=${
                  +TVShow?.first_air_date.slice(0, 4) < 1900
                    ? 1900
                    : +TVShow?.first_air_date.slice(0, 4) - 1
                }&max_year=${
                  +TVShow?.first_air_date.slice(0, 4) === 1900
                    ? 1901
                    : +TVShow?.first_air_date.slice(0, 4)
                }`}
                locale={params.locale}
                className="truncate transition cursor-pointer hover:text-textHoverPrimary"
              >
                {TVShow?.first_air_date}
              </Link>
            </div>
          ) : null}

          {TVShow?.genres ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Genres")}</label>
              <span className="flex flex-wrap gap-1">
                {TVShow.genres.map((genre, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={genre?.id}
                      href={`/category/discover/tvseries?with_genres=${genre?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {genre?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={genre?.id}
                      href={`/category/discover/tvseries?with_genres=${genre?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {genre?.name}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}

          {actors?.length ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Actors")}</label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-20 border-secondary">
                {actors.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}

          {direction?.length ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Direction")}</label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-20 border-secondary">
                {direction.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}

          {production?.length ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Production")}</label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-20 border-secondary">
                {production.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}

          {TVShow?.status ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Status")}</label>{" "}
              {TVShow.status}
            </div>
          ) : null}

          {TVShow?.number_of_episodes ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Episodes")}</label>{" "}
              {TVShow.number_of_episodes}
            </div>
          ) : null}

          {TVShow?.number_of_seasons ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Seasons")}</label>
              {TVShow.number_of_seasons}{" "}
            </div>
          ) : null}

          {TVShow?.episode_run_time ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Episode time")}</label>
              {TVShow.episode_run_time} {t("Min")}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-x-2">
            <label className="font-semibold">{t("Score")}</label>
            <span>{TVShow.vote_average?.toFixed(1)}/10</span>
          </div>

          <div className="flex flex-wrap gap-x-2">
            <label className="font-semibold">{t("Votes")}</label>
            <span>{TVShow.vote_count?.toLocaleString()}</span>
          </div>

          {TVShow?.production_countries ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Countries")}</label>
              {TVShow.production_countries.map((country, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    key={country?.iso_3166_1}
                    href={`/category/discover/tvseries?with_origin_country=${country?.iso_3166_1}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {country?.name},{" "}
                  </Link>
                ) : (
                  <Link
                    key={country?.iso_3166_1}
                    href={`/category/discover/tvseries?with_origin_country=${country?.iso_3166_1}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {country?.name}
                  </Link>
                )
              )}
            </div>
          ) : null}

          {TVShow?.production_companies ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Companies")}</label>
              {TVShow.production_companies.map((company, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    key={company?.id}
                    href={`/category/discover/tvseries?with_companies=${company?.id}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {company?.name},{" "}
                  </Link>
                ) : (
                  <Link
                    key={company?.id}
                    href={`/category/discover/tvseries?with_companies=${company?.id}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {company?.name}
                  </Link>
                )
              )}
            </div>
          ) : null}

          {providers?.watchProviders?.length ? (
            <div className="flex flex-wrap items-center gap-2">
              <label className="font-semibold">
                {t("Available")}
                <Link href={"#remark"} title={t("Disclaimer")}>
                  *
                </Link>
                :{" "}
              </label>

              <span className="flex gap-x-4">
                {providers.watchProviders?.map((item) => (
                  <Link
                    href={providersLink || "https://www.justwatch.com/"}
                    key={item.provider_id}
                    className="transition drop-shadow-md hover:scale-110"
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
        <section className="grid gap-2 py-2">
          <label className="font-semibold fluid-lg">{t("Overview")}</label>
          <p className="p-1 pr-4 overflow-auto text-justify border rounded-md max-h-40 border-secondary">
            {TVShow.overview ? TVShow.overview : t("NA")}
          </p>
        </section>
      </section>
    </section>
  ) : null
}
