import type { Metadata } from "next"
import BookmarkedContainer from "../../_components/BookmarkedContainer"
import { getTranslator } from "next-intl/server"

type Props = {
  params: {
    profile: string
    locale: Locale
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
  const translation = {
    delete: t("Delete"),
    nothing: t("Nothing"),
  }
  return (
    <div className="grid gap-4 pb-4">
      <section className="p-2 rounded-b bg-hoverSecondary text-textPrimary fluid-base">
        <h2 className="font-semibold fluid-lg">{t("DisclaimerHead")}</h2>
        <p>{t("DisclaimerBody")}</p>
      </section>
      <section className="grid gap-5 py-5">
        <h1 className="font-extrabold fluid-xl text-textPrimary">
          {t("Bookmarks")}
        </h1>
        <BookmarkedContainer
          label={t("Movies")}
          storageKey="movie"
          translation={translation}
          locale={params.locale}
        />
        <BookmarkedContainer
          label={t("Series")}
          storageKey="tvshow"
          translation={translation}
          locale={params.locale}
        />
        <BookmarkedContainer
          label={t("Books")}
          storageKey="book"
          translation={translation}
          locale={params.locale}
        />
      </section>
    </div>
  )
}
