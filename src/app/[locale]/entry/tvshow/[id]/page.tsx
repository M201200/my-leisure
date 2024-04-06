import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  currentMediaDetails,
  currentMediaCredits,
  currentMediaProviders,
} from "@/app/api/FETCH_TMDB"
import { getTranslations } from "next-intl/server"
import { auth } from "@/app/lib/auth"
import BookmarkButton from "@/app/[locale]/components/BookmarkButton"

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
  const session = await auth()

  const tData = getTranslations("Details")
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

  const tvBookmark = {
    id: TVShow.id!,
    title: "name" in TVShow ? TVShow.name || t("Unknown") : "",
    coverPath: TVShow.poster_path || "",
    score: TVShow.vote_average || 0,
    votes: TVShow.vote_count || 0,
    genreIds: TVShow.genres.map((genre) => genre.id) || [],
    date:
      "first_air_date" in TVShow ? TVShow.first_air_date || t("Unknown") : "",
    catalog: "tvshow" as const,
    folderPath: "https://image.tmdb.org/t/p/w342",
    locale: params.locale,
    user_email: session?.user?.email,
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
    <section className="md:grid gap-4 lg:justify-self-center fluid-base text-textPrimary lg:grid-cols-[28.75rem_1fr] flex flex-wrap py-4">
      <div>
        <Image
          unoptimized={true}
          className="relative z-10 transition duration-300 delay-300 rounded lg:hover:translate-x-2/4 drop-shadow-lg lg:hover:scale-125"
          src={
            TVShow?.poster_path
              ? `https://image.tmdb.org/t/p/w780${TVShow.poster_path}`
              : "https://fakeimg.pl/460x690/d1d1d1/878787?text=No+image"
          }
          alt="backdrop"
          width={460}
          height={690}
          placeholder="blur"
          blurDataURL="data:image/png;base64,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"
        />
      </div>

      <section className="grid content-start gap-y-6">
        <ul className="grid gap-y-3">
          {TVShow?.name === TVShow?.original_name ? (
            <li className="flex items-start gap-2 pt-2">
              <h1 className="text-accent leading-none fluid-2xl max-w-[30rem]">
                {TVShow?.name}
              </h1>
              <BookmarkButton props={tvBookmark} />
            </li>
          ) : (
            <li className="flex items-start gap-2 pt-2">
              <h1 className="text-accent leading-none fluid-2xl max-w-[30rem]">
                {TVShow?.name}/ {TVShow?.original_name}{" "}
              </h1>
              <BookmarkButton props={tvBookmark} />
            </li>
          )}
          {TVShow?.tagline ? (
            <li className="text-textHoverPrimary fluid-lg">{TVShow.tagline}</li>
          ) : null}

          {TVShow?.first_air_date ? (
            <li className="flex gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Date")}
              </label>
              <Link
                key={TVShow?.first_air_date + "key"}
                href={`/${params.locale}/discover/tvseries?min_year=${
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
            </li>
          ) : null}

          {TVShow?.genres ? (
            <li className="flex flex-wrap gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Genres")}
              </label>
              <span className="flex flex-wrap gap-1">
                {TVShow.genres.map((genre, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={genre?.id}
                      href={`/${params.locale}/discover/tvseries?with_genres=${genre?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {genre?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={genre?.id}
                      href={`/${params.locale}/discover/tvseries?with_genres=${genre?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {genre?.name}
                    </Link>
                  )
                )}
              </span>
            </li>
          ) : null}

          {actors?.length ? (
            <li className="grid gap-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Actors")}
              </label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto gap-x-2 max-h-60 bg-secondary">
                {actors.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/${params.locale}/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/${params.locale}/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name}
                    </Link>
                  )
                )}
              </span>
            </li>
          ) : null}

          {direction?.length ? (
            <li className="flex flex-wrap gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Direction")}
              </label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-16 border-primary">
                {direction.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/${params.locale}/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/${params.locale}/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name}
                    </Link>
                  )
                )}
              </span>
            </li>
          ) : null}

          {production?.length ? (
            <li className="flex flex-wrap gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Production")}
              </label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-16 border-primary">
                {production.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/${params.locale}/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/${params.locale}/discover/tvseries?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name}
                    </Link>
                  )
                )}
              </span>
            </li>
          ) : null}

          {TVShow?.status ? (
            <li className="flex gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Status")}
              </label>{" "}
              {TVShow.status}
            </li>
          ) : null}

          {TVShow?.number_of_episodes ? (
            <li className="flex gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Episodes")}
              </label>{" "}
              {TVShow.number_of_episodes}
            </li>
          ) : null}

          {TVShow?.number_of_seasons ? (
            <li className="flex gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Seasons")}
              </label>
              {TVShow.number_of_seasons}{" "}
            </li>
          ) : null}

          {TVShow?.episode_run_time?.length ? (
            <li className="flex gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Episode time")}
              </label>
              {TVShow.episode_run_time.map((time) => `${time} `)}
              {t("Min")}
            </li>
          ) : null}

          <li className="flex flex-wrap gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Score")}
            </label>
            <span>{TVShow.vote_average?.toFixed(1)}/10</span>
          </li>

          <li className="flex flex-wrap gap-x-2">
            <label className="font-semibold text-textHoverPrimary">
              {t("Votes")}
            </label>
            <span>{TVShow.vote_count?.toLocaleString()}</span>
          </li>

          {TVShow?.production_countries ? (
            <li className="flex gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Countries")}
              </label>
              {TVShow.production_countries.map((country, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    key={country?.iso_3166_1}
                    href={`/${params.locale}/discover/tvseries?with_origin_country=${country?.iso_3166_1}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {country?.name},{" "}
                  </Link>
                ) : (
                  <Link
                    key={country?.iso_3166_1}
                    href={`/${params.locale}/discover/tvseries?with_origin_country=${country?.iso_3166_1}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {country?.name}
                  </Link>
                )
              )}
            </li>
          ) : null}

          {TVShow?.production_companies ? (
            <li className="flex flex-wrap gap-x-2">
              <label className="font-semibold text-textHoverPrimary">
                {t("Companies")}
              </label>
              {TVShow.production_companies.map((company, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    key={company?.id}
                    href={`/${params.locale}/discover/tvseries?with_companies=${company?.id}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {company?.name},{" "}
                  </Link>
                ) : (
                  <Link
                    key={company?.id}
                    href={`/${params.locale}/discover/tvseries?with_companies=${company?.id}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {company?.name}
                  </Link>
                )
              )}
            </li>
          ) : null}

          {providers?.watchProviders?.length ? (
            <li className="flex flex-wrap items-center gap-2">
              <label className="font-semibold text-textHoverPrimary">
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
                      unoptimized={true}
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
            </li>
          ) : null}
        </ul>
      </section>
      <section className="grid col-span-2 gap-2 py-2 max-w-[80ch]">
        <label className="font-semibold fluid-lg">{t("Overview")}</label>
        <p className="p-1 pl-4 leading-relaxed text-balance">
          {TVShow.overview ? TVShow.overview : t("NA")}
        </p>
      </section>
    </section>
  ) : null
}
