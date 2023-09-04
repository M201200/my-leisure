import type { Metadata } from "next"
import BookmarkedContainer from "../../components/BookmarkedContainer"
import { getTranslator } from "next-intl/server"

type Props = {
  params: {
    profile: string
    locale: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.profile

  return {
    title: title,
  }
}

export default async function ProfilePage({ params }: Props) {
  const t = await getTranslator(params.locale, "Profile")
  const containerTranslation = [t("Movies"), t("Series"), t("Nothing")]

  return (
    <div>
      <section>
        <h2>{t("DisclaimerHead")}</h2>
        <p>{t("DisclaimerBody")}</p>
      </section>
      <section className="grid gap-4">
        <h1>{t("Bookmarks")}</h1>
        <BookmarkedContainer
          storageKey="movie"
          translation={containerTranslation}
        />
        <BookmarkedContainer
          storageKey="tvshow"
          translation={containerTranslation}
        />
      </section>
    </div>
  )
}
