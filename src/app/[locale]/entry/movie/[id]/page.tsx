import type { Metadata } from "next"
import Image from "next/image"
import Link from "next-intl/link"
import {
  currentMediaCredits,
  currentMediaDetails,
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
  const movie = await currentMediaDetails(+params.id, params.locale, "movie")
  const title = "title" in movie ? movie?.title || "No title" : ""

  return {
    title: title,
  }
}

export default async function MoviePage({ params }: Props) {
  const tData = getTranslator(params.locale, "Details")

  const movieData = currentMediaDetails(+params.id, params.locale, "movie")
  const creditsData = currentMediaCredits(+params.id, params.locale, "movie")
  const providersData = currentMediaProviders(
    +params.id,
    params.locale,
    "movie"
  )

  const [t, movie, credits, providers] = await Promise.all([
    tData,
    movieData,
    creditsData,
    providersData,
  ])

  const providersLink = providers.providerLink

  if (movie === undefined)
    return (
      <section className="py-4 fluid-xl text-textPrimary">
        {t("Not found pt1")}
        {params.id}
        {t("Not found pt2")}
      </section>
    )

  const movieBookmark: MediaEntry = {
    id: movie.id,
    title: "title" in movie ? movie.title || t("Unknown") : "",
    coverPath: movie.poster_path || "",
    score: movie.vote_average || 0,
    votes: movie.vote_count || 0,
    genreIds: movie.genres.map((genre) => genre.id) || [],
    date: "release_date" in movie ? movie.release_date || t("Unknown") : "",
    catalog: "movie",
    folderPath: "https://image.tmdb.org/t/p/w342",
  }

  const actors = credits.cast
    ?.filter((cast) => cast.known_for_department === "Acting")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const direction = credits.cast
    ?.filter((cast) => cast.known_for_department === "Directing")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const production = credits.cast
    ?.filter((cast) => cast.known_for_department === "Production")
    ?.sort((a, b) => b.popularity! - a.popularity!)

  const runtimeHours =
    "runtime" in movie
      ? movie?.runtime > 60
        ? `${Math.floor(movie.runtime / 60)} ${t("Hour")}`
        : `${movie.runtime} ${t("Min")}`
      : ""
  const runtimeMinutes =
    "runtime" in movie ? `${movie.runtime % 60} ${t("Min")}` : ""

  return "title" in movie ? (
    <section className="md:grid gap-4 fluid-base lg:justify-self-center lg:max-w-[120ch] text-textPrimary lg:grid-cols-[28.75rem_1fr] flex flex-wrap py-4">
      <div>
        <Image
          className="relative transition duration-300 delay-300 rounded lg:z-10 lg:hover:translate-x-2/4 drop-shadow-lg lg:hover:scale-125"
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/original${movie?.poster_path}`
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
          {movie?.title === movie?.original_title ? (
            <div className="flex items-start gap-2 pt-2">
              <h1 className="text-accent fluid-2xl max-w-[30rem]">
                {movie.title}
              </h1>
              <Bookmark props={movieBookmark} />
            </div>
          ) : (
            <div className="flex items-start gap-2 pt-2">
              <h1 className="text-accent fluid-2xl max-w-[30rem]">
                {movie?.title}/ {movie?.original_title}{" "}
                <Bookmark props={movieBookmark} />
              </h1>
            </div>
          )}
          {movie?.tagline ? (
            <span className="text-textHoverPrimary fluid-lg">
              {movie?.tagline}
            </span>
          ) : null}

          {movie.release_date ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Date")} </label>
              <Link
                key={movie.release_date + "key"}
                href={`/category/discover/movies?min_year=${
                  +movie.release_date.slice(0, 4) < 1900
                    ? 1900
                    : +movie.release_date.slice(0, 4) - 1
                }&max_year=${
                  +movie.release_date.slice(0, 4) === 1900
                    ? 1901
                    : +movie.release_date.slice(0, 4)
                }`}
                locale={params.locale}
                className="truncate transition cursor-pointer hover:text-textHoverPrimary"
              >
                {movie.release_date}
              </Link>
            </div>
          ) : null}

          {movie?.genres ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Genres")}</label>
              <span className="flex flex-wrap gap-1">
                {movie?.genres.map((genre, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={genre?.id}
                      href={`/category/discover/movies?with_genres=${genre?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {genre?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={genre?.id}
                      href={`/category/discover/movies?with_genres=${genre?.id}`}
                      locale={params?.locale}
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
            <div className="grid gap-2">
              <label className="font-semibold">{t("Actors")}</label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-16 border-primary">
                {actors.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/movies?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/movies?with_people=${cast?.id}`}
                      locale={params?.locale}
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
              <label className="font-semibold">{t("Direction")} </label>
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-16 border-primary">
                {direction.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/movies?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/movies?with_people=${cast?.id}`}
                      locale={params?.locale}
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
              <span className="flex flex-wrap max-w-lg p-1 overflow-auto border rounded-md gap-x-2 max-h-16 border-primary">
                {production.map((cast, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/movies?with_people=${cast?.id}`}
                      locale={params.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={cast?.id}
                      href={`/category/discover/movies?with_people=${cast?.id}`}
                      locale={params?.locale}
                      className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                    >
                      {cast?.name}
                    </Link>
                  )
                )}
              </span>
            </div>
          ) : null}

          {movie?.budget ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Budget")}</label> $
              {movie.budget.toLocaleString()}
            </div>
          ) : null}

          {movie?.revenue ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Revenue")}</label>$
              {movie.revenue.toLocaleString()}{" "}
            </div>
          ) : null}

          {movie?.runtime ? (
            <div className="flex gap-x-2">
              <label className="font-semibold">{t("Runtime")}</label>
              <span>
                {runtimeHours} {runtimeMinutes}
              </span>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-x-2">
            <label className="font-semibold">{t("Score")}</label>
            <span>{movie.vote_average?.toFixed(1)}/10</span>
          </div>

          <div className="flex flex-wrap gap-x-2">
            <label className="font-semibold">{t("Votes")}</label>
            <span>{movie.vote_count?.toLocaleString()}</span>
          </div>

          {movie?.production_countries ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Countries")}</label>
              {movie.production_countries.map((country, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    key={country?.iso_3166_1}
                    href={`/category/discover/movies?with_origin_country=${country?.iso_3166_1}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {country?.name},{" "}
                  </Link>
                ) : (
                  <Link
                    key={country?.iso_3166_1}
                    href={`/category/discover/movies?with_origin_country=${country?.iso_3166_1}`}
                    locale={params?.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {country?.name}
                  </Link>
                )
              )}
            </div>
          ) : null}

          {movie?.production_companies ? (
            <div className="flex flex-wrap gap-x-2">
              <label className="font-semibold">{t("Companies")}</label>
              {movie.production_companies.map((company, id, arr) =>
                id < arr.length - 1 ? (
                  <Link
                    key={company?.id}
                    href={`/category/discover/movies?with_companies=${company?.id}`}
                    locale={params.locale}
                    className="truncate transition cursor-pointer hover:text-textHoverPrimary"
                  >
                    {company?.name},{" "}
                  </Link>
                ) : (
                  <Link
                    key={company?.id}
                    href={`/category/discover/movies?with_companies=${company?.id}`}
                    locale={params?.locale}
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

              <span className="flex flex-wrap gap-2">
                {providers?.watchProviders?.map((item) => (
                  <Link
                    href={providersLink || "https://www.justwatch.com/"}
                    key={item.provider_id}
                    title={item.provider_name}
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
          <h1 className="font-semibold fluid-lg">{t("Overview")}</h1>
          <p className="p-1 pr-4 overflow-auto text-justify border rounded-md max-h-40 border-primary">
            {movie.overview ? movie.overview : t("NA")}
          </p>
        </section>
      </section>
    </section>
  ) : null
}
