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
      <section>
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
    ?.slice(0, 6)
    ?.filter((cast) => cast.known_for_department === "Acting")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const direction = credits.cast
    ?.slice(0, 6)
    ?.filter((cast) => cast.known_for_department === "Directing")
    ?.sort((a, b) => b.popularity! - a.popularity!)
  const production = credits.cast
    ?.slice(0, 6)
    ?.filter((cast) => cast.known_for_department === "Production")
    ?.sort((a, b) => b.popularity! - a.popularity!)

  return "title" in movie ? (
    <>
      <section className="md:grid gap-4 md:grid-cols-[28.75rem_1fr] flex flex-wrap">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt="backdrop"
            width={460}
            height={690}
          />
        </div>

        <section>
          {movie?.title === movie?.original_title ? (
            <>
              <h2>{movie.title}</h2>
              <Bookmark props={movieBookmark} />
            </>
          ) : (
            <>
              <h2>
                {movie?.title}/{movie?.original_title}{" "}
                <Bookmark props={movieBookmark} />
              </h2>
            </>
          )}
          {movie?.tagline ? <span>{movie?.tagline}</span> : null}

          {movie.release_date ? (
            <div className="flex gap-x-2">
              <h5>{t("Date")} </h5>
              {movie.release_date}
            </div>
          ) : null}

          {movie?.genres ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Genres")}</h5>
              <span>
                {movie?.genres.map((genre, id, arr) =>
                  id < arr.length - 1 ? (
                    <Link
                      key={genre?.id}
                      href={`/category/discover/movies?with_genres=${genre?.id}`}
                      locale={params.locale}
                    >
                      {genre?.name},{" "}
                    </Link>
                  ) : (
                    <Link
                      key={genre?.id}
                      href={`/category/discover/movies?with_genres=${genre?.id}`}
                      locale={params?.locale}
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
              <h5>{t("Direction")} </h5>
              {direction.map((cast, id, arr) =>
                id < arr.length - 1 ? (
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
              {production.map((cast, id, arr) =>
                id < arr.length - 1 ? (
                  <span key={cast.id}>{cast.name},</span>
                ) : (
                  <span key={cast.id}>{cast.name}</span>
                )
              )}
            </div>
          ) : null}

          {movie?.budget ? (
            <div className="flex gap-x-2">
              <h5>{t("Budget")}</h5> ${movie.budget.toLocaleString()}
            </div>
          ) : null}

          {movie?.revenue ? (
            <div className="flex gap-x-2">
              <h5>{t("Revenue")}</h5>${movie.revenue.toLocaleString()}{" "}
            </div>
          ) : null}

          {movie?.runtime ? (
            <div className="flex gap-x-2">
              <h5>{t("Runtime")}</h5>
              {movie.runtime}
            </div>
          ) : null}

          <div>
            {t("Score")}
            {movie.vote_average?.toFixed(1)}/10
          </div>

          <div>
            {t("Votes")}
            {movie.vote_count?.toLocaleString()}
          </div>

          {movie?.production_countries ? (
            <div className="flex gap-x-2">
              <h5>{t("Countries")}</h5>
              {movie.production_countries.map((country, id, arr) =>
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

          {movie?.production_companies ? (
            <div className="flex flex-wrap gap-x-2">
              <h5>{t("Companies")}</h5>
              {movie.production_companies.map((company, id, arr) =>
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
                :{" "}
              </span>

              <span className="flex gap-x-4">
                {providers?.watchProviders?.map((item) => (
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
          <p>{movie.overview ? movie.overview : t("NA")}</p>
        </section>
      </section>
    </>
  ) : null
}
